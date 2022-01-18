import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import App from "./App";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { TokenPriceContextProvider } from "./contexts/TokenPriceContext";
import { getLibrary } from './utils/web3React';
import Web3ReactManager from './components/Web3ReactManager'

import 'react-toastify/dist/ReactToastify.css';
import store from './state'


TimeAgo.addDefaultLocale(en)

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Web3ReactManager>
          <RefreshContextProvider>
            <TokenPriceContextProvider>
              <App />
              <ToastContainer />
            </TokenPriceContextProvider>
          </RefreshContextProvider>
        </Web3ReactManager>
      </Provider>
    </Web3ReactProvider>,
  document.getElementById("root")
);
