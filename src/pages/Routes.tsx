import { Switch, Route } from 'react-router-dom';
import About from './About';
import ByCountryAfterDate, { DataByCountry } from './ByCountryAfterDate';
import World, { WorldProps } from './WorldPage';
import { Country, GlobalFilters, FiltersForLiveData } from '../App';

interface Props {
  globalData: WorldProps['data'];
  globalFilters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
  countries: Country[];
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  countriesDataByDate: {
    [c: string]: DataByCountry[];
  };
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: React.Dispatch<
    React.SetStateAction<FiltersForLiveData>
  >;
}

const Routes = ({
  globalData,
  globalFilters,
  setGlobalFilters,
  countries,
  selectedCountries,
  setSelectedCountries,
  countriesDataByDate,
  filtersForLiveData,
  setFiltersForLiveData,
}: Props) => {
  return (
    <Switch>
      <Route exact path="/">
        <World
          data={globalData}
          globalFilters={globalFilters}
          setGlobalFilters={setGlobalFilters}
        />
      </Route>
      <Route path="/by-country-after-date">
        <ByCountryAfterDate
          data={countriesDataByDate}
          countries={countries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          filtersForLiveData={filtersForLiveData}
          setFiltersForLiveData={setFiltersForLiveData}
        />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
};

export default Routes;
