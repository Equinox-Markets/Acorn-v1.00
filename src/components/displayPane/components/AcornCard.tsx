import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornCard: React.FC = () => {
  return (
    <Card className="acorn-card-1" bordered={false}>
      <h1 className="welcome-text"></h1>
      <p className="slogan-text">

      </p>
      <div className="airdrop-container">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo" />
        <div className="airdrop-text">
          <h2>Explore Acorn!</h2>
          <p className="slogan-text">
          Want to learn more? Check out our <a href="https://acorn-finance.gitbook.io/acorn-docs/" target="_blank" rel="noopener noreferrer">Docs</a> for all the details. Make sure to click on the Vault Info button on each vault before staking!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCard;



