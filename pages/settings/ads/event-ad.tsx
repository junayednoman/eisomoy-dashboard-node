import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';

const EventAd = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [fileType2, setFileType2] = useState(true);
    const [urlType2, setUrlType2] = useState(false);

    const handleToggleImgType = () => {
        setFileType(!fileType)
        setUrlType(!urlType)
    }
    const handleToggleImgType2 = () => {
        setFileType2(!fileType2)
        setUrlType2(!urlType2)
    }
    const adStatusOptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Hide', label: 'Hide' },
    ];
    return (
        <>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Event Ad</h5>
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                <Form>
                    <div>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 1</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image">Image</label>
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
                                        <Field name="image" type="file" id="image" placeholder="Set featured image" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType &&
                                        <Field name="image" type="text" id="image" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link" name="link" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status">Ad Status</label>
                                    <Select  className='dark:mySelect mySelect'  name="status" id='status' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 2</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image2">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType2} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType2 &&
                                        <Field name="image2" type="file" id="image2" placeholder="Set featured image2" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType2 &&
                                        <Field name="image2" type="text" id="image2" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link2">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link2" name="link2" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status2">Ad Status</label>
                                    <Select  className='dark:mySelect mySelect' name="status2" id='status2' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                        >
                            Publish Now
                        </button>
                    </div>
                </Form>
            </Formik >
        </>
    );
};

export default EventAd;