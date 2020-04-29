import {
  add,
  differenceInBusinessDays as dbd,
  getYear,
  isSaturday,
  isSunday,
  isWithinInterval,
} from "date-fns";
import Holidays from "date-holidays";

const polishHolidays = new Holidays("PL", {
  languages: "pl",
  types: ["public"],
  // timezone: "PL",
});

export const getYearsRange = (date1, date2) => {
  const date1Year = getYear(date1);
  const date2Year = getYear(date2);

  const minYear = Math.min(date1Year, date2Year);
  const maxYear = Math.max(date1Year, date2Year);

  let years = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years;
};

export const getHolidaysInDateRange = (laterDate, earlierDate) => {
  const yearsArray = getYearsRange(laterDate, earlierDate);

  const holidays = yearsArray
    .map((year) => polishHolidays.getHolidays(year.toString()))
    .flat();

  return holidays;
};

window.getHolidaysInDateRange = getHolidaysInDateRange;

export const getTotalNumberOfHolidayDays = (laterDate, earlierDate) => {
  // const earlierDateUnix = getUnixTime(earlierDate);
  // const laterDateUnix = getUnixTime(laterDate);

  let holidaysUnix = getHolidaysInDateRange(laterDate, earlierDate).map(
    (holiday) => {
      const date = new Date(holiday.date);
      if (!isSaturday(date) && !isSunday(date)) {
        return date;
      }
      return null;
    }
  );

  // Object.keys(publicHolidays).forEach((year) =>
  //   publicHolidays[year].forEach((holiday) => {
  //     const date = new Date(holiday.date);
  //     if (!isSaturday(date) && !isSunday(date)) {
  //       holidaysUnix.push(getUnixTime(new Date(holiday.date)));
  //     }
  //   })
  // );

  const numberOfHolidays = holidaysUnix
    .filter((value) => value != null)
    .reduce((total, holiday) => {
      if (isWithinInterval(holiday, { start: earlierDate, end: laterDate })) {
        return total + 1;
      }
      return total;
    }, 0);

  return numberOfHolidays;
};

export const getWorkDays = (laterDate, earlierDate) => {
  const trueLaterDater = add(laterDate, {
    hours: 24,
  });
  const workDays = dbd(trueLaterDater, earlierDate);
  const finalDays =
    workDays - getTotalNumberOfHolidayDays(trueLaterDater, earlierDate);
  return finalDays;
};
