import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
  eventImage: string;
};

type Props = {
  token: string;
};

export default function useFetchEvents({ token }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  console.log(token);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          'http://localhost:8080/events',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [token]);

  return events;
}
