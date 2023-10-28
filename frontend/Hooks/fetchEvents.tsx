import React from 'react';
import axios from 'axios';

type Props = {
  token: string;
};

export default function fetchEvents({ token }: Props) {
  try {
    const response = await axios.get<Event[]>('http://localhost:8080/events', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'Content-type': 'Application/json',
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  return Response.data;
}
