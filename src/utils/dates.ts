const getYyyyMmDd = (date: string) => date.replace(/T(.)+/, '');

const getTodayDate = () => getYyyyMmDd(new Date().toISOString());

type StringOrObjectDate = Date | string;

const jumpDays = (
  date: StringOrObjectDate = new Date(),
  daysToJump: number
) => {
  const d = new Date(date);

  d.setDate(d.getDate() + daysToJump);

  return getYyyyMmDd(d.toISOString());
};

const getPreviousDay = (date: StringOrObjectDate = new Date()) =>
  jumpDays(date, -1);

const getNextDay = (date: StringOrObjectDate = new Date()) =>
  jumpDays(date, +1);

const getYesterday = () => getPreviousDay(getTodayDate());

export {
  getYyyyMmDd,
  getTodayDate,
  jumpDays,
  getPreviousDay,
  getNextDay,
  getYesterday,
};
