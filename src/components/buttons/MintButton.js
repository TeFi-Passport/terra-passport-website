import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    useConnectedWallet,
    UserDenied
} from "@terra-money/use-wallet";
import React, {useCallback} from "react";
import {DefaultLargeButton} from "./CustomButtons";
import {Heading3} from "../texts";
import {darkBackground, rajah} from "../../constants/colors";
import {useDispatch} from "react-redux";
import {mint} from "../../services/terra";

export const MintButton = () => {

    const dispatch = useDispatch()

    const connectedWallet = useConnectedWallet();

    return (
        <DefaultLargeButton
            style={{width: '100%'}}
            onClick={() => mint(dispatch, connectedWallet)}
            backgroundColor={rajah}>
            <Heading3 style={{color: darkBackground}}>
                MINT
            </Heading3>
        </DefaultLargeButton>
    );
}