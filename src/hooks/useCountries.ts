import { useEffect, useState } from 'react';
import requestCountries from '../services/requestCountries';

interface Country {
  Country: string;
  Slug: string;
  ISO2: string;
}

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
