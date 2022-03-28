const xrpl = require('xrpl');
import Web3 from 'web3';

(async () => {
  
  // const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
  // await client.connect();

  // const cold_wallet = (await client.fundWallet()).wallet
  // const response = await client.request({
  //   "command": "account_info",
  //   "account": cold_wallet.address,
  //   "ledger_index": "validated"
  // })
  // console.log(response)

  // // Listen to ledger close events
  // client.request({
  //   "command": "subscribe",
  //   "streams": ["ledger"]
  // })
  // client.on("ledgerClosed", async (ledger) => {
  //   console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
  // })

})()
let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    process.env.REACT_APP_INFURA_URL
  );
  web3 = new Web3(provider); 
}
export default web3;