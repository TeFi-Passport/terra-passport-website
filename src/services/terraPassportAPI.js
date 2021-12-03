const apiEndpoint = 'https://o6n5xqp6c2.execute-api.us-east-2.amazonaws.com';

/**
 * Register the passport in the Tefi Passport db
 * @param {string} address
 * @param {number} score
 * @param {{}} tx - the transaction info
 */
export const addAPassport = async (address, score, tx) => {

    const raw = {
        "address": address,
        "score": score,
        "transactionID": tx.txhash,
        "block": tx.height,
        "network": tx.chainId
    };

    console.log(raw);

    const json = await request('PUT', '/endpoint', raw);
    console.log(json);
}

/**
 *
 * @param {string} method - e.g 'PUT', 'GET', 'POST'
 * @param endpoint - e.g '/passport'
 * @param {{}} raw - the body of the request
 * @returns {Promise<any>}
 */
const request = async (method, endpoint, raw) => {

    const requestOptions = {
        method: method,
        headers: buildHeader(),
        body: JSON.stringify(raw)
    };

    const res = await fetch(apiEndpoint + "/passports", requestOptions);

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