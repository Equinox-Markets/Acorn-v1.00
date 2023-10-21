import React from 'react';
import { Card } from 'antd';
import './AcornNFTInfo.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornStakeInfo: React.FC = () => {
  return (
    <Card className="acorn-card-2" bordered={false}>
      <h1 className="welcome-text"></h1>
      <p className="slogan-text"></p>
      <div className="airdrop-container-2">
        <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo-2" />
        <div className="airdrop-text">
          <h2>Stake More, Earn More</h2>
          <p className="slogan-text">
            Stake your Acorn tokens and earn ETH. Recieve 20%
            of the total revenue that Acorn generates through fees and treasury yield.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornStakeInfo;




