import { Field, Form, Formik } from "formik";

const User = () => {
    return (
        <>
            <h5 className="text-lg font-semibold dark:text-white-light mb-5">Add User</h5>
            <Formik
                initialValues={{
                    name: '',
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
                        <label htmlFor="name">Full Name</label>
                        <Field className="form-input h-10" type="text" id="name" name="name" placeholder="Enter Full Name" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary !mt-6"
                    >
                        Publish Now
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default User;