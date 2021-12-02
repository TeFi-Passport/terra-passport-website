import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {WalletProvider, getChainOptions} from "@terra-money/wallet-provider";

getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <WalletProvider {...chainOptions}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </WalletProvider>,
        document.getElementById('root')
    );
});
