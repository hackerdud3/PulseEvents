"use client";
import { TextField } from "@mui/material";

import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full">
      <form className="flex flex-col w-96 mt-8 gap-8">
        <div className="flex w-full justify-center items-center gap-8">
          <div className="rounded-md shadow-sm w-full ">
            <input
              type="text"
              name="eventname"
              id="eventname"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Event Name"
              spellCheck={false}
            />
          </div>
          <div className="rounded-md shadow-sm w-full">
            <input
              type="text"
              name="eventname"
              id="eventname"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Venue"
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 w-full">
          <div className="rounded-md shadow-sm w-full ">
            <input
              type="text"
              name="eventname"
              id="eventname"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Venue"
              spellCheck={false}
            />
          </div>
          <div className="rounded-md shadow-sm w-full">
            <input
              type="date"
              name="eventname"
              id="eventname"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Date"
              spellCheck={false}
            />
          </div>
        </div>
        {/* <DatePicker className="h-6" /> */}
        <div className="flex w-full justify-center items-center gap-8">
          <div className="rounded-md shadow-sm w-full ">
            <input
              type="number"
              name="eventname"
              id="eventname"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Event Name"
              spellCheck={false}
            />
          </div>
          <div className="rounded-md shadow-sm w-full">
            <select
              name="attending"
              id="attending"
              className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="rounded-md shadow-sm w-full">
          <label
            htmlFor="eventImage"
            className="block text-sm font-medium text-gray-700"
          >
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="eventImage"
            id="eventImage"
            className="sr-only"
          />
          <label
            htmlFor="eventImage"
            className="h-10 block w-full rounded-md border border-gray-200 pl-4 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
          >
            Choose an image
          </label>
        </div>
      </form>
    </div>
  );
};

export default page;
