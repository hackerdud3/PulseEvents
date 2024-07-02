'use client';
import React, { FormEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CustomButton from '../../../components/button';
import SignUp from '../../../components/auth-components/Signup';
import { Card, CardHeader } from '@nextui-org/react';
import { useAuth } from '@/providers/auth-provider';

type Props = {};

function SignupPage({}: Props) {
  return (
    <Card className="p-4 max-w-[380px] w-full h-full flex justify-center items-center">
      <CardHeader>Sign-Up</CardHeader>
      <SignUp />
    </Card>
  );
}

export default SignupPage;
