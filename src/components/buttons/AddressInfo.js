import {useWallet} from "@terra-money/use-wallet";
import React from "react";
import {GhostSmallButton} from "./CustomButtons";
import {walletAddressToShortenedAddress} from "../../utils/utils";
import {TextButton2} from "../texts";

export const AddressInfo = () => {

    const {wallets, disconnect} = useWallet();

    return (
        <GhostSmallButton
            onClick={() => {
                disconnect();
            }}
        >
            <TextButton2>{walletAddressToShortenedAddress(wallets[0].terraAddress)}</TextButton2>
        </GhostSmallButton>
    );
}