import {combineReducers} from 'redux';

/**
 * Create a reducer with appropriate handlers.
 *
 * @param {*} initialState - Initial state of the reducer.
 * @param {object} handlers - Object of handlers for each action type.
 * @returns {Function} Reducer function.
 */
const createReducer = (initialState, handlers) => (state = initialState, action) =>
    // eslint-disable-next-line no-prototype-builtins
    handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

export default combineReducers({
    // the stage where we at during the minting process (useful to know which overlay to show)
    overlayStage: createReducer({name: 'hidden', component: null}, {
        SET_OVERLAY_STAGE: (state, {value}) => value,
    }),
    // the result of the mint transaction
    transactionResult: createReducer(null, {
        SET_TX_RESULT: (state, {value}) => value,
    }),
    // contains the error message if the mint tx encountered a problem
    transactionError: createReducer(null, {
        SET_TX_ERROR: (state, {value}) => value,
    }),
    // the message shown when minting
    loadingMessage: createReducer(null, {
        SET_LOADING_MESSAGE: (state, {value}) => value,
    }),
    // the score generated when the user ask to mint a passport
    generatedScore: createReducer(null, {
        SET_GENERATED_SCORE: (state, {value}) => value,
    }),
    // the object containing all the info of the passport
    passport: createReducer(null, {
        SET_PASSPORT: (state, {value}) => value,
    }),
    // the screen of the size
    screenSize: createReducer({width: undefined, height: undefined}, {
        SET_SCREEN_SIZE: (state, {value}) => value,
    }),
    // useful to know if it is a mobile screen or not
    isMobile: createReducer(null, {
        SET_IS_MOBILE: (state, {value}) => value,
    }),
});