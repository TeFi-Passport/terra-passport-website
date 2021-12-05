import {setPassport} from "../store/action";

const apiEndpoint = 'https://o6n5xqp6c2.execute-api.us-east-2.amazonaws.com';

/**
 * Register the passport in the Tefi Passport db
 * @param {string} address
 * @param {{}} score info
 * @param {{}} tx - the transaction info
 */
export const addAPassport = async (address, score, tx) => {

    const raw = {
        "address": address,
        "score": score.score,
        "transactionID": tx.txhash,
        "block": tx.height,
        "network": tx.chainId,
        "scoreDetail": score,
    };

    return await request('PUT', "/passports", raw);
}

/**
 * Retrieve the passport corresponding to the address & store it in the store
 * @param dispatch - the dispatch instance to add the passport to the store
 * @param address
 * @returns {Promise<*>}
 */
export const retrievePassport = async (dispatch, address) => {
    const res = await request('GET', "/passports/"+address);
    dispatch(setPassport(res));
}

/**
 *
 * @param {string} method - e.g 'PUT', 'GET', 'POST'
 * @param endpoint - e.g '/passport'
 * @param {{}} raw - the body of the request
 * @returns {Promise<any>}
 */
const request = async (method, endpoint, raw = null) => {

    const requestOptions = {
        method: method,
        headers: buildHeader(),
    };

    if (raw)
        requestOptions.body = JSON.stringify(raw);

    const res = await fetch(apiEndpoint + endpoint, requestOptions);

    return await res.json();
}

/**
 * Builds the header that has to be sent when doing a request to API
 * @returns {Headers}
 */
const buildHeader = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}