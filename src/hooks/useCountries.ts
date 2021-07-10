import { useEffect, useState } from 'react';
import { Country } from '../App';
import requestCountries from '../services/requestCountries';

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountriesList = async () => {
      const responseData = await requestCountries();

      setCountries(responseData);
    };

    getCountriesList();
  }, []);

  return countries;
};

export default useCountries;
