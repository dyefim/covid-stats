import React from 'react';
import { Country, FiltersForLiveData } from '../../App';
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
  countries: Country[];
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

  const getCountryDetails = (slug: string) => {
    return countries.find((c) => c.Slug === slug);
  };

  return (
    <div>
      <h1>Live By Country And Status After Date</h1>

      <FilteringForm
        filtersForLiveData={filtersForLiveData}
        setFiltersForLiveData={setFiltersForLiveData}
        countries={countries}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={preparedData}
            margin={{ top: 10, right: 10, bottom: 10, left: 20 }}
          >
            <CartesianGrid strokeDasharray="4 3" />
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Legend />

            {selectedCountries.map((slug) => {
              const details = getCountryDetails(slug);

              if (typeof details === 'undefined') return null;

              const key = `${details.Country}.${caseType}`;

              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={details.Country}
                  fill={getRandomColor()}
                />
              );
            })}
            {/* <Bar
              dataKey={`Ukraine.${caseType}`}
              name="Ukraine"
              fill="#8884d8"
            />
            <Bar
              dataKey={`Russian Federation.${caseType}`}
              name="Russia"
              fill="#88d884"
            /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ByCountryAfterDate;
