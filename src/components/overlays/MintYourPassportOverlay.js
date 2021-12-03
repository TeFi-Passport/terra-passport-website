import {AdvancedOverlayLayout} from "./Overlay";
import React from "react";
import {useDispatch} from "react-redux";
import {MintButton} from "../buttons/MintButton";
import {setOverlayStage} from "../../store/action";
import {mintingOverlayStages} from "../../constants/constants";
import {tequila} from "../../constants/colors";
import {Heading3} from "../texts";

const NotNowButton = () => {
    const dispatch = useDispatch();

    return (
        <Heading3 onClick={() => dispatch(setOverlayStage(mintingOverlayStages.hidden))}
                  style={{color: tequila, cursor: 'pointer'}}>
            NOT NOW
        </Heading3>
    );
}

export const MintYourPassportOverlay = () => {

    return (
        <AdvancedOverlayLayout button1={<MintButton/>}
                               button2={<NotNowButton/>}
                               title='Mint your passport'
                               subtitle='Get your nft passport now to access decentralized finance on Terra'/>

    );
}