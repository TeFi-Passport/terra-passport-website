import {isLessThanXDays} from "./utils";

/**
 *
 * @returns {Promise<number>} - the score associated with the address
 */
export const generateScore = async (address) => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
    };

    let res = await fetch("https://947o3z5ei5.execute-api.us-east-2.amazonaws.com/default/model_inputs?address=" + address, requestOptions)

    res = await res.json()
    //const res = await fetchTransactionAnalysis();
    const txs = res.transactions;
    console.log({
        gettingStarted: getGettingStartedScore(txs),
        insomniac: getInsomniacScore(txs),
        upAndAtThem: getUpAndAtThemScore(txs),
        govDegen: getGovDegenScore(txs),
        terraActivist: getTerraActivistScore(txs),
        rockTheVote: 'not in the scope of the hackathon',
        babyDegen: getBabyDegenScore(txs),
        multiTokenate: getMultiTokenateScore(res.bank),
        adultSwim: getAdultSwimScore(txs),
        bagBuilder: getBagBuilderScore(txs),
        inDeep: getInDeepScore(res.bank),
        dumpProof: 'todo!',
        wenMoon: getWenMoonScore(txs),
        airdropAddict: getAirdropAddictScore(txs),
        repeatCustomer: getRepeatCustomerScore(txs),
    });


    const score = getGettingStartedScore(txs)
        + getInsomniacScore(txs)
        + getUpAndAtThemScore(txs)
        + getGovDegenScore(txs)
        + getTerraActivistScore(txs)
        + getRockTheVoteScore(txs)
        + getBabyDegenScore(txs)
        + getMultiTokenateScore(res.bank)
        + getAdultSwimScore(txs)
        + getBagBuilderScore(txs)
        + getInDeepScore(res.bank)
        + getDumpProofScore(txs)
        + getWenMoonScore(txs)
        + getAirdropAddictScore(txs)
        + getRepeatCustomerScore(txs);

    return {
        score: score,
        gettingStarted: getGettingStartedScore(txs),
        insomniac: getInsomniacScore(txs),
        upAndAtThem: getUpAndAtThemScore(txs),
        govDegen : getGovDegenScore(txs),
        terraActivist : getTerraActivistScore(txs),
        rockTheVote : getRockTheVoteScore(txs),
        babyDegen : getBabyDegenScore(txs),
        multiTokenate : getMultiTokenateScore(res.bank),
        adultSwim : getAdultSwimScore(txs),
        bagBuilder : getBagBuilderScore(txs),
        inDeep : getInDeepScore(res.bank),
        dumpProof : getDumpProofScore(txs),
        wenMoon : getWenMoonScore(txs),
        airdropAddict : getAirdropAddictScore(txs),
        repeatCustomer : getRepeatCustomerScore(txs),
        lastTxHeight: res.transactions[0].height
    };
};

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
        const filteredTxs = txs.filter(i => i.summary[c].count !== 0);
        filteredTxs.forEach((tx) => {
            if (tx && isLessThanXDays(90, tx.timestamp)) {
                contractsInteraction++;
            }
        });
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
        {gov: 'anc_gov_stakings', airdrop: 'anc_airdrop_claims'},
        {gov: 'anc_gov_stakings', airdrop: 'anc_reward_distributions'},
        {gov: 'mir_gov_stakings', airdrop: 'mir_airdrop_claims'},
        {gov: 'pylon_gov_stakings', airdrop: 'mine_airdrop_claims'}
    ];

    let contractsInteraction = 0;
    tokens.forEach((c) => {
        const tx = txs.find(i => i.summary[c.gov].count !== 0);
        const tx2 = txs.find(i => i.summary[c.airdrop].count !== 0);
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
    let data = [
        "buy_luna_ust_swap",
        "sell_luna_ust_swap",
        "buy_anc_ust_swap",
        "sell_anc_ust_swap",
        "buy_mir_ust_swap",
        "sell_mir_ust_swap",
        "buy_mine_ust_swap",
        "sell_mine_ust_swap",
    ];
    let dexInteractions = 0;
    data.forEach((c) => {
        const tx = txs.find(i => i.summary[c].count !== 0);
        if (tx && isLessThanXDays(90, tx.timestamp)) {
            dexInteractions++;
        }
    });
    return dexInteractions >= 1 ? 1 : 0;
}

/**
 * @param bank
 * @returns {number} 2 if the address has at least 3 different tokens in wallet - 0 otherwise.
 * // todo: change
 */
const getMultiTokenateScore = (bank) => {
    return bank.balance.length >= 3 ? 2 : 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address did at least 2 deposits to a liquidity pool in the last 90 days - 0 otherwise.
 */
const getAdultSwimScore = (txs) => {
    let pools = [
        "provide_liquidity_luna_ust",
        "provide_liquidity_anc_ust",
        "provide_liquidity_mir_ust",
        "provide_liquidity_mine_ust"
    ];
    let poolDeposits = 0;
    pools.forEach((c) => {
        const filteredTxs = txs.filter(i => i.summary[c].count !== 0);
        filteredTxs.forEach((tx) => {
            if (tx && isLessThanXDays(90, tx.timestamp)) {
                poolDeposits += tx.summary[c].count;
            }
        });
    });
    return poolDeposits >= 2 ? 3 : 0;
}

/**
 * @param txs
 * @returns {number} 1 if the address received more from bridges or CEX's than sent or 0 sent in the last 90 days
 * - 0 otherwise.
 */
const getBagBuilderScore = (txs) => {
    let lunaInflows = 0, lunaOutflows = 0, ustInflows = 0, ustOutflows = 0;
    const lunaDeposits = [
        "binance_deposit_uluna",
        "kucoin_deposit_uluna",
        "huobi_deposit_uluna",
        "bithumb_deposit_uluna",
    ];
    const lunaWithdraws = [
        "binance_withdraw_uluna",
        "kucoin_withdraw_uluna",
        "bithumb_withdraw_uluna",
        "huobi_withdraw_uluna",
    ];
    const ustDeposit = [
        "kucoin_deposit_uusd",
    ];
    const ustWithdraws = [
        "kucoin_withdraw_uusd",
    ];

    const analyzeGroup = (contractType, variableToUpdate) => {
        contractType.forEach((c) => {
            // todo: filter
            const tx = txs.find(i => i.summary[c].count !== 0);
            if (tx && isLessThanXDays(90, tx.timestamp)) {
                variableToUpdate += tx.amount;
            }
        });
    }

    analyzeGroup(lunaDeposits, lunaOutflows);
    analyzeGroup(lunaWithdraws, lunaInflows);
    analyzeGroup(ustDeposit, ustOutflows);
    analyzeGroup(ustWithdraws, ustInflows);

    // todo: analyze ust too
    return lunaInflows - lunaOutflows >= 0 ? 1 : 0;
}

/**
 * @param bank
 * @returns {number} 2 if 75% of the luna of the address is staked - 0 otherwise.
 */
const getInDeepScore = (bank) => {
    const walletInfo = bank.balance.find(i => i.denom === 'uluna');
    const delegationInfo = bank.delegations;
    if (!walletInfo && !delegationInfo.length)
        return 0;
    const availableLuna = parseInt(walletInfo.available);
    let delegatedAmount = 0;
    delegationInfo.forEach((d) => {
        delegatedAmount += parseInt(d.amount);
    })
    return delegatedAmount >= 3 * availableLuna ? 2 : 0;
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
 * @returns {number} 1 if the address claimed at least 2 airdrops from any protocol - 0 otherwise.
 */
const getWenMoonScore = (txs) => {
    let airdrops = [
        "anc_airdrop_claims",
        "anc_reward_distributions",
        "mir_airdrop_claims",
        "mine_airdrop_claims",
    ];
    let airdropClaimed = 0;
    airdrops.forEach((c) => {
        const filteredTxs = txs.filter(i => i.summary[c].count !== 0);
        filteredTxs.forEach((tx) => {
            if (tx) {
                airdropClaimed += tx.summary[c].count;
            }
        });
    });
    return airdropClaimed >= 2 ? 1 : 0;
}

/**
 * @param txs
 * @returns {number} 2 if the address claimed airdrops for at least 2 tokens - 0 otherwise.
 */
const getAirdropAddictScore = (txs) => {
    let airdrops = [
        ["anc_reward_distributions", "anc_airdrop_claims",],
        ["mir_airdrop_claims"],
        ["mine_airdrop_claims"],
    ];
    let airdropClaimed = 0;
    airdrops.forEach((token) => {
        let airdropForThisToken = false;
        token.forEach(contractName => {
            const tx = txs.find(i => i.summary[contractName].count !== 0);
            if (tx && !airdropForThisToken) {
                airdropClaimed++;
                airdropForThisToken = true;
            }
        });
    });
    return airdropClaimed >= 2 ? 2 : 0;
}

/**
 * @param txs
 * @returns {number} 3 if the address claimed an airdrop from the same protocol more than once - 0 otherwise.
 */
const getRepeatCustomerScore = (txs) => {
    let airdrops = [
        ["anc_reward_distributions", "anc_airdrop_claims",],
        ["mir_airdrop_claims"],
        ["mine_airdrop_claims"],
    ];
    let ok = false;
    airdrops.forEach((token) => {
        let numberClaimed = 0;

        token.forEach((contractName) => {
            const filteredTxs = txs.filter(i => i.summary[contractName].count !== 0);

            filteredTxs.forEach((tx) => {
                if (tx) {
                    numberClaimed += tx.summary[contractName].count
                }
            });
        })

        if (numberClaimed >= 2) {
            ok = true;
        }
    });
    return ok ? 3 : 0;
}