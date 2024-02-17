import { Field, Form, Formik } from 'formik';
import React from 'react';

const featuredNews = () => {
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
                    onSubmit={() => { }}
                >
                    <Form>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-6'>
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
                            <div className='mb-4'>
                                <label htmlFor="newsId5">News ID 5</label>
                                <Field className="form-input h-10" type="text" id="newsId5" name="newsId5" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId6">News ID 6</label>
                                <Field className="form-input h-10" type="text" id="newsId6" name="newsId6" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId7">News ID 7</label>
                                <Field className="form-input h-10" type="text" id="newsId7" name="newsId7" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId8">News ID 8</label>
                                <Field className="form-input h-10" type="text" id="newsId8" name="newsId8" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId9">News ID 9</label>
                                <Field className="form-input h-10" type="text" id="newsId9" name="newsId9" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId10">News ID 10</label>
                                <Field className="form-input h-10" type="text" id="newsId10" name="newsId10" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId11">News ID 11</label>
                                <Field className="form-input h-11" type="text" id="newsId11" name="newsId11" placeholder="Enter News ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="newsId12">News ID 12</label>
                                <Field className="form-input h-12" type="text" id="newsId12" name="newsId12" placeholder="Enter News ID" />
                            </div>
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

export default featuredNews;