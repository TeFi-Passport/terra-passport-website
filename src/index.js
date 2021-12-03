import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {WalletProvider, getChainOptions} from "@terra-money/wallet-provider";
import {Provider} from "react-redux";
import store from "./store/store";

getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <WalletProvider {...chainOptions}>
            <Provider store={store}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
        </WalletProvider>,
        document.getElementById('root')
    );
});
