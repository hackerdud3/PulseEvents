'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useSnackbar } from './snackbar-provider';
import Cookies from 'universal-cookie';

type Props = {
  children: ReactNode;
};

interface AuthContextProps {
  signInWithUsernameandPassword: (userData: any) => Promise<void>;
  signUpUser: (userData: any) => Promise<void>;
  user: any;
}

const AuthContext = createContext<AuthContextProps>({
  signInWithUsernameandPassword: async () => {},
  signUpUser: async () => {},
  user: null
});

export function useAuth() {
  if (!AuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return useContext(AuthContext);
}

function AuthProvider({ children }: Props) {
  const [user, setuser] = useState(null);
  const { openSnackbar } = useSnackbar();
  const cookie = new Cookies();

  const router = useRouter();

  const signInWithUsernameandPassword = async (userData: any) => {
    try {
      openSnackbar('Signing in...', 'loading');
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        userData
      );
      if (response.status === 200) {
        openSnackbar('Sign In successful!', 'success');
        setuser(response?.data);
        cookie.set('user', response?.data);
        cookie.set('token', response?.data?.token);
        router.push('/events');
      }
    } catch (error) {
      openSnackbar('Cannot sign in', 'error');
    }
  };

  const signUpUser = async (userData: any) => {
    try {
      openSnackbar('Signing up...', 'loading');
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        userData
      );

      if (response.status === 200) {
        openSnackbar('Sign Up successful!', 'success');
        router.push('/signin');
      }
    } catch (error) {
      openSnackbar('User registration failed', 'error');
    }
  };

  const value = {
    signInWithUsernameandPassword,
    signUpUser,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
