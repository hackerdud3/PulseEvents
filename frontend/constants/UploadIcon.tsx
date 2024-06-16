import React from 'react';

interface SearchIconProps {
  size?: number;
  strokeWidth?: number;
  width?: number | string;
  height?: number | string;
  [x: string]: any;
}

export const UploadIcon: React.FC<SearchIconProps> = ({
  size = 18,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-upload"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
    <path d="M7 9l5 -5l5 5" />
    <path d="M12 4l0 12" />
  </svg>
);
