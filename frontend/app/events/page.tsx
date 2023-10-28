'use client';
import React, { useEffect, useState, useRef } from 'react';
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

type Props = {};

type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
  eventImage: string;
};

async function fetchEvents(token: string) {
  try {
    const response = await axios.get<Event[]>('http://localhost:8080/events', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'Content-type': 'Application/json',
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
async function fetchGoogleEvents() {
  const response = await axios.get(
    'https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId'
  );
  return response.data;
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
  const containerRef = useRef<any>(null);
  const [googleEvents, setGoogleEvents] = useState<any>(null);

  console.log('Events:', events);

  const toggleInterested = () => {
    isAttending(!attending);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (user) {
          console.log(user.token);
          const eventsData = await fetchEvents(user.token);

          setEvents(eventsData);
          localStorage.setItem('Events', JSON.stringify(eventsData));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    loadEvents();
  }, []);

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
            ref={containerRef}
            id="scroll-container"
            className="overflow-hidden whitespace-nowrap relative"
          >
            <div
              id="scroll-content"
              className=" grid transition left-transition right-transition duration-1000 ease overscroll-contain grid-flow-col scroll-smooth space-x-4"
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
