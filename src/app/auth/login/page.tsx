'use client';

import { useAuth } from '@workos-inc/authkit-react';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isLoading, user, getAccessToken, signIn, signUp, signOut } =
    useAuth();

  // This `/login` endpoint should be registered as the login endpoint on
  // the "Redirects" page of the WorkOS Dashboard. In a real app, this code would
  // live in a route instead of in the main <App/> component
  useEffect(() => {
    if (window.location.pathname === '/login') {
      // Redirects to the signIn page
      signIn();
    }
  }, [signIn]);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchAccessToken = async () => {
        const accessToken = await getAccessToken();
        console.log('access token', accessToken);
        if (accessToken) {
          window.sessionStorage.setItem('accessToken', accessToken);
        }
      };
      fetchAccessToken();
    }
  }, [isLoading, user, getAccessToken]);

  // isLoading is true until WorkOS has determined the user's authentication status
  if (isLoading) {
    return <p>... insert cool spinner here ...</p>;
  }

  // If user doesn't exist, then the user is signed out
  if (!user) {
    return (
      <>
        <button
          onClick={() => {
            // Redirects to the signIn page
            signIn();
          }}
        >
          Sign in
        </button>
        <button
          onClick={() => {
            // Redirects to the signUp page
            signUp();
          }}
        >
          Sign up
        </button>
      </>
    );
  }

  // Show the logged in view
  return (
    <>
      <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
      <p>
        <button
          onClick={async () => {
            // getAccessToken will return an existing (unexpired) access token, or
            // obtain a fresh one if necessary
            const accessToken = await getAccessToken();
            console.log(`Making API request with ${accessToken}`);
          }}
        >
          Make API Request
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </p>
    </>
  );
}
