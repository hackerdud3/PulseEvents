'use client';
import React, { FormEvent } from 'react';
import { Card, TextInput, Title } from '@tremor/react';
import Link from 'next/link';

import axios from 'axios';
import { useAuth } from '@/Contexts/Auth';
import CustomButton from '@/app/components/button';

type Props = {};

function SignupPage({}: Props) {
  const { signUpUser } = useAuth();

  const signuphandler = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const userData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };
    signUpUser(userData);
  };

  return (
    <form
      id="signup"
      className="w-full h-full flex justify-center items-center"
      onSubmit={signuphandler}
    >
      <div className=" w-full rounded-md max-w-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-96 flex flex-col px-8 gap-5 justify-start">
        <Title className="mt-8 text-lg">Sing Up</Title>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="email"
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Email"
            spellCheck={false}
          />
        </div>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="name"
            id="username"
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Username"
            spellCheck={false}
          />
        </div>

        <div className="rounded-md shadow-sm">
          <input
            type="password"
            name="password"
            id="password"
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            spellCheck={false}
          />
        </div>
        <Link href="/forgotpassword">
          <h4 className="ml-2">Forgot Password</h4>
        </Link>
        <div className="w-full mt-4">
          <CustomButton
            type="submit"
            name="Sign Up"
            color="bg-violet-500"
            textcolor="text-white"
            className="w-full hover:bg-violet-600"
          />
        </div>
      </div>
    </form>
  );
}

export default SignupPage;
