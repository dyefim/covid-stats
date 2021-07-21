import { setQueryStringValue } from '../../utils/searchParams';
import { CaseType } from '../../App';

export const caseOptions = ['confirmed', 'recovered', 'deaths'];

// type Filters = GlobalFilters | FiltersForLiveData;

type SelectEvent = React.ChangeEvent<
  HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
>;

const useCaseTypeSelection = (filterSetter: (filter: CaseType) => void) => {
  const handleCaseTypeSelecting = (event: SelectEvent) => {
    event.preventDefault();

    const value = event.target.value as CaseType;

    setQueryStringValue('cases', value);

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    filterSetter(value);
  };

  return handleCaseTypeSelecting;
};
export default useCaseTypeSelection;
