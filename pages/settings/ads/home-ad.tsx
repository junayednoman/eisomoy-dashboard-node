import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Select from 'react-select';

const HomeAd = () => {
    const [fileType, setFileType] = useState(true);
    const [urlType, setUrlType] = useState(false);
    const [fileType2, setFileType2] = useState(true);
    const [urlType2, setUrlType2] = useState(false);
    const [fileType3, setFileType3] = useState(true);
    const [urlType3, setUrlType3] = useState(false);
    const [fileType4, setFileType4] = useState(true);
    const [urlType4, setUrlType4] = useState(false);
    const [fileType5, setFileType5] = useState(true);
    const [urlType5, setUrlType5] = useState(false);
    const [fileType6, setFileType6] = useState(true);
    const [urlType6, setUrlType6] = useState(false);
    const [fileType7, setFileType7] = useState(true);
    const [urlType7, setUrlType7] = useState(false);
    const [fileType8, setFileType8] = useState(true);
    const [urlType8, setUrlType8] = useState(false);
    const [fileType9, setFileType9] = useState(true);
    const [urlType9, setUrlType9] = useState(false);

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
    const handleToggleImgType5 = () => {
        setFileType5(!fileType5)
        setUrlType5(!urlType5)
    }
    const handleToggleImgType6 = () => {
        setFileType6(!fileType6)
        setUrlType6(!urlType6)
    }
    const handleToggleImgType7 = () => {
        setFileType7(!fileType7)
        setUrlType7(!urlType7)
    }
    const handleToggleImgType8 = () => {
        setFileType8(!fileType8)
        setUrlType8(!urlType8)
    }
    const handleToggleImgType9 = () => {
        setFileType9(!fileType9)
        setUrlType9(!urlType9)
    }

    const adStatusOptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Hide', label: 'Hide' },
    ];

    return (
        <div>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Home Ad</h5>
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                <Form>
                    <div>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Event Ad 1</h5>
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
                                    <Select name="status" id='status' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Event Ad 2</h5>
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
                                    <Select name="status2" id='status2' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 3</h5>
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
                                    <label htmlFor="status3">Ad Status</label>
                                    <Select name="status3" id='status3' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 4</h5>
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
                                    <label htmlFor="status4">Ad Status</label>
                                    <Select name="status4" id='status4' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 5</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image5">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType5} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType5 &&
                                        <Field name="image5" type="file" id="image5" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType5 &&
                                        <Field name="image5" type="text" id="image5" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link5">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link5" name="link5" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status5">Ad Status</label>
                                    <Select name="status5" id='status5' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 6</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image6">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType6} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType6 &&
                                        <Field name="image6" type="file" id="image6" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType6 &&
                                        <Field name="image6" type="text" id="image6" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link6">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link6" name="link6" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status6">Ad Status</label>
                                    <Select name="status6" id='status6' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 7</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image7">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType7} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType7 &&
                                        <Field name="image7" type="file" id="image7" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType7 &&
                                        <Field name="image7" type="text" id="image7" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link7">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link7" name="link7" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status7">Ad Status</label>
                                    <Select name="status7" id='status7' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 8</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image8">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType8} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType8 &&
                                        <Field name="image8" type="file" id="image8" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType8 &&
                                        <Field name="image8" type="text" id="image8" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link8">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link8" name="link8" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status8">Ad Status</label>
                                    <Select name="status8" id='status8' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
                                </div>
                            </div>

                            <div className="md:p-8 p-5 border rounded-md">
                                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Home Ad 9</h5>
                                <div className='mb-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="image9">Image</label>
                                        <div className="flex items-center gap-2">
                                            <span>File</span>
                                            <label className="relative mt-2">
                                                <input onChange={handleToggleImgType9} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                            <span>URL</span>
                                        </div>
                                    </div>

                                    {
                                        fileType9 &&
                                        <Field name="image9" type="file" id="image9" className="form-input h-[42px]" ></Field>
                                    }
                                    {
                                        urlType9 &&
                                        <Field name="image9" type="text" id="image9" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="link9">External Link</label>
                                    <Field className="form-input h-[42px]" type="text" id="link9" name="link9" placeholder="Enter External Link" />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="status9">Ad Status</label>
                                    <Select name="status9" id='status9' placeholder="Choose..." options={adStatusOptions} isSearchable={false} />
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
            </Formik>
        </div>
    );
};

export default HomeAd;