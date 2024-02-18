import Select from 'react-select';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const NewsScroll = () => {
    const scrollStatusOptions = [
        { value: 'ON', label: 'ON' },
        { value: 'Off', label: 'Off' },
    ];
    return (
        <div className='mt-5'>
            <div className='md:p-8 p-5 border rounded-md xl:w-[800px] lg:w-[600px]'>
                <h4 className="text-2xl font-semibold mb-8">News Scroll</h4>
                <Formik
                    initialValues={{
                        title: '',
                        scrollStatus: '',
                    }}
                    onSubmit={() => { }}
                >
                    <Form>
                        <div className='mb-4'>
                            <label htmlFor="title">Title</label>
                            <Field className="form-input h-10" type="text" id="title" name="title" placeholder="News Title" />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="scrollStatus">Scroll Status</label>
                            <Select className='dark:mySelect mySelect' id='scrollStatus' placeholder="Choose..." options={scrollStatusOptions} isSearchable={false} />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                        >
                            Add Now
                        </button>
                    </Form>
                </Formik>
            </div>
        </div >
    );
};

export default NewsScroll;