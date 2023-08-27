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
          <h2 className="stat-title">Total Value Locked</h2>
          <p className="stat-value">$57,392</p>
        </Card>
      </div>
      <div className="card-wrapper">
        <Card className="stat-card" bodyStyle={cardStyle} bordered={false}>
          <h2 className="stat-title">Vaults Operated</h2>
          <p className="stat-value">3</p>
        </Card>
      </div>
      <div className="card-wrapper">
        <Card className="stat-card" bodyStyle={cardStyle} bordered={false}>
          <h2 className="stat-title">Treasury Value</h2>
          <p className="stat-value">$28,696</p>
        </Card>
      </div>
    </div>
  );
};

export default AcornStats;




