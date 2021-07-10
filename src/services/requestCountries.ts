import baseUrl from './baseUrl';
import makeRequest from './makeRequest';

const requestCountries = () => makeRequest(`${baseUrl}/countries`);

export default requestCountries;
