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
    }, []);

    const fetchDataAndFormdata = async () => {
        try {
            const [layoutResponse, categoryResponse] = await Promise.all([
                axios.get(`${apiUrl}/api/settings/layout-news`, { withCredentials: true }),
                axios.get(`${apiUrl}/api/news/all-categories`, { withCredentials: true })
            ]);

            const layoutData = layoutResponse.data;
            const categoryData = categoryResponse.data;

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
    };


    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            // Make API call to add category
            const response = await axios.patch(`${apiUrl}/api/settings/layout-news`, values, { withCredentials: true });
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
                                <div className="mb-4">
                                    <label htmlFor="category">Section 1</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category1'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category1', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category1 && touched.category1 && <p className="text-red-500">{String(errors.category1)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 2</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category2'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category2', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category2 && touched.category2 && <p className="text-red-500">{String(errors.category2)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 3</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category3'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category3', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category3 && touched.category3 && <p className="text-red-500">{String(errors.category3)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 4</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category4'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category4', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category4 && touched.category4 && <p className="text-red-500">{String(errors.category4)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 5</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category5'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category5', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category5 && touched.category5 && <p className="text-red-500">{String(errors.category5)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 6</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category6'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category6', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category6 && touched.category6 && <p className="text-red-500">{String(errors.category6)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 7</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category7'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category7', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category7 && touched.category7 && <p className="text-red-500">{String(errors.category7)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 8</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category8'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category8', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category8 && touched.category8 && <p className="text-red-500">{String(errors.category8)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 9</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category9'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category9', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category9 && touched.category9 && <p className="text-red-500">{String(errors.category9)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 10</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category10'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category10', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category10 && touched.category10 && <p className="text-red-500">{String(errors.category10)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 11</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category11'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category11', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category11 && touched.category11 && <p className="text-red-500">{String(errors.category11)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 12</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category12'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category12', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category12 && touched.category12 && <p className="text-red-500">{String(errors.category12)}</p>}
                                </div>


                                <div className="mb-4">
                                    <label htmlFor="category">Section 13</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category13'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category13', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category13 && touched.category13 && <p className="text-red-500">{String(errors.category13)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 14</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category14'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category14', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category14 && touched.category14 && <p className="text-red-500">{String(errors.category14)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 15</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category15'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category15', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category15 && touched.category15 && <p className="text-red-500">{String(errors.category15)}</p>}
                                </div>


                                <div className="mb-4">
                                    <label htmlFor="category">Section 16</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category16'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category16', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category16 && touched.category16 && <p className="text-red-500">{String(errors.category16)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 17</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category17'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category17', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category17 && touched.category17 && <p className="text-red-500">{String(errors.category17)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 18</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category18'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category18', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category18 && touched.category18 && <p className="text-red-500">{String(errors.category18)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 19</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category19'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category19', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category19 && touched.category19 && <p className="text-red-500">{String(errors.category19)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 20</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category20'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category20', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category20 && touched.category20 && <p className="text-red-500">{String(errors.category20)}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category">Section 21</label>
                                    <Select
                                        className='dark:mySelect mySelect'
                                        name='category21'
                                        placeholder="Select a category"
                                        options={[{ value: '', label: 'Select One' }, ...categoryOptions.map(option => ({ value: option, label: option }))]}

                                        onChange={(option) => {
                                            // Check if option is not null before accessing its value
                                            if (option) {
                                                setFieldValue('category21', option.value);
                                            }
                                        }}
                                    />
                                    {errors.category21 && touched.category21 && <p className="text-red-500">{String(errors.category21)}</p>}
                                </div>


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