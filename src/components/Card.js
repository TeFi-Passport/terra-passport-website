import Box from "@mui/material/Box";
import React from "react";
import {blackDl} from "../constants/colors";

export const CustomCard = ({children, height, width, style}) => {
    return (
        <Box display='flex'
             flexDirection='column'
             className={'blueNeonBorder'}
             style={{background: blackDl, borderRadius: '8px', ...style}}
             alignItems='center'
             justifyContent='space-around'
             height={height}
             width={width}>
            {children}
        </Box>
    );
};