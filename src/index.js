import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {WalletProvider, getChainOptions} from "@terra-money/wallet-provider";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from 'react-router-dom';
import Slide from "@mui/material/Slide";
import {SnackbarProvider} from "notistack";

getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <WalletProvider {...chainOptions}>
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        autoHideDuration={3000}
                        TransitionComponent={Slide}
                    >
                        <React.StrictMode>
                            <App/>
                        </React.StrictMode>
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        </WalletProvider>,
        document.getElementById('root')
    );
});
