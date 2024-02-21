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

    useEffect(() => {
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
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 cursor-pointer"
                                            >
                                            <path
                                                d="M21 3.75001C20.999 3.718 20.998 3.68501 20.996 3.65301L20.588 1.11001C20.536 0.670006 20.117 0.361006 19.656 0.416006C19.401 0.444006 19.161 0.572006 18.989 0.783006L2.989 18.783C2.951 18.832 2.922 18.888 2.905 18.945L0.305003 23.445C0.191003 23.666 0.248003 23.932 0.440003 24.124C0.632003 24.316 0.898003 24.372 1.119 24.258L5.619 21.658C5.674 21.641 5.728 21.612 5.777 21.572L23.777 5.57201C24.026 5.34201 24.074 4.96101 23.93 4.66501C23.851 4.49301 23.723 4.25201 23.695 3.99701C23.749 3.53501 23.438 3.11601 22.997 3.06501L21 3.75001ZM3.949 20.051L2.525 21.474L4.526 19.473L5.949 18.05L3.949 20.051ZM20.287 6.78701L18.787 8.28701L15.712 5.21301L17.212 3.71301L20.287 6.78701ZM21.787 5.28701L19.787 3.28701C19.681 3.18101 19.527 3.12601 19.365 3.13901C19.202 3.15201 19.051 3.23101 18.949 3.36401L17.449 5.86401L19.951 8.36501L22.452 5.86401L21.787 5.28701Z"
                                                fill="currentColor"
                                            />
                                            </svg>
                                        </Tippy>
                                        <Tippy content="Delete">
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 cursor-pointer ml-2"
                                            >
                                            <path
                                                d="M6.1875 5.5H8.125H17.875H19.8125C20.4055 5.5 20.8882 5.96522 20.9464 6.54102L21.8179 17.541C21.8638 17.9658 21.5111 18.3349 21.0898 18.3349H2.9102C2.48888 18.3349 2.13622 17.9658 2.18208 17.541L3.05364 6.54102C3.11177 5.96522 3.59449 5.5 4.1875 5.5H6.1875ZM6.90305 20.554C6.98514 20.9897 7.38723 21.3349 7.83132 21.3349H16.1687C16.6128 21.3349 17.0149 20.9897 17.0969 20.554L17.827 11.5H6.173H5.84343L6.90305 20.554ZM9.25 8H14.75V9.5H9.25V8ZM10.8125 12.5C10.8125 12.0858 11.1483 11.75 11.5625 11.75C11.9767 11.75 12.3125 12.0858 12.3125 12.5V17.875C12.3125 18.2892 11.9767 18.625 11.5625 18.625C11.1483 18.625 10.8125 18.2892 10.8125 17.875V12.5ZM14.4375 12.5C14.4375 12.0858 14.7733 11.75 15.1875 11.75C15.6017 11.75 15.9375 12.0858 15.9375 12.5V17.875C15.9375 18.2892 15.6017 18.625 15.1875 18.625C14.7733 18.625 14.4375 18.2892 14.4375 17.875V12.5Z"
                                                fill="currentColor"
                                            />
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
                <Formik initialValues={{ name: '', email: '', role: '', display_name: '' }} onSubmit={() => { }}>
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