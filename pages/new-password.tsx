import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';

const NewPassword = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const router = useRouter();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">New Password</h2>
                <p className="mb-7">Enter your new password</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-input" placeholder="Enter Password" />
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password</label>
                        <input id="password" type="password" className="form-input" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        SAVE
                    </button>
                </form>
            </div>
        </div>
    );
};
NewPassword.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default NewPassword;
