'use client';
import React, { useEffect, useState } from 'react';
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
import Eventcard from '../components/eventcard';
import EveCard from '../components/card';
import { ButtonProps } from '@tremor/react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

type Props = {};

type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
  eventImage: string;
};

async function fetchEvents() {
  try {
    const response = await axios.get<Event[]>('http://localhost:8080/events');

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  padding: '6px 10px',
  '&:hover': {
    backgroundColor: '#434ff0'
  }
}));

function EventsPage({}: Props) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [attending, isAttending] = useState(false);
  const { user } = useAuth();

  const toggleInterested = () => {
    isAttending(!attending);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        localStorage.setItem('Events', JSON.stringify(eventsData));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="w-full flex flex-col item-center justify-center mt-16 ">
      <div>
        <Image
          src="/event1.jpg"
          alt="pulse wallpaper"
          className="w-full h-[30rem] object-cover object-bottom"
          width={1000}
          height={50}
        />
      </div>

      <div className="flex flex-col w-full px-4 sm:px-40">
        {/* <Eventcard key={item.eid} item={item} /> */}

        <div className="w-full flex items-center justify-center my-8 ">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-lg sm:text-2xl font-bold">Upcoming Events</h1>

            <Link href="events/addevent">
              <AddButton
                className="bg-[#3d48da]"
                startIcon={<AddRoundedIcon />}
              >
                Add Event
              </AddButton>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            id="scroll-container"
            className="overflow-x-auto whitespace-nowrap relative"
          >
            <div id="scroll-content" className="inline-block">
              {events?.map((item, index) => (
                <EveCard item={item} key={index} />
              ))}
            </div>
          </div>
          <IconButton
            className="bg-gray-200"
            sx={{
              position: 'absolute',
              top: '120px',
              left: '-20px'
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <IconButton
            className="bg-gray-200"
            sx={{
              position: 'absolute',
              top: '120px',
              right: '-20px'
            }}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
