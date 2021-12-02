import Box from "@mui/material/Box";
import React from "react";
import {CustomCard} from "../Card";

export const Overlay = ({children, style}) => {
    return (
        <Box display='flex'
             flexDirection='column'
             alignItems='center'
             justifyContent='center'
             style={{
                 position: 'fixed',
                 height: '100vh',
                 width: '100vw',
                 background: 'rgba(17,12,24,0.8)',
                 zIndex: 200,
             }}>
            <CustomCard height='50vh' width='46vw' style={style}>
                {children}
            </CustomCard>
        </Box>
    );
}