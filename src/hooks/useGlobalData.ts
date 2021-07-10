import { useEffect, useState } from 'react';
import requestGlobalData from '../services/requestGlobalData';

interface Params {
  date_from: string;
  date_to: string;
}

const useGlobalData = (globalFilters: Params) => {
  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    const getGlobalData = async () => {
      const responseData = await requestGlobalData(globalFilters);

      setGlobalData(responseData);
    };

    getGlobalData();
  }, [globalFilters]);

  return globalData;
};

export default useGlobalData;
