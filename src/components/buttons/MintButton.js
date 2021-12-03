import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    useConnectedWallet,
    UserDenied
} from "@terra-money/use-wallet";
import React, {useCallback} from "react";
import {Fee, MsgSend} from "@terra-money/terra.js";
import {DefaultLargeButton} from "./CustomButtons";
import {Heading3} from "../texts";
import {darkBackground, rajah} from "../../constants/colors";
import {useDispatch} from "react-redux";
import {
    setGeneratedScore,
    setLoadingMessage,
    setOverlayStage,
    setTransactionError,
    setTransactionResult
} from "../../store/action";
import {generateScore} from "../../utils/scoreGeneration";
import {loadingMessages, mintingOverlayStages} from "../../constants/constants";

const TEST_TO_ADDRESS = 'terra1m4ft8j6npuvvg4nru3lkhc59je7eapxrg5cna7';

export const MintButton = () => {

    const dispatch = useDispatch()

    const connectedWallet = useConnectedWallet();

    const proceed = useCallback(async () => {

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
            .then((nextTxResult) => {
                dispatch(setTransactionResult(nextTxResult));
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
            });
    }, [connectedWallet]);


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