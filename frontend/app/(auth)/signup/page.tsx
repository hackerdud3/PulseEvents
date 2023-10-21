'use client';
import React, { FormEvent, useState } from 'react';
import { Card, TextInput, Title } from '@tremor/react';
import Link from 'next/link';

import axios from 'axios';
import { useAuth } from '@/Contexts/Auth';
import CustomButton from '@/app/components/button';
import SpinnerButton from '@/app/components/spinnerbutton';

type Props = {};

function SignupPage({}: Props) {
  const { signUpUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const signuphandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const userData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };
    try {
      await signUpUser(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="signup"
      className="w-full h-full flex justify-center items-center"
      onSubmit={signuphandler}
    >
      <div className=" w-full bg-white rounded-md max-w-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-8 flex flex-col px-8 gap-5 justify-start">
        <Title className=" text-lg">Sign Up</Title>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="email"
            id="email"
            className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            spellCheck={false}
            placeholder="Email"
          />
        </div>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Username"
            spellCheck={false}
          />
        </div>

        <div className="rounded-md shadow-sm">
          <input
            type="password"
            name="password"
            id="password"
            className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            spellCheck={false}
          />
        </div>
        <Link href="/forgotpassword">
          <h4 className="ml-2">Forgot Password</h4>
        </Link>
        <div className="w-full mt-4">
          <SpinnerButton
            type="submit"
            name="Sign Up"
            color="bg-violet-500"
            textcolor="text-white"
            className="w-full hover:bg-violet-600"
            isLoading={loading}
            loadingtext="Signing Up..."
          />
        </div>
      </div>
    </form>
  );
}

export default SignupPage;
