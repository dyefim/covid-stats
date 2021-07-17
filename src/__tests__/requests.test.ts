import makeRequest from '../services/makeRequest';

it.skip('request data for one month', async () => {
  const allLiveCasesFor31Days =
    'https://api.covid19api.com/world?from=2021-03-01T00:00:00Z&to=2021-04-01T00:00:00Z';

  const data = await makeRequest(allLiveCasesFor31Days);

  expect(data.length).toBe(31);

  expect(Object.keys(data[0]).sort()).toEqual(
    [
      'Date',
      'NewConfirmed',
      'NewDeaths',
      'NewRecovered',
      'TotalConfirmed',
      'TotalDeaths',
      'TotalRecovered',
    ].sort()
  );
});
