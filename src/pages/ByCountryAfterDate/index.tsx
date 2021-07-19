import { CaseType, Countries, FiltersForLiveData } from '../../App';
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
  setFiltersForLiveData: (filters: FiltersForLiveData) => void;
  typeOfCasesByCountry: CaseType;
  setTypeOfCasesByCountry: (caseType: CaseType) => void;
}

const ByCountryAfterDate = ({
  data,
  countries,
  selectedCountries,
  setSelectedCountries,
  filtersForLiveData,
  setFiltersForLiveData,
  typeOfCasesByCountry,
  setTypeOfCasesByCountry,
}: Props) => {
  const caseType = toTitleCase(typeOfCasesByCountry);

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
          typeOfCasesByCountry={typeOfCasesByCountry}
          setTypeOfCasesByCountry={setTypeOfCasesByCountry}
        />
      }
    >
      <div>
        <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={preparedData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
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
        </div>
      </div>
    </ContainerWithDrawer>
  );
};

export default ByCountryAfterDate;
