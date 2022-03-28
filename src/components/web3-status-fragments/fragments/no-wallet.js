import React from 'react';
import { Button } from 'antd';

const NoWallet = () => {
  const metaMaskAddress = typeof InstallTrigger !== 'undefined' ? (
    'https://trustwallet.com/xrp-wallet//'
  ) : 'https://trustwallet.com/xrp-wallet/';
  
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
        <h1>Wallet not found?</h1>
        <p>
          You’ll need a safe place to store all of your timepieces and digital dial NFTs!
          The perfect place is in a secure wallet.
          This will also act as your login (no extra password needed).
        </p>
          <a
            href={metaMaskAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary app-primary-large" size="large">
              Install Wallet
            </Button>
          </a>
      </div>
    </div>
  );
};

export default NoWallet;
