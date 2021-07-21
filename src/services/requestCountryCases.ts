import makeRequest from './makeRequest';
import baseUrl from './baseUrl';
import { CaseType } from '../types';

// export enum CaseType {
//   Confirmed = 'confirmed',
//   Recovered = 'recovered',
//   Deaths = 'deaths',
// }

interface Params {
  country: string;
  typeOfCases?: CaseType;
  date_from: string;
}

const requestCountryCases = ({
  country,
  date_from,
  typeOfCases = 'confirmed',
}: Params) =>
  makeRequest(
    `${baseUrl}/live/country/${country}/status/${typeOfCases}/date/${date_from}`
  );

export default requestCountryCases;
