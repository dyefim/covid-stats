import React from 'react';
import { Filters } from '../../App';
import { getTodayDate, getNextDay } from '../../utils/dates';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilteringForm = ({ filters, setFilters }: Props) => {
  const today = getTodayDate();
  const tomorrow = getNextDay();

  const onDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  const caseOptions = ['confirmed', 'recovered', 'deaths'];

  const onCaseTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const value = event.target.value as Props['filters']['cases'];

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    setFilters({ ...filters, cases: value });
  };

  return (
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
          max={tomorrow}
          value={filters.date_to}
          onChange={onDateRangeChange}
        />
      </label>
      <label htmlFor="cases">
        Cases
        <select
          name="cases"
          id="cases"
          value={filters.cases}
          onChange={onCaseTypeSelect}
        >
          {caseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default FilteringForm;
