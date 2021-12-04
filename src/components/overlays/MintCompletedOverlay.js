import {AdvancedOverlayLayout} from "./Overlay";
import React from "react";
import {darkBackground, rajah, tequila} from "../../constants/colors";
import {Heading3} from "../texts";
import store from "../../store/store";
import {DefaultLargeButton} from "../buttons/CustomButtons";
import {getTerraFinderLink} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const SeeTxIdButton = () => {

    return (
        <Heading3 onClick={() => {
            window.open(getTerraFinderLink(store.getState().transactionResult.result.txhash))
        }}
                  style={{color: tequila, cursor: 'pointer'}}>
            SEE TX ID
        </Heading3>
    );
}

const GoToMyPassport = () => {

    const navigate = useNavigate();

    return (
        <DefaultLargeButton
            style={{width: '100%'}}
            onClick={() => {
                navigate('/passport');
            }}
            backgroundColor={rajah}>
            <Heading3 style={{color: darkBackground}}>
                GO TO MY PASSPORT
            </Heading3>
        </DefaultLargeButton>
    );
}

export const MintCompletedOverlay = () => {

    return (
        <AdvancedOverlayLayout button1={<GoToMyPassport/>}
                               button2={<SeeTxIdButton/>}
                               title='COMPLETED'
                               subtitle='Your passport was successfully minted'/>

    );
}