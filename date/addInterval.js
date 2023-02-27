const YEARS = 0
const MONTHS = 1
const DAYS = 2
const HOURS = 3
const MINUTES = 4
const SECONDS = 5
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