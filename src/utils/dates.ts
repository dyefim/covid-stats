const getTodayDate = () => new Date().toISOString().replace(/T(.)+/, '');

type StringOrObjectDate = Date | string;

const getPreviousDay = (date: StringOrObjectDate = new Date()) => {
  const d = new Date(date);

  d.setDate(d.getDate() - 1);

  return d.toISOString().replace(/T(.)+/, '');
};

const getYesterday = () => getPreviousDay(getTodayDate());

export { getTodayDate, getPreviousDay, getYesterday };
