import { Countries, FiltersForLiveData } from '../../App';
import FilteringForm from './FilteringForm';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import toTitleCase from '../../utils/toTitleCase';
import { prepareStateForChart } from '../../utils/stateMutations';
import ContainerWithDrawer from '../ContainerWithDrawer';

const getRandomColor = () => {
  var letters = '3456789ABC';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export interface DataByCountry {
  Date: string;
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: Uppercase<string>;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

interface Props {
  data: {
    [c: string]: DataByCountry[];
  };
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: (filters: FiltersForLiveData) => void;
}

const ByCountryAfterDate = ({
  data,
  countries,
  selectedCountries,
  setSelectedCountries,
  filtersForLiveData,
  setFiltersForLiveData,
}: Props) => {
  const caseType = toTitleCase(filtersForLiveData.typeOfCases);

  const preparedData = prepareStateForChart(data as any);

  return (
    <ContainerWithDrawer
      title="By Country after Date"
      drawerContent={
        <FilteringForm
          filtersForLiveData={filtersForLiveData}
          setFiltersForLiveData={setFiltersForLiveData}
          countries={countries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      }
    >
      <div>
        <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={preparedData} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="4 3" />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Legend />

              {selectedCountries.map((slug) => {
                const details = countries[slug];

                if (typeof details === 'undefined') return null;

                const key = `${countries[slug].Country}.${caseType}`;

                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    name={details.Country}
                    fill={getRandomColor()}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ContainerWithDrawer>
  );
};

export default ByCountryAfterDate;
