// Import necessary modules
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import axios from 'axios'; // Import Axios

// Define the SignIn component
const SignIn = () => {
    // Initialize state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Get dispatch function for Redux actions
    const dispatch = useDispatch();
    // Get router object
    const router = useRouter();

    const apiUrl = process.env.API_URL || 'https://eismoy-api.vercel.app';

    // Create Axios instance with withCredentials set to true
    const api = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
    });

    // Function to handle form submission
    const submitForm = async (e: any) => {
        e.preventDefault();

        try {
            const response = await api.post('/api/user/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // After 1 second, redirect the user to the index page
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                // If response is not OK, handle the error
                throw new Error('An unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            handleLoginError('An unexpected error occurred.');
        }
    };

    const handleLoginError = (errorMessage: any) => {
        // Log error to console
        console.error('Login Error:', errorMessage);
        // Set error state to display error message in UI
        setError(errorMessage);
    };

    // Set page title when component mounts
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    }, []);

    // Render the sign-in form
    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-input" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="btn btn-primary w-full">
                        SIGN IN
                    </button>
                    <div>
                        <Link href="/forgot-password" className="text-red-500 font-semibold text-[15px]">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Specify the layout for the SignIn component
SignIn.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

// Export the SignIn component
export default SignIn;
