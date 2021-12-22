import React from "react";
import {ConnectButton} from "./buttons/ConnectButton";
import Box from "@mui/material/Box";
import {useWallet} from "@terra-money/use-wallet";
import {AddressInfo} from "./buttons/AddressInfo";
import {TefiPassportLogo, TefiPassportSimpleLogo} from "./TefiPassportLogo";
import Row from "./Layout/Row";
import {useSelector} from "react-redux";

export const Header = () => {

    const {status} = useWallet();
    const isMobile = useSelector(state => state.isMobile);

    if (isMobile)
        return (
            <Row justifyContent='space-between' alignItems='center' height='100px' style={{marginBottom: '50px'}}>
                <TefiPassportSimpleLogo height='25px'/>
                {status === "WALLET_CONNECTED" && <AddressInfo/>}
                {status !== "WALLET_CONNECTED" && <ConnectButton/>}
            </Row>
        );

    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' style={{paddingTop: '60px'}}>
            <TefiPassportLogo/>
            {status === "WALLET_CONNECTED" && <AddressInfo/>}
            {status !== "WALLET_CONNECTED" && <ConnectButton/>}
        </Box>
    );

}