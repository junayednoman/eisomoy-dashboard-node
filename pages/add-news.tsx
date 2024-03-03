"use client"
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import Select from 'react-select';
import { useCallback, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import 'easymde/dist/easymde.min.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import dynamic from 'next/dynamic'
import axios from "axios";
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const AddNews = () => {
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<any[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [active, setActive] = useState<Number>();
    const [images, setImages] = useState<any>([]);
    const categoryOptions = [
        { value: 'Publish', label: 'Publish' },
        { value: 'Draft', label: 'Draft' },
    ];

    

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

        const selectedCategoriesString = selectedCategories.join(', ');

        console.log(selectedCategoriesString);
    };

    


    useEffect(() => {
        fetchCategories();
    }, []);

    // image file upload
    const maxNumber = 69;
    const handleImageUpload = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const submitForm = () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Form submitted successfully',
            padding: '10px 20px',
        });
    };

    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

    const [value, setValue] = useState<string>("");
    const onChange = useCallback((value: string) => {
        setValue(value);
    }, []);

    const handleToggleImgType = () => {
        // console.log(e.target.value);
        setFileType(!fileType)
        setUrlType(!urlType)
    }

    return (
        <>
            <h4 className="text-2xl font-semibold mb-8">Add a news</h4>
            <Formik
                initialValues={{
                    newsTitle: '',
                }}
                onSubmit={() => { }}
            >
                {({ }) => (
                    <Form>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-x-6">
                            {/* title and description */}
                            <div className="xl:col-span-3 lg:col-span-2 md:col-span-2">
                                <div>
                                    <label htmlFor="title">Title </label>
                                    <Field name="newsTitle" type="text" id="title" placeholder="Enter News Title" className="form-input h-12" />

                                    <label htmlFor="desc" className=" mt-4">Description </label>
                                    <SimpleMdeReact className="dark:myEditor" value={value} onChange={onChange} />
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
                                                    <label htmlFor="fullName">Reporter Name</label>
                                                    <Field name="reporter" type="text" id="reporter" placeholder="Enter reporter name" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="fullName">Publish Status</label>
                                                    <Select className='dark:mySelect mySelect' placeholder="Choose..." options={categoryOptions} isSearchable={false} />
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
                                                <Field name="tag" type="text" id="tags" placeholder="Enter tag name" className="form-input h-12 mb-2" ></Field>
                                                <span className="text-[13px]">Separate with the comma</span>
                                            </div>
                                        </AnimateHeight>
                                    </div>

                                    {/* news categories */}
                                    {categories.length > 0 && (
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
                                    )}

                                   
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
                                                        <input onChange={handleToggleImgType} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                        <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[19px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11.5px] before:h-[11.5px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                                    </label>
                                                    <span>URL</span>
                                                </div>

                                                {
                                                    fileType &&
                                                    <div className="custom-file-container" data-upload-id="myFirstImage">
                                                        <div className="label-container">
                                                            <label>Upload </label>
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear"
                                                                title="Clear Image"
                                                                onClick={() => {
                                                                    setImages([]);
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <label className="custom-file-container__custom-file"></label>
                                                        <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                        <ImageUploading value={images} onChange={handleImageUpload} maxNumber={maxNumber}>
                                                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                                <div className="upload__image-wrapper -mt-12">
                                                                    <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                                        Choose File...
                                                                    </button>
                                                                    &nbsp;
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                                            <img src={image.dataURL} alt="img" className="m-auto" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                        {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                                                    </div>
                                                }
                                                {
                                                    urlType &&
                                                    <Field name="feature-img" type="text" id="feature-img" placeholder="Enter Image URL" className="form-input h-12 mb-2" ></Field>
                                                }

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
                                                    <Field name="metaTitle" type="text" id="metaTitle" placeholder="Enter Meta Title" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="metaDescription">Meta Description</label>
                                                    <Field name="metaDescription" type="text" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                                <div className="mb-2">
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="metaImg">Meta Image</label>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span>File</span>
                                                            <label className="relative mt-2">
                                                                <input onChange={handleToggleImgType} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                                            </label>
                                                            <span>URL</span>
                                                        </div>
                                                    </div>

                                                    {
                                                        fileType &&
                                                        <Field name="feature-img" type="file" id="feature-img" placeholder="Set featured image" className="form-input h-12 mb-2" ></Field>
                                                    }
                                                    {
                                                        urlType &&
                                                        <Field name="feature-img" type="text" id="feature-img" placeholder="Enter Image URL" className="form-input h-12 mb-2" ></Field>
                                                    }

                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="focusKeyword">Focus Keyword</label>
                                                    <Field name="focusKeyword" type="text" id="focusKeyword" placeholder="Enter Focus Keyword" className="form-input h-12 mb-2" ></Field>
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                            </div >
                        </div >

                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                            onClick={() => {
                                submitForm();
                            }}
                        >
                            Publish
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
};


export default AddNews;