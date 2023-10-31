import { Disclosure } from '@headlessui/react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl relative mx-auto justify-center items-center px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
