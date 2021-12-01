/**
 * @param {number} numberOfDays
 * @param timestamp - tx timestamp
 * @returns {boolean} true if the timestamp is less than the number of days passed in param
 */
export const isLessThanXDays = (numberOfDays, timestamp) => {
    const difference = new Date().getTime() - new Date(timestamp).getTime();
    return difference <= numberOfDays * 24 * 60 * 60 * 1000;
}

/**
 * Shorten an address and add '...' at the middle.
 * @param {string} address (e.g 'terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6')
 * @return {string} the shortened address (e.g 'terra1...aed74e6')
 */
export const walletAddressToShortenedAddress = (address) => {
    if (address.length < 15)
        return address;

    return address.substring(0, 6) + '....' + address.substring(address.length - 7, address.length)
}