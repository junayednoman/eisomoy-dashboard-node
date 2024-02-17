import { Field, Form, Formik } from 'formik';
import React from 'react';

const eventNews = () => {
    return (
        <div className='mt-5'>
            <div className='md:p-8 p-5 border rounded-md xl:w-[800px] lg:w-[600px]'>
                <h4 className="text-2xl font-semibold mb-8">Event News</h4>
                <Formik
                    initialValues={{
                        categoryId: '',
                        scrollStatus: '',
                        newsId1: '',
                        newsId2: '',
                        newsId3: '',
                        newsId4: '',
                    }}
                    onSubmit={() => { }}
                >
                    <Form>
                        <div className='mb-4'>
                            <label htmlFor="categoryId">Category ID</label>
                            <Field className="form-input h-10" type="text" id="categoryId" name="categoryId" placeholder="Enter Category ID" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId1">News ID 1</label>
                            <Field className="form-input h-10" type="text" id="newsId1" name="newsId1" placeholder="Enter News ID" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId2">News ID 2</label>
                            <Field className="form-input h-10" type="text" id="newsId2" name="newsId2" placeholder="Enter News ID" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId3">News ID 3</label>
                            <Field className="form-input h-10" type="text" id="newsId3" name="newsId3" placeholder="Enter News ID" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newsId4">News ID 4</label>
                            <Field className="form-input h-10" type="text" id="newsId4" name="newsId4" placeholder="Enter News ID" />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                        >
                            Publish Now
                        </button>
                    </Form>
                </Formik>
            </div>
        </div >
    );
};

export default eventNews;