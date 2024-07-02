'use client';
import { useAuth } from '@/providers/auth-provider';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import React from 'react';

type Props = {
  userCookie: any;
};

const DropDown = (props: Props) => {
  const { userCookie } = props;

  let user = null;

  if (userCookie) {
    user = JSON.parse(userCookie);
  }
  const { signOut } = useAuth();

  return (
    <Dropdown placement="bottom-end" className="w-full">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-2">
        <DropdownItem key="profile" className="gap-2 ">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-transform: uppercase">
              {user?.username}
            </span>
            <span className="text-default-400">{user?.email}</span>
          </div>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
