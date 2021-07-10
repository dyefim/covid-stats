import makeRequest from './makeRequest';
import baseUrl from './baseUrl';
import { CaseType } from '../App';

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
  typeOfCases = 'confirmed',
  date_from,
}: Params) =>
  makeRequest(
    `${baseUrl}/live/country/${country}/status/${typeOfCases}/date/${date_from}`
  );

export default requestCountryCases;
