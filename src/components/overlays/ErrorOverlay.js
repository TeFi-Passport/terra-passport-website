import {AdvancedOverlayLayout} from "./Overlay";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {darkBackground, rajah, red1} from "../../constants/colors";
import styled from "styled-components";
import {DefaultLargeButton} from "../buttons/CustomButtons";
import {Heading3} from "../texts";
import {setOverlayStage} from "../../store/action";
import {mintingOverlayStages} from "../../constants/constants";

const Description = styled.h3`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: -0.23999999463558197px;
text-align: center;
`;

const GoToMyPassport = () => {

    const dispatch = useDispatch();

    return (
        <DefaultLargeButton
            style={{width: '100%'}}
            onClick={() => {dispatch(setOverlayStage(mintingOverlayStages.hidden))}}
            backgroundColor={rajah}>
            <Heading3 style={{color: darkBackground}}>
                GO BACK
            </Heading3>
        </DefaultLargeButton>
    );
}

export const ErrorOverlay = () => {

    const txError = useSelector(state => state.transactionError);

    return (
        <AdvancedOverlayLayout
            button1={<GoToMyPassport/>}
            title='ERROR'
            subtitle={<Description style={{'color': red1}}>{txError}</Description>}/>

    );
}