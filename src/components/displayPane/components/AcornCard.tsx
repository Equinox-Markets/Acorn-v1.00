import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornCard: React.FC = () => {
  return (
    <Card className="acorn-card" bordered={false}>
      <h1 className="welcome-text">Earn Increased Yields with Acorn's Dynamic Vaults</h1>
      <p className="slogan-text">

      </p>
      <div className="airdrop-container">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo" />
        <div className="airdrop-text">
          <h2>Be an Early Depositor!</h2>
          <p className="slogan-text">
          Deposit now and be rewarded with Acorn Tokens in our fair launch based on your deposit!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCard;



