import { getHolidayDays, getWorkDays } from "../workDaysUtils";

describe("getHolidayDays", () => {
  it("should return number of holiday days between 2020-05-01 and 2020-05-31", () => {
    const earlierDate = new Date("2020-05-01");
    const laterDate = new Date("2020-05-31");
    const result = getHolidayDays(laterDate, earlierDate);
    expect(result).toBe(1);
  });
});

describe("getWorkDays", () => {
  it("should return 20 work days between 2020-05-01 and 2020-05-31", () => {
    const earlierDate = new Date("2020-05-01");
    const laterDate = new Date("2020-05-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(20);
  });

  it("should return 255 work days between 2020-01-01 and 2020-12-31", () => {
    const earlierDate = new Date("2020-01-01");
    const laterDate = new Date("2020-12-31 23:59:59");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(255);
  });
});
