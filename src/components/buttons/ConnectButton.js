import {ConnectType, useWallet} from "@terra-money/use-wallet";
import React from "react";

import {GhostSmallButton} from "./CustomButtons";
import {TextButton2} from "../texts";

export const ConnectButton = () => {

    const {connect} = useWallet();

    return (
        <GhostSmallButton
            onClick={() => {
                connect(ConnectType.EXTENSION)
            }}
        >
            <TextButton2>Connect wallet</TextButton2>
        </GhostSmallButton>
    );
}