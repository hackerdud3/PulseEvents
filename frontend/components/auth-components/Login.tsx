'use client';
import { Button, Input, Link } from '@nextui-org/react';
import { useAuth } from '@/providers/auth-provider';
import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '../../providers/snackbar-provider';

type Props = {};

const Login = (props: Props) => {
  const { signInWithUsernameandPassword } = useAuth();
  const router = useRouter();

  const loginhandler = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const userData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    await signInWithUsernameandPassword(userData);
  };

  return (
    <form
      onSubmit={loginhandler}
      id="login"
      className="h-full w-full flex flex-col justify-center items-center"
    >
      <div className="w-full mt-4">
        <Input size="sm" type="text" label="Username" name="username" />
      </div>
      <div className="w-full mt-4">
        <Input size="sm" type="password" label="Password" name="password" />
      </div>
      <div className="relative mt-4 w-full flex items-center justify-center ">
        <Button color="primary" size="md" type="submit">
          Login
        </Button>
        <div className="absolute right-1">
          <Link href="#">
            <p className="text-small">Forgot Password</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col mt-2 items-center justify-center w-full gap-2">
        <p className="text-small">Or</p>
        <Link href="/signup">
          <p className="text-small">Singup</p>
        </Link>
      </div>
    </form>
  );
};

export default Login;
