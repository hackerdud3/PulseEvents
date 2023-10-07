import React from "react";
import { Card, TextInput, Title } from "@tremor/react";
import Link from "next/link";
import CustomButton from "@/Components/button";

type Props = {};

function Loginpage({}: Props) {
  return (
    <div id="login" className="w-full h-full flex justify-center items-center">
      <div className=" w-full rounded-md max-w-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-96 flex flex-col px-8 gap-5 justify-start">
        <Title className="mt-8 text-lg">Login</Title>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Email"
            spellCheck={false}
          />
        </div>
        <div className="rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            spellCheck={false}
          />
        </div>
        <Link href="/forgotpassword">
          <h4 className="ml-2">Forgot Password</h4>
        </Link>
        <div className="w-full mt-4">
          <CustomButton
            name="Login"
            color="bg-violet-500"
            textcolor="text-white"
            className="w-full hover:bg-violet-600"
          />
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
