"use client";
import axios from "axios";
import { error } from "console";
import React, { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: Props) {
  const [messsage, setMessage] = React.useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInWithUsernameandPassword = async (userData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        userData
      );
      if (response.status === 200) {
        setMessage("Sign In Successful...");
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage("Sign In unsuccessfull ! Please try again");
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
    messsage,
    setError,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
