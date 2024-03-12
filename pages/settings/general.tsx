import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import axios from 'axios';
import Select from 'react-select';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withAuth from '@/utils/withAuth';

const validationSchema = Yup.object().shape({
    site_name: Yup.string().required('Site name is required'),
    logo_image: Yup.mixed().nullable().test('fileType', 'Invalid file type', function (value: any) {
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


const General = () => {
    const [loading, setLoading] = useState(true);
    const [isLogoFile, setLogoFileType] = useState(true);
    const [isMetaImageFile, setMetaImageFileType] = useState(true);
    const [selectedScrollStatus, setSelectedScrollStatus] = useState<any>("");
    const [selectedEventNewsStatus, setSelectedEventNewsStatus] = useState<any>("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('General Settings'));
    }, [dispatch]);

    const scrollStatusOptions = [
        { value: 'ON', label: 'ON' },
        { value: 'Off', label: 'Off' },
    ];
    const eventNewsStatus = [
        { value: 'ON', label: 'ON' },
        { value: 'Off', label: 'Off' },
    ];
    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';


    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        let logoImageName = '';
        let metaImageName = '';
        if (isLogoFile) {

            const formData = new FormData();
            formData.append('file', values.logo_image);

            try {
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Logo image uploaded successfully');
                logoImageName = response.data.fileName;
            } catch (error) {
                console.error('Error uploading logo image: ', error);
            }
        }
        else {
            logoImageName = values.logo_url;
        }


        if (isMetaImageFile) {

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
            metaImageName = values.meta_img_url;
        }

        const formDataFinal = {
            site_name: values.site_name,
            logo_image: logoImageName,
            seo_title: values.seo_site_title,
            meta_description: values.meta_description,
            meta_image: metaImageName,
            news_scroll_status: selectedScrollStatus.value,
            event_news_status: selectedEventNewsStatus.value,
        }

        try {
            // Make API call for settings
            const response = await axios.post(`${apiUrl}/api/settings/general`, formDataFinal, { withCredentials: true });
            console.log('General settings updated:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'General settings updated successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm();
            setSelectedScrollStatus("");
            setSelectedEventNewsStatus("");
        } catch (error: any) {
            console.error('Error updating general settings:', error);
            // Show error message from API response
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to update general settings',
                timer: 1000,
                showConfirmButton: false
            });

        }
    };

    return (
        <div>
            <h5 className="text-lg font-semibold dark:text-white-light mb-5">General Settings</h5>
            <Formik
                initialValues={{
                    site_name: '',
                    logo_image: '',
                    logo_url: '',
                    seo_site_title: '',
                    meta_description: '',
                    meta_image: '',
                    meta_img_url: '',
                }}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                validationSchema={validationSchema}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form className="md:w-[460px] w-full">
                        <div className='mb-3'>
                            <label htmlFor="site_name">Site Name</label>
                            <Field className="form-input h-[42px]" type="text" id="site_name" name="site_name" placeholder="Enter Site Name" />
                            {errors.site_name && touched.site_name && <p className="text-red-500">{errors.site_name}</p>}
                        </div>

                        <div className='mb-4'>
                            <div className="flex items-center justify-between gap-4">
                                <label htmlFor="logo">Logo</label>
                                <div className="flex items-center gap-2">
                                    <span>File</span>
                                    <label className="relative mt-2">
                                        <input onChange={() => setLogoFileType(!isLogoFile)} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                        <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                    </label>
                                    <span>URL</span>
                                </div>
                            </div>
                            {
                                isLogoFile ?
                                    <input name="logo_image" type="file" id="logo_image" className="form-input h-12 mb-2" onChange={(event: any) => { setFieldValue('logo_image', event.currentTarget.files[0]); }} />

                                    :
                                    <Field name="logo_url" type="text" id="logo" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                            }
                            {errors.logo_image && touched.logo_image && <p className="text-red-500">{errors.logo_image}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor="seo_site_title">SEO Site Title</label>
                            <Field className="form-input h-[42px]" type="text" id="seo_site_title" name="seo_site_title" placeholder="Enter SEO Title" />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="meta_description">Meta Description</label>
                            <Field name="meta_description" as="textarea" id="meta_description" placeholder="Enter Meta Description" className="form-input h-20" />
                        </div>

                        <div className='mb-4'>
                            <div className="flex items-center justify-between gap-4">
                                <label htmlFor="metaImage" className="mb-1">Meta Image</label>
                                <div className="flex items-center gap-2">
                                    <span>File</span>
                                    <label className="relative mt-2">
                                        <input onChange={() => setMetaImageFileType(!isMetaImageFile)} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                        <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                    </label>
                                    <span>URL</span>
                                </div>
                            </div>

                            {
                                isMetaImageFile ?
                                    <input name="meta_image" type="file" id="meta_image" className="form-input h-12 mb-2" onChange={(event: any) => { setFieldValue('meta_image', event.currentTarget.files[0]); }} />
                                    :
                                    <Field name="meta_img_url" type="text" id="metaImage" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                            }
                            {errors.meta_image && touched.meta_image && <p className="text-red-500">{errors.meta_image}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="scrollStatus">News Scroll Status</label>
                            <Select className='dark:mySelect mySelect' id='scrollStatus' placeholder="Choose..." options={scrollStatusOptions} isSearchable={false} onChange={setSelectedScrollStatus} />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="eventNewsStatus">Event News Status</label>
                            <Select className='dark:mySelect mySelect' id='eventNewsStatus' placeholder="Choose..." options={eventNewsStatus} isSearchable={false} onChange={setSelectedEventNewsStatus} />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                        >
                            Save Changes
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default withAuth(General);