/**
 * Checks if the user is on mobile
 * @param {number} width - the width of the screen
 * @returns {boolean} - true if it is on mobile - false otherwise
 */
export const isMobile = (width) => {
    return width <= 768;
}