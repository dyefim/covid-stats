import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalFilters, FiltersForLiveData } from '../App';
import { setQueryStringValue } from '../utils/searchParams';

const setFiltersAsSearchParams = (filters: Record<string, string>) => {
  Object.entries(filters).forEach(([filter, value]) => {
    setQueryStringValue(filter, value);
  });
};

interface Params {
  globalFilters: GlobalFilters;
  filtersForLiveData: FiltersForLiveData;
}

const useFiltersToSearchParams = ({
  globalFilters,
  filtersForLiveData,
}: Params) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setFiltersAsSearchParams(globalFilters);
    }

    if (location.pathname === '/countries') {
      setFiltersAsSearchParams(filtersForLiveData);
    }
  }, [filtersForLiveData, globalFilters, location.pathname]);
};

export default useFiltersToSearchParams;
