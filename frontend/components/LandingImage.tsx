'use client';
import { Card, CardFooter, CardHeader, Image, Button } from '@nextui-org/react';
import React from 'react';

type Props = {};

const LandingImage = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="w-full p-4">
      <Card
        isHoverable
        isFooterBlurred
        className="w-full col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-end">
          <h3 className="text-small text-black uppercase font-semibold">
            Events That Inspire
          </h3>
          <h4 className="text-black font-medium text-xl">
            Unforgettable Moments Await
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          onLoad={() => setIsLoading(false)}
          isLoading={isLoading}
          isBlurred
          style={{ width: '100%', height: '380px' }}
          alt="Events landing image"
          className="z-0 w-full h-full object-cover"
          src="https://assets.gqindia.com/photos/6405cf2f23a53bae9e23ed86/16:9/w_1920,c_limit/biggest-holi-events-to-check-out-this-year.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image alt="Pulse icon" src="../pulse-black.svg" width={50} />
            <div className="flex flex-col">
              <p className="text-tiny text-black">Breathing App</p>
              <p className="text-tiny text-black">Get</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Show Events
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingImage;
