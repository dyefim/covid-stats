import { useEffect, useState } from 'react';
import { FiltersForLiveData } from '../App';
import requestCountryCases from '../services/requestCountryCases';
import { appendToState } from '../utils/stateMutations';

interface Params {
  selectedCountries: string[];
  filtersForLiveData: FiltersForLiveData;
}

const useCountriesData = ({
  selectedCountries,
  filtersForLiveData,
}: Params) => {
  const [countriesDataByDate, setCountriesDataByDate] = useState({});

  useEffect(() => {
    const getDataByCounry = async (country: string) => {
      const responseData = await requestCountryCases({
        country,
        ...filtersForLiveData,
      });

      return responseData;
    };

    setCountriesDataByDate({});

    selectedCountries.forEach(async (country) => {
      const response = await getDataByCounry(country);

      if (response.length) {
        setCountriesDataByDate((state) => appendToState(state, response));
      }
    });
  }, [selectedCountries, filtersForLiveData]);

  return countriesDataByDate;
};

export default useCountriesData;
