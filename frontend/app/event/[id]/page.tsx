'use client';
import DisplayLocation from '@/components/DisplayLocation';
import { LocationIcon } from '@/constants/LocationIcon';
import { formatDateTime } from '@/utils/formatDateTime';
import { Avatar, Card, Chip, Divider, ScrollShadow } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

async function fetchEvent(eid: string) {
  const response = await fetch(`http://localhost:8080/api/events/${eid}`, {
    method: 'GET',
    cache: 'no-store' // Ensure fresh data on each request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
}

interface Address {
  formattedAddress: string;
  lat: number;
  lng: number;
}

interface Event {
  eventName: string;
  description: string;
  address: Address;
  startDate: string;
  endDate: string;
  createdBy: string;
  interestedCount: number;
  categories: string[];
  eventImage: { data: string };
}

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const event: Event = await fetchEvent(id);
  const startDate = formatDateTime(new Date(event.startDate));
  const endDate = formatDateTime(new Date(event.endDate));

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 p-6">
      {/* Event details */}
      <div className="w-full max-w-[330px] flex flex-col gap-6 rounded-lg">
        {/* Image and name */}
        <div className="flex flex-col gap-6 w-full justify-center items-start">
          <Card isFooterBlurred radius="lg" className="border-none shadow-lg">
            <Image
              alt="Event image"
              className="object-cover rounded-lg"
              height={300}
              src={`data:image/jpeg;base64,${event?.eventImage?.data}`}
              width={300}
              style={{
                width: '100%'
              }}
            />
          </Card>
        </div>

        {/* Presented by */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900">Presented by</h3>
          <div className="flex gap-2 items-center">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-8 h-8"
            />
            <p className="text-gray-700">{event?.createdBy}</p>
          </div>
        </div>
        <Divider />
        <div className="w-full flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900">Hosted by</h3>
          <div className="flex gap-2 items-center">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-8 h-8"
            />
            <p className="text-gray-700">{event?.createdBy}</p>
          </div>
        </div>
        <Divider />
        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {event?.categories?.map((category) => (
              <Chip key={category}>{category}</Chip>
            ))}
          </div>
        </div>
      </div>

      {/* About section */}
      <div className=" flex flex-col gap-4 w-full">
        <div className="w-full flex flex-col py-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
            {event?.eventName}
          </h1>
        </div>
        <Divider />
        {/* Address */}
        <div className="w-full flex gap-4 items-center justify-start">
          <div className="flex items-center justify-center border-2 p-2 rounded-lg min-w-12 min-h-12">
            <LocationIcon />
          </div>
          <div className="flex flex-col items-start justify-center ">
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-gray-700 text-wrap">
              {event?.address?.formattedAddress}
            </p>
          </div>
        </div>
        {/* Date and time */}
        <div className="w-full flex gap-4 items-center justify-start">
          <div className="flex flex-col w-12 h-12">
            <div className="w-full py-2 text-black rounded-t-lg h-5 flex bg-gray-300 justify-center items-center">
              <p className="text-sm font-semibold">{startDate.month}</p>
            </div>
            <div className="flex items-center justify-center border-2 rounded-b-lg border-t-0 text-black">
              <p className="text-lg">{startDate.dayOfMonth}</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h3 className="font-semibold text-gray-900">
              {startDate.dayOfWeek}, {startDate.month} {startDate.dayOfMonth}
            </h3>
            <p className="text-gray-700">
              {startDate.formattedHours}:{startDate.formattedMinutes}{' '}
              {startDate.ampm} - {endDate.formattedHours}:
              {endDate.formattedMinutes} {endDate.ampm}
            </p>
          </div>
        </div>
        <Divider />
        {/* Location */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900">Location</h3>
          <p className="text-gray-700">{event?.address?.formattedAddress}</p>
          <DisplayLocation
            lat={event?.address?.lat}
            lng={event?.address?.lng}
          />
        </div>
        <div className=" flex flex-col gap-4 rounded-lg max-h-[80vh] w-full">
          <h3 className="font-semibold text-lg text-gray-900">About</h3>
          <Divider />
          <ScrollShadow size={5} className="max-h-screen">
            <p className="text-gray-700">{event?.description}</p>
          </ScrollShadow>
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default page;
