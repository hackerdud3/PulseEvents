import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import { SearchIcon } from '../constants/SearchIcon';
import { LocationIcon } from '../constants/LocationIcon';
import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

const Places = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANxYtaB172BHoalAowcw_SCzJ5-XXoLJA' as string,
    libraries: ['places']
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    debounce: 300
  });

  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
      });
    };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const renderSuggestions = (): JSX.Element[] =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      console.log(suggestion);

      return (
        <ListboxItem key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </ListboxItem>
      );
    });

  return (
    <div className="w-full">
      <Input
        isClearable
        radius="lg"
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60'
          ],
          inputWrapper: [
            'shadow-xl',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focus=true]:bg-default-200/50',
            'dark:group-data-[focus=true]:bg-default/60',
            '!cursor-text'
          ]
        }}
        placeholder="Search location..."
        startContent={
          <LocationIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        value={value}
        onChange={handleInput}
      />

      {status === 'OK' && (
        <Listbox variant="flat" aria-label="Listbox menu with descriptions">
          {renderSuggestions()}
        </Listbox>
      )}
    </div>
  );
};

export default Places;
