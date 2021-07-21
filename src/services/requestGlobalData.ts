import { GlobalFilters } from '../App';
import baseUrl from './baseUrl';
import makeRequest from './makeRequest';

const requestGlobalData = ({ date_from, date_to }: GlobalFilters) =>
  makeRequest(`${baseUrl}/world?from=${date_from}&to=${date_to}`);

export default requestGlobalData;
