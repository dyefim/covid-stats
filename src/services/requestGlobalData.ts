import { GlobalFilters } from '../types/filters';
import baseUrl from './baseUrl';
import makeRequest from './makeRequest';

const requestGlobalData = ({
  date_from,
  date_to,
}: Omit<GlobalFilters, 'cases'>) =>
  makeRequest(`${baseUrl}/world?from=${date_from}&to=${date_to}`);

export default requestGlobalData;
