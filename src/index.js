import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {WalletProvider, getChainOptions} from "@terra-money/wallet-provider";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from 'react-router-dom';

getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <WalletProvider {...chainOptions}>
            <Provider store={store}>
                <BrowserRouter>
                    <React.StrictMode>
                        <App/>
                    </React.StrictMode>
                </BrowserRouter>
            </Provider>
        </WalletProvider>,
        document.getElementById('root')
    );
});
