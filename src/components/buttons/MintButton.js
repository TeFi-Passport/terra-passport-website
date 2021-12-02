import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    useConnectedWallet,
    UserDenied
} from "@terra-money/use-wallet";
import React, {useCallback, useEffect, useState} from "react";
import {Fee, MsgSend} from "@terra-money/terra.js";
import {DefaultLargeButton, GhostLargeButton} from "./CustomButtons";
import {Heading3, TextButton1} from "../texts";
import {darkBackground, rajah} from "../../constants/colors";

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

    useEffect(() => console.log({txError, txResult}), [txError, txResult])

    return (
        <DefaultLargeButton
            style={{width: '100%'}}
            onClick={proceed}
            backgroundColor={rajah}>
            <Heading3 style={{color: darkBackground}}>
                MINT
            </Heading3>
        </DefaultLargeButton>
    );
}