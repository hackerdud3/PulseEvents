import React from 'react';
import { TimeInput } from '@nextui-org/react';
import {
  Time,
  ZonedDateTime,
  parseAbsoluteToLocal
} from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

export default function MyTimeComponent() {
  let [value, setValue] = React.useState(
    parseAbsoluteToLocal('2024-04-08T18:45:22Z')
  );

  console.log('new time value', value);

  let formatter = useDateFormatter({ dateStyle: 'short', timeStyle: 'long' });

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput
          label="Time (controlled)"
          value={value}
          onChange={setValue}
        />
        <>
          <p className="text-default-500 text-sm">
            {value instanceof ZonedDateTime
              ? (value.toDate && formatter.format(value.toDate())) ||
                (value && value.toString()) ||
                '--'
              : ''}
          </p>
        </>
      </div>
    </div>
  );
}
