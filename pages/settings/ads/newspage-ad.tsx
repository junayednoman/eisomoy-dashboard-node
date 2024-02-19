import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';

const NewsPageAd = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [fileType2, setFileType2] = useState(true);
    const [urlType2, setUrlType2] = useState(false);
    const [fileType3, setFileType3] = useState(true);
    const [urlType3, setUrlType3] = useState(false);
    const [fileType4, setFileType4] = useState(true);
    const [urlType4, setUrlType4] = useState(false);

    const handleToggleImgType = () => {
        setFileType(!fileType)
        setUrlType(!urlType)
    }
    const handleToggleImgType2 = () => {
        setFileType2(!fileType2)
        setUrlType2(!urlType2)
    }
    const handleToggleImgType3 = () => {
        setFileType3(!fileType3)
        setUrlType3(!urlType3)
    }
    const handleToggleImgType4 = () => {
        setFileType4(!fileType4)
        setUrlType4(!urlType4)
    }
    const adStatusOptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Hide', label: 'Hide' },
    ];
    return (
        <>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">News Page Ad</h5>
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                <Form>
                    <div>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">News Page Ad 1</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image">Image</label><div className=""></div>
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
                                        <Field name="image" type="file" id="image" className="form-input h-[42px]" ></Field>
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
                                    <Select className='dark:mySelect mySelect' name="status" id='status' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">News Page Ad 2</h5>
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
                                        <Field name="image2" type="file" id="image2" className="form-input h-[42px]" ></Field>
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
                                    <Select className='dark:mySelect mySelect' name="status2" id='status2' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">News Page Ad 3</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image3">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType3} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType3 &&
                                        <Field name="image3" type="file" id="image3" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType3 &&
                                        <Field name="image3" type="text" id="image3" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link3">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link3" name="link3" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status2">Ad Status</label>
                                    <Select className='dark:mySelect mySelect' name="status2" id='status2' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">News Page Ad 4</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image4">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType4} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType4 &&
                                        <Field name="image4" type="file" id="image4" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType4 &&
                                        <Field name="image4" type="text" id="image4" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link4">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link4" name="link4" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status2">Ad Status</label>
                                    <Select className='dark:mySelect mySelect' name="status2" id='status2' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
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

export default NewsPageAd;