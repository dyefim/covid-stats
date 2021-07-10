import { appendToState, prepareStateForChart } from '../utils/stateMutations';

const dataFromUkraine = [
  {
    Country: 'Ukraine',
    Province: 'Zaporizhia Oblast',
    Confirmed: 7,
    Deaths: 4,
    Recovered: 5,
    Date: '2021-07-08T00:00:00Z',
  },
  {
    Country: 'Ukraine',
    Province: 'Kiev Oblast',
    Confirmed: 3,
    Deaths: 3,
    Recovered: 4,
    Date: '2021-07-08T00:00:00Z',
  },
  {
    Country: 'Ukraine',
    Province: 'Zaporizhia Oblast',
    Confirmed: 3,
    Deaths: 2,
    Recovered: 3,
    Date: '2021-07-09T00:00:00Z',
  },
  {
    Country: 'Ukraine',
    Province: 'Kiev Oblast',
    Confirmed: 9,
    Deaths: 6,
    Recovered: 6,
    Date: '2021-07-09T00:00:00Z',
  },
];

const dataFromRussia = [
  {
    Country: 'Russia',
    Province: 'Moscow Oblast',
    Confirmed: 2,
    Deaths: 1,
    Recovered: 4,
    Date: '2021-07-08T00:00:00Z',
  },
  {
    Country: 'Russia',
    Province: 'Saratov Oblast',
    Confirmed: 4,
    Deaths: 2,
    Recovered: 1,
    Date: '2021-07-08T00:00:00Z',
  },
  {
    Country: 'Russia',
    Province: 'Moscow Oblast',
    Confirmed: 5,
    Deaths: 2,
    Recovered: 3,
    Date: '2021-07-09T00:00:00Z',
  },
  {
    Country: 'Russia',
    Province: 'Saratov Oblast',
    Confirmed: 5,
    Deaths: 3,
    Recovered: 5,
    Date: '2021-07-09T00:00:00Z',
  },
];

const mutatedState = {
  '2021-07-08T00:00:00Z': {
    Ukraine: {
      Confirmed: 10,
      Deaths: 7,
      Recovered: 9,
    },
    Russia: {
      Confirmed: 6,
      Deaths: 3,
      Recovered: 5,
    },
  },
  '2021-07-09T00:00:00Z': {
    Ukraine: {
      Confirmed: 12,
      Deaths: 8,
      Recovered: 9,
    },
    Russia: {
      Confirmed: 10,
      Deaths: 5,
      Recovered: 8,
    },
  },
};

const dataForChart = [
  {
    date: '2021-07-08T00:00:00Z',
    Ukraine: {
      Confirmed: 10,
      Deaths: 7,
      Recovered: 9,
    },
    Russia: {
      Confirmed: 6,
      Deaths: 3,
      Recovered: 5,
    },
  },
  {
    date: '2021-07-09T00:00:00Z',
    Ukraine: {
      Confirmed: 12,
      Deaths: 8,
      Recovered: 9,
    },
    Russia: {
      Confirmed: 10,
      Deaths: 5,
      Recovered: 8,
    },
  },
];

it(`nested state buy date and country`, () => {
  let state = {};

  state = appendToState(state, dataFromUkraine);
  state = appendToState(state, dataFromRussia);

  expect(state).toEqual(mutatedState);
});

it(`prepare state for chart`, () => {
  expect(prepareStateForChart(mutatedState)).toEqual(dataForChart);
});
