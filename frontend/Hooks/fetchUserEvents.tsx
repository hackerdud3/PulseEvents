import axios from 'axios';
import { error } from 'console';
import React, { useEffect, useState } from 'react';

type Props = {
  userId: string;
};
type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
  eventImage: string;
  userId: string;
};

function useFetchUserEvents({ userId }: Props) {
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          `http://localhost:8080/myevents/${userId}`
        );
        setUserEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [userId]);

  return userEvents;
}

export default useFetchUserEvents;
