import { useEffect } from 'react';

type FilterSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type Params<T> = [T, FilterSetter<T>];

const useSearchParams = <T>([filters, filterSetter]: Params<T>) => {
  useEffect(() => {
    // console.log(filters);

    // if (Object.values(filters).some(f => !f)) {
    //   return
    // }

    const searchParams = new URLSearchParams(document.location.search);

    const availableFilters = Object.keys(filters);

    availableFilters.forEach((filter) => {
      const urlFilterValue = searchParams.get(filter);

      if (urlFilterValue) {
        filterSetter((state) => ({
          ...state,
          [filter]: urlFilterValue,
        }));
      }
    });
  }, [filterSetter, filters]);
};

export default useSearchParams;
