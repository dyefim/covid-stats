import React from 'react';
import { Filters } from '../../App';
import { getTodayDate, getNextDay } from '../../utils/dates';

interface Props {
  globalFilters: Filters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilteringForm = ({ globalFilters, setGlobalFilters }: Props) => {
  const today = getTodayDate();
  const tomorrow = getNextDay();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    setGlobalFilters({
      ...globalFilters,
      [fieldName]: value,
    });
  };

  const caseOptions = ['confirmed', 'recovered', 'deaths'];

  const onCaseTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const value = event.target.value as Props['globalFilters']['cases'];

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    setGlobalFilters({ ...globalFilters, cases: value });
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
          value={globalFilters.date_from}
          onChange={handleDateChange}
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
          value={globalFilters.date_to}
          onChange={handleDateChange}
        />
      </label>
      <label htmlFor="cases">
        Cases
        <select
          name="cases"
          id="cases"
          value={globalFilters.cases}
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
