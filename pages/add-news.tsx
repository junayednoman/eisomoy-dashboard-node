import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import Select from 'react-select';
import { useCallback, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import axios from "axios";
import * as Yup from 'yup';
import { useUserGlobal } from '../context/userContext';
import withAuth from '../utils/withAuth';


const validationSchema = Yup.object().shape({
    news_title: Yup.string().required('Title is required'),
    featured_image: Yup.mixed().nullable().test('fileType', 'Invalid file type', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const fileExtension = value.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    }).test('fileSize', 'File size must be less than 3MB', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        return value.size <= 3 * 1024 * 1024; // 3MB in bytes
    }),
    meta_image: Yup.mixed().nullable().test('fileType', 'Invalid file type', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const fileExtension = value.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    }).test('fileSize', 'File size must be less than 3MB', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        return value.size <= 3 * 1024 * 1024; // 3MB in bytes
    }),
});

  


const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const AddNews = () => {
    const [metaImgFile, setMetaImgFile] = useState<boolean>(true);
    const [featuredImgFile, setFeaturedImgFile] = useState<boolean>(true);
    const [active, setActive] = useState<number>();
    const [selectedPublishStatus, setSelectedPublishStatus] = useState<any>("");
    const { userGlobalData } = useUserGlobal();

    const publishStatusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/news/all-categories`, {
                withCredentials: true
            });

            const categoryData = response.data;

            setCategories(categoryData);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching category data:', error);
            setLoading(false);
        }
    };

    const handleCheckboxChange = (categoryName: any) => {
        // Toggle selection
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }


    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const togglePara = (value: number) => {
        setActive((oldValue) => oldValue === value ? 0 : value);
    };

    const [editorValue, setEditorValue] = useState<string>("");

    const onChange = useCallback((editorValue: string) => {
        setEditorValue(editorValue);
    }, []);


    const handleAddNews = async (values: any, { resetForm }: any) => {

        let featuredImageName = '';
        let metaImageName = '';

        if (featuredImgFile) {

            const formData = new FormData();
            formData.append('file', values.featured_image);

            try {
                const response = await axios.post('/api/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
                console.log('Featured image uploaded successfully');
                featuredImageName = response.data.fileName;
              } catch (error) {
                console.error('Error uploading featured image: ', error);
              }
            
        }
        else{
            featuredImageName = values.featured_image_url;            
        }
        if (metaImgFile) {

            const formData = new FormData();
            formData.append('file', values.meta_image);

            try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Meta image uploaded successfully');
            metaImageName = response.data.fileName;
            } catch (error) {
            console.error('Error uploading meta image: ', error);
            }
            
        }
        else{

            metaImageName = values.meta_image_url;
            
        }

        const categoriesString = Array.isArray(selectedCategories) ? selectedCategories.join(', ') : selectedCategories;

        const formDataFinal = {
            title: values.news_title,
            description: editorValue,
            featured_image: featuredImageName,
            category: categoriesString,
            reporter_name: values.reporter_name,
            cretaed_by: userGlobalData?.display_name,
            published_by: userGlobalData?.display_name,
            last_modified_by: userGlobalData?.display_name,
            publish_status: selectedPublishStatus.value,
            tags: values.tag,
            meta_title: values.meta_title,
            meta_description: values.meta_description,
            meta_image: metaImageName,
            focus_keyword: values.focus_keyword,
            // Add other fields as needed
        };

        console.log(formDataFinal);

        // Call add-news API with all the necessary data
    // try {
    //     const response = await axios.post(`${apiUrl}/api/news/add-news`, formDataFinal, { withCredentials: true });
    //     console.log('news added succesfully');
    //     Swal.fire({
    //         icon: 'success',
    //         title: 'News added successfully',
    //         timer: 1000,
    //         showConfirmButton: false
    //     });
    //     resetForm(); // Reset the form after successful submission
    //     setMetaImgFile(true);
    //     setFeaturedImgFile(true);
    //     setSelectedPublishStatus("");
    //     setSelectedCategories([]);
    //     setEditorValue("");
    // } catch (error: any) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops... Something went wrong!',
    //         text: error.response?.data?.message || 'Failed to add News',
    //         timer: 3000,
    //         showConfirmButton: true
    //     });
    // }



    };

    return (
        <>
            <h4 className="text-2xl font-semibold mb-8">Add a news</h4>
            <Formik
                initialValues={{
                    news_title: '',
                    reporter_name: '',
                    tag: '',
                    featured_image: null,
                    meta_title: '',
                    meta_description: '',
                    focus_keyword: '',
                    meta_image: null,
                    featured_image_url: '',
                    meta_image_url: '',
                }}
                
                onSubmit={(values, { resetForm }) => handleAddNews(values, { resetForm })}
                validationSchema={validationSchema}
            >
                {({ errors, touched, setFieldValue }) => (
                <Form>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-x-6">
                        <div className="xl:col-span-3 lg:col-span-2 md:col-span-2">
                            <div>
                                <label htmlFor="title">Title</label>
                                <Field name="news_title" type="text" id="news_title" placeholder="Enter News Title" className="form-input h-12" />
                                {errors.news_title && touched.news_title && <p className="text-red-500">{errors.news_title}</p>}

                                <label htmlFor="desc" className="mt-4">Description</label>
                                <SimpleMdeReact className="dark:myEditor" value={editorValue} onChange={onChange} />
                            </div>
                        </div>
                        <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 border dark:border-[#888EA8] border-[#e6e6e6] rounded-md mt-6 bg-white dark:bg-[#060818] h-fit pb-8">
                            <div>
                                <div className="rounded-t-md bg-white dark:bg-black dark:myAccordian">
                                    <div className={`flex cursor-pointer p-4 font-semibold dark:bg-[#0E1726] dark:hover:bg-[#0E1726] hover:bg-[#EBEBEB] ${active === 1 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(1)}>
                                        <span>General</span>
                                        <div className="flex ltr:ml-auto rtl:mr-auto">
                                            <svg className={`h-5 w-5 ${active === 1 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimateHeight duration={50} height={active === 1 ? 'auto' : 0}>
                                        <div className="p-4 pt-2 font-semibold text-white-dark">
                                            <div className="mb-3">
                                                <label htmlFor="reporter">Reporter Name</label>
                                                <Field name="reporter_name" type="text" id="reporter" placeholder="Enter reporter name" className="form-input h-12 mb-2" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="fullName">Publish Status</label>
                                                <Select name="publish_status" className='dark:mySelect mySelect' placeholder="Choose..." options={publishStatusOptions} onChange={setSelectedPublishStatus} isSearchable={false} />
                                            </div>
                                        </div>
                                    </AnimateHeight>
                                </div>
                                <div className="border-y border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                    <div className={`flex cursor-pointer p-4 font-semibold dark:bg-[#0E1726] dark:hover:bg-[#0E1726] hover:bg-[#EBEBEB] ${active === 2 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(2)}>
                                        <span>Tags</span>
                                        <div className="flex ltr:ml-auto rtl:mr-auto">
                                            <svg className={`h-5 w-5 ${active === 2 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimateHeight duration={50} height={active === 2 ? 'auto' : 0}>
                                        <div className="p-4 pt-2 font-semibold text-white-dark">
                                            <h5 className="font-semibold text-[13px] text-black mb-1">ADD NEW TAG</h5>
                                            <Field name="tag" type="text" id="tags" placeholder="Enter tag name" className="form-input h-12 mb-2" />
                                            <span className="text-[13px]">Separate with the comma</span>
                                        </div>
                                    </AnimateHeight>
                                </div>

                                {/* news categories */}
                                <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                    <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 3 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(3)}>
                                        <span>Categories</span>
                                        <div className="flex ltr:ml-auto rtl:mr-auto">
                                            <svg className={`h-5 w-5 ${active === 3 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimateHeight duration={50} height={active === 3 ? 'auto' : 0}>
                                        <div className="p-4 pt-2 font-semibold text-white-dark">
                                            {categories.map(category => (
                                                <label key={category.cat_id} htmlFor={category.categoryName} className="flex items-center gap-[6px]">
                                                    <input
                                                        type="checkbox"
                                                        id={category.cat_id}
                                                        className="h-4 w-4"
                                                        checked={selectedCategories.includes(category.categoryName)}
                                                        onChange={() => handleCheckboxChange(category.categoryName)}
                                                    />
                                                    <span>{category.categoryName}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </AnimateHeight>
                                </div>

                                {/* featured image */}
                                {/* featured image */}
                                <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                    <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 4 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(4)}>
                                        <span>Featured Image</span>
                                        <div className="flex ltr:ml-auto rtl:mr-auto">
                                            <svg className={`h-5 w-5 ${active === 4 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimateHeight duration={50} height={active === 4 ? 'auto' : 0}>
                                        <div className="p-4 pt-2 font-semibold text-white-dark">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span>File</span>
                                                <label className="relative mt-2">
                                                    <input onChange={() => setFeaturedImgFile(!featuredImgFile)} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                    <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[19px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11.5px] before:h-[11.5px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                                </label>
                                                <span>URL</span>
                                            </div>
                                            {
                                                featuredImgFile ?
                                                    <input name="featured_image" type="file" id="featured_image" className="form-input h-12 mb-2" onChange={(event: any) => {setFieldValue('featured_image', event.currentTarget.files[0]);}}/>
                                                    :
                                                    <Field name="featured_image_url" type="text" id="featured_image_url" placeholder="Enter Image URL" className="form-input h-12 mb-2" ></Field>
                                            }
                                            {errors.featured_image && touched.featured_image && <p className="text-red-500">{errors.featured_image}</p>}

                                        </div>
                                    </AnimateHeight>
                                </div>


                                {/* SEO */}
                                <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                    <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 5 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(5)}>
                                        <span>SEO</span>
                                        <div className="flex ltr:ml-auto rtl:mr-auto">
                                            <svg className={`h-5 w-5 ${active === 5 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimateHeight duration={50} height={active === 5 ? 'auto' : 0}>
                                        <div className="p-4 pt-2 font-semibold">
                                            <div className="mb-2">
                                                <label htmlFor="metaTitle">Meta Title</label>
                                                <Field name="meta_title" type="text" id="metaTitle" placeholder="Enter Meta Title" className="form-input h-12 mb-2" />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="metaDescription">Meta Description</label>
                                                <Field name="meta_description" type="text" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-12 mb-2" />
                                            </div>
                                            <div className="mb-2">
                                                <div className="flex justify-between items-center">
                                                    <label htmlFor="meta_image">Meta Image</label>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span>File</span>
                                                        <label className="relative mt-2">
                                                            <input onChange={() => setMetaImgFile(!metaImgFile)} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                            <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                                        </label>
                                                        <span>URL</span>
                                                    </div>
                                                </div>
                                                {metaImgFile ?
                                                    
                                                    <input name="meta_image" type="file" id="meta_image" className="form-input h-12 mb-2" onChange={(event: any) => {setFieldValue('meta_image', event.currentTarget.files[0]);}}/>
                                                    :
                                                    <Field name="meta_image_url" type="text" id="meta_image_url" placeholder="Enter Image URL" className="form-input h-12 mb-2" />
                                                    
                                                }
                                                {errors.meta_image && touched.meta_image && <p className="text-red-500">{errors.meta_image}</p>}
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="focusKeyword">Focus Keyword</label>
                                                <Field name="focus_keyword" type="text" id="focusKeyword" placeholder="Enter Focus Keyword" className="form-input h-12 mb-2" />
                                            </div>
                                        </div>
                                    </AnimateHeight>
                                </div>






                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary !mt-6">Publish</button>
                </Form>
                )}
            </Formik>
        </>
    )
};

export default withAuth(AddNews);
