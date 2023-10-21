'use client';
import React, { FormEvent, useState } from 'react';
import { Card, TextInput, Title } from '@tremor/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomButton from '@/app/components/button';
import { useAuth } from '@/Contexts/Auth';
import SpinnerButton from '@/app/components/spinnerbutton';

type Props = {};

function Loginpage({}: Props) {
  const { signInWithUsernameandPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginhandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const userData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    try {
      await signInWithUsernameandPassword(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={loginhandler}
      id="login"
      className="w-full h-full flex justify-center items-center"
    >
      <div className=" w-full bg-white rounded-md max-w-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-96 py-8 flex flex-col px-8 gap-5 justify-start">
        <Title className="text-lg">Login</Title>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="username"
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
            name="Login"
            color="bg-violet-500"
            textcolor="text-white"
            className="w-full hover:bg-violet-600"
            isLoading={loading}
            loadingtext="Loging In..."
          />
        </div>
      </div>
    </form>
  );
}

export default Loginpage;
