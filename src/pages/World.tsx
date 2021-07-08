import React from 'react';
import { Filters } from '../App';
import { getTodayDate } from '../utils/dates';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const World = ({ filters, setFilters }: Props) => {
  const today = getTodayDate();

  const onDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  return (
    <div>
      <h1>World</h1>
      <form>
        <legend>Pick date range</legend>
        <label htmlFor="date_from">
          From
          <input
            type="date"
            name="date_from"
            id="date_from"
            min="2019-01-01"
            max={today}
            value={filters.date_from}
            onChange={onDateRangeChange}
          />
        </label>
        <label htmlFor="date_to">
          To
          <input
            type="date"
            name="date_to"
            id="date_to"
            min="2019-01-01"
            max={today}
            value={filters.date_to}
            onChange={onDateRangeChange}
          />
        </label>
      </form>
    </div>
  );
};

export default World;
