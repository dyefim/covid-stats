import { Switch, Route } from 'react-router-dom';
import About from './About';
import ByCountryAfterDate, { DataByCountry } from './ByCountryAfterDate';
import World, { WorldProps } from './WorldPage';

import { Filters, FiltersByCountry } from '../App';

interface Props {
  globalData: WorldProps['data'];
  globalFilters: Filters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<Filters>>;
  countryFilters: string[];
  countriesDataByDate: {
    [c: string]: DataByCountry[];
  };
  filtersByCountry: FiltersByCountry;
  setFiltersByCountry: React.Dispatch<React.SetStateAction<FiltersByCountry>>;
}

const Routes = ({
  globalData,
  globalFilters,
  setGlobalFilters,
  countryFilters,
  countriesDataByDate,
  filtersByCountry,
  setFiltersByCountry,
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
          countryFilters={countryFilters}
          filtersByCountry={filtersByCountry}
          setFiltersByCountry={setFiltersByCountry}
        />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
};

export default Routes;
