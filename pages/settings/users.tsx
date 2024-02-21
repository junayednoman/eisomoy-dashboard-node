import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import axios from 'axios';
import { Modal } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import Tippy from '@tippyjs/react';
import withAuth from '../../utils/withAuth';


const AllUsers = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/user/all-users`);

            const formattedData = response.data.map((user: any) => ({
                ...user,
                created_at: formatDateTime(user.created_at),
                updated_at: formatDateTime(user.updated_at),
            }));
            setUserData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };

    const formatDateTime = (dateTimeString: any) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post(`${apiUrl}/api/user/add`, values);
            console.log(response.data); // Log the response from the API
            setIsModalOpen(false); // Close the modal on successful submission
            fetchUserData(); // Refetch user data after adding a new user
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div>
            <div className="panel mt-5">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">Users</h5>
                    <div className="ltr:ml-auto rtl:mr-auto flex items-center gap-4">
                        <button onClick={() => setIsModalOpen(true)} type="button" className="btn btn-primary">
                            Add User
                        </button>
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="datatables">
                    {!loading && (
                        <DataTable
                            className="table-hover whitespace-nowrap"
                            records={userData}
                            columns={[
                                { accessor: 'userid', title: 'User ID', sortable: true },
                                { accessor: 'name', title: 'Name', sortable: true },
                                { accessor: 'email', title: 'Email', sortable: true },
                                { accessor: 'role', title: 'Role', sortable: true },
                                { accessor: 'display_name', title: 'Display Name', sortable: true },
                                { accessor: 'created_at', title: 'Created At', sortable: true },
                                { accessor: 'updated_at', title: 'Updated At', sortable: true },
                                {
                                    accessor: 'actions',
                                    title: 'Actions',
                                    render: (rowData) => (
                                        <div className="flex gap-2">
                                            <Tippy content="Edit">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    {/* Edit icon SVG */}
                                                </svg>
                                            </Tippy>
                                            <Tippy content="Delete">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    {/* Delete icon SVG */}
                                                </svg>
                                            </Tippy>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={userData.length}
                            minHeight={200}
                            withBorder={false} // Add the withBorder prop
                            page={1} // Add the page prop
                            onPageChange={(page) => console.log('Page changed:', page)} // Add the onPageChange prop
                            recordsPerPage={10} // Add the recordsPerPage prop
                        />
                    )}
                </div>
            </div>
            <Modal className='dark:addUserModal' opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <Formik initialValues={{ name: '', email: '', role: '', display_name: '' }} onSubmit={handleSubmit}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <Field className="form-input h-10" type="text" id="name" name="name" placeholder="Enter User Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field className="form-input h-10" type="email" id="email" name="email" placeholder="Enter User Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role">Role</label>
                            <Field as="select" className="form-select h-10" id="role" name="role">
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="reporter">Reporter</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="display_name">Display Name</label>
                            <Field
                                className="form-input h-10"
                                type="text"
                                id="display_name"
                                name="display_name"
                                placeholder="Enter Display Name"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary !mt-6">
                            Add User
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default withAuth(AllUsers);
