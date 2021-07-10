import { useEffect, useState } from 'react';
import { getLocalState, saveToLocalState } from '../utils/localStorage';

const initialCountries = ['ukraine', 'russia'];

const useSelectedCountries = (countries = initialCountries) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    () => getLocalState('selectedCountries') || countries
  );

  useEffect(() => {
    saveToLocalState('selectedCountries', selectedCountries);
  }, [selectedCountries]);

  return { selectedCountries, setSelectedCountries };
};

export default useSelectedCountries;
