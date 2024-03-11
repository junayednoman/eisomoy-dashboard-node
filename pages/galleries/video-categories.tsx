import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import withAuth from '../../utils/withAuth';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik, useFormikContext } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import AnimateHeight from 'react-animate-height';
import axios from 'axios';
import * as Yup from 'yup';
import { Modal } from '@mantine/core';

const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Title is required'),
    slug: Yup.string().required('Slug is required'),
    metaTitle: Yup.string().required('Meta Title is required'),
    metaDescription: Yup.string().required('Meta Description is required'),
    focusKeyword: Yup.string().required('Focus Keyword is required'),
});



const Categories = () => {
    const [active, setActive] = useState<Number>();
    const [parentOptions, setParentOptions] = useState<string[]>([]);

    const myformik = useFormikContext(); // Access Formik context

    const [categoryName, setCategoryName] = useState('');
    const [slug, setSlug] = useState('');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Photo Categories'));
    }, [dispatch]);

    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [allCategoryData, setAllCategoryData] = useState<any[]>([]);
    const [categoryDataToUpdate, setCategoryDataToUpdate] = useState<any>(null);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'categoryName',
        direction: 'asc',
    });

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [deleteCategory, setDeleteCategory] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page, pageSize, sortStatus, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/video/all-categories`, {
                withCredentials: true
            });
    
            const categoryData = response.data;
            setAllCategoryData(categoryData);
    
            // Apply search filter

            //console.log('Category data:', categoryData);
            
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

            // Extract category names for parent field options
            const categoryNames = categoryData.map((category: any) => category.categoryName);
            //console.log('Category names:', categoryNames);
            setParentOptions(categoryNames);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching category data:', error);
            setLoading(false);
        }
    };
    

    // Form submit handler
    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            // Make API call to add category
            const response = await axios.post(`${apiUrl}/api/video/add-category`, values, { withCredentials: true });
            console.log('Category added:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Category added successfully',
                timer: 1000,
                showConfirmButton: false
            });
            resetForm();
            setCategoryName('');
            setSlug('');
            setIsSlugManuallyEdited(false);
            fetchData();
        } catch (error: any) {
            console.error('Error adding category:', error);
            // Show error message from API response
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to add category',
                timer: 1000,
                showConfirmButton: false
            });
            
        }
    };


    const handleCategoryNameChange = (e: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const name = e.target.value;
        setCategoryName(name);
        const formattedSlug = isSlugManuallyEdited ? slug : name.toLowerCase().replace(/\s+/g, '-');
        setSlug(formattedSlug);
        
        // Update Formik's state
        setFieldValue('categoryName', name);
        if (!isSlugManuallyEdited) {
            setFieldValue('slug', formattedSlug);
        }
    };
    
    const handleSlugChange = (e: any) => {
        const newSlug = e.target.value;
        setSlug(newSlug);
        setIsSlugManuallyEdited(true);
    };

    
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

    const handleUpdate = async (values: any) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/video/category-update`,
                values,
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setIsUpdateModalOpen(false); // Close the modal on successful update
            Swal.fire({
                icon: 'success',
                title: 'Category Updated successfully',
                timer: 1000,
                showConfirmButton: false
            });
            fetchData(); // Refetch category data after updating
        } catch (error: any) {
            console.error('Error updating user:', error);
            if (error.response) {
                setError(error.response.data.message || 'Server Error');
            } else {
                setError('Something Went Wrong!');
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to Update category',
                timer: 1000,
                showConfirmButton: false
            });
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/video/category-delete`,
                { cat_id: deleteCategory },
                { withCredentials: true }
            );
            console.log(response.data); // Log the response from the API
            setShowDeleteConfirmation(false); // Close the confirmation modal
            Swal.fire({
                icon: 'success',
                title: 'Category Deleted successfully',
                timer: 1000,
                showConfirmButton: false
            });
            fetchData(); // Refetch category data after deletion
        } catch (error: any) {
            console.error('Error deleting user:', error);
            setShowDeleteConfirmation(false); // Close the confirmation modal
            setError('Failed to delete user');
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: error.response?.data?.message || 'Failed to Delete category',
                timer: 1000,
                showConfirmButton: false
            });
        }
    };

    const handleOpenDeleteConfirmation = (cat_id: any) => {
        setDeleteCategory(cat_id);
        setShowDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const handleOpenUpdateModal = (initialRecords: any) => {
        setCategoryDataToUpdate(initialRecords);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setCategoryDataToUpdate(null);
        setIsUpdateModalOpen(false);
    };

    return (
        <div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-6'>
                <div className='lg:col-span-1 col-span-1 border border-[#e6e6e6] dark:border-0 rounded-md mt-5 py-4 shadow-sm bg-white dark:bg-[#0E1726] h-fit'>
                <Formik
                        initialValues={{
                            categoryName: '',
                            slug: '',
                            parent: '',
                            metaTitle: '',
                            metaDescription: '',
                            focusKeyword: ''
                        }}
                        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form className="space-y-5">
                                <div>
                                    <div className='px-4'>
                                        <label htmlFor="categoryName">Title </label>
                                        <Field
                                            name="categoryName"
                                            type="text"
                                            id="categoryName"
                                            placeholder="Enter Category Name"
                                            className="form-input h-10"
                                            value={categoryName}
                                            onChange={(e: any) => handleCategoryNameChange(e, setFieldValue)}
                                        />
                                        {errors.categoryName && touched.categoryName && <p className="text-red-500">{errors.categoryName}</p>}
                                    </div>
                                    <div className='mt-3 px-4'>
                                        <label htmlFor="slug">Slug</label>
                                        <Field
                                            name="slug"
                                            type="text"
                                            id="slug"
                                            placeholder="Enter Category Slug"
                                            className="form-input h-10"
                                            value={slug}
                                            onChange={handleSlugChange}
                                        />
                                        {errors.slug && touched.slug && <p className="text-red-500">{errors.slug}</p>}
                                    </div>
                                    <div className="mt-3 px-4 mb-5">
                                        <label htmlFor="parent">Parent</label>
                                        
                                        <Select
                                            className='dark:mySelect mySelect'
                                            name='parent'
                                            placeholder="Select a parent"
                                            options={[{ value: '', label: 'Select One' }, ...parentOptions.map(option => ({ value: option, label: option }))]}

                                            onChange={(option) => {
                                                // Check if option is not null before accessing its value
                                                if (option) {
                                                    setFieldValue('parent', option.value);
                                                }
                                            }}
                                        />

                                            
                                       
                                        

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
                                                    {errors.metaTitle && touched.metaTitle && <p className="text-red-500">{errors.metaTitle}</p>}
                                                </div>
                                                <div className='mt-3'>
                                                    <label htmlFor="metaDescription">Meta Description</label>
                                                    <Field name="metaDescription" as="textarea" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-24" />
                                                    {errors.metaDescription && touched.metaDescription && <p className="text-red-500">{errors.metaDescription}</p>}
                                                </div>
                                                <div className='mt-3'>
                                                    <label htmlFor="focusKeyword">Focus Keyword</label>
                                                    <Field name="focusKeyword" type="text" id="focusKeyword" placeholder="Enter Focus Keyword" className="form-input h-10" />
                                                    {errors.focusKeyword && touched.focusKeyword && <p className="text-red-500">{errors.focusKeyword}</p>}
                                                </div>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6 mx-4"
                                    
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
                                            accessor: 'categoryName',
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
                                            render: (rowData) => (
                                                <div className="mx-auto flex w-max items-center gap-2">
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
                                                        <svg onClick={() => handleOpenDeleteConfirmation(rowData.cat_id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
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
                                    totalRecords={allCategoryData.length}
                                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                    
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {categoryDataToUpdate && (
    <Modal
        className='dark:updateUserModal'
        opened={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title="Update Category"
    >
        <Formik initialValues={{ ...categoryDataToUpdate }} onSubmit={handleUpdate} validationSchema={validationSchema}>
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    <input type="hidden" name="cat_id" id="cat_id" value={categoryDataToUpdate.cat_id} /> {/* Hidden input for userId */}
                    <div className="mb-3">
                        <label htmlFor="categoryName">Tiltle</label>
                        <Field className="form-input h-10" type="text" id="categoryName" name="categoryName" placeholder="Enter Category Name" />
                        {errors.categoryName && touched.categoryName && <p className="text-red-500">{errors.categoryName as string}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="slug">Slug</label>
                        <Field className="form-input h-10" type="text" id="slug" name="slug" placeholder="Enter slug" />
                        {errors.slug && touched.slug && <p className="text-red-500">{errors.slug as string}</p>}
                    </div>
                    <div className="mb-3">
                            <label htmlFor="parent">Parent</label>
                            <Select
                                            className='dark:mySelect mySelect'
                                            name='parent'
                                            placeholder="Select a parent"
                                            options={[{ value: '', label: 'Select One' }, ...parentOptions.map(option => ({ value: option, label: option }))]}
                                            id="parent"
                                            onChange={(option) => {
                                                // Check if option is not null before accessing its value
                                                if (option) {
                                                    setFieldValue('parent', option.value);
                                                }
                                            }}
                                            value={{ value: categoryDataToUpdate.parent, label: categoryDataToUpdate.parent }}
                                        />
                        </div>
                    <div className="mb-3">
                    <label htmlFor="metaTitle">Meta Title</label>
                    <Field name="metaTitle" type="text" id="metaTitle" placeholder="Enter Meta Title" className="form-input h-10" />
                    {errors.metaTitle && touched.metaTitle && <p className="text-red-500">{errors.metaTitle as string}</p>}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="metaDescription">Meta Description</label>
                      <Field name="metaDescription" as="textarea" id="metaDescription" placeholder="Enter Meta Description" className="form-input h-24" />
                     {errors.metaDescription && touched.metaDescription && <p className="text-red-500">{errors.metaDescription as string}</p>}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="focusKeyword">Focus Keyword</label>
                    <Field name="focusKeyword" type="text" id="focusKeyword" placeholder="Enter Focus Keyword" className="form-input h-10" />
                    {errors.focusKeyword && touched.focusKeyword && <p className="text-red-500">{errors.focusKeyword as string}</p>}
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="btn btn-primary !mt-6">
                        Update Category
                    </button>
                </Form>
            )}
        </Formik>
    </Modal>
    
)}

<Modal className='dark:addUserModal' opened={showDeleteConfirmation} onClose={handleCloseDeleteConfirmation} title="Confirm Deletion">
                <p>Are you sure you want to delete this Category?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={handleCloseDeleteConfirmation} className="btn btn-secondary mr-2">Cancel</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </Modal>
        </div>
    );
};

export default withAuth(Categories);
