'use client';
import React, { useEffect, useState, useRef, lazy } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Image from 'next/image';
import {
  Button,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  styled
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../Contexts/Auth';

import Link from 'next/link';

import { ButtonProps } from '@tremor/react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import './event.css';
import EveCard from '../components/card';
import useFetchEvents from '@/Hooks/fetchEvents';
import { Disclosure } from '@headlessui/react';

type Props = {};

async function fetchGoogleEvents() {
  const response = await axios.get(
    'https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId'
  );
  return response.data;
}

const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  padding: '6px 10px',
  backgroundColor: '#3d48da',
  '&:hover': {
    backgroundColor: '#434ff0'
  }
}));

function EventsPage({}: Props) {
  const [attending, isAttending] = useState(false);
  const containerRef = useRef<any>(null);
  const [googleEvents, setGoogleEvents] = useState<any>(null);
  const storedUserData = localStorage.getItem('userData');

  let token = null;

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    token = userData.token;
  }
  const events = useFetchEvents({ token });

  const toggleInterested = () => {
    isAttending(!attending);
  };

  const handleArrowButtonClicked = (direction: string) => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth + 10; // Width of the container

    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="w-full flex flex-col item-center justify-center mt-12 ">
      <div>
        <Image
          src="/6291563.jpeg"
          alt="pulse wallpaper"
          className="w-full h-[20rem] object-cover object-center"
          width={1000}
          height={5}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col w-full">
        {/* <Eventcard key={item.eid} item={item} /> */}

        <div className="w-full flex items-center justify-center my-8 ">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-lg sm:text-2xl font-bold">Upcoming Events</h1>

            <Link href="events/addevent">
              <AddButton className="bg-black" startIcon={<AddRoundedIcon />}>
                Add Event
              </AddButton>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            id="scroll-container"
            className="overflow-hidden whitespace-nowrap relative"
          >
            <div
              id="scroll-content"
              className=" transition left-transition right-transition duration-1000 ease overscroll-contain grid-flow-col scroll-smooth space-x-4"
            >
              {events?.map((item, index) => (
                <EveCard item={item} key={index} />
              ))}
            </div>
          </div>
          <IconButton
            id="left-button"
            className="bg-gray-200"
            sx={{
              position: 'absolute',
              top: '120px',
              left: '-20px'
            }}
            onClick={() => handleArrowButtonClicked('left')}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>

          <IconButton
            id="right-buttom"
            className="bg-gray-200"
            sx={{
              position: 'absolute',
              top: '120px',
              right: '-20px'
            }}
            onClick={() => handleArrowButtonClicked('right')}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
