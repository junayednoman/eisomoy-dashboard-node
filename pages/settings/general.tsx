import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Select from 'react-select';

const General = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [logoFileType, setLogoFileType] = useState(true);
    const [logoUrlType, setLogoUrlType] = useState(false);
    const scrollStatusOptions = [
        { value: 'ON', label: 'ON' },
        { value: 'Off', label: 'Off' },
    ];
    const eventNewsStatus = [
        { value: 'ON', label: 'ON' },
        { value: 'Off', label: 'Off' },
    ];
    const handleToggleImgType = () => {
        setFileType(!fileType)
        setUrlType(!urlType)
    }
    const handleToggleLogoImgType = () => {
        setLogoFileType(!logoFileType)
        setLogoUrlType(!logoUrlType)
    }
    return (
        <div>
            <h5 className="text-lg font-semibold dark:text-white-light mb-5">General Settings</h5>
            <Formik
                initialValues={{
                    categoryId: '',
                    logo: '',
                    seoSiteTitle: '',
                    metaDescription: '',
                }}
                onSubmit={() => { }}
            >
                <Form className="md:w-[460px] w-full">
                    <div className='mb-3'>
                        <label htmlFor="siteName">Site Name</label>
                        <Field className="form-input h-[42px]" type="text" id="siteName" name="siteName" placeholder="Enter Site Name" />
                    </div>

                    <div className='mb-4'>
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="logo">Logo</label>
                            <div className="flex items-center gap-2">
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
                            <Field name="logo" type="file" id="logo" placeholder="Set featured image" className="form-input h-[42px]" ></Field>
                        }
                        {
                            urlType &&
                            <Field name="logo" type="text" id="logo" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                        }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="seoSiteTitle">SEO Site Title</label>
                        <Field className="form-input h-[42px]" type="text" id="seoSiteTitle" name="seoSiteTitle" placeholder="Enter SEO Title" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="metaDescription">Meta Description</label>
                        <Field name="metaDescription" as="textarea" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-20" />
                    </div>

                    <div className='mb-4'>
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="metaImage" className="mb-1">Meta Image</label>
                            <div className="flex items-center gap-2">
                                <span>File</span>
                                <label className="relative mt-2">
                                    <input onChange={handleToggleLogoImgType} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                                <span>URL</span>
                            </div>
                        </div>

                        {
                            logoFileType &&
                            <Field name="metaImage" type="file" id="metaImage" placeholder="Set featured image" className="form-input h-[42px]" ></Field>
                        }
                        {
                            logoUrlType &&
                            <Field name="metaImage" type="text" id="metaImage" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                        }
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="scrollStatus">News Scroll Status</label>
                        <Select id='scrollStatus' placeholder="Choose..." options={scrollStatusOptions} isSearchable={false} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="eventNewsStatus">Event News Status</label>
                        <Select id='eventNewsStatus' placeholder="Choose..." options={eventNewsStatus} isSearchable={false} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary !mt-6"
                    >
                        Save Changes
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default General;