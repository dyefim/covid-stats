type StringOrObjectDate = Date | string | undefined;

const getYyyyMmDd = (date: string) => date.replace(/T(.)+/, '');

const getTodayDate = () => getYyyyMmDd(new Date().toISOString());

const jumpDays = (
  daysToJump: number,
  date: StringOrObjectDate = new Date()
) => {
  const d = new Date(date);

  d.setDate(d.getDate() + daysToJump);

  return getYyyyMmDd(d.toISOString());
};

const getPreviousDay = (date: StringOrObjectDate = new Date()) =>
  jumpDays(-1, date);

const getNextDay = (date: StringOrObjectDate = new Date()) =>
  jumpDays(+1, date);

const getYesterday = () => getPreviousDay(getTodayDate());

export {
  getYyyyMmDd,
  getTodayDate,
  jumpDays,
  getPreviousDay,
  getNextDay,
  getYesterday,
};
