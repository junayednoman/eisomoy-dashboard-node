import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Select from 'react-select';

const CategoryPageAd = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);

    const handleToggleImgType = () => {
        setFileType(!fileType)
        setUrlType(!urlType)
    }

    const adStatusOptions = [
        { value: 'show', label: 'Show' },
        { value: 'hide', label: 'Hide' },
    ];

    return (
        <div>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Category Page Ad</h5>
            <Formik
                initialValues={{
                    image: '',
                    link: '',
                    status: '',
                }}
                onSubmit={() => { }}
            >
                <Form>
                    <div className="xl:w-1/2 lg:w-[500px] w-full">
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
                            <Select className='dark:mySelect mySelect' name="status" id='status' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                        >
                            Publish Now
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CategoryPageAd;