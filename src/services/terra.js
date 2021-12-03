import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    UserDenied
} from "@terra-money/use-wallet";

import {
    setGeneratedScore,
    setLoadingMessage,
    setOverlayStage,
    setTransactionError,
    setTransactionResult
} from "../store/action";

import {loadingMessages, mintingOverlayStages} from "../constants/constants";
import {generateScore} from "../utils/scoreGeneration";
import {Fee, MsgSend} from "@terra-money/terra.js";
import {addAPassport} from "./terraPassportAPI";
import {timer} from "../utils/utils";

const TEST_TO_ADDRESS = 'terra1m4ft8j6npuvvg4nru3lkhc59je7eapxrg5cna7';
const fcdEndpoint = 'https://bombay-fcd.terra.dev/v1/';

export const mint = async (dispatch, connectedWallet) => {

    if (!connectedWallet) {
        return;
    }

    if (connectedWallet.network.chainID.startsWith('columbus')) {
        alert(`Please only execute this example on Testnet`);
        return;
    }

    dispatch(setLoadingMessage(loadingMessages.generatingScore));
    dispatch(setOverlayStage(mintingOverlayStages.loading));

    const score = await generateScore(connectedWallet.walletAddress);
    dispatch(setGeneratedScore(score));
    dispatch(setLoadingMessage(loadingMessages.waitingTxResult));

    connectedWallet
        .post({
            fee: new Fee(1000000, '200000uusd'),
            msgs: [
                new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
                    uusd: 1000000,
                }),
            ],
        })
        .then(async (nextTxResult) => {
            dispatch(setTransactionResult(nextTxResult));
            dispatch(setLoadingMessage('Waiting for the transaction to be broadcast...'));
            const tx = await waitForTxToBeBroadcast(nextTxResult.result.txhash);
            console.log(tx);
            // todo: check if tx succeeded
            addAPassport(connectedWallet.walletAddress,score,tx);
            dispatch(setOverlayStage(mintingOverlayStages.mintCompleted));
        })
        .catch((error) => {
            if (error instanceof UserDenied) {
                dispatch(setTransactionError('User Denied'));
            } else if (error instanceof CreateTxFailed) {
                dispatch(setTransactionError('Create Tx Failed: ' + error.message));
            } else if (error instanceof TxFailed) {
                dispatch(setTransactionError('Tx Failed: ' + error.message));
            } else if (error instanceof Timeout) {
                dispatch(setTransactionError('Timeout'));
            } else if (error instanceof TxUnspecifiedError) {
                dispatch(setTransactionError('Unspecified Error: ' + error.message));
            } else {
                dispatch(setTransactionError(
                    'Unknown Error: ' +
                    (error instanceof Error ? error.message : String(error)),
                ));
            }

            dispatch(setOverlayStage(mintingOverlayStages.error));
        });
}

/**
 *
 * @param {string} txHash
 * @return {Promise<{}>} tx
 */
const getTx = async (txHash) => {
    try {
        const res = await fetch(fcdEndpoint+"tx/"+txHash, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "if-modified-since": "Fri, 03 Dec 2021 18:06:16 GMT",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://finder.terra.money/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });
        return await res.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

const waitForTxToBeBroadcast = async (txHash) => {
    let tx;
    while (!tx) {
        tx = await getTx(txHash);
        await timer(1000);
    }
    return tx;
}