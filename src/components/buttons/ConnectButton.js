import {ConnectType, useWallet} from "@terra-money/use-wallet";
import React from "react";

import {GhostSmallButton} from "./CustomButtons";
import {TextButton2} from "../texts";
import {useSnackbar} from "notistack";
import {notistackOptions} from "../../utils/notistackUtils";

export const ConnectButton = () => {

    const {connect, availableConnections} = useWallet();
    const { enqueueSnackbar } = useSnackbar();

    console.log(availableConnections);

    return (
        <GhostSmallButton
            onClick={() => {
                if (availableConnections.find(t => t.type === ConnectType.EXTENSION)) {
                    connect(ConnectType.EXTENSION);
                } else if (availableConnections.find(t => t.type === ConnectType.WALLETCONNECT)) {
                    connect(ConnectType.WALLETCONNECT);
                } else {
                    enqueueSnackbar("Please install the terra station extension or app", notistackOptions.ERROR);
                }
            }}
        >
            <TextButton2>Connect wallet</TextButton2>
        </GhostSmallButton>
    );
}