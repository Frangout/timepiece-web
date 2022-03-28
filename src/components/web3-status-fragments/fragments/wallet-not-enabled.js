import React from 'react';

const WalletNotENabled = (props) => {
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
          <h1>Oops, you have not wallet installed.</h1>
          <p style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => window.location.reload()}>
						Please refresh this page and try again
          </p>
      </div>
    </div>
  );
};

export default WalletNotENabled;
