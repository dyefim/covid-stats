import React from 'react';
import { FiltersByCountry } from '../../App';
// import FilteringForm from './FilteringForm';
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
import { getYyyyMmDd } from '../../utils/dates';

interface Props {
  data: {
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
  }[];
  filtersByCountry: FiltersByCountry;
  setFiltersByCountry: React.Dispatch<React.SetStateAction<FiltersByCountry>>;
}

const ByCountryAfterDate = ({
  data,
  filtersByCountry,
  setFiltersByCountry,
}: Props) => {
  const caseType = filtersByCountry.cases;

  const preparedData = data.map((d) => ({
    date: getYyyyMmDd(d.Date),
    province: d.Province,
    confirmed: d.Confirmed,
    deaths: d.Deaths,
    recovered: d.Recovered,
  }));

  return (
    <div>
      <h1>Live By Country And Status After Date</h1>

      <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={preparedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="province" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={caseType} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ByCountryAfterDate;
