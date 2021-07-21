import { useEffect, useState } from 'react';
import { getLocalState, saveToLocalState } from '../utils/localStorage';

const defaultCountries = ['ukraine', 'russia'];

const useSelectedCountries = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const countriesFromUrl = searchParams.get('countries')?.split(',');

  const initialCountries =
    countriesFromUrl || getLocalState('selectedCountries') || defaultCountries;

  const [selectedCountries, setSelectedCountries] =
    useState<string[]>(initialCountries);

  useEffect(() => {
    saveToLocalState('selectedCountries', selectedCountries);
  }, [selectedCountries]);

  return { selectedCountries, setSelectedCountries };
};

export default useSelectedCountries;
