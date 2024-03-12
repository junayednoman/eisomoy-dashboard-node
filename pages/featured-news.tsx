import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withAuth from '@/utils/withAuth';

const validationSchema = Yup.object().shape({
    newsId1: Yup.string().required('newsId1 is required'),
    newsId2: Yup.string().required('newsId2 is required'),
    newsId3: Yup.string().required('newsId3 is required'),
    newsId4: Yup.string().required('newsId4 is required'),
    newsId5: Yup.string().required('newsId5 is required'),
    newsId6: Yup.string().required('newsId6 is required'),
    newsId7: Yup.string().required('newsId7 is required'),
    newsId8: Yup.string().required('newsId8 is required'),
    newsId9: Yup.string().required('newsId9 is required'),
    newsId10: Yup.string().required('newsId10 is required'),
    newsId11: Yup.string().required('newsId11 is required'),
    newsId12: Yup.string().required('newsId12 is required'),
});


const FeaturedNews = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Featured News'));
    }, [dispatch]);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            // Make API call to add featured news
            const response = await axios.post(`${apiUrl}/api/news/featured-news`, values, { withCredentials: true });
            console.log('Featured news updated:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Featured news updated successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm();
        } catch (error: any) {
            console.error('Error updating featured news:', error);
            // Show error message from API response
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to update featured news',
                timer: 1000,
                showConfirmButton: false
            });

        }
    };



    return (
        <div className='mt-5'>
            <div className='md:p-8 p-5 border rounded-md'>
                <h4 className="text-2xl font-semibold mb-8">Featured News</h4>
                <Formik
                    initialValues={{
                        newsId1: '',
                        newsId2: '',
                        newsId3: '',
                        newsId4: '',
                        newsId5: '',
                        newsId6: '',
                        newsId7: '',
                        newsId8: '',
                        newsId9: '',
                        newsId10: '',
                        newsId11: '',
                        newsId12: '',
                    }}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-x-6'>
                                <div className='mb-4'>
                                    <label htmlFor="newsId1">News ID 1</label>
                                    <Field className="form-input h-10" type="text" id="newsId1" name="newsId1" placeholder="Enter News ID" />
                                    {errors.newsId1 && touched.newsId1 && <p className="text-red-500 mt-1">{errors.newsId1}</p>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="newsId2">News ID 2</label>
                                    <Field className="form-input h-10" type="text" id="newsId2" name="newsId2" placeholder="Enter News ID" />
                                    {errors.newsId2 && touched.newsId2 && <p className="text-red-500 mt-1">{errors.newsId2}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId3">News ID 3</label>
                                    <Field className="form-input h-10" type="text" id="newsId3" name="newsId3" placeholder="Enter News ID" />
                                    {errors.newsId3 && touched.newsId3 && <p className="text-red-500 mt-1">{errors.newsId3}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId4">News ID 4</label>
                                    <Field className="form-input h-10" type="text" id="newsId4" name="newsId4" placeholder="Enter News ID" />
                                    {errors.newsId4 && touched.newsId4 && <p className="text-red-500 mt-1">{errors.newsId4}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId5">News ID 5</label>
                                    <Field className="form-input h-10" type="text" id="newsId5" name="newsId5" placeholder="Enter News ID" />
                                    {errors.newsId5 && touched.newsId5 && <p className="text-red-500 mt-1">{errors.newsId5}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId6">News ID 6</label>
                                    <Field className="form-input h-10" type="text" id="newsId6" name="newsId6" placeholder="Enter News ID" />
                                    {errors.newsId6 && touched.newsId6 && <p className="text-red-500 mt-1">{errors.newsId6}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId7">News ID 7</label>
                                    <Field className="form-input h-10" type="text" id="newsId7" name="newsId7" placeholder="Enter News ID" />
                                    {errors.newsId7 && touched.newsId7 && <p className="text-red-500 mt-1">{errors.newsId7}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId8">News ID 8</label>
                                    <Field className="form-input h-10" type="text" id="newsId8" name="newsId8" placeholder="Enter News ID" />
                                    {errors.newsId8 && touched.newsId8 && <p className="text-red-500 mt-1">{errors.newsId8}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId9">News ID 9</label>
                                    <Field className="form-input h-10" type="text" id="newsId9" name="newsId9" placeholder="Enter News ID" />
                                    {errors.newsId9 && touched.newsId9 && <p className="text-red-500 mt-1">{errors.newsId9}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId10">News ID 10</label>
                                    <Field className="form-input h-10" type="text" id="newsId10" name="newsId10" placeholder="Enter News ID" />
                                    {errors.newsId10 && touched.newsId10 && <p className="text-red-500 mt-1">{errors.newsId10}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId11">News ID 11</label>
                                    <Field className="form-input h-11" type="text" id="newsId11" name="newsId11" placeholder="Enter News ID" />
                                    {errors.newsId11 && touched.newsId11 && <p className="text-red-500 mt-1">{errors.newsId11}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="newsId12">News ID 12</label>
                                    <Field className="form-input h-12" type="text" id="newsId12" name="newsId12" placeholder="Enter News ID" />
                                    {errors.newsId12 && touched.newsId12 && <p className="text-red-500 mt-1">{errors.newsId12}</p>}
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
        </div >
    );
};

export default withAuth(FeaturedNews);