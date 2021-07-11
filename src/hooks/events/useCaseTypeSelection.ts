import { CaseType } from '../../App';

export const caseOptions = ['confirmed', 'recovered', 'deaths'];

// type Filters = GlobalFilters | FiltersForLiveData;

type SelectEvent = React.ChangeEvent<
  HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
>;

const useCaseTypeSelection = (filterSetter: (filters: any) => void) => {
  const handleCaseTypeSelecting = (event: SelectEvent) => {
    event.preventDefault();

    const value = event.target.value as CaseType;

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    filterSetter((filters: any) => ({ ...filters, typeOfCases: value }));
  };

  return handleCaseTypeSelecting;
};
export default useCaseTypeSelection;
