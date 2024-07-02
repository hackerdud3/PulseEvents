import React from 'react';
import { Binary } from 'bson';
import EventCard from '../../components/EventCard';
import LandingImage from '../../components/LandingImage';

type Props = {};

interface Event {
  eid: string;
  eventName: string;
  description: string;
  address: Object;
  startDate: string;
  endDate: string;
  createdBy: string;
  interestedCount: number;
  eventImage: Binary | null;
  categories: string[];
}
async function fetchEvents() {
  const response = await fetch(
    'http://localhost:8080/api/events/get_all_events',
    {
      cache: 'no-cache'
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json() as Promise<Event[]>;
}

async function EventsPage({}: Props) {
  const events = await fetchEvents();

  return (
    <div className="flex flex-col item-center justify-center w-full p-2">
      <div className="w-full">
        <LandingImage />
      </div>
      <h1 className=" font-semibold text-4xl p-4">Events</h1>

      <div className=" flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-start min-w-full gap-4 px-4">
          {events?.map((item) => <EventCard key={item?.eid} event={item} />)}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
