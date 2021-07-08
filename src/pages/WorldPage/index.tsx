import React from 'react';
import { Filters } from '../../App';
import toTitleCase from '../../utils/toTitleCase';
import FilteringForm from './FilteringForm';

interface Props {
  data: {
    [key: string]: number | string;
  }[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const World = ({ data, filters, setFilters }: Props) => {
  const caseType = toTitleCase(filters.cases);

  return (
    <div>
      <h1>World</h1>
      <FilteringForm filters={filters} setFilters={setFilters} />
      <ul>
        {caseType}
        {data.map((report, i) => {
          const numberofCases = report['New' + caseType];

          return (
            <li key={`${numberofCases}_${caseType}_${i}`}>{numberofCases}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default World;
