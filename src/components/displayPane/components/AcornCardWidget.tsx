import React from 'react';

// eslint-disable-next-line import/order
import { Card } from 'antd';

import './AcornCard.css'; // Import your CSS file to style this component

const AcornCardWidget: React.FC = () => {
  return (
    <Card className="acorn-card-2" bordered={false}>
      <div className="airdrop-container-2">
        <div className="airdrop-text">
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





