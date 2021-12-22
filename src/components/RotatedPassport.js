import React from "react";
import {withTheme} from "@emotion/react";

export const passportImageRatio = 211/316;

const RotatedPassport = ({width, img, style = {}}) => {

    const height = width*passportImageRatio;
    const diff = width - height;

    return (
        <img src={img} alt='passport' style={{
            width: height,
            imageRatio: 1,
            transform: 'rotate(-90deg) translateY(' + (diff / 1.8) + 'px) translateX(' + (diff / 1.8) + 'px)',
            ...style
        }}/>
    )
};

export default withTheme(RotatedPassport);