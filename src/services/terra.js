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
    setOverlayStage, setPassport,
    setTransactionError,
    setTransactionResult
} from "../store/action";

import {messages, mintingOverlayStages} from "../constants/constants";
import {generateScore} from "../utils/scoreGeneration";
import {Fee, MsgExecuteContract} from "@terra-money/terra.js";
import {addAPassport} from "./terraPassportAPI";
import {timer} from "../utils/utils";
import {getImageLinkFromIPFSLink, getJSONDataLinkFromIPFSHash, savePassportImageToIPFS} from "./IPFSHosting";

const contractAddress = 'terra1nc4jufa868gy205fvm9wx5nm4ssugmtda0wptl';
const fcdEndpoint = 'https://bombay-fcd.terra.dev/v1/';
const chainId = 'bombay-12';

export const mint = async (dispatch, connectedWallet) => {

    if (!connectedWallet) {
        return;
    }

    if (connectedWallet.network.chainID.startsWith('columbus')) {
        alert(`Please only execute this example on Testnet`);
        return;
    }

    dispatch(setLoadingMessage(messages.generatingScore));
    dispatch(setOverlayStage(mintingOverlayStages.loading));

    const score = await generateScore(connectedWallet.walletAddress);
    const ipfsInfo = await savePassportImageToIPFS(connectedWallet.walletAddress, chainId, score.score, score.lastTxHeight);
    const ipfsLink = getJSONDataLinkFromIPFSHash(ipfsInfo.IpfsHash);
    console.log(ipfsInfo);
    console.log(ipfsLink);
    dispatch(setGeneratedScore(score.score));
    dispatch(setLoadingMessage(messages.waitingTxResult));

    connectedWallet
        .post({
            fee: new Fee(1000000, '200000uusd'),
            msgs: [
                new MsgExecuteContract(
                    connectedWallet.walletAddress, // sender
                    contractAddress, // contract account address
                    {
                        'mint': {
                            'owner': 'terra1dy8wsxphneauw2wtldecem66xwa69y6zpd6gjh',
                            'token_id': ipfsInfo.IpfsHash,
                            'token_uri': ipfsLink,
                        }
                    }, // handle msg
                    {} // coins
                )
            ],
        })
        .then(async (nextTxResult) => {
            dispatch(setTransactionResult(nextTxResult));
            dispatch(setLoadingMessage('Waiting for the transaction to be broadcast...'));
            const tx = await waitForTxToBeBroadcast(nextTxResult.result.txhash);
            console.log(tx);
            // todo: check if tx succeeded
            dispatch(setOverlayStage(mintingOverlayStages.mintCompleted));
            const img = await getImageLinkFromIPFSLink(ipfsLink);
            const passport = await addAPassport(connectedWallet.walletAddress, score, tx, img);
            dispatch(setPassport(passport));
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
        const res = await fetch(fcdEndpoint + "tx/" + txHash, {
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