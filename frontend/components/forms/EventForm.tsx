'use client';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardFooter,
  Chip,
  DatePicker,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput
} from '@nextui-org/react';
import { useAuth } from '../../contexts/Auth';
import CustomMap from '../MapCustom';
import FormLoading from './FormLoading';
import { useJsApiLoader } from '@react-google-maps/api';
import { ClockCircleLinearIcon } from '../../constants/ClockCircleLinearIcon';
import {
  Time,
  parseAbsoluteToLocal,
  today,
  getLocalTimeZone,
  CalendarDate
} from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';
import MyTimeComponent from '../Time';
import UploadImage from './UploadImage';

interface CategoryParams {
  id: string;
  categoryName: string;
  description: string;
}

interface Event {
  eventName: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  interestedCount: number;
  categories: string[];
}

type Props = {
  categoryList: CategoryParams[];
};

const EventForm = (props: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string>('');
  const [categoryKeys, setCategoryKeys] = useState<Set<string>>(new Set([]));
  const [startTime, setStartTime] = useState<Time>(new Time(0, 0));
  const [endTime, setEndTime] = useState<Time>(new Time(0, 0));
  const [date, setDate] = React.useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  const [endDate, setEndDate] = useState<CalendarDate>(date);

  const selectedValue = Array.from(categoryKeys).join(', ');
  const libraries = useMemo(() => ['places'], []);
  const selectedCategories = Array.from(categoryKeys);

  const { user } = useAuth();

  console.log(image);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyANxYtaB172BHoalAowcw_SCzJ5-XXoLJA' as string,
    libraries: libraries as any
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const startDateTime = new Date(`${date}T${startTime}Z`).toUTCString();
    const endDateTime = new Date(`${endDate}T${endTime}Z`).toUTCString();

    const events = {
      eventName: formData.get('eventName') as string,
      venue: location,
      startDate: startDateTime,
      endDate: endDateTime,
      description: formData.get('description') as string,
      categories: Array.from(categoryKeys) as string[],
      createdBy: user?.username as string,
      interestedCount: 0
    };

    formData.append('event', JSON.stringify(events));

    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await fetch('http://localhost:8080/events/add_event', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Event created successfully');
      } else {
        console.error('Failed to create event:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
    }
  };

  const chooseLoading = () => {
    if (!isLoaded) {
      return <FormLoading />;
    } else {
      return (
        <div className="w-full ml-2 flex flex-col items-center justify-center gap-4">
          <div className="w-full">
            <Textarea
              placeholder="Event Name"
              name="eventName"
              maxRows={1}
              fullWidth
              style={{
                height: '52px',
                fontSize: '32px',
                overflow: 'hidden',
                resize: 'none',
                lineHeight: '52px',
                textTransform: 'capitalize'
              }}
            />
          </div>

          <div className="w-full">
            <CustomMap isLoaded={isLoaded} setLocation={setLocation} />
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full gap-2">
              <DatePicker
                label="Start date"
                className="w-full"
                isRequired
                name="startDate"
                minValue={today(getLocalTimeZone())}
                onChange={(date) => {
                  setDate(date);
                  setEndDate(date);
                }}
                value={date}
              />
              <TimeInput
                label="Event Start Time"
                value={startTime}
                onChange={setStartTime}
                startContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                name="startTime"
              />
            </div>
            <div className="flex w-full gap-2">
              <DatePicker
                label="End date"
                className="w-full"
                isRequired
                name="endDate"
                value={endDate}
                onChange={setEndDate}
                minValue={date}
              />
              <TimeInput
                label="Event End Time"
                value={endTime}
                onChange={setEndTime}
                startContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                name="endTime"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap gap-1 py-1">
              {selectedCategories?.map((category) => (
                <Chip key={category} color="secondary" size="sm">
                  {category}
                </Chip>
              ))}
            </div>

            <Select
              variant="flat"
              disallowEmptySelection
              placeholder="Select categories"
              label="Categories"
              selectedKeys={categoryKeys}
              aria-label="Static Actions"
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                if (keys instanceof Set) {
                  setCategoryKeys(new Set(keys as Set<string>));
                }
              }}
            >
              {props?.categoryList.map((category) => (
                <SelectItem key={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            name="description"
            maxLength={150}
          />

          <Button type="submit">Create new event</Button>
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full p-4">
      <div className="flex p-2 gap-4 w-full justify-center items-start">
        <UploadImage setImage={setImage} />
        {chooseLoading()}
      </div>
    </form>
  );
};

export default EventForm;
