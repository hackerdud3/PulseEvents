"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

interface AuthContextProps {
  signInWithUsernameandPassword: (userData: any) => Promise<void>;
  signUpUser: (userData: any) => Promise<void>;
  message: string;
  error: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextProps>({
  signInWithUsernameandPassword: async () => {},
  signUpUser: async () => {},
  message: "",
  error: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: Props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signInWithUsernameandPassword = async (userData: any) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        userData
      );
      if (response.status === 200) {
        setLoading(false);
        setMessage("Sign In Successful...");
        setError(false);
        setuser(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        router.push("/events");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage("Sign In unsuccessful! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async (userData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        userData
      );

      if (response.status === 200) {
        setMessage("Sign Up successful!");
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage("Cannot register user");
    }
  };

  const value = {
    signInWithUsernameandPassword,
    signUpUser,
    message,
    error,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
