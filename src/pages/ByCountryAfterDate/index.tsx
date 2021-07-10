import React from 'react';
import { FiltersByCountry } from '../../App';
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

interface DataByCountry {
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
  countries: string[];
  filtersByCountry: FiltersByCountry;
  setFiltersByCountry: React.Dispatch<React.SetStateAction<FiltersByCountry>>;
}

const ByCountryAfterDate = ({
  data,
  countries,
  filtersByCountry,
  setFiltersByCountry,
}: Props) => {
  const caseType = toTitleCase(filtersByCountry.cases);

  const preparedData = prepareStateForChart(data as any);

  console.log(preparedData);

  return (
    <div>
      <h1>Live By Country And Status After Date</h1>

      <FilteringForm
        filtersByCountry={filtersByCountry}
        setFiltersByCountry={setFiltersByCountry}
      />
      <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            // width={500}
            // height={300}
            data={preparedData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="4 3" />
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={`Ukraine.${caseType}`}
              name="Ukraine"
              fill="#8884d8"
            />
            <Bar
              dataKey={`Russian Federation.${caseType}`}
              name="Russia"
              fill="#88d884"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <ul>
        {caseType}
        {preparedData.map((report, i) => {
          const numberofCases = report[caseType];

          return (
            <li key={`${numberofCases}_${caseType}_${i}`}>{numberofCases}</li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default ByCountryAfterDate;
