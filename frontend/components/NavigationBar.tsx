// components/NavigationBar.tsx
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button
} from '@nextui-org/react';
import { SearchIcon } from '../constants/SearchIcon';
import { AddIcon } from '../constants/AddIcon';
import DropDown from './DropDown';
import { getUserCookie } from '@/utils/cookieUtils';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import Image from 'next/image';

interface NavigationProps {
  name: string;
  href: string;
}

type Props = {};

export default function NavigationBar(props: Props) {
  const userCookie = getUserCookie();
  const token = cookies().get('token');
  console.log(userCookie);
  console.log(token);

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
    <Navbar isBordered maxWidth="full">
      <NavbarBrand>
        <Link href="/" color="foreground">
          <Image
            alt="pulse-logo"
            width={50}
            height={50}
            src="../pulse-black.svg"
          />
        </Link>
      </NavbarBrand>
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
          {userCookie ? (
            <DropDown userCookie={userCookie} />
          ) : (
            <Link href="/signin">
              <Button color="primary">Sign In</Button>
            </Link>
          )}
        </div>
      </NavbarContent>
    </Navbar>
  );
}
