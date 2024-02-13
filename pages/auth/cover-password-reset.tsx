import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';

const RecoverIdCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Cover'));
    });
    const router = useRouter();

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className="flex min-h-screen">
            <div className="hidden min-h-screen w-1/2 flex-col  items-center justify-center bg-gradient-to-t from-[#ff1361bf] to-[#44107A] p-4 text-white dark:text-black lg:flex">
                <div className="mx-auto mb-5 w-full">
                    <img src="/assets/images/auth-cover.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
                </div>
                <h3 className="mb-4 text-center text-3xl font-bold">Join the community of expert developers</h3>
                <p>It is easy to setup with great customer experience. Start your 7-day free trial</p>
            </div>
            <div className="relative flex w-full items-center justify-center lg:w-1/2 ">
                <div className="w-full max-w-[480px] p-5 md:p-10">
                    <h2 className="mb-3 text-3xl font-bold">Password Reset</h2>
                    <p className="mb-7">Enter your email to recover your ID</p>
                    <form className="space-y-5" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-input" placeholder="Enter Email" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            RECOVER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
RecoverIdCover.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default RecoverIdCover;
