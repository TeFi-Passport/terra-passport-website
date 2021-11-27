import React from "react";
import {ConnectButton} from "./buttons/ConnectButton";
import Box from "@mui/material/Box";
import {useWallet} from "@terra-money/use-wallet";
import {AddressInfo} from "./buttons/AddressInfo";

export const Header = () => {

    const {status} = useWallet();

    return (
        <Box display='flex' flexDirection='row' justifyContent='flex-end' style={{width: '100vw', paddingTop: '24px'}}>
            {status === "WALLET_CONNECTED" && <AddressInfo/>}
            {status !== "WALLET_CONNECTED" && <ConnectButton/>}
            <Box width='32px'/>
        </Box>
    );

}