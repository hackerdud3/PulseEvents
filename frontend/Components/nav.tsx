"use client";
import React, { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./button";
import { Button } from "@tremor/react";
import MenuIcon from "@mui/icons-material/Menu";

import Divider from "@mui/material/Divider";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Events", href: "/events" },
];

function NavBar() {
  const [isOpen, setMenuToggle] = useState(false);

  const toggleOpen = () => {
    setMenuToggle(true);
  };
  const toggleClose = () => {
    setMenuToggle(false);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm w-full">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex justify-between items-center">
              <div className="flex justify-center items-center gap-8">
                <Image
                  src="/pulse-black.svg"
                  alt="pulse-events logo"
                  width={60}
                  height={60}
                />
                <div className="hidden sm:flex sm:gap-6">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <Button variant="light">{item.name}</Button>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex sm:gap-2">
                <Link href="/signin">
                  <CustomButton
                    name="Sign In"
                    textcolor="text-black"
                    color="bg-white"
                    className="hover:bg-gray-100"
                  />
                </Link>
                <Link href="/signup">
                  <CustomButton
                    name="Sign Up"
                    color="bg-slate-900"
                    textcolor="text-white"
                    className="hover:bg-slate-700"
                  />
                </Link>
              </div>
              <div className="sm:hidden">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <span className="rounded-md shadow-sm">
                      <Menu.Button
                        onClick={toggleOpen}
                        className="bg-white dark:bg-gray-800 dark:text-white px-2 py-2 text-sm font-medium border border-gray-300 rounded-md"
                      >
                        <MenuIcon fontSize="small" />
                      </Menu.Button>
                    </span>
                  </div>
                  {isOpen ? (
                    <Menu.Items
                      as="ul"
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      {navigation.map((item) => (
                        <Link href={item.href}>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {item.name}
                              </button>
                            )}
                          </Menu.Item>
                        </Link>
                      ))}
                      <Divider sx={{ marginTop: "2rem" }} />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Sign In
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Sign Up
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  ) : null}
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
