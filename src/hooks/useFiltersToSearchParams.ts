import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalFilters, FiltersForLiveData } from '../types/filters';
import { setQueryStringValue } from '../utils/searchParams';

const setFiltersAsSearchParams = (filters: Record<string, string>) => {
  Object.entries(filters).forEach(([filter, value]) => {
    setQueryStringValue(filter, value);
  });
};

interface Params {
  globalFilters: GlobalFilters;
  filtersForLiveData: FiltersForLiveData;
  selectedCountries: string[];
}

const useFiltersToSearchParams = ({
  globalFilters,
  filtersForLiveData,
  selectedCountries,
}: Params) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setFiltersAsSearchParams(globalFilters);
    }

    if (location.pathname === '/countries') {
      setFiltersAsSearchParams(filtersForLiveData);
      setQueryStringValue('countries', selectedCountries);
    }
  }, [filtersForLiveData, globalFilters, selectedCountries, location.pathname]);
};

export default useFiltersToSearchParams;
