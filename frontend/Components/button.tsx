"use client";
import React from "react";
import { Button } from "@tremor/react";

type Props = {
  name: string;
  color: string;
  textcolor: string;
  className?: string;
};

const CustomButton = (props: Props) => {
  return (
    <Button
      size="md"
      className={`${props.color} px-4 py-2 rounded-md justify-center items-center  ${props.textcolor} ${props.className}`}
    >
      {props.name}
    </Button>
  );
};

export default CustomButton;
