const INTERVAL_UNITS = {
 YEARS: 0,
 MONTHS: 1,
 DAYS: 2,
 HOURS: 3,
 MINUTES: 4,
 SECONDS: 5
} as const

type IntervalUnits = keyof typeof INTERVAL_UNITS;
type AddIntervalProps = {
    date: Date,
  // this doesnt work, it needs some work still
    interval: {[IntervalUnits]: number} 
}
/**
 * Construct a new date with a given date and interval.
 * 
 * This interval can be negative to go back in time or positive to get a date in the future.
 * @param {Date} date 
 * @param {{[YEARS|MONTHS|DAYS|HOURS|MINUTES|SECONDS]: number}} interval The object key is the unit time targeted, the value is the change expected. (e.g. {0: 1, 1:1} to add one year and one month to the given date)
 */
function addInterval(date, interval) {
    const parts = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ]
    for (const [unit, value] of Object.entries(interval)) {
        parts[unit] += value
    }
    return new Date(...parts)
}