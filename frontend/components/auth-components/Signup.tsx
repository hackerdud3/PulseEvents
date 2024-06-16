'use client';
import React, { FormEvent } from 'react';
import { Button, Input, Link } from '@nextui-org/react';
import { useAuth } from '@/providers/auth-provider';

type Props = {};

function SignUp({}: Props) {
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
      className="h-full w-full flex flex-col justify-center items-center"
      onSubmit={signuphandler}
    >
      <div className="w-full mt-4">
        <Input
          size="sm"
          type="text"
          label="Username"
          id="username"
          name="username"
        />
      </div>
      <div className="w-full mt-4">
        <Input size="sm" type="email" label="Email" id="email" name="email" />
      </div>
      <div className="w-full mt-4">
        <Input
          size="sm"
          type="password"
          label="Password"
          name="password"
          id="password"
        />
      </div>
      <div className="w-full flex flex-col justify-center mt-4 mx-auto items-center gap-2">
        <Button color="primary" type="submit">
          Signup
        </Button>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <p className="text-small">Or</p>
          <Link href="#">
            <p className="text-small">Login</p>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
