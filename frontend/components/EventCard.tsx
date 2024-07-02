'use client';
import { Card, CardHeader, Image, CardBody, Chip } from '@nextui-org/react';
import React from 'react';
import { HeartIcon } from '../constants/HeartIcon';
import { LocationIcon } from '../constants/LocationIcon';
import { UserIcon } from '../constants/UserIcon';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/formatDateTime';

type Props = {
  event: any;
};

const EventCard = (props: Props) => {
  const [liked, setLiked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const { event } = props;
  // Extract start and end date string from event object
  const startDateStr = event?.startDate;
  const endDateStr = event?.endDate;
  // Convert start and end date string to Date object
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Format start date and time
  const formattedStartDate = formatDateTime(startDate);
  // Construct the formatted date and time string
  const formattedStartDateTime = `${formattedStartDate.month}
   ${formattedStartDate.dayOfMonth}, ${formattedStartDate.dayOfWeek}, ${formattedStartDate.formattedHours}:${formattedStartDate.formattedMinutes}${formattedStartDate.ampm}`;
  // Format end date and time
  const formattedEndDate = formatDateTime(endDate);

  const formattedEndDateTime = `${formattedEndDate.month} ${formattedEndDate.dayOfMonth}, ${formattedEndDate.dayOfWeek}, ${formattedEndDate.formattedHours}:${formattedEndDate.formattedMinutes}${formattedEndDate.ampm}`;

  // On pressing the event card navigate to the event page
  const handlePress = () => {
    router.push(`/event/${event?.eid}`);
  };

  return (
    <Card
      key={event?.eid}
      isBlurred
      className="bg-background/80dark:bg-default-100/50 w-full border border-gray-300"
      style={{ width: '100%' }}
      isPressable
      onPress={() => {
        handlePress();
      }}
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-8 md:gap-4 items-start justify-center">
          {/* Event Image */}
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
                <h2 className=" text-3xl font-bold mt-2">{event?.eventName}</h2>
                <h3 className="font-semibold text-foreground/60">
                  {formattedStartDateTime}
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
                    {event?.address?.formattedAddress}
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
