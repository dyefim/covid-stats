import { getTodayDate, getPreviousDay } from '../utils/dates';

const today = getTodayDate();

const yyyy_mm_dd = /^\d{4}-\d{2}-\d{2}/;

it(`get today's date`, () => {
  expect(today).toMatch(yyyy_mm_dd);
});

it(`get previous day date`, () => {
  expect(getPreviousDay('2020-05-05')).toMatch('2020-05-04');
  expect(getPreviousDay(new Date('2020-05-05'))).toMatch('2020-05-04');
});
