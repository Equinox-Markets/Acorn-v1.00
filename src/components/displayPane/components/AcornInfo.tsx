import React from 'react';
import { Card } from 'antd';
import './AcornInfo.css';

const AcornInfo: React.FC = () => {
  return (
    <Card className="acorn-card-info" bordered={false}>
      <h1 className="welcome-text-info animated-text">Welcome to Acorn Finance</h1>
      <p className="slogan-text-info neon-text">
        An advanced, decentralized protocol optimized for cross-chain governance and liquidity.
      </p>

      <div className="features-info">
  {/* Each feature has its own animation and visual effects */}
  <div className="feature-container-info pulse">
    <h2 className="feature-title">Vaults</h2>
    <p className="feature-text">Efficient vaults for multi-protocol yield generation.</p>
  </div>

  <div className="feature-container-info slide-in">
    <h2 className="feature-title">veTokens</h2>
    <p className="feature-text">Strategic veToken allocation for yield and voting.</p>
  </div>

  <div className="feature-container-info fade-in">
    <h2 className="feature-title">Treasury</h2>
    <p className="feature-text">Focused governance for strategy and security.</p>
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




