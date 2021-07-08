import React from 'react';
import { Filters } from '../../App';
import toTitleCase from '../../utils/toTitleCase';
import FilteringForm from './FilteringForm';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { getYyyyMmDd } from '../../utils/dates';

interface Props {
  data: ({
    [key: string]: number;
  } & { Date: string })[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const World = ({ data, filters, setFilters }: Props) => {
  const caseType = toTitleCase(filters.cases);
  const caseTypeKey = 'New' + caseType;

  const preparedData = data.map(({ Date, ...rest }) => ({
    date: getYyyyMmDd(Date),
    ...rest,
  }));

  // console.log(preparedData);

  return (
    <div>
      <h1>World</h1>
      <FilteringForm filters={filters} setFilters={setFilters} />

      <LineChart
        width={500}
        height={400}
        data={preparedData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Line
          type="monotone"
          dataKey={caseTypeKey}
          stroke="#55c"
          strokeWidth="2"
        />

        <CartesianGrid stroke="#ddd" strokeWidth="1" strokeDasharray="4 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <ul>
        {caseType}
        {data.map((report, i) => {
          const numberofCases = report[caseTypeKey];

          return (
            <li key={`${numberofCases}_${caseType}_${i}`}>{numberofCases}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default World;
