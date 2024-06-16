'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from '@nextui-org/react';
import { SearchIcon } from '../constants/SearchIcon';
import { AddIcon } from '../constants/AddIcon';

interface NavigationProps {
  name: string;
  href: string;
}

export default function NavigationBar() {
  const navigation: NavigationProps[] = [
    {
      name: 'Dashboard',
      href: '/'
    },
    {
      name: 'Events',
      href: '/events'
    }
  ];
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarContent className="flex gap-3">
          {navigation.map((item) => (
            <NavbarItem key={item.href}>
              <Link color="foreground" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} height={18} width={18} />}
          type="search"
        />
        <div>
          <Link href="/events/addevent">
            <Button startContent={<AddIcon />}>Create Event</Button>
          </Link>
        </div>
        <div>
          <Dropdown placement="bottom-end">
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
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
