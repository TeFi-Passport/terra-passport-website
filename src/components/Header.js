import React from "react";
import {ConnectButton} from "./buttons/ConnectButton";
import Box from "@mui/material/Box";
import {useWallet} from "@terra-money/use-wallet";
import {AddressInfo} from "./buttons/AddressInfo";
import {TefiPassportLogo} from "./TefiPassportLogo";

export const Header = () => {

    const {status} = useWallet();

    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' style={{paddingTop: '60px'}}>
            <TefiPassportLogo/>
            {status === "WALLET_CONNECTED" && <AddressInfo/>}
            {status !== "WALLET_CONNECTED" && <ConnectButton/>}
        </Box>
    );

}