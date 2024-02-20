// utils/withAuth.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Create Axios instance with withCredentials set to true
          const api = axios.create({
            baseURL: process.env.API_URL || 'https://eismoy-api.vercel.app',
            withCredentials: true,
          });

          // Validate token by calling the authentication API
          const response = await api.get('/api/user/auth');
          const { authenticated } = response.data;

          if (!authenticated) {
            // If user is not authenticated, redirect to sign-in page
            router.push('/sign-in');
          } else {
            // If user is authenticated, allow rendering of the wrapped component
            setLoading(false);
          }
        } catch (error) {
          console.error('Error authenticating:', error);
          // If an error occurs during authentication, redirect to sign-in page
          router.push('/sign-in');
        }
      };

      checkAuth();
    }, []);

    return loading ? null : <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
