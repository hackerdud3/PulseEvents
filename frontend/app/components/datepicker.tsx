import React, { useState } from 'react';

type Props = {
  value: string;
  name: string;
};

const Datepicker = (props: Props) => {
  const [date, setDate] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const formattedDate = formatDate(e.target.value);
    setDate(formattedDate);
  };
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return dateObj.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        name={props.name}
        className="h-10 block w-full rounded-md border border-gray-200 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Date"
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Datepicker;
