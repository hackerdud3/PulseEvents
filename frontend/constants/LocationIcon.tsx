import React from 'react';

interface LocationIconProps {
  size?: number;
  strokeWidth?: number;
  [x: string]: any;
}

export const LocationIcon: React.FC<LocationIconProps> = ({
  size = 18,
  strokeWidth = 1.5,
  fill = 'none',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);
