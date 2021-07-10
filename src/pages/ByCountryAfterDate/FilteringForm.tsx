import React from 'react';
import { Cases as CasesType, FiltersByCountry } from '../../App';
import { getNextDay } from '../../utils/dates';

interface Props {
  filtersByCountry: FiltersByCountry;
  setFiltersByCountry: React.Dispatch<React.SetStateAction<FiltersByCountry>>;
}

const FilteringForm = ({ filtersByCountry, setFiltersByCountry }: Props) => {
  const tomorrow = getNextDay();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    setFiltersByCountry({
      ...filtersByCountry,
      [fieldName]: value,
    });
  };

  const caseOptions = ['confirmed', 'recovered', 'deaths'];

  const handleCaseTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const value = event.target.value as CasesType;

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    setFiltersByCountry({ ...filtersByCountry, cases: value });
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
          max={tomorrow}
          value={filtersByCountry.date_from}
          onChange={handleDateChange}
        />
      </label>
    
      <label htmlFor="cases">
        Cases
        <select
          name="cases"
          id="cases"
          value={filtersByCountry.cases}
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
