import { useEffect, useState } from 'react';
import { FiltersForLiveData } from '../App';
import requestCountryCases from '../services/requestCountryCases';
import { appendToState } from '../utils/stateMutations';

interface Params {
  selectedCountries: string[];
  filters: FiltersForLiveData;
}

const useCountriesData = ({ selectedCountries, filters }: Params) => {
  const [countriesDataByDate, setCountriesDataByDate] = useState({});

  useEffect(() => {
    const getDataByCounry = async ({
      country,
      date_from,
    }: {
      country: string;
      date_from: string;
    }) => {
      const responseData = await requestCountryCases({
        country,
        date_from,
      });

      return responseData;
    };

    setCountriesDataByDate({});

    selectedCountries.forEach(async (country) => {
      const response = await getDataByCounry({
        country,
        date_from: filters.date_from,
      });

      if (response && response.length) {
        setCountriesDataByDate((state) => appendToState(state, response));
      }
    });
  }, [filters.date_from, selectedCountries]);

  return countriesDataByDate;
};

export default useCountriesData;
