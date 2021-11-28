/**
 * @param {number} numberOfDays
 * @param timestamp - tx timestamp
 * @returns {boolean} true if the timestamp is less than the number of days passed in param
 */
export const isLessThanXDays = (numberOfDays, timestamp) => {
    const difference = new Date().getTime() - new Date(timestamp).getTime();
    return difference <= numberOfDays * 24 * 60 * 60 * 1000;
}