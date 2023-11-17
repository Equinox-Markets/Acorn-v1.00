import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornCard: React.FC = () => {
  return (
    <Card className="acorn-card-2" bordered={false}>
      <h1 className="welcome-text"></h1>
      <p className="slogan-text">

      </p>
      <div className="airdrop-container-2">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo-2" />
        <div className="airdrop-text">
          <h2>Available Vaults on Acorn</h2>
          <p className="slogan-text">
          {/* Want to learn more? Check out our <a style={{ color: '#008FFF'}} href="https://acorn-finance.gitbook.io/acorn-docs/" target="_blank" rel="noopener noreferrer">Docs</a> for all the details.*/} Enjoy increased yields through tailored DeFi strategies.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCard;



