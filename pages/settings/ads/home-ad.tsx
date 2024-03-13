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
    image: Yup.mixed().nullable().test('fileType', 'Invalid file type', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const fileExtension = value.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    }).test('fileSize', 'File size must be less than 3MB', function (value: any) {
        if (!value) return true; // No file selected, skip validation
        return value.size <= 3 * 1024 * 1024; // 3MB in bytes
    })
});


const HomeAd = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isImageFile, setImageFileType] = useState<boolean>(true);
    const [selectedAdStatus, setSelectedAdStatus] = useState<any>("");
    const [selectedAdNumber, setSelectedAdNumber] = useState<any>("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home Page Ad'));
    }, [dispatch]);

    const adStatusOptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Hide', label: 'Hide' },
    ];
    const adNumberOptions = [
        { value: 'Home Ad 1', label: 'Home Ad 1' },
        { value: 'Home Ad 2', label: 'Home Ad 2' },
        { value: 'Home Ad 3', label: 'Home Ad 3' },
        { value: 'Home Ad 4', label: 'Home Ad 4' },
        { value: 'Home Ad 5', label: 'Home Ad 5' },
        { value: 'Home Ad 6', label: 'Home Ad 6' },
        { value: 'Home Ad 7', label: 'Home Ad 7' },
        { value: 'Home Ad 8', label: 'Home Ad 8' },
        { value: 'Home Ad 9', label: 'Home Ad 9' },
    ];

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';


    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        let imageName = '';
        if (isImageFile) {

            const formData = new FormData();
            formData.append('file', values.image);

            try {
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Image uploaded successfully');
                imageName = response.data.fileName;
            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
        else {
            imageName = values.img_url;
        }
        const formDataFinal = {
            ad_number: selectedAdNumber.value,
            image: imageName,
            link: values.link,
            status: selectedAdStatus.value
        }
        console.log(formDataFinal);

        // try {
        //     // Make API call for settings
        //     const response = await axios.post(`${apiUrl}/api/settings/general`, formDataFinal, { withCredentials: true });
        //     console.log('General settings updated:', response.data);
        //     // Show success message
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'General settings updated successfully',
        //         timer: 1000,
        //         showConfirmButton: false
        //     });
        //     resetForm();
        //     setSelectedAdStatus("");
        // } catch (error: any) {
        //     console.error('Error updating general settings:', error);
        //     // Show error message from API response
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops... Something went wrong!',
        //         text: error.response?.data?.message || 'Failed to update general settings',
        //         timer: 1000,
        //         showConfirmButton: false
        //     });

        // }
    };

    return (
        <div>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Home Page Ad</h5>
            <Formik
                initialValues={{
                    image: '',
                    img_url: '',
                    link: '',
                    status: '',
                    ad_number: '',
                }}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                validationSchema={validationSchema}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                        <div className="xl:w-1/2 lg:w-[500px] w-full">
                            <div className='mb-4'>
                                <label htmlFor="ad_number">Ad Number</label>
                                <Select className='dark:mySelect mySelect' name="ad_number" id='ad_number' placeholder="Select Ad Number" options={adNumberOptions} onChange={setSelectedAdNumber} isSearchable={true} />
                            </div>
                            <div className='mb-4'>
                                <div className="flex items-center justify-between gap-4">
                                    <label htmlFor="image">Image</label>
                                    <div className="flex items-center gap-2">
                                        <span>File</span>
                                        <label className="relative mt-2">
                                            <input onChange={() => setImageFileType(!isImageFile)} type="checkbox" className="custom_switch absolute w-[35px] h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="w-[35px] outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-[18px] rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-[11px] before:h-[11px] before:rounded-full peer-checked:before:left-5 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                        <span>URL</span>
                                    </div>
                                </div>

                                {
                                    isImageFile ?
                                        <input name="image" type="file" id="image" className="form-input h-12 mb-2" onChange={(event: any) => { setFieldValue('image', event.currentTarget.files[0]); }} />
                                        :
                                        <Field name="img_url" type="text" id="image" placeholder="Enter Image URL" className="form-input h-[42px]" ></Field>
                                }
                                {errors.image && touched.image && <p className="text-red-500">{errors.image}</p>}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="link">External Link</label>
                                <Field className="form-input h-[42px]" type="text" id="link" name="link" placeholder="Enter External Link" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="status">Ad Status</label>
                                <Select className='dark:mySelect mySelect' name="status" id='status' placeholder="Choose..." options={adStatusOptions} onChange={setSelectedAdStatus} isSearchable={false} />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                            >
                                Update
                            </button>
                        </div>
                    </Form>)}
            </Formik>
        </div>
    );
};

export default withAuth(HomeAd);