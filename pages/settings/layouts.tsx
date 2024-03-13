import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import axios from 'axios';
import Select from 'react-select';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withAuth from '@/utils/withAuth';

const validationSchema = Yup.object().shape({
    category1: Yup.string().typeError("Category must be a string"),
    category2: Yup.string().typeError("Category must be a string"),
    category3: Yup.string().typeError("Category must be a string"),
    category4: Yup.string().typeError("Category must be a string"),
    category5: Yup.string().typeError("Category must be a string"),
    category6: Yup.string().typeError("Category must be a string"),
    category7: Yup.string().typeError("Category must be a string"),
    category8: Yup.string().typeError("Category must be a string"),
    category9: Yup.string().typeError("Category must be a string"),
    category10: Yup.string().typeError("Category must be a string"),
    category11: Yup.string().typeError("Category must be a string"),
    category12: Yup.string().typeError("Category must be a string"),
    category13: Yup.string().typeError("Category must be a string"),
    category14: Yup.string().typeError("Category must be a string"),
    category15: Yup.string().typeError("Category must be a string"),
    category16: Yup.string().typeError("Category must be a string"),
    category17: Yup.string().typeError("Category must be a string"),
    category18: Yup.string().typeError("Category must be a string"),
    category19: Yup.string().typeError("Category must be a string"),
    category20: Yup.string().typeError("Category must be a string"),
    category21: Yup.string().typeError("Category must be a string")
});

const Layout = () => {

    const [loading, setLoading] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [initialValues, setInitialValues] = useState<any>({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Layout News'));
    }, [dispatch]);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    useEffect(() => {
        fetchDataAndFormdata();
    }, [initialValues]);

    const fetchDataAndFormdata = async () => {
        try {
            const [layoutResponse, categoryResponse] = await Promise.all([
                axios.get(`${apiUrl}/api/settings/get-layout`, { withCredentials: true }),
                axios.get(`${apiUrl}/api/news/all-categories`, { withCredentials: true })
            ]);

            const layoutData = layoutResponse.data;
            const categoryData = categoryResponse.data;

            console.log(layoutData);

            // Set category options
            const categoryNames = categoryData.map((category: any) => category.categoryName);
            setCategoryOptions(categoryNames);

            // Check if layoutData is empty
            if (Object.keys(layoutData).length === 0 && layoutData.constructor === Object) {
                // If layoutData is empty, set default initial values
                setInitialValues({
                category1: '',
                category2: '',
                category3: '',
                category4: '',
                category5: '',
                category6: '',
                category7: '',
                category8: '',
                category9: '',
                category10: '',
                category11: '',
                category12: '',
                category13: '',
                category14: '',
                category15: '',
                category16: '',
                category17: '',
                category18: '',
                category19: '',
                category20: '',
                category21: '',
                });
            } else {
                // Set fetched layout data as initial values
                setInitialValues(layoutData);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }

        console.log(initialValues);

    };


    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            // Make API call to add category
            const response = await axios.post(`${apiUrl}/api/settings/layout-news`, values, { withCredentials: true });
            console.log('layout news updated:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'layout news updated successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm();
            fetchDataAndFormdata();
        } catch (error: any) {
            console.error('Error updating layout news:', error);
            // Show error message from API response
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to update layout news',
                timer: 1000,
                showConfirmButton: false
            });

        }
    };



    return (
        <>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Layouts</h5>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className='md:p-8 p-5 border dark:border-gray-600 rounded-md grid md:grid-cols-2 grid-cols-1 md:gap-x-8 gap-x-6'>
                            {Object.keys(initialValues).map((fieldName, index) => (
                                <div className="mb-4" key={index}>
                                    <label htmlFor={fieldName}>Section {index + 1}</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name={fieldName}
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue(fieldName, option.value);
                                            }
                                        }}
                                        value={initialValues[fieldName]} // Set selected value from initialValues
                                    />
                                    {errors[fieldName] && touched[fieldName] && <p className="text-red-500">{String(errors[fieldName])}</p>}
                                </div>
                            ))}

                            {/* If initialValues is empty, render all fields without values */}
                            {Object.keys(initialValues).length === 0 && (
                                <>
                                    {[...Array(21)].map((_, index) => (
                                    <div className="mb-4" key={index}>
                                        <label htmlFor={`category${index + 1}`}>Section {index + 1}</label>
                                        <Select
                                            className='dark:mySelect mySelect'
                                            name={`category${index + 1}`}
                                            placeholder="Select a category"
                                            options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                            onChange={(option) => {
                                                // Check if option is not null before accessing its value
                                                if (option) {
                                                    setFieldValue(`category${index + 1}`, option.value);
                                                }
                                            }}
                                            value={initialValues[`category${index + 1}`]} // Set selected value from initialValues
                                        />
                                        {errors[`category${index + 1}`] && touched[`category${index + 1}`] && <p className="text-red-500">{String(errors[`category${index + 1}`])}</p>}
                                    </div>
                                ))}
                                </>
                            )}



                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                            >
                                Publish Now
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default withAuth(Layout);