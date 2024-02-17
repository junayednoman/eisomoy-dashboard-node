import { Field, Form, Formik } from "formik";

const Layouts = () => {
    return (
        <>
            <h5 className="text-xl font-semibold dark:text-white-light mb-5">Layouts</h5>
            <div>
                <Formik
                    initialValues={{
                        boxName1: '',
                        category1: '',
                    }}
                    onSubmit={() => { }}
                >
                    <Form>
                        <div className='md:p-8 p-5 border rounded-md grid md:grid-cols-2 grid-cols-1 md:gap-x-8 gap-x-6'>
                            <div className='mb-4'>
                                <label htmlFor="category1">Category 1</label>
                                <Field className="form-input h-10" type="text" id="category1" name="category1" placeholder="Enter Category ID" />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="category2">Category 2</label>
                                <Field className="form-input h-10" type="text" id="category2" name="category2" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category3">Category 3</label>
                                <Field className="form-input h-10" type="text" id="category3" name="category3" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category4">Category 4</label>
                                <Field className="form-input h-10" type="text" id="category4" name="category4" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category5">Category 5</label>
                                <Field className="form-input h-10" type="text" id="category5" name="category5" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category6">Category 6</label>
                                <Field className="form-input h-10" type="text" id="category6" name="category6" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category7">Category 7</label>
                                <Field className="form-input h-10" type="text" id="category7" name="category7" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category8">Category 8</label>
                                <Field className="form-input h-10" type="text" id="category8" name="category8" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category9">Category 9</label>
                                <Field className="form-input h-10" type="text" id="category9" name="category9" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category10">Category 10</label>
                                <Field className="form-input h-10" type="text" id="category10" name="category10" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category11">Category 11</label>
                                <Field className="form-input h-10" type="text" id="category11" name="category11" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category12">Category 12</label>
                                <Field className="form-input h-10" type="text" id="category12" name="category12" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category13">Category 13</label>
                                <Field className="form-input h-10" type="text" id="category13" name="category13" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category14">Category 14</label>
                                <Field className="form-input h-10" type="text" id="category14" name="category14" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category15">Category 15</label>
                                <Field className="form-input h-10" type="text" id="category15" name="category15" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category16">Category 16</label>
                                <Field className="form-input h-10" type="text" id="category16" name="category16" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category17">Category 17</label>
                                <Field className="form-input h-10" type="text" id="category17" name="category17" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category18">Category 18</label>
                                <Field className="form-input h-10" type="text" id="category18" name="category18" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category19">Category 19</label>
                                <Field className="form-input h-10" type="text" id="category19" name="category19" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category20">Category 20</label>
                                <Field className="form-input h-10" type="text" id="category20" name="category20" placeholder="Enter Category ID" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="category21">Category 21</label>
                                <Field className="form-input h-10" type="text" id="category21" name="category21" placeholder="Enter Category ID" />
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
        </>
    );
};

export default Layouts;