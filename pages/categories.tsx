import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import AnimateHeight from 'react-animate-height';
import axios from 'axios';

const Categories = () => {
    const [active, setActive] = useState<Number>();
    const categoryOptions = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('News Categories'));
    }, [dispatch]);

    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    useEffect(() => {
        fetchData();
    }, [page, pageSize, sortStatus, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/news/all-categories`, {
                withCredentials: true
            });
    
            const categoryData = response.data;
    
            // Apply search filter
            const filteredData = categoryData.filter((item: { [key: string]: any }) =>
                Object.values(item).some((val) => typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase()))
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
    
            setInitialRecords(paginatedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
    

    const submitForm = () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Form submitted successfully',
            padding: '10px 20px',
        });
    };
    
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

    return (
        <div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-6'>
                <div className='lg:col-span-1 col-span-1 border border-[#e6e6e6] dark:border-0 rounded-md mt-5 py-4 shadow-sm bg-white dark:bg-[#0E1726] h-fit'>
                    <Formik
                        initialValues={{
                            categoryName: '',
                            description: '',
                            slug: '',
                            parent: '',
                        }}
                        onSubmit={() => { }}
                    >
                        {({ errors, submitCount, touched }) => (
                            <Form className="space-y-5">
                                <div>
                                    <div className='px-4'>
                                        <label htmlFor="title">Title </label>
                                        <Field name="categoryName" type="text" id="title" placeholder="Enter Category Name" className="form-input h-10" />
                                    </div>
                                    <div className='mt-3 px-4'>
                                        <label htmlFor="slug">Slug</label>
                                        <Field name="slug" type="text" id="slug" placeholder="Enter Category Slug" className="form-input h-10" />
                                    </div>
                                    <div className="mt-3 px-4 mb-5">
                                        <label htmlFor="parent">Parent</label>
                                        <Select className='dark:mySelect mySelect' name='parent' placeholder="Select a parent" options={categoryOptions} />
                                    </div>
                                    <div className="border-y border-[#ebedf2] bg-white dark:border-[#191e3a] dark:bg-black">
                                        <div className={`flex cursor-pointer p-4 font-semibold hover:bg-[#EBEBEB] dark:bg-[#0E1726] dark:hover:bg-[#0E1726] ${active === 1 && 'bg-[#EBEBEB]'}`} onClick={() => togglePara(1)}>
                                            <span>SEO</span>
                                            <div className="flex  ltr:ml-auto rtl:mr-auto">
                                                <svg className={`h-5 w-5 ${active === 1 ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={50} height={active === 1 ? 'auto' : 0}>
                                            <div className="p-4 pt-3 font-semibold">
                                                <div>
                                                    <label htmlFor="metaTitle">Meta Title</label>
                                                    <Field name="metaTitle" type="text" id="metaTitle" placeholder="Enter Meta Title" className="form-input h-10" />
                                                </div>
                                                <div className='mt-3'>
                                                    <label htmlFor="metaDescription">Meta Description</label>
                                                    <Field name="metaDescription" as="textarea" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-24" />
                                                </div>
                                                <div className='mt-3'>
                                                    <label htmlFor="focusKeyword">Focus Keyword</label>
                                                    <Field name="focusKeyword" type="text" id="focusKeyword" placeholder="Enter Focus Keyword" className="form-input h-10" />
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6 mx-4"
                                    onClick={() => {
                                        if (touched.categoryName && !errors.categoryName) {
                                            submitForm();
                                        }
                                    }}
                                >
                                    Add Now
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='lg:col-span-2 col-span-1'>
                    <div className="panel mt-5">
                        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">News Categories</h5>
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
                                            accessor: 'name',
                                            title: 'Name',
                                            sortable: true,
                                        },
                                        {
                                            accessor: 'parent',
                                            title: 'Parent',
                                            sortable: true,
                                        },
                                        { 
                                            accessor: 'news_count', // Adjusted accessor to match the response data key
                                            title: 'News Count',
                                            sortable: true 
                                        },
                                        {
                                            accessor: 'action',
                                            title: 'Action',
                                            titleClassName: '!text-center',
                                            render: () => (
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
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
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
                                    totalRecords={initialRecords.length}
                                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                    
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
