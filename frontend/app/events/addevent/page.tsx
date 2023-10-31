'use client';

import { Button } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/Contexts/Auth';
import Datepicker from '@/app/components/datepicker';
import { AnyAaaaRecord } from 'dns';

const AddEvent = () => {
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    event_name: '',
    venue: '',
    num_attending: '',
    date: '',
    month: '',
    day: '',
    time: ''
  });

  const [eventdate, setDate] = useState('');

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'date') {
      const formattedDate = formatDate(e.target.value);
      setDate(e.target.value);
      setFormData({
        ...formData,
        month: formattedDate.month,
        date: formattedDate.date,
        day: formattedDate.day
      });
    } else if (name === 'time') {
      setFormData({ ...formData, time: e.target.value });
    }
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    dateObj.setDate(dateObj.getDate() + 1);

    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      dateObj
    );
    const date = dateObj.getDate().toString();
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
      dateObj
    );

    return { month, date, day };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    const token = user.token;

    event.preventDefault();
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('eventImage', image);
    formDataToSend.append('eventData', JSON.stringify(formData));
    formDataToSend.append('token', token);

    try {
      const response = await axios.post(
        'http://localhost:8080/addevent',
        formDataToSend,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        console.log('Event added successfully!');
      } else {
        console.error('Error adding event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 mt-8 gap-8"
        encType="multipart/form-data"
      >
        <div className="flex w-full justify-center items-center gap-8">
          <div className="rounded-md shadow-sm w-full ">
            <input
              type="text"
              name="event_name"
              id="event_name"
              value={formData.event_name}
              onChange={handleChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Event Name"
              spellCheck={false}
            />
          </div>

          <div className="rounded-md shadow-sm w-full">
            <input
              type="text"
              name="venue"
              id="venue"
              value={formData.venue}
              onChange={handleChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Venue"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 w-full">
          <div className="rounded-md shadow-sm w-full">
            <input
              type="date"
              name="date"
              id="date"
              value={eventdate}
              onChange={handleDateChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Date"
              spellCheck={false}
            />
            {/* <Datepicker value={formData.date} name="date" /> */}
          </div>

          <div>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleDateChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Time"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-8">
          <div className="rounded-md shadow-sm w-full ">
            <input
              type="number"
              name="num_attending"
              id="num_attending"
              value={formData.num_attending}
              onChange={handleChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Number of Participants"
              spellCheck={false}
            />
          </div>

          {/* <div className="rounded-md shadow-sm w-full">
            <select
              name="attending"
              id="attending"
              value={formData.attending.toString()}
              onChange={handleChange}
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div> */}
        </div>

        <div className="rounded-md shadow-sm w-full">
          <label
            htmlFor="eventImage"
            className="block text-sm font-medium text-gray-700"
          >
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="eventImage"
            id="eventImage"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label
            htmlFor="eventImage"
            className="h-10 block w-full rounded-md border border-gray-200 pl-4 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
          >
            Choose an image
          </label>
        </div>

        <div className="flex  w-full items-center justify-end">
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
