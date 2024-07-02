'use client';
import axios from 'axios';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useSnackbar } from './snackbar-provider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

// Auth context props
interface AuthContextProps {
  signInWithUsernameandPassword: (userData: any) => Promise<void>;
  signUpUser: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  user: any;
  setUser: (user: any) => void;
}

// Create auth context
const AuthContext = createContext<AuthContextProps>({
  signInWithUsernameandPassword: async () => {},
  signUpUser: async () => {},
  signOut: async () => {},
  user: null,
  setUser: () => {}
});

// Custom hook to use auth context
export function useAuth() {
  if (!AuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return useContext(AuthContext);
}

function AuthProvider({ children }: Props) {
  const { openSnackbar } = useSnackbar();
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  // Sign in with username and password
  const signInWithUsernameandPassword = async (userData: any) => {
    try {
      openSnackbar('Signing in...', 'loading');
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log(response);

      if (response.status === 200) {
        const user = await response.json();
        const oneWeek = new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        );
        Cookies.set('user', JSON.stringify(user), { expires: oneWeek });
        Cookies.set('token', user.token, { expires: oneWeek });
        setUser(JSON.stringify(user));
        router.push('/');
        openSnackbar('Sign in successful!', 'success');
      } else {
        openSnackbar('Invalid credentials', 'error');
      }
    } catch (error) {
      openSnackbar('An error occurred', 'error');
    }
  };

  // Sign up user
  const signUpUser = async (userData: any) => {
    try {
      openSnackbar('Signing up...', 'loading');
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        openSnackbar('Sign Up successful!', 'success');
        router.push('/signin');
      }
    } catch (error) {
      openSnackbar('User registration failed', 'error');
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      openSnackbar('Signing out...', 'loading');
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Remove cookies
        Cookies.remove('user');
        Cookies.remove('token');
        // Update state immediately
        setUser(null);
        // Navigate after state update
        router.push('/signin');
        // Show success message
        openSnackbar('Sign out successful!', 'success');
      }
    } catch (error) {
      openSnackbar('Error while signing out', 'error');
    }
  };

  // Auth context value
  const value = {
    signInWithUsernameandPassword,
    signUpUser,
    signOut,
    user,
    setUser
  };

  // Return auth context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
