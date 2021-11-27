import {useWallet} from "@terra-money/use-wallet";
import React from "react";
import {CustomButton} from "./CustomButton";

export const AddressInfo = () => {

    const {wallets, disconnect} = useWallet();

    return (
        <CustomButton
            onClick={() => {
                disconnect();
            }}
            text={wallets[0].terraAddress}
        >

        </CustomButton>
    );
}