import React from 'react';
import { Alert, Card } from 'antd';
import './AcornStakeInfo.css'; // Import your CSS file to style this component
import web3Boilerplate_logo from 'assets/images/Acorn_Token.svg';

const AcornStakeInfo: React.FC = () => {
  return (
    <div>
      <Alert
        message="Staking is not live, we will release it after NFT minting is complete."
        type="info"
        showIcon
        style={{ marginBottom: '20px' }}
      />
      <Card className="acorn-card-6" bordered={false}>
        <h1 className="welcome-text-6"></h1>
        <p className="slogan-text-6"></p>
        <div className="airdrop-container-6">
          <img src={web3Boilerplate_logo} alt="Acorn Logo" className="acorn-logo-6" />
          <div className="airdrop-text-6">
            <h2>Stake More, Earn More</h2>
            <p className="slogan-text-6">
              Stake your Acorn tokens and earn ETH.
              {/* Recieve 20% of the total revenue that Acorn generates through fees and treasury yield. */}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AcornStakeInfo;




