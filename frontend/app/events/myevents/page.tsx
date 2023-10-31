'use client';
import React, { useState, useEffect } from 'react';
import useFetch from '@/Hooks/fetchUserEve';
import EveCard from '@/app/components/card';
import { Box } from '@mui/material';

const Page = () => {
  const storedUserData = localStorage.getItem('userData');
  let userId = null;

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userId = userData.id;
  }
  console.log(userId);

  const events = useFetch({ userId });

  return (
    <div className="flex flex-col w-full mt-12 ">
      <div className="flex gap-12  ">
        <div className="w-[480px]">
          <h1 className="text-2xl font-semibold mb-4">Filters</h1>
          <Box
            sx={{
              backgroundColor: 'white',
              display: 'block',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              width: '100%'
            }}
          ></Box>
        </div>

        <div className="w-full justify-end items-start">
          <h1 className="text-2xl font-semibold mb-4">Your Created Events</h1>
          <div className="flex flex-wrap items-center gap-4">
            {events?.map((item, index) => (
              <EveCard item={item} key={index}></EveCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
