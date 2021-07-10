import React from 'react';
import { Cases as CasesType, Country, FiltersForLiveData } from '../../App';
import { getNextDay } from '../../utils/dates';

interface Props {
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: React.Dispatch<
    React.SetStateAction<FiltersForLiveData>
  >;
  countries: Country[];
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilteringForm = ({
  filtersForLiveData,
  setFiltersForLiveData,
  countries,
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const tomorrow = getNextDay();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    setFiltersForLiveData({
      ...filtersForLiveData,
      [fieldName]: value,
    });
  };

  const caseOptions = ['confirmed', 'recovered', 'deaths'];

  const handleCaseTypeSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    const value = event.target.value as CasesType;

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    setFiltersForLiveData({ ...filtersForLiveData, cases: value });
  };

  const handleCountriesSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    const selectedOptions = event.target.selectedOptions;

    // FIXME restrict selecting to much or to often

    const values = Array.from(selectedOptions, (item) => item.value);

    // console.log(values);

    setSelectedCountries(values);
  };

  const sortedCountries = countries.sort((a, b) =>
    a.Slug.localeCompare(b.Slug)
  );

  return (
    <form>
      <legend>Pick countries and date</legend>
      <label htmlFor="date_from">
        From
        <input
          type="date"
          name="date_from"
          id="date_from"
          min="2019-01-01"
          max={tomorrow}
          value={filtersForLiveData.date_from}
          onChange={handleDateChange}
        />
      </label>

      <label htmlFor="cases">
        Cases
        <select
          name="cases"
          id="cases"
          value={filtersForLiveData.cases}
          onChange={handleCaseTypeSelection}
        >
          {caseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="countries">
        Countries
        <select
          style={{ maxWidth: 250, height: 100 }}
          name="countries"
          id="countries"
          value={selectedCountries}
          onChange={handleCountriesSelection}
          multiple
        >
          {sortedCountries.map(({ Country, Slug }) => (
            <option key={Slug} value={Slug}>
              {Country}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default FilteringForm;
