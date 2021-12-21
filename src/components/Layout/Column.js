import React from "react";
import Box from "@mui/material/Box";

const Column = ({ children, ...other }) => {
    return (
        <Box {...other} display='flex' flexDirection='column'>
            {children}
        </Box>
    );
};

export default Column;