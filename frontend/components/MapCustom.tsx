'use client';
import { GoogleMap, Marker } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PlacesAutocomplete from './MapPlaces';
import { Card, CardBody } from '@nextui-org/react';

type Props = {
  isLoaded: boolean;
  setLocation: (location: string) => void;
};

const CustomMap: NextPage<Props> = ({ isLoaded, setLocation }) => {
  const [lat, setLat] = useState(37.8098707302915);
  const [lng, setLng] = useState(-122.4085089197085);
  const [mapLoaded, setMapLoaded] = useState(false); // Track map loading state

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  );

  return (
    <div className="w-full">
      <div className="w-full">
        {/* render Places Auto Complete and pass custom handler which updates the state */}
        <PlacesAutocomplete
          setMapLoaded={setMapLoaded}
          setLocation={setLocation}
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              if (address) {
                setLocation(address);
                setMapLoaded(true);
              } else {
                setMapLoaded(false);
              }

              const { lat, lng } = getLatLng(results[0]);
              setLat(lat);
              setLng(lng);
            });
          }}
        />
      </div>

      {/* Google map component */}
      <div className="w-full -z-10 mt-1 ">
        {mapLoaded && (
          <Card>
            <CardBody className="p-0 ">
              <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '150px' }}
                onLoad={() => setMapLoaded(true)} // Update map loaded state
              >
                <Marker
                  position={mapCenter}
                  onLoad={() => console.log('Marker Loaded', lat, lng)}
                />
              </GoogleMap>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomMap;
