import {
  add,
  addBusinessDays as abd,
  differenceInBusinessDays as dbd,
  format,
  getUnixTime,
  isSaturday,
  isSunday,
} from "date-fns";
import publicHolidays from "./publicHolidays.json";

export const getHolidayDays = (laterDate, earlierDate) => {
  const earlierDateUnix = getUnixTime(earlierDate);
  const laterDateUnix = getUnixTime(laterDate);

  let holidaysUnix = [];
  Object.keys(publicHolidays).forEach((year) =>
    publicHolidays[year].forEach((holiday) => {
      const date = new Date(holiday.date);
      if (!isSaturday(date) && !isSunday(date)) {
        holidaysUnix.push(getUnixTime(new Date(holiday.date)));
      }
    })
  );

  const numberOfHolidays = holidaysUnix.reduce((total, holiday) => {
    if (+holiday <= +laterDateUnix && +holiday >= +earlierDateUnix) {
      return total + 1;
    }
    return total;
  }, 0);

  return numberOfHolidays;
  // TODO: Pobrać z pliku tylko użyty zakres lat, ostrzeżenie jeśli święta na wybrane lata nie są dodane
};

export const getWorkDays = (laterDate, earlierDate) => {
  const trueLaterDater = add(laterDate, {
    hours: 24,
  });
  const workDays = dbd(trueLaterDater, earlierDate);
  const finalDays = workDays - getHolidayDays(trueLaterDater, earlierDate);
  return finalDays;
};
