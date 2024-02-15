"use client"

import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import Select from 'react-select';
import { useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
import SimpleMdeReact from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';

const AddNews = () => {
    // const [description, setDescription] = useState("");
    const [active, setActive] = useState<Number>();
    const categoryOptions = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

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

    const SubmittedForm = Yup.object().shape({
        newsTitle: Yup.string().required('Please fill the title'),
    });


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

    return (
        <>
            <h4 className="text-2xl font-semibold mb-8">Add a new news</h4>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-x-6">
                <div className="xl:col-span-3 lg:col-span-2 md:col-span-2">
                    <Formik
                        initialValues={{
                            newsTitle: '',
                        }}
                        validationSchema={SubmittedForm}
                        onSubmit={() => { }}
                    >
                        {({ errors, submitCount, touched }) => (
                            <Form className="space-y-5">
                                <div className={submitCount ? (errors.newsTitle ? 'has-error' : 'has-success') : ''}>
                                    <label htmlFor="title">Title </label>
                                    <Field name="newsTitle" type="text" id="title" placeholder="Enter News Title" className="form-input h-12" />
                                    {submitCount ? errors.newsTitle ? <div className="text-danger mt-1">{errors.newsTitle}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}

                                    <label htmlFor="desc" className=" mt-4">Description </label>
                                    <SimpleMdeReact value={value} onChange={onChange} />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6"
                                    onClick={() => {
                                        if (touched.newsTitle && !errors.newsTitle) {
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
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 border dark:border-[#888EA8] border-[#e6e6e6] rounded-md mt-6 bg-white dark:bg-[#060818] py-4 h-fit pb-8">
                    <Formik
                        initialValues={{
                            category: '',
                        }}
                        onSubmit={() => { }}
                    >
                        {({ errors, submitCount, touched }) => (
                            <Form className="space-y-5">
                                <div className={submitCount ? (errors.category ? 'has-error' : 'has-success') : ''}>
                                    <div className="mb-3 px-4">
                                        <label htmlFor="fullName">Author</label>
                                        <Select placeholder="Select an author" options={categoryOptions} />
                                    </div>

                                    {/* add tags */}
                                    <div className="border-y border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black mt-5">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB]`} onClick={() => togglePara(1)}>
                                            <span>Tags</span>
                                            <div className="flex  ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 1 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 1 ? 'auto' : 0}>
                                            <div className="p-4 pt-1 font-semibold text-white-dark">
                                                <h5 className="font-semibold text-[13px] text-black mb-1">ADD NEW TAG</h5>
                                                <Field name="tag" type="text" id="tags" placeholder="Enter tag name" className="form-input h-12 mb-2" ></Field>
                                                <span className="text-[13px]">Separate with the Enter key</span>
                                            </div>
                                        </AnimateHeight>
                                    </div>

                                    {/* news categories */}
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB]`} onClick={() => togglePara(2)}>
                                            <span>Categories</span>
                                            <div className="flex ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 2 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 2 ? 'auto' : 0}>
                                            <div className="p-4 pt-1 font-semibold text-white-dark">
                                                <label className="flex gap-2">
                                                    <Field name="Sports" type="checkbox" id="Sports" className="mb-2 h-5 w-5" />
                                                    <span>Sports</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="Politics" type="checkbox" id="Politics" className="mb-2 h-5 w-5" />
                                                    <span>Politics</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="National" type="checkbox" id="National" className="mb-2 h-5 w-5" />
                                                    <span>National</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="International" type="checkbox" id="International" className="mb-2 h-5 w-5" />
                                                    <span>International</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="Business" type="checkbox" id="Business" className="mb-2 h-5 w-5" />
                                                    <span>Business</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="Economy" type="checkbox" id="Economy" className="mb-2 h-5 w-5" />
                                                    <span>Economy</span>
                                                </label>
                                                <label className="flex gap-2">
                                                    <Field name="Science" type="checkbox" id="Science" className="mb-2 h-5 w-5" />
                                                    <span>Science</span>
                                                </label>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                    {/* featured image */}
                                    <div className="border-b border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4  font-semibold hover:bg-[#EBEBEB]`} onClick={() => togglePara(2)}>
                                            <span>Featured Image</span>
                                            <div className="flex ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 2 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 2 ? 'auto' : 0}>
                                            <div className="p-4 pt-1 font-semibold text-white-dark">
                                                <Field name="feature-img" type="file" id="feature-img" placeholder="Set featured image" className="form-input h-12 mb-2" ></Field>
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