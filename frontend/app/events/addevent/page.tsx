import React from 'react';
import EventForm from '../../../components/forms/EventForm';
import EventCard from '../../../components/EventCard';

async function fetchCategories() {
  const response = await fetch('http://localhost:8080/categories', {
    cache: 'no-store' // Ensure fresh data on each request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

const page = async () => {
  const categories = await fetchCategories();
  return (
    <div className="w-full flex justify-center items-start bg-gradient-to-r rounded-2xl">
      <EventForm categoryList={categories} />
    </div>
  );
};

export default page;
