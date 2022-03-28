import React from 'react';
import network from '../../../images/faq/main-network.png';

const BadWalletNetwork = (props) => {
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
          <h1>Oops, you’re on the wrong network</h1>
          <img src={network} alt="Network is invalid"/>
      </div>
    </div>
  );
};

export default BadWalletNetwork;
