import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornCard: React.FC = () => {
  return (
    <Card className="acorn-card" bordered={false}>
      <h1 className="welcome-text">Welcome to Acorn Finance</h1>
      <p className="slogan-text">
        Enjoy <u>increased yields</u> with Acorn's dynamic vaults. Our low-risk, high-reward strategies are constantly updated to reflect the ever-changing DeFi landscape.
      </p>
      <div className="airdrop-container">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo" />
        <div className="airdrop-text">
          <h2>Be an Early Depositor!</h2>
          <p className="slogan-text">
          <u>Deposit now</u> and be rewarded with Acorn Tokens in our fair launch based on your deposit. Invest in the best yield strategies and <strong>earn more!</strong>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCard;



