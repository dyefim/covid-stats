import React from 'react';
import { CaseType, GlobalFilters } from '../../App';
import { getTodayDate, getNextDay } from '../../utils/dates';

interface Props {
  globalFilters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
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

  const handleCaseTypeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    const value = event.target.value as CaseType;

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    setGlobalFilters({ ...globalFilters, typeOfCases: value });
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
        CaseType
        <select
          name="cases"
          id="cases"
          value={globalFilters.typeOfCases}
          onChange={handleCaseTypeSelect}
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
