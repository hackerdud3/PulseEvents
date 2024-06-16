import { Skeleton } from '@nextui-org/react';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="p-4 max-w-[380px] w-full flex flex-col justify-start items-center gap-4">
      <div>
        <Skeleton className="flex rounded-full w-14 h-14" />
      </div>
      <Skeleton className="h-12 w-full rounded-large" />
      <Skeleton className="h-12 w-full rounded-large" />
      <Skeleton className="h-12 w-full rounded-large" />
    </div>
  );
};

export default Loading;
