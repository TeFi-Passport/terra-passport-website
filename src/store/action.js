export const setTransactionResult = value => ({
    type: 'SET_TX_RESULT',
    value,
});

/**
 *
 * @param {string} value - the error message
 * @returns {{type: string, value: *}}
 */
export const setTransactionError = value => ({
    type: 'SET_TX_ERROR',
    value,
});

/**
 *
 * @param {{name, component}} value - the overlay
 * @returns {{type: string, value: *}}
 */
export const setOverlayStage = value => ({
    type: 'SET_OVERLAY_STAGE',
    value,
});

/**
 *
 * @param {{}} value - the score detail
 * @returns {{type: string, value: *}}
 */
export const setGeneratedScore = value => ({
    type: 'SET_GENERATED_SCORE',
    value,
});

/**
 *
 * @param {string} value - the message
 * @returns {{type: string, value: *}}
 */
export const setLoadingMessage = value => ({
    type: 'SET_LOADING_MESSAGE',
    value,
});

/**
 *
 * @param {{}} value - the passport
 * @returns {{type: string, value: *}}
 */
export const setPassport = value => ({
    type: 'SET_PASSPORT',
    value,
});

export const setScreenSize = value => ({
    type: 'SET_SCREEN_SIZE',
    value,
});

export const setIsMobile = value => ({
    type: 'SET_IS_MOBILE',
    value,
});
