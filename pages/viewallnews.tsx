import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../store/themeConfigSlice';
import withAuth from '../utils/withAuth';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Modal } from '@mantine/core';



const ViewAllNews = () => {
 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('All News'));
    }, [dispatch]);

    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'title',
        direction: 'asc',
    });

    const [error, setError] = useState('');
    const [deleteCategory, setDeleteCategory] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page, pageSize, sortStatus, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/news/all-news`, {
                params: {
                    page,
                    limit: pageSize,
                    sortColumn: sortStatus.columnAccessor,
                    sortOrder: sortStatus.direction,
                    search,
                },
                withCredentials: true
            });

            const { categories, totalCount } = response.data;

            setTotalCount(totalCount);
            setInitialRecords(categories);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching news data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/news/delete-news`,
                { cat_id: deleteCategory },
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setShowDeleteConfirmation(false); // Close the confirmation modal
            Swal.fire({
                icon: 'success',
                title: 'News Deleted successfully',
                timer: 1000,
                showConfirmButton: false
            });
            fetchData(); // Refetch category data after deletion
        } catch (error: any) {
            console.error('Error deleting News:', error);
            setShowDeleteConfirmation(false); // Close the confirmation modal
            setError('Failed to delete News');
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to Delete News',
                timer: 1000,
                showConfirmButton: false
            });
        }
    };

    const handleOpenDeleteConfirmation = (_id: any) => {
        setDeleteCategory(_id);
        setShowDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };


    return (
        <div>
            {loading && (
                    <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
                        <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
                            <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
                            </path>
                            <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                )}
            <div className='grid lg:grid-cols-1 grid-cols-1'>
                <div className='lg:col-span-2 col-span-1'>
                    <div className="panel mt-5">
                        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">All News</h5>
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="datatables">
                            {!loading && (
                                <DataTable
                                    className="table-hover whitespace-nowrap"
                                    records={initialRecords}
                                    columns={[
                                        {
                                            accessor: 'title',
                                            title: 'Title',
                                            sortable: true,
                                        },
                                        { 
                                            accessor: 'category', // Adjusted accessor to match the response data key
                                            title: 'Categories',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'reporter_name', // Adjusted accessor to match the response data key
                                            title: 'Reporter',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'publish_status', // Adjusted accessor to match the response data key
                                            title: 'Status',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'created_by', // Adjusted accessor to match the response data key
                                            title: 'Posted By',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'published_by', // Adjusted accessor to match the response data key
                                            title: 'Published By',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'last_modified_by', // Adjusted accessor to match the response data key
                                            title: 'Modified By',
                                            sortable: true 
                                        },
                                        {
                                            accessor: '_id',
                                            title: 'ID',
                                            sortable: true,
                                            render: (rowData) => rowData._id ? <span>{rowData._id}</span> : null, // Render the _id directly
                                        },
                                        { 
                                            accessor: 'created_datetime', // Adjusted accessor to match the response data key
                                            title: 'Post Time',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'published_datetime', // Adjusted accessor to match the response data key
                                            title: 'Published time',
                                            sortable: true 
                                        },
                                        { 
                                            accessor: 'modified_datetime', // Adjusted accessor to match the response data key
                                            title: 'Modify time',
                                            sortable: true 
                                        },
                                        
                                        {
                                            accessor: 'action',
                                            title: 'Action',
                                            titleClassName: '!text-center',
                                            render: (rowData) => (
                                                <div className="mx-auto flex w-max items-center gap-2">
                                                    <Tippy content="Edit">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
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
                                                        <svg onClick={() => handleOpenDeleteConfirmation(rowData._id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
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

                                                    <Tippy content="View">
                                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2C208 300.2 243.8 336 288 336z"/></svg>
                                                    </Tippy>
                                                </div>
                                            ),
                                        },
                                    ]}
                                    sortStatus={sortStatus}
                                    minHeight={200}
                                    withBorder={false}
                                    onSortStatusChange={(newSortStatus) => setSortStatus(newSortStatus)}
                                    page={page}
                                    onPageChange={(newPage) => setPage(newPage)}
                                    recordsPerPageOptions={PAGE_SIZES}
                                    onRecordsPerPageChange={setPageSize}
                                    recordsPerPage={pageSize}
                                    totalRecords={totalCount}
                                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                    
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            

<Modal className='dark:addUserModal' opened={showDeleteConfirmation} onClose={handleCloseDeleteConfirmation} title="Confirm Deletion">
                <p>Are you sure you want to delete this News?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={handleCloseDeleteConfirmation} className="btn btn-secondary mr-2">Cancel</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </Modal>
        </div>
    );
};

export default withAuth(ViewAllNews);
