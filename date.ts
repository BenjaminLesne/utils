const INTERVAL_UNITS = {
  YEARS: 0,
  MONTHS: 1,
  DAYS: 2,
  HOURS: 3,
  MINUTES: 4,
  SECONDS: 5,
} as const;

type IntervalUnitValues = (typeof INTERVAL_UNITS)[keyof typeof INTERVAL_UNITS];

type AddIntervalProps = {
  date: Date;
  interval: { [K in IntervalUnitValues]: number };
};

function addInterval({ date, interval }: AddIntervalProps) {
  const parts = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];
  for (const [unit, value] of Object.entries(interval)) {
    const index = parseInt(unit) as IntervalUnitValues;
    parts[index] += value;
  }
  // idealy, we use zod here to get rid of this type error
  return new Date(...parts);
}
