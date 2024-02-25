export const LUNAR_MONTH: number = 29.530588853;

export const getJulianDate = (date: Date = new Date()): number => {
  const time: number = date.getTime();
  const tzoffset: number = date.getTimezoneOffset();
  return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
};

export const normalize = (value: number): number => {
  value = value - Math.floor(value);
  if (value < 0) value += 1;
  return value;
};

export const getLunarAgePercent = (date: Date = new Date()): number => {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
};

export const getLunarAge = (date: Date = new Date()): number => {
  const percent: number = getLunarAgePercent(date);
  return percent * LUNAR_MONTH;
};

export const getNextNewMoon = (): Date => {
    return new Date(getLastNewMoon().getTime() + LUNAR_MONTH * 86400000);
}

export const getLastNewMoon = (date: Date = new Date()):Date => {
    const lunarAge: number = getLunarAge(date);
    return new Date(date.getTime() - lunarAge * 86400000);
}