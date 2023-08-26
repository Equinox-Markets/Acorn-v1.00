import React from 'react';

import { Card } from 'antd';
import './AcornStats.css'; // Make sure to include the styles you need for these cards

const AcornStats: React.FC = () => {
  return (
    <div className="acorn-stats-container">
      <Card className="stat-card" bodyStyle={{ backgroundColor: 'transparent' }} bordered={false}>
        <h2 className="stat-title">Total Value Locked</h2>
        <p className="stat-value">$1,234,567</p>
      </Card>
      <Card className="stat-card" bodyStyle={{ backgroundColor: 'transparent' }} bordered={false}>
        <h2 className="stat-title">Vaults Operated</h2>
        <p className="stat-value">123</p>
      </Card>
      <Card className="stat-card" bodyStyle={{ backgroundColor: 'transparent' }} bordered={false}>
        <h2 className="stat-title">Treasury Value</h2>
        <p className="stat-value">$456,789</p>
      </Card>
    </div>
  );
};

export default AcornStats;


