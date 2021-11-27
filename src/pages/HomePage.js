import React from "react";
import {Header} from "../components/header";
import {useWallet} from "@terra-money/use-wallet";
import {MintButton} from "../components/buttons/MintButton";

export const HomePage = () => {

    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        availableInstallTypes,
        availableConnections,
        supportFeatures,
        connect,
        install,
        disconnect,
    } = useWallet();

    return (
        <div className="App">
            <Header/>
            <MintButton/>
        </div>
    );

}