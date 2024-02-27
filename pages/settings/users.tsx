import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import axios from 'axios';
import { Modal } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import Tippy from '@tippyjs/react';
import withAuth from '../../utils/withAuth';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    role: Yup.string().required('Role is required'),
    display_name: Yup.string().required('Display Name is required'),
});

const updateUserValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().test('password', 'Password must be at least 8 characters', function (value) {
        if (value && value.length > 0) {
            return value.length >= 8;
        }
        return true; // No validation when password is empty
    }),
    role: Yup.string().required('Role is required'),
    display_name: Yup.string().required('Display Name is required'),
});

const AllUsers = () => {
    const [userData, setUserData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'userid',
        direction: 'asc',
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [userDataToUpdate, setUserDataToUpdate] = useState<any>(null);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Manage Users'));
    }, [dispatch]);

    useEffect(() => {
        fetchUserData();
    }, [page, pageSize, sortStatus, search]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/user/all-users`, {
                withCredentials: true
            });

            const formattedData = response.data.map((user: any) => ({
                ...user,
                created_at: formatDateTime(user.created_at),
                updated_at: formatDateTime(user.updated_at),
            }));

            // Apply search filter
            const filteredData = formattedData.filter((item: { [key: string]: any }) =>
            Object.values(item).some((val: any) => typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase()))
            );

            // Apply sorting
            const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
            if (sortStatus.direction === 'desc') {
                sortedData.reverse();
            }

            // Apply pagination
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            const paginatedData = sortedData.slice(from, to);

            setUserData(paginatedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset page when search changes
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

    const handleAdd = async (values: any) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/user/add`,
                values,
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setIsModalOpen(false); // Close the modal on successful submission
            fetchUserData(); // Refetch user data after adding a new user
        } catch (error: any) {
            console.error('Error adding user:', error);
            if (error.response) {
                setError(error.response.data.message || 'Server Error');
            } else {
                setError('Something Went Wrong!');
            }
        }
    };

    const handleUpdate = async (values: any) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/user/update`,
                values,
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setIsUpdateModalOpen(false); // Close the modal on successful update
            fetchUserData(); // Refetch user data after updating
        } catch (error: any) {
            console.error('Error updating user:', error);
            if (error.response) {
                setError(error.response.data.message || 'Server Error');
            } else {
                setError('Something Went Wrong!');
            }
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/user/delete`,
                { userId: deleteUserId },
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setShowDeleteConfirmation(false); // Close the confirmation modal
            fetchUserData(); // Refetch user data after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            setShowDeleteConfirmation(false); // Close the confirmation modal
            setError('Failed to delete user');
        }
    };

    const handleOpenDeleteConfirmation = (userId: any) => {
        setDeleteUserId(userId);
        setShowDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const handleOpenUpdateModal = (userData: any) => {
        setUserDataToUpdate(userData);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUserDataToUpdate(null);
        setIsUpdateModalOpen(false);
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
                                                <svg onClick={() => handleOpenUpdateModal(rowData)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    <path
                                                        d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                    />
                                                    <path
                                                        opacity="0.5"
                                                        d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                            </Tippy>
                                            <Tippy content="Delete">
                                                <svg onClick={() => handleOpenDeleteConfirmation(rowData.userid)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    <path
                                                        opacity="0.5"
                                                        d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    />
                                                    <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path
                                                        d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    />
                                                    <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </Tippy>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={userData.length}
                            minHeight={200}
                            withBorder={false} // Add the withBorder prop
                            page={page} // Add the page prop
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            recordsPerPage={pageSize} // Add the recordsPerPage prop
                            sortStatus={sortStatus} // Add the sortStatus prop
                            onSortStatusChange={(newSortStatus) => setSortStatus(newSortStatus)} // Add the onSortChange prop
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    )}
                </div>
            </div>
            <Modal
                className='dark:addUserModal'
                opened={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setError(''); // Reset error state
                }}
                title="Add New User"
            >
            <Formik initialValues={{ name: '', email: '', password: '', role: '', display_name: '' }} onSubmit={handleAdd} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <Field className="form-input h-10" type="text" id="name" name="name" placeholder="Enter User Name" />
                            {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field className="form-input h-10" type="email" id="email" name="email" placeholder="Enter User Email" />
                            {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <Field className="form-input h-10" type="password" id="password" name="password" placeholder="Enter Password" />
                            {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role">Role</label>
                            <Field as="select" className="form-select h-10" id="role" name="role">
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="reporter">Reporter</option>
                            </Field>
                            {errors.role && touched.role && <p className="text-red-500">{errors.role}</p>}
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
                            {errors.display_name && touched.display_name && <p className="text-red-500">{errors.display_name}</p>}
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <button type="submit" className="btn btn-primary !mt-6">
                            Add User
                        </button>
                    </Form>
                )}
            </Formik>
            </Modal>
            <Modal className='dark:addUserModal' opened={showDeleteConfirmation} onClose={handleCloseDeleteConfirmation} title="Confirm Deletion">
                <p>Are you sure you want to delete this user?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={handleCloseDeleteConfirmation} className="btn btn-secondary mr-2">Cancel</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </Modal>

            {userDataToUpdate && (
    <Modal
        className='dark:updateUserModal'
        opened={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title="Update User"
    >
        <Formik initialValues={{ ...userDataToUpdate }} onSubmit={handleUpdate} validationSchema={updateUserValidationSchema}>
            {({ errors, touched }) => (
                <Form>
                    <input type="hidden" name="userid" id="userid" value={userDataToUpdate.userid} /> {/* Hidden input for userId */}

                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <Field className="form-input h-10" type="text" id="name" name="name" placeholder="Enter User Name" />
                        {errors.name && touched.name && <p className="text-red-500">{errors.name as string}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <Field className="form-input h-10" type="email" id="email" name="email" placeholder="Enter User Email" />
                        {errors.email && touched.email && <p className="text-red-500">{errors.email as string}</p>}
                    </div>
                    <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <Field className="form-input h-10" type="password" id="password" name="password" placeholder="Enter Password" />
                            {errors.password && touched.password && <p className="text-red-500">{errors.password as string}</p>}
                        </div>
                    <div className="mb-3">
                        <label htmlFor="role">Role</label>
                        <Field as="select" className="form-select h-10" id="role" name="role">
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="reporter">Reporter</option>
                        </Field>
                        {errors.role && touched.role && <p className="text-red-500">{errors.role as string}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="display_name">Display Name</label>
                        <Field className="form-input h-10" type="text" id="display_name" name="display_name" placeholder="Enter Display Name" />
                        {errors.display_name && touched.display_name && <p className="text-red-500">{errors.display_name as string}</p>}
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="btn btn-primary !mt-6">
                        Update User
                    </button>
                </Form>
            )}
        </Formik>
    </Modal>
)}

        </div>
    );
};

export default withAuth(AllUsers);
