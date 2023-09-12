import React from 'react';
import { Card } from 'antd';
import './AcornStats.css';

const AcornStats: React.FC = () => {
  const cardStyle = {
    backgroundColor: 'transparent'
  };

  return (
    <div className="acorn-stats-container">
      <div className="card-wrapper">
        <Card className="stat-card" bodyStyle={cardStyle} bordered={false}>
          <h2 className="stat-title">Total Staked Tokens</h2>
          <p className="stat-value">$237,392</p>
        </Card>
      </div>
      <div className="card-wrapper">
        <Card className="stat-card" bodyStyle={cardStyle} bordered={false}>
          <h2 className="stat-title">Vaults Operated</h2>
          <p className="stat-value">3</p>
        </Card>
      </div>
    </div>
  );
};

export default AcornStats;




