import React, {useEffect} from "react";
import {Header} from "../components/header";
import {MintButton} from "../components/buttons/MintButton";
import {generateScore} from "../utils/scoreGeneration";

export const HomePage = () => {

    useEffect(()=>generateScore(), [])

    return (
        <div className="App">
            <Header/>
            <MintButton/>
            <div onClick={generateScore}>
                Generate score
            </div>
        </div>
    );

}