import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-20 flex-none" src="/assets/images/logo.webp" alt="logo" />
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li className="menu nav-item">
                                <Link href="/">{t('Dashboard')}</Link>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('News')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/viewallnews" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" />
                                                    <rect x="4" y="6" width="16" height="2" rx="1" fill="white" />
                                                    <rect x="4" y="10" width="16" height="1" rx="0.5" fill="white" />
                                                    <rect x="4" y="12" width="16" height="1" rx="0.5" fill="white" />
                                                    <rect x="4" y="14" width="16" height="1" rx="0.5" fill="white" />
                                                    <rect x="4" y="16" width="16" height="1" rx="0.5" fill="white" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('View All News')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/add-news" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="11" y="5" width="2" height="14" rx="1" fill="currentColor" />
                                                    <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
                                                </svg>

                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Add New News')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/categories" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="6" cy="18" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="18" r="2" fill="currentColor" />
                                                    <rect x="7" y="6" width="10" height="1" fill="currentColor" />
                                                    <rect x="7" y="18" width="10" height="1" fill="currentColor" />
                                                    <rect x="6" y="7" width="1" height="10" fill="currentColor" />
                                                    <rect x="18" y="7" width="1" height="10" fill="currentColor" />
                                                </svg>

                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('News Categories')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/news-scroll" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="8" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" />
                                                </svg>


                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('News Scroll')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/event-news" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 15H19" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 18H19" stroke="currentColor" strokeWidth="2" />
                                                </svg>


                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Event News')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/featured-news" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 15H19" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M5 18H19" stroke="currentColor" strokeWidth="2" />
                                                </svg>


                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Featured News')}</span>
                                            </div>
                                        </Link>
                                    </li>




                                </ul>
                            </li>
                            {/* galleries */}
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('Galleries')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="9" y="6" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="6" y1="7" x2="6" y2="17" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="18" y1="7" x2="18" y2="17" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Photo Galleries')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="11" y="5" width="2" height="14" rx="1" fill="currentColor" />
                                                    <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Add New Photo Gallery')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="6" cy="18" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="18" r="2" fill="currentColor" />
                                                    <rect x="7" y="6" width="10" height="1" fill="currentColor" />
                                                    <rect x="7" y="18" width="10" height="1" fill="currentColor" />
                                                    <rect x="6" y="7" width="1" height="10" fill="currentColor" />
                                                    <rect x="18" y="7" width="1" height="10" fill="currentColor" />
                                                </svg>

                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Photo Categories')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M18 9L22 11V13L18 15V9Z" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="13" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="4" y1="7" x2="4" y2="17" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="16" y1="7" x2="16" y2="17" stroke="currentColor" strokeWidth="2" />
                                                </svg>


                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Videos')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="11" y="5" width="2" height="14" rx="1" fill="currentColor" />
                                                    <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
                                                </svg>


                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Add New Video')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="6" r="2" fill="currentColor" />
                                                    <circle cx="6" cy="18" r="2" fill="currentColor" />
                                                    <circle cx="18" cy="18" r="2" fill="currentColor" />
                                                    <rect x="7" y="6" width="10" height="1" fill="currentColor" />
                                                    <rect x="7" y="18" width="10" height="1" fill="currentColor" />
                                                    <rect x="6" y="7" width="1" height="10" fill="currentColor" />
                                                    <rect x="18" y="7" width="1" height="10" fill="currentColor" />
                                                </svg>

                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Video Categories')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            {/* Settings */}
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('Settings')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/settings/general" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="9" y="6" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="6" y1="7" x2="6" y2="17" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="18" y1="7" x2="18" y2="17" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('General')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/settings/layouts" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="9" y="6" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="6" y1="7" x2="6" y2="17" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="18" y1="7" x2="18" y2="17" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Layouts')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/settings/users" className="group">
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="9" y="6" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="6" y1="7" x2="6" y2="17" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="18" y1="7" x2="18" y2="17" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Users')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    {/* ads */}
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'ads' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ads')}>
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C10.7661 4 9.77318 4.39718 7.7873 5.19153L4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        opacity="0.7"
                                                        d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L5.76613 10Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        opacity="0.4"
                                                        d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L5.76613 14Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('ads')}</span>
                                            </div>

                                            <div className={currentMenu === 'ads' ? 'rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'ads' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/settings/ads/header-ad">{t('Header Ad')}</Link>
                                                    <Link href="/settings/ads/popup-ad">{t('Popup Ad')}</Link>
                                                    <Link href="/settings/ads/home-ad">{t('Home Ad')}</Link>
                                                    <Link href="/settings/ads/event-ad">{t('Event Ad')}</Link>
                                                    <Link href="/settings/ads/categorypage-ad">{t('Category Page Ad')}</Link>
                                                    <Link href="/settings/ads/newspage-ad">{t('News Page Ad')}</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('supports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className="nav-link group">
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 4.69434V18.6943C4 20.3512 5.34315 21.6943 7 21.6943H17C18.6569 21.6943 20 20.3512 20 18.6943V8.69434C20 7.03748 18.6569 5.69434 17 5.69434H5C4.44772 5.69434 4 5.24662 4 4.69434ZM7.25 11.6943C7.25 11.2801 7.58579 10.9443 8 10.9443H16C16.4142 10.9443 16.75 11.2801 16.75 11.6943C16.75 12.1085 16.4142 12.4443 16 12.4443H8C7.58579 12.4443 7.25 12.1085 7.25 11.6943ZM7.25 15.1943C7.25 14.7801 7.58579 14.4443 8 14.4443H13.5C13.9142 14.4443 14.25 14.7801 14.25 15.1943C14.25 15.6085 13.9142 15.9443 13.5 15.9443H8C7.58579 15.9443 7.25 15.6085 7.25 15.1943Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M18 4.00038V5.86504C17.6872 5.75449 17.3506 5.69434 17 5.69434H5C4.44772 5.69434 4 5.24662 4 4.69434V4.62329C4 4.09027 4.39193 3.63837 4.91959 3.56299L15.7172 2.02048C16.922 1.84835 18 2.78328 18 4.00038Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('documentation')}</span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;