import baseUrl from './baseUrl';
import makeRequest from './makeRequest';

interface Params {
  date_from: string;
  date_to: string;
}

const requestGlobalData = ({ date_from, date_to }: Params) =>
  makeRequest(`${baseUrl}/world?from=${date_from}&to=${date_to}`);

export default requestGlobalData;
