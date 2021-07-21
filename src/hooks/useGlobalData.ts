import { useEffect, useState } from 'react';
import { GlobalFilters } from '../types/filters';
import requestGlobalData from '../services/requestGlobalData';

const useGlobalData = (globalFilters: GlobalFilters) => {
  const { date_from, date_to } = globalFilters;

  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    const getGlobalData = async () => {
      const responseData = await requestGlobalData({ date_from, date_to });

      setGlobalData(responseData);
    };

    getGlobalData();
  }, [date_from, date_to]);

  return globalData;
};

export default useGlobalData;
