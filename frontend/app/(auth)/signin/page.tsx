import React from 'react';
import Login from '../../../components/auth-components/Login';
import { Card, CardHeader } from '@nextui-org/react';

type Props = {};

function Loginpage({}: Props) {
  return (
    <Card className="p-4 max-w-[380px] w-full h-full flex justify-center items-center">
      <CardHeader>Login</CardHeader>
      <Login />
    </Card>
  );
}

export default Loginpage;
