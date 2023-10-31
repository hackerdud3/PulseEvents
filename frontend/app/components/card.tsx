import { Disclosure, Menu } from '@headlessui/react';
import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { Card, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';

type Props = {
  item: any;
};

const EveCard = (props: Props) => {
  const [attending, isAttending] = useState<boolean>(props.item.attending);
  const [event, setEvent] = useState(props?.item);

  const createdDate = new Date(event.createdDate);

  const month = createdDate.toLocaleString('en-US', { month: 'long' });
  const substring = month.slice(0, 3);
  const date = createdDate.getDate();
  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes();
  const imageData =
    props.item && props.item.eventImage
      ? `data:image/jpeg;base64,${props.item.eventImage.toString('base64')}`
      : ''; // Set a default value if eventImage is null or undefined

  const toggleInterest = () => {
    isAttending(!attending);
    setEvent({ ...event, attending: attending });
    updateEvent(event);
  };

  const updateEvent = async (updatedEvent: any) => {
    try {
      axios.put(
        `http://localhost:8080/event/${updatedEvent?.eid}`,
        updatedEvent
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-md w-[362px] inline-block">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex flex-col w-full h-72 rounded-lg bg-white shadow-sm text-left text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <div></div>
              <div className="h-36 w-full ">
                <Image
                  width={1000}
                  height={1000}
                  src={imageData}
                  alt="event-image"
                  className="w-full h-36 rounded-tl-lg rounded-tr-lg overflow-hidden object-cover object-bottom "
                />
              </div>

              <div className="p-4 h-full w-full justify-between flex flex-col ">
                <div className="flex justify-start items-start gap-6">
                  {/* calender card */}
                  <Card
                    className=" font-semibold bg-slate-50"
                    sx={{
                      height: 60,
                      width: 70,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div className="w-full h-4 rounded-sm bg-red-500"></div>
                    <div className="flex justify-center items-center flex-col">
                      <h4 className=" font-light uppercase">{substring}</h4>
                      <h3 className=" text-2xl">{date}</h3>
                    </div>
                  </Card>

                  <div className="flex max-w-full flex-col justify-between h-full flex-1 items-start">
                    <h1 className="text-2xl overflow-hidden text-left ">
                      {event?.event_name}
                    </h1>

                    <Typography sx={{ fontSize: '14px' }}>
                      {hours} : {minutes}
                    </Typography>
                  </div>
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-1 justify-start items-center ">
                    <LocationOnIcon color="action" sx={{ fontSize: '18px' }} />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{
                        display: 'flex',
                        gap: '2px',
                        alignItems: 'center',
                        fontSize: '14px',
                        justifyContent: 'center',
                        padding: '0px',
                        overflow: 'hidden'
                      }}
                    >
                      {event?.venue}
                    </Typography>
                  </div>
                  <div className="flex flex-col justify-end items-center relative mr-12">
                    <IconButton onClick={toggleInterest}>
                      {attending ? (
                        <FavoriteOutlined color="error" />
                      ) : (
                        <FavoriteBorderOutlined />
                      )}
                    </IconButton>
                    {attending ? (
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        component="div"
                        sx={{
                          fontSize: '14px',
                          position: 'absolute',
                          bottom: '-8px'
                        }}
                      >
                        interested
                      </Typography>
                    ) : null}
                  </div>
                </div>
              </div>
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default EveCard;
