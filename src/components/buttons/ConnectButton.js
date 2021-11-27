import {ConnectType, useWallet} from "@terra-money/use-wallet";
import React from "react";

import {CustomButton} from "./CustomButton";

export const ConnectButton = () => {

    const {connect} = useWallet();

    return (
        <CustomButton
            onClick={() => {
                connect(ConnectType.EXTENSION)
            }}
            text={'Connect wallet'}
        >

        </CustomButton>
    );
}