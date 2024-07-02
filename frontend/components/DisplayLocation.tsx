'use client';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useMemo } from 'react';

type Props = {
  lat: number;
  lng: number;
};

const DisplayLocation = (props: Props) => {
  const { lat, lng } = props;
  const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const libraries = useMemo(() => ['places'], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleApiKey as string,
    libraries: libraries as any
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  );

  if (!isLoaded) {
    return (
      <div className="w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card radius="none">
      <CardBody className="p-0">
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '100%', height: '200px' }}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </CardBody>
    </Card>
  );
};

export default DisplayLocation;
