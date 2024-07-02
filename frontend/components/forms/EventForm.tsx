'use client';
import React, { FormEvent, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
  TimeInput
} from '@nextui-org/react';
import { useAuth } from '@/providers/auth-provider';
import FormLoading from './FormLoading';
import { useJsApiLoader } from '@react-google-maps/api';
import { ClockCircleLinearIcon } from '../../constants/ClockCircleLinearIcon';
import {
  Time,
  today,
  getLocalTimeZone,
  CalendarDate
} from '@internationalized/date';
import UploadImage from './UploadImage';
import CustomgGoogleMap from '../CustomGoogleMap';
import { useSnackbar } from '@/providers/snackbar-provider';
import Cookies from 'js-cookie';

interface CategoryParams {
  id: string;
  categoryName: string;
  description: string;
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
}

type Props = {
  categoryList: CategoryParams[];
};

const EventForm = (props: Props) => {
  // State variables for the create event form
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string>('');
  const [lat, setLat] = useState(37.8098707302915);
  const [lng, setLng] = useState(-122.4085089197085);
  const [categoryKeys, setCategoryKeys] = useState<Set<string>>(new Set([]));
  const [startTime, setStartTime] = useState<Time>(new Time(0, 0));
  const [endTime, setEndTime] = useState<Time>(new Time(0, 0));
  const [date, setDate] = React.useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  const [endDate, setEndDate] = useState<CalendarDate>(date);
  // Get the openSnackbar function from the snackbar provider
  const { openSnackbar } = useSnackbar();
  // Get the user object from the auth provider
  const { user } = useAuth();
  // Convert the set of selected categories to an array
  const selectedCategories = Array.from(categoryKeys);

  const selectedValue = Array.from(categoryKeys).join(', ');

  // Load the Google Maps Places API using the useJsApiLoader hook
  const libraries = useMemo(() => ['places'], []);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleApiKey as string,
    libraries: libraries as any
  });

  // Handle form submission for creating a new event
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Create a new FormData object from the form data
    const formData = new FormData(event.target as HTMLFormElement);
    // Get the start and end date and time strings and convert them to UTC strings
    const startDateTime = new Date(`${date}T${startTime}Z`).toUTCString();
    const endDateTime = new Date(`${endDate}T${endTime}Z`).toUTCString();
    // Create an events object with the form data
    const address: Address = {
      formattedAddress: location,
      lat: lat,
      lng: lng
    };
    const events: Event = {
      eventName: formData.get('eventName') as string,
      address: address,
      startDate: startDateTime,
      endDate: endDateTime,
      description: formData.get('description') as string,
      categories: Array.from(categoryKeys) as string[],
      createdBy: user?.username as string,
      interestedCount: 0
    };
    // Append the events object to the FormData object as a JSON string
    formData.append('event', JSON.stringify(events));
    // Append the image file to the FormData object
    if (image) {
      formData.append('file', image);
    }

    const token = Cookies.get('token');
    // Send a POST request to the server to create a new event
    try {
      const response = await fetch(
        'http://localhost:8080/api/events/add_event',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Check if the response is OK
      if (response.ok) {
        openSnackbar('Event created successfully', 'success');
      }
    } catch (error) {
      openSnackbar('Failed to create event', 'error');
    }
  };

  // Choose the loading state or the form based on the isLoaded state
  const chooseLoading = () => {
    if (!isLoaded) {
      return <FormLoading />;
    } else {
      return (
        <div className="w-full ml-2 flex flex-col items-center justify-center gap-4">
          {/* Text area for event name */}
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
          {/* Places input and google map */}
          <div className="w-full">
            <CustomgGoogleMap
              isLoaded={isLoaded}
              setLocation={setLocation}
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
            />
          </div>
          {/* Date and time pickers */}
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
          {/* Categories and description */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap gap-1 py-1">
              {selectedCategories?.map((category) => (
                <Chip key={category} color="secondary" size="sm">
                  {category}
                </Chip>
              ))}
            </div>
            {/* Select category component */}
            <Select
              variant="flat"
              disallowEmptySelection
              placeholder="Select categories"
              label="Categories"
              selectedKeys={categoryKeys}
              aria-label="Static Actions"
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                // Check if the keys are an instance of Set
                if (keys instanceof Set) {
                  // Set the category keys to the selected keys
                  setCategoryKeys(new Set(keys as Set<string>));
                }
              }}
            >
              {/* Map over the category list and create a select item for each category */}
              {props?.categoryList.map((category) => (
                <SelectItem key={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* Text area for event description */}
          <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            name="description"
          />

          <Button type="submit">Create new event</Button>
        </div>
      );
    }
  };

  return (
    // Form element for creating a new event
    <form onSubmit={handleSubmit} className="flex w-full p-4">
      <div className="flex p-2 gap-4 w-full justify-center items-start">
        <UploadImage setImage={setImage} />
        {chooseLoading()}
      </div>
    </form>
  );
};

export default EventForm;
