import { useEffect, useState } from 'react';
import { GlobalFilters } from '../App';
import requestGlobalData from '../services/requestGlobalData';

const useGlobalData = (globalFilters: GlobalFilters) => {
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
