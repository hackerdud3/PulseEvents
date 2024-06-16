'use client';
import { Card, CardHeader, Image, CardBody, Chip } from '@nextui-org/react';
import React from 'react';
import { HeartIcon } from '../constants/HeartIcon';
import { LocationIcon } from '../constants/LocationIcon';
import { UserIcon } from '../constants/UserIcon';
import { CalendarDate, parseAbsoluteToLocal } from '@internationalized/date';

type Props = {
  event: any;
};

const EventCard = (props: Props) => {
  const [liked, setLiked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { event } = props;
  const startDateStr = event?.startDate;
  const endDateStr = event?.endDate;

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Function to format date and time
  const formatDateTime = (date: Date) => {
    // Months array (0-indexed)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    // Days of the week array
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    // Get components of the date
    const month = months[date.getUTCMonth()]; // Get abbreviated month name
    const dayOfMonth = date.getUTCDate(); // Get day of the month
    const dayOfWeek = daysOfWeek[date.getUTCDay()]; // Get full day name
    const hours = date.getUTCHours(); // Get hours (0-23)
    const minutes = date.getUTCMinutes(); // Get minutes

    console.log(date.getUTCDay());

    // Format hours to 12-hour format with AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert midnight (0) to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure minutes are two digits

    // Construct the formatted date and time string
    const formattedDateTime = `${month} ${dayOfMonth}, ${dayOfWeek}, ${formattedHours}:${formattedMinutes}${ampm}`;

    return formattedDateTime;
  };

  // Format start date and time
  const formattedStartDate = formatDateTime(startDate);

  return (
    <Card
      key={event?.eid}
      isBlurred
      className="bg-background/80dark:bg-default-100/50 w-full border border-gray-300"
      style={{ width: '100%' }}
      isPressable
      onPress={() => console.log('Card pressed')}
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-8 md:gap-4 items-start justify-center">
          <div className="relative col-span-6 md:col-span-4 h-full w-full">
            <Image
              alt="Card background"
              className="object-cover"
              src={`data:image/jpeg;base64,${event?.eventImage?.data}`}
              shadow="md"
              onLoad={() => setIsLoading(false)}
              isLoading={isLoading}
              style={{
                width: '220px',
                height: '220px',
                aspectRatio: '1/1',
                objectFit: 'cover'
              }}
            />
          </div>

          <div className="flex flex-col  col-span-6 md:col-span-8">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-start items-center gap-2">
                  <p className="text-tiny text-foreground/80 font-semibold">
                    Categories:
                  </p>
                  <div className="flex gap-2 overflow-hidden pl-1">
                    {event?.categories?.map((category: string) => (
                      <Chip key={category} color="primary" size="sm">
                        {category}
                      </Chip>
                    ))}
                  </div>
                </div>
                <h2 className=" text-9xl font-semibold mt-2">
                  {event?.eventName}
                </h2>
                <h3 className="font-semibold text-foreground/60">
                  {formattedStartDate}
                </h3>
                <div className="flex items-center justify-start gap-2 mt-2">
                  <UserIcon />
                  <p className="text-small text-foreground/80">
                    By {event?.createdBy}
                  </p>
                </div>

                <div className="flex gap-2 items-start justify-start mt-2">
                  <LocationIcon />
                  <p className="text-small text-foreground/80 w-full ">
                    {event?.venue}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-center mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventCard;
