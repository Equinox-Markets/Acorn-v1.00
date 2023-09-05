import React from 'react';
import { Card } from 'antd';
import './AcornInfo.css';

const AcornInfo: React.FC = () => {
  return (
    <Card className="acorn-card-info" bordered={false}>
      <h1 className="welcome-text-info animated-text">Optimizing Liquidity & Maximizing Rewards Across Chains</h1>

      <div className="features-info">
  {/* Each feature has its own animation and visual effects */}
  <div className="feature-container-info pulse">
    <h2 className="feature-title">Vaults</h2>
    <p className="feature-text">Efficient vaults for multi-protocol yield generation.</p>
  </div>

  <div className="feature-container-info slide-in">
    <h2 className="feature-title">aTokens</h2>
    <p className="feature-text">aTokens offer interest accrual directly on your balance.</p>
  </div>

  <div className="feature-container-info fade-in">
    <h2 className="feature-title">Treasury</h2>
    <p className="feature-text">Engage in Liquidity Wars to maximize returns.</p>
  </div>

  <div className="feature-container-info pop">
    <h2 className="feature-title">Governance</h2>
    <p className="feature-text">Cross-chain governance and liquidity.</p>
  </div>
</div>

    </Card>
  );
};

export default AcornInfo;




