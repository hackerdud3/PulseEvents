import { Skeleton } from '@nextui-org/react';
import React from 'react';

type Props = {};

const FormLoading = (props: Props) => {
  return (
    <div className="w-full flex flex-col justify-start items-center px-4 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-14 rounded-large" />
      ))}
    </div>
  );
};

export default FormLoading;
