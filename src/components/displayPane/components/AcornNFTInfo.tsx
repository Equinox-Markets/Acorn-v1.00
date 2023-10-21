import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_NFT.png';

const AcornCard: React.FC = () => {
  return (
    <Card className="acorn-card-3" bordered={false}>
      <div className="airdrop-container-3">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo-3" />
        <div className="airdrop-text-1">
          <h2>Stake Acorn NFTs and Earn ETH</h2>
          <p className="slogan-text-1">
          Recieve 10% of all revenue of Acorn in ETH. Rewards are distributed every 7 days.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCard;



