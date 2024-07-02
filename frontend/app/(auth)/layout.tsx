import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Image } from '@nextui-org/react';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pulse Events'
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full justify-center items-center flex my-auto">
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div>
            <Image
              src="./pulse-events.png"
              className="rounded-none"
              width={100}
              height={100}
              alt="Pulse Logo"
            />
          </div>
          {children}
        </div>
      </Suspense>
    </div>
  );
}
