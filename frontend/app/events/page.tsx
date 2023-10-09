"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "@/Contexts/Auth";

type Props = {};

type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
};

async function fetchEvents() {
  try {
    const response = await axios.get<Event[]>("http://localhost:8080/events");

    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

function EventsPage({}: Props) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        localStorage.setItem("Events", JSON.stringify(eventsData));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="w-full flex flex-col item-center justify-center ">
      <div>
        <img
          src="/event1.jpg"
          alt="pulse wallpaper"
          className="w-full h-[30rem] object-cover object-bottom"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center">
          Upcoming Events
        </div>
        <div className="w-full flex flex-wrap items-center justify-center px-10 gap-8">
          {events?.map((item) => (
            <Card
              sx={{
                width: 350,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia component="img" src="/event1.jpg" />
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  {item.event_name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
