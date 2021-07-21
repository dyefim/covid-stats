import { useCallback, useEffect, useState } from 'react';
import { FiltersForLiveData } from '../types/filters';
import requestCountryCases from '../services/requestCountryCases';
import { appendToState } from '../utils/stateMutations';

interface Params {
  selectedCountries: string[];
  filters: FiltersForLiveData;
}

const useCountriesData = ({ selectedCountries, filters }: Params) => {
  const [countriesDataByDate, setCountriesDataByDate] = useState({});

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

  const requestDataForSingleCountry = useCallback( async (country: string) => {
    const response = await getDataByCounry({
      country,
      date_from: filters.date_from,
    });

    if (response && response.length) {
      setCountriesDataByDate(appendToState(response));
    }
  }, [filters.date_from]);

  useEffect(() => {
    setCountriesDataByDate({});

    selectedCountries.forEach(async (country, index) => {
      setTimeout(() => {
        requestDataForSingleCountry(country);
      }, index * 750);
    });
  }, [requestDataForSingleCountry, selectedCountries]);

  return countriesDataByDate;
};

export default useCountriesData;
