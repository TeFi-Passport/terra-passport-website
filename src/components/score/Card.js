import React from "react";
import {darkBackground} from "../../constants/colors";
import Box from "@mui/material/Box";

export const cardRadius = '8px';

export const Card = ({style, horizontalPadding = '0px', verticalPadding = '0px', horizontalMargin = '0px', verticalMargin = '0px', children}) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            style={{
                backgroundColor: darkBackground,
                borderRadius: cardRadius,
                padding: `${verticalPadding} ${horizontalPadding}`,
                margin: `${verticalMargin} ${horizontalMargin}`,
                ...style,
            }}>
            {children}
        </Box>
    );
}