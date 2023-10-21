'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

type Props = {
  children: ReactNode;
};

interface AuthContextProps {
  signInWithUsernameandPassword: (userData: any) => Promise<void>;
  signUpUser: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  message: string;
  error: boolean;
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  signInWithUsernameandPassword: async () => {},
  signUpUser: async () => {},
  logout: async () => {},
  message: '',
  error: false,
  user: null,
  loading: false
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: Props) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
        setSessionLoading(false);
      }
    };
    fetchUserFromLocalStorage();
  }, []);

  const signInWithUsernameandPassword = async (userData: any) => {
    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        userData
      );
      if (response.status === 200) {
        setLoading(false);
        setMessage('Sign In Successful...');
        setError(false);
        localStorage.setItem('userData', JSON.stringify(response.data));
        router.push('/events');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage('Sign In unsuccessful! Please try again');
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async (userData: any) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        userData
      );

      if (response.status === 200) {
        setMessage('Sign Up successful!');
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage('Cannot register user');
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('userData');
      setUser(null);
      setMessage('Logged out successfully');
      setError(false);
      router.push('/signin');
    } catch (error) {
      setError(true);
      setMessage('Error logging out');
    }
  };

  const value = {
    signInWithUsernameandPassword,
    signUpUser,
    message,
    error,
    user,
    loading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
