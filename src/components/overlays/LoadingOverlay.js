import {Overlay} from "./Overlay";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";
import {grey, grey5} from "../../constants/colors";
import styled from "styled-components";
import Box from "@mui/material/Box";

const Text = styled.h3`
font-family: RoadRadio;
font-size: 34px;
font-style: normal;
font-weight: 700;
letter-spacing: 0px;
text-align: left;
`;
const Description = styled.h3`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: -0.23999999463558197px;
text-align: center;
`;

export const LoadingOverlay = ({}) => {

    const txResult = useSelector(state => state.transactionResult);
    const txError = useSelector(state => state.transactionError);
    const loadingMessage = useSelector(state => state.loadingMessage);

    if (txResult) {
        console.log(txResult);
    }

    if (txError) {
        console.log(txError);
    }

    return (
        <Overlay style={{
            padding: '20px 63px 20px 63px'
        }}>
            <Box>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <CircularProgress style={{'color': grey5}}/>
                    <Text style={{color: grey5, marginLeft: '25px'}}>LOADING</Text>
                </Box>
                <Description style={{'color': grey}}>{loadingMessage}</Description>
            </Box>
        </Overlay>
    );
}