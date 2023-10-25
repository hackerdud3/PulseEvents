import { Skeleton } from '@mui/material';
import React from 'react';

type Props = {};

function loading({}: Props) {
  return (
    <div>
      <Skeleton />
    </div>
  );
}

export default loading;
