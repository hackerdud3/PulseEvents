import React from 'react';

interface LocationIconProps {
  size?: number;
  strokeWidth?: number;
  [x: string]: any;
}

export const AddIcon: React.FC<LocationIconProps> = ({
  size = 18,
  strokeWidth = 1.5,
  fill = 'none',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
