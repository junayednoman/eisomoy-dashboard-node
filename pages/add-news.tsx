"use client"
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import Select from 'react-select';
import { useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
import SimpleMdeReact from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const AddNews = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [active, setActive] = useState<Number>();
    const [images, setImages] = useState<any>([]);
    const categoryOptions = [
        { value: 'Publish', label: 'Publish' },
        { value: 'Draft', label: 'Draft' },
    ];
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

    const [value, setValue] = useState(
        `# Basic Example
        Go ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even[links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like 'cmd-b' or 'ctrl-b'.
        
        ## Lists
        Unordered lists can be started using the toolbar or by typing '*', '-', or '+'. Ordered lists can be started by typing '1.'.
        
        #### Unordered
        * Lists are a piece of cake
        * They even auto continue as you type
        * A double enter will end them
        * Tabs and shift - tabs work too
        
        #### Ordered
        1. Numbered lists...
        2. ...work too!
        
        ## What about images?
        ![Yes](https://i.imgur.com/sZlktY7.png)
        `
    );
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
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-x-6">
                <div className="xl:col-span-3 lg:col-span-2 md:col-span-2">
                    <Formik
                        initialValues={{
                            newsTitle: '',
                        }}
                        onSubmit={() => { }}
                    >
                        {({ touched }) => (
                            <Form className="space-y-5">
                                <div>
                                    <label htmlFor="title">Title </label>
                                    <Field name="newsTitle" type="text" id="title" placeholder="Enter News Title" className="form-input h-12" />

                                    <label htmlFor="desc" className=" mt-4">Description </label>
                                    <SimpleMdeReact value={value} onChange={onChange} />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6"
                                    onClick={() => {
                                        if (touched.newsTitle) {
                                            submitForm();
                                        }
                                    }}
                                >
                                    Publish
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 border dark:border-[#888EA8] border-[#e6e6e6] rounded-md mt-6 bg-white dark:bg-[#060818] h-fit pb-8">
                    <Formik
                        initialValues={{
                            category: '',
                        }}
                        onSubmit={() => { }}
                    >
                        {({ }) => (
                            <Form className="space-y-5">
                                <div>
                                    {/* general info */}
                                    <div className={`rounded-t-md bg-white dark:bg-black`}>
                                        <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] ${active === 1 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(1)}>
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
                                                    <Select placeholder="Choose..." options={categoryOptions} isSearchable={false} />
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                    {/* add tags */}
                                    <div className="border-y border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB] ${active === 2 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(2)}>
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
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB] ${active === 3 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(3)}>
                                            <span>Categories</span>
                                            <div className="flex ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 3 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 3 ? 'auto' : 0}>
                                            <div className="p-4 pt-2 font-semibold text-white-dark">
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="Sports" type="checkbox" id="Sports" className="h-4 w-4" />
                                                    <span>Sports</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="Politics" type="checkbox" id="Politics" className="h-4 w-4" />
                                                    <span>Politics</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="National" type="checkbox" id="National" className="h-4 w-4" />
                                                    <span>National</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="International" type="checkbox" id="International" className="h-4 w-4" />
                                                    <span>International</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="Business" type="checkbox" id="Business" className="h-4 w-4" />
                                                    <span>Business</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="Economy" type="checkbox" id="Economy" className="h-4 w-4" />
                                                    <span>Economy</span>
                                                </label>
                                                <label className="flex items-center gap-[6px]">
                                                    <Field name="Science" type="checkbox" id="Science" className="h-4 w-4" />
                                                    <span>Science</span>
                                                </label>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                    {/* featured image */}
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] ${active === 4 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(4)}>
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
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] ${active === 5 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(5)}>
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
                            </Form>
                        )}
                    </Formik >
                </div >
            </div >
        </>
    )
};


export default AddNews;