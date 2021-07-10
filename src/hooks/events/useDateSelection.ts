export const caseOptions = ['confirmed', 'recovered', 'deaths'];

const useDateSelection = (filterSetter: (filters: any) => void) => {
  const handleDateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;

    filterSetter((filters: any) => ({
      ...filters,
      [fieldName]: value,
    }));
  };
  return handleDateSelection;
};

export default useDateSelection;
