import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard1.css'; // Import your CSS file to style this component

const AcornCardWidget: React.FC = () => {
  return (
    <Card className="acorn-card-4" bordered={false}>
      <div className="airdrop-container-4">
        <div className="airdrop-text-4">
          <h2>Explore Different Blockchains</h2>
          <p className="slogan-text">
          Use this bridge to seamlessly transfer your Tokens between multiple blockchain networks.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AcornCardWidget;





