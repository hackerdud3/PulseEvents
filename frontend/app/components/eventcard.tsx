import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Props = {
  item: any;
};

const Eventcard = (props: Props) => {
  const [attending, isAttending] = useState<boolean>(props.item.attending);
  const [event, setEvent] = useState(props?.item);

  const createdDate = new Date(event.createdDate);

  const month = createdDate.toLocaleString('en-US', { month: 'long' });
  const date = createdDate.getDate();
  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes();

  const toggleInterest = () => {
    isAttending(!attending);
    setEvent({ ...event, attending: !attending });
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
    <div className="relative">
      <Card
        sx={{
          width: 380,
          height: 350,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardMedia
          component="img"
          src="/event1.jpg"
          sx={{ position: 'relative' }}
        />
        <Card
          sx={{
            padding: '0px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 120,
            height: 80,
            bottom: '110px',
            right: '12px'
          }}
        >
          <h1 className="text-violet-500 font-semibold text-3xl">
            {props?.item?.num_attending}
          </h1>
          <h2 className="text-violet-500 font-semibold">Attending</h2>
        </Card>

        <CardContent
          sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between'
          }}
        >
          <Card
            className=" font-semibold bg-slate-50"
            sx={{
              padding: '0px 16px',
              height: 60,
              width: 70,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h4>{month}</h4>
            <h4>{date}</h4>
          </Card>
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap justify-between">
            <div className="flex flex-col justify-center items-start">
              <div>
                <Typography
                  sx={{ display: 'flex', fontWeight: 900, fontSize: '20px' }}
                  component="div"
                >
                  {event?.event_name}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}
                >
                  <LocationOnIcon fontSize="small" />
                  {event?.venue}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center relative mr-2">
            <IconButton onClick={toggleInterest}>
              {attending ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
            {attending ? (
              <Typography
                variant="h5"
                color="text.secondary"
                component="div"
                sx={{ fontSize: '14px', position: 'absolute', bottom: '8px' }}
              >
                interested
              </Typography>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Eventcard;
