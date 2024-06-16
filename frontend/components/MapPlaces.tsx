import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { LocationIcon } from '../constants/LocationIcon';

type PlacesAutocompleteProps = {
  onAddressSelect?: (address: string) => void;
  setMapLoaded?: (mapLoaded: boolean) => void;
  setLocation?: (location: string) => void;
};

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onAddressSelect,
  setMapLoaded,
  setLocation
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'us' } },
    debounce: 300,
    cache: 86400
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description
      } = suggestion;

      return (
        <ListboxItem
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
          description={secondary_text}
        >
          {main_text}
        </ListboxItem>
      );
    });
  };

  return (
    <div className="relative w-full">
      <Input
        fullWidth
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
        disabled={!ready} // Disable input until both isLoaded and ready are true
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onClear={() => {
          setValue('');
          setMapLoaded && setMapLoaded(false);
          clearSuggestions();
          setLocation && setLocation('');
        }}
      />

      {status === 'OK' && (
        <Listbox
          className="absolute w-full px-1 py-2 rounded-lg border-default-200 mt-1 max-h-60 overflow-y-auto z-50 shadow-md bg-white"
          aria-label="Listbox menu with descriptions"
        >
          {renderSuggestions()}
        </Listbox>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
