import React from "react";
import {Header} from "../components/header";
import {useWallet} from "@terra-money/use-wallet";

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

    console.log(JSON.stringify(
        {
            status,
            network,
            wallets,
            supportFeatures: Array.from(supportFeatures),
            availableConnectTypes,
            availableInstallTypes,
        },
        null,
        2,
    ))

    return (
        <div className="App">
            <Header/>
        </div>
    );

}