import { FiltersForLiveData } from '../../types/filters';
import { Countries } from '../../types';
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
import ContainerWithDrawer from '../../components/ContainerWithDrawer';

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
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: React.Dispatch<
    React.SetStateAction<FiltersForLiveData>
  >;
}

const ByCountryAfterDate = ({
  data,
  countries,
  selectedCountries,
  setSelectedCountries,
  filtersForLiveData,
  setFiltersForLiveData,
}: Props) => {
  const caseType = toTitleCase(filtersForLiveData.cases);

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
      <ResponsiveContainer height={300}>
        <BarChart data={preparedData} margin={{ right: 5, left: 15 }}>
          <CartesianGrid strokeDasharray="4 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          {selectedCountries.map((slug, i) => {
            const details = countries[slug];

            if (typeof details === 'undefined') return null;

            const key = `${countries[slug].Country}.${caseType}`;

            const barColor = `hsl(${
              (360 / selectedCountries.length) * i + 10
            }, 80%, 60%)`;

            return (
              <Bar
                key={key}
                dataKey={key}
                name={details.Country}
                fill={barColor}
              />
            );
          })}
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </ContainerWithDrawer>
  );
};

export default ByCountryAfterDate;
