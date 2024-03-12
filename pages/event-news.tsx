import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import axios from 'axios';
import Select from 'react-select';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    newsId1: Yup.string().required('newsId1 is required'),
    newsId2: Yup.string().required('newsId2 is required'),
    newsId3: Yup.string().required('newsId3 is required'),
    newsId4: Yup.string().required('newsId4 is required'),
});


const eventNews = () => {

    const [loading, setLoading] = useState(true);
    const [parentOptions, setParentOptions] = useState<string[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Event News'));
    }, [dispatch]);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/news/all-categories`, {
                withCredentials: true
            });
    
            const categoryData = response.data;

            // Extract category names for parent field options
            const categoryNames = categoryData.map((category: any) => category.categoryName);
            //console.log('Category names:', categoryNames);
            setParentOptions(categoryNames);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching category data:', error);
            setLoading(false);
        }
    };


    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            // Make API call to add category
            const response = await axios.post(`${apiUrl}/api/news/event-news`, values, { withCredentials: true });
            console.log('Event news updated:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Event news updated successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm();
            fetchData();
        } catch (error: any) {
            console.error('Error updating event news:', error);
            // Show error message from API response
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to update event news',
                timer: 1000,
                showConfirmButton: false
            });
            
        }
    };



    return (
        <div className='mt-5'>
            <div className='md:p-8 p-5 border rounded-md xl:w-[800px] lg:w-[600px]'>
                <h4 className="text-2xl font-semibold mb-8">Event News</h4>
                <Formik
                    initialValues={{
                        category: '',
                        newsId1: '',
                        newsId2: '',
                        newsId3: '',
                        newsId4: '',
                    }}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched, setFieldValue }) => (
                    <Form>
                    <div className="mt-3 px-4 mb-5">
                                        <label htmlFor="category">Choose Category</label>
                                        
                                        <Select
                                            className='dark:mySelect mySelect'
                                            name='category'
                                            placeholder="Select a category"
                                            options={[{ value: '', label: 'Select One' }, ...parentOptions.map(option => ({ value: option, label: option }))]}

                                            onChange={(option) => {
                                                // Check if option is not null before accessing its value
                                                if (option) {
                                                    setFieldValue('category', option.value);
                                                }
                                            }}
                                        />
                                        {errors.category && touched.category && <p className="text-red-500">{errors.category}</p>}
                                    </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId1">News 1</label>
                            <Field className="form-input h-10" type="text" id="newsId1" name="newsId1" placeholder="Enter News ID" />
                            {errors.newsId1 && touched.newsId1 && <p className="text-red-500">{errors.newsId1}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId2">News 2</label>
                            <Field className="form-input h-10" type="text" id="newsId2" name="newsId2" placeholder="Enter News ID" />
                            {errors.newsId2 && touched.newsId2 && <p className="text-red-500">{errors.newsId2}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId3">News 3</label>
                            <Field className="form-input h-10" type="text" id="newsId3" name="newsId3" placeholder="Enter News ID" />
                            {errors.newsId3 && touched.newsId3 && <p className="text-red-500">{errors.newsId3}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId4">News 4</label>
                            <Field className="form-input h-10" type="text" id="newsId4" name="newsId4" placeholder="Enter News ID" />
                            {errors.newsId4 && touched.newsId4 && <p className="text-red-500">{errors.newsId4}</p>}
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
        </div >
    );
};

export default eventNews;