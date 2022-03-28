import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
const xrpl = require('xrpl');

(async () => {
  // await initWeb3();
  Parse.initialize(
    'own_that_meme',
  );

  const xrpWallet = xrpl.Wallet.fromSeed(process.env.REACT_APP_XRPL_WALLET_PRIVATE_SEED)
  const xrpClient = new xrpl.Client(process.env.REACT_APP_XRPL_NET_ADDR); //wss://xls20-sandbox.rippletest.net:51233
  await xrpClient.connect();
  window.xrpClient = xrpClient;
  window.xrpWallet = xrpWallet
  Parse.serverURL = process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PARSE;
  
  ReactDOM.render(<App xrp={{ Client: xrpClient, Wallet: xrpWallet}}/>, document.getElementById('root'));
  registerServiceWorker();
})();
