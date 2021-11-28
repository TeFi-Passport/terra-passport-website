import {fetchTransactionAnalysis} from "./toRemove";
import {isLessThanXDays} from "./utils";

export const generateScore = async () => {

    console.log('generating score');

    /*const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
    };

    const res = await fetch("https://947o3z5ei5.execute-api.us-east-2.amazonaws.com/default/model_inputs?address=terra1dy8wsxphneauw2wtldecem66xwa69y6zpd6gjh", requestOptions)

    console.log(res);
    console.log(await res.json());*/
    const txs = await fetchTransactionAnalysis();
    return getGettingStartedScore(txs)
        + getInsomniacScore(txs)
        + getUpAndAtThemScore(txs)
        + getGovDegenScore(txs)
        + getTerraActivistScore(txs)
        + getRockTheVoteScore(txs)
        + getBabyDegenScore(txs)
        + getMultiTokenateScore(txs)
        + getAdultSwimScore(txs)
        + getBagBuilderScore(txs)
        + getInDeepScore(txs)
        + getDumpProofScore(txs)
        + getWenMoonScore(txs)
        + getAirdropAddictScore(txs)
        + getRepeatCustomerScore(txs)
}

/**
 * @param txs
 * @returns {number} 1 if the address has at least 10 transactions - 0 otherwise
 */
const getGettingStartedScore = (txs) => {
    return txs.length >= 10 ? 1 : 0;
}

/**
 * @param txs
 * @returns {number} 2 if the address has been active fewer than 7 days ago - 0 otherwise.
 */
const getInsomniacScore = (txs) => {
    return isLessThanXDays(7, txs[0].timestamp) ? 2 : 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address transacted with at least 10 contracts in the past 90 days - 0 otherwise.
 */
const getUpAndAtThemScore = (txs) => {
    let contracts = [
        'borrow',
        'bluna_collateralize',
        'beth_collateralize',
        'anc_gov_stakings',
        'mir_gov_stakings',
        'pylon_gov_stakings',
        'anc_airdrop_claims',
        'mir_airdrop_claims',
        'mine_airdrop_claims',
        'buy_luna_ust_swap',
        'sell_luna_ust_swap',
        'buy_anc_ust_swap',
        'sell_anc_ust_swap',
        'buy_mir_ust_swap',
        'sell_mir_ust_swap',
        'buy_mine_ust_swap',
        'sell_mine_ust_swap',
        'provide_liquidity_luna_ust',
        'provide_liquidity_anc_ust',
        'provide_liquidity_mir_ust',
        'provide_liquidity_mine_ust',
        'delegate_luna',
    ];
    let contractsInteraction = 0;
    contracts.forEach((c) => {
        const tx = txs.find(i => i.summary[c].count !== 0);
        if (tx && isLessThanXDays(90, tx.timestamp)) {
            contractsInteraction++;
        }
    });
    return contractsInteraction >= 10 ? 3 : 0;
}

/**
 * @param txs
 * @returns {number} 1 if the address has stacked at least 1 governance pool in the last 90 days - 0 otherwise.
 */
const getGovDegenScore = (txs) => {
    let contracts = [
        'anc_gov_stakings',
        'mir_gov_stakings',
        'pylon_gov_stakings',
    ];
    let contractsInteraction = 0;
    contracts.forEach((c) => {
        const tx = txs.find(i => i.summary[c].count !== 0);
        if (tx && isLessThanXDays(90, tx.timestamp)) {
            contractsInteraction++;
        }
    });
    return contractsInteraction >= 1 ? 1 : 0;
}

/**
 * @param txs
 * @returns {number} 2 if the address claimed at least 1 airdrop and stacked in that token's gov poll in the last 90
 * days - 0 otherwise.
 */
const getTerraActivistScore = (txs) => {
    let tokens = [
        'anc_gov_stakings',
        'mir_gov_stakings',
        'pylon_gov_stakings',
        'anc_airdrop_claims',
        'mir_airdrop_claims',
        'mine_airdrop_claims',
    ];
    let contractsInteraction = 0;
    tokens.forEach((c) => {
        const tx = txs.find(i => i.summary[c].count !== 0);
        const tx2 = txs.find(i => i.summary[c].count !== 0);
        if (tx && tx2 && isLessThanXDays(90, tx.timestamp) && isLessThanXDays(90, tx2.timestamp)) {
            contractsInteraction++;
        }
    });
    return contractsInteraction >= 1 ? 1 : 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address voted at least 1 governance proposal in the last 90 days - 0 otherwise.
 */
const getRockTheVoteScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 1 if the address swapped on a dex at least time in the last 90 days - 0 otherwise.
 */
const getBabyDegenScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 2 if the address transacted at least 5 tokens in the last 90 days - 0 otherwise.
 */
const getMultiTokenateScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address did at least 2 deposits to a liquidity pool in the last 90 days - 0 otherwise.
 */
const getAdultSwimScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 1 if the address received more from bridges or CEX's than sent () or 0 sent in the last 90 days
 * - 0 otherwise.
 */
const getBagBuilderScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 2 if 75% of the luna of the address is staked - 0 otherwise.
 */
const getInDeepScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address kept at least 90% of all airdrops claimed - 0 otherwise.
 */
const getDumpProofScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 1 if the address claimed at least 2 airdrops from any protocol
 * - 0 otherwise.
 */
const getWenMoonScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 2 if the address claimed airdrops for at least 2 tokens - 0 otherwise.
 */
const getAirdropAddictScore = (txs) => {
    // todo: implement
    return 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address claimed an airdrop from the same protocol more than once - 0 otherwise.
 */
const getRepeatCustomerScore = (txs) => {
    // todo: implement
    return 0;
}