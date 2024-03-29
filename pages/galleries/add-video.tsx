import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import Select from 'react-select';
import { useCallback, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import 'easymde/dist/easymde.min.css';
import axios from "axios";
import * as Yup from 'yup';
import { useUserGlobal } from '../../context/userContext';
import withAuth from '../../utils/withAuth';


const validationSchema = Yup.object().shape({
    video_title: Yup.string().required('Title is required'),
    video_Url: Yup.string().required('URL is required'),
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


const AddVideo = () => {

    const [metaImgFile, setMetaImgFile] = useState<boolean>(true);
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
            const response = await axios.get(`${apiUrl}/api/video/all-categories`, {
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


    const handleAddVideo = async (values: any, { resetForm }: any) => {

        let metaImageName = '';

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
        else {
            metaImageName = values.meta_image_url;
        }

        const categoriesString = Array.isArray(selectedCategories) ? selectedCategories.join(', ') : selectedCategories;

        const formDataFinal = {
            title: values.video_title,
            video_Url: values.video_Url,
            category: categoriesString,
            uploader_name: values.uploader_name,
            created_by: userGlobalData?.display_name,
            published_by: userGlobalData?.display_name,
            last_modified_by: userGlobalData?.display_name,
            publish_status: selectedPublishStatus.value,
            tags: values.tags,
            meta_title: values.meta_title,
            meta_description: values.meta_description,
            meta_image: metaImageName,
            focus_keyword: values.focus_keyword,
            // Add other fields as needed
        };

        console.log(formDataFinal);

        // Call add-Video API with all the necessary data
        try {
            const response = await axios.post(`${apiUrl}/api/video/add-video`, formDataFinal, { withCredentials: true });
            console.log('Video added succesfully');
            Swal.fire({
                icon: 'success',
                title: 'Video added successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm(); // Reset the form after successful submission

            setSelectedPublishStatus("");
            setSelectedCategories([]);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to add Video',
                timer: 3000,
                showConfirmButton: true
            });
        }
    };

    return (
        <>
            <h4 className="text-2xl font-semibold mb-8">Add a Video</h4>
            <Formik
                initialValues={{
                    video_title: '',
                    video_Url: '',
                    uploader_name: '',
                    tags: '',
                    meta_title: '',
                    meta_description: '',
                    meta_image: null,
                    meta_image_url: '',
                    focus_keyword: '',
                }}
                onSubmit={(values, { resetForm }) => handleAddVideo(values, { resetForm })}
                validationSchema={validationSchema}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form className="space-y-5">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-x-6">
                            <div className="xl:col-span-3 lg:col-span-2 md:col-span-2">
                                <div>
                                    <label htmlFor="title">Title </label>
                                    <Field name="video_title" type="text" id="title" placeholder="Enter Video Title" className="form-input h-12" />
                                    {errors.video_title && touched.video_title && <p className="text-red-500">{errors.video_title}</p>}
                                    <label htmlFor="URL" className="mt-4">URL</label>
                                    <Field name="video_Url" type="text" id="URL" placeholder="Enter Video URL" className="form-input h-12" />
                                </div>
                            </div>
                            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 border dark:border-[#888EA8] border-[#e6e6e6] rounded-md mt-6 bg-white dark:bg-[#060818] h-fit pb-8">
                                <div>
                                    {/* general info */}
                                    <div className={`rounded-t-md bg-white dark:bg-black dark:myAccordian`}>
                                        <div className={`flex cursor-pointer p-4 font-semibold dark:bg-[#0E1726] dark:hover:bg-[#0E1726] hover:bg-[#EBEBEB] ${active === 1 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(1)}>
                                            <span>General</span>
                                            <div className="flex  ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 1 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 1 ? 'auto' : 0}>
                                            <div className="p-4 pt-2 font-semibold text-white-dark">
                                                <div className="mb-3">
                                                    <label htmlFor="uploader_name">Uploader Name</label>
                                                    <Field name="uploader_name" type="text" id="uploader_name" placeholder="Enter uploader name" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="status">Publish Status</label>
                                                    <Select onChange={setSelectedPublishStatus} className='dark:mySelect mySelect' placeholder="Choose..." options={publishStatusOptions} isSearchable={false} />
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                    {/* add tags */}
                                    <div className="border-y border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                        <div className={`flex cursor-pointer p-4  font-semibold  dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 2 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(2)}>
                                            <span>Tags</span>
                                            <div className="flex  ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 2 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 2 ? 'auto' : 0}>
                                            <div className="p-4 pt-2 font-semibold text-white-dark">
                                                <h5 className="font-semibold text-[13px] text-black mb-1">ADD NEW TAG</h5>
                                                <Field name="tags" type="text" id="tags" placeholder="Enter tag name" className="form-input h-12 mb-2" ></Field>
                                                <span className="text-[13px]">Separate with the comma</span>
                                            </div>
                                        </AnimateHeight>
                                    </div>

                                    {/* video categories */}
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black dark:myAccordian">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB] dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 3 && 'bg-[#EBEBEB] myAccordianHeading'}`} onClick={() => togglePara(3)}>
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
                                                    <label htmlFor="meta_title">Meta Title</label>
                                                    <Field name="meta_title" type="text" id="meta_title" placeholder="Enter Meta Title" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="meta_description">Meta Description</label>
                                                    <Field name="meta_description" type="text" id="meta_description" placeholder="Enter Meta Description" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-2">
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="metaImg">Meta Image</label>
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

                                                        <input name="meta_image" type="file" id="meta_image" className="form-input h-12 mb-2" onChange={(event: any) => { setFieldValue('meta_image', event.currentTarget.files[0]); }} />
                                                        :
                                                        <Field name="meta_image_url" type="text" id="meta_image_url" placeholder="Enter Image URL" className="form-input h-12 mb-2" />

                                                    }
                                                    {errors.meta_image && touched.meta_image && <p className="text-red-500">{errors.meta_image}</p>}
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="focus_keyword">Focus Keyword</label>
                                                    <Field name="focus_keyword" type="text" id="focus_keyword" placeholder="Enter Focus Keyword" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <button type="submit" className="btn btn-primary !mt-6">Publish</button>
                    </Form>
                )}
            </Formik>
        </>
    )
};

export default withAuth(AddVideo);
