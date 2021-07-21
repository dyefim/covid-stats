import { setQueryStringValue } from '../../utils/searchParams';
import { CaseType } from '../../App';

export const caseOptions = ['confirmed', 'recovered', 'deaths'];

// type Filters = GlobalFilters | FiltersForLiveData;

type SelectEvent = React.ChangeEvent<
  HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
>;

const useCaseTypeSelection = <T>(
  filterSetter: React.Dispatch<React.SetStateAction<T>>
) => {
  const handleCaseTypeSelecting = (event: SelectEvent) => {
    event.preventDefault();

    const value = event.target.value as CaseType;

    setQueryStringValue('cases', value);

    if (!caseOptions.includes(value)) {
      throw new Error('Expected valid case option: ' + caseOptions);
    }

    filterSetter((state) => ({
      ...state,
      cases: value,
    }));
  };

  return handleCaseTypeSelecting;
};
export default useCaseTypeSelection;
