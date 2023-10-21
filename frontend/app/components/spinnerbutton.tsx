'use client';
import React from 'react';
import { Button } from '@tremor/react';
import { CircularProgress } from '@mui/material';

type Props = {
  name: string;
  color: string;
  textcolor: string;
  className?: string;
  isLoading: boolean;
  loadingtext: string;

  type?: 'button' | 'submit' | 'reset';
};

const SpinnerButton = (props: Props) => {
  return (
    <Button
      type={props.type}
      size="md"
      className={`${props.color} px-4 py-2 h-10 relative rounded-md justify-center items-center ${props.textcolor} ${props.className}`}
    >
      {props.isLoading ? (
        <div className="flex space-x-4 relative">
          <CircularProgress
            sx={{ color: 'white', position: 'absolute', right: '120px' }}
            size={20}
            thickness={6}
          />
          <span>{props.loadingtext}</span>
        </div>
      ) : (
        <span> {props.name}</span>
      )}
    </Button>
  );
};

export default SpinnerButton;
