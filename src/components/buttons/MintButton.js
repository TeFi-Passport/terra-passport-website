import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    useConnectedWallet,
    UserDenied
} from "@terra-money/use-wallet";
import React, {useCallback, useState} from "react";
import {Fee, MsgSend} from "@terra-money/terra.js";

const TEST_TO_ADDRESS = 'terra1m4ft8j6npuvvg4nru3lkhc59je7eapxrg5cna7';

export const MintButton = () => {

    const [txResult, setTxResult] = useState(null);
    const [txError, setTxError] = useState(null);

    const connectedWallet = useConnectedWallet();

    const proceed = useCallback(() => {
        if (!connectedWallet) {
            return;
        }

        if (connectedWallet.network.chainID.startsWith('columbus')) {
            alert(`Please only execute this example on Testnet`);
            return;
        }

        setTxResult(null);
        setTxError(null);

        connectedWallet
            .post({
                fee: new Fee(1000000, '200000uusd'),
                msgs: [
                    new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
                        uusd: 1000000,
                    }),
                ],
            })
            .then((nextTxResult) => {
                console.log(nextTxResult);
                setTxResult(nextTxResult);
            })
            .catch((error) => {
                if (error instanceof UserDenied) {
                    setTxError('User Denied');
                } else if (error instanceof CreateTxFailed) {
                    setTxError('Create Tx Failed: ' + error.message);
                } else if (error instanceof TxFailed) {
                    setTxError('Tx Failed: ' + error.message);
                } else if (error instanceof Timeout) {
                    setTxError('Timeout');
                } else if (error instanceof TxUnspecifiedError) {
                    setTxError('Unspecified Error: ' + error.message);
                } else {
                    setTxError(
                        'Unknown Error: ' +
                        (error instanceof Error ? error.message : String(error)),
                    );
                }
            });
    }, [connectedWallet]);

    return (
        <div>
            <h1>Tx Sample</h1>

            {connectedWallet?.availablePost && !txResult && !txError && (
                <button onClick={proceed}>Send 1USD to {'terra1m4ft8j6npuvvg4nru3lkhc59je7eapxrg5cna7'}</button>
            )}

            {txResult && (
                <>
                    <pre>{JSON.stringify(txResult, null, 2)}</pre>

                    {connectedWallet && txResult && (
                        <div>
                            <a
                                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open Tx Result in Terra Finder
                            </a>
                        </div>
                    )}
                </>
            )}

            {txError && <pre>{txError}</pre>}

            {(!!txResult || !!txError) && (
                <button
                    onClick={() => {
                        setTxResult(null);
                        setTxError(null);
                    }}
                >
                    Clear result
                </button>
            )}

            {!connectedWallet && <p>Wallet not connected!</p>}

            {connectedWallet && !connectedWallet.availablePost && (
                <p>This connection does not support post()</p>
            )}
        </div>
    );
}