import React from 'react';
import { Card } from 'antd';
import './AcornInfo.css';
import ConnectAccount from "components/Account/ConnectAccountButton";

const connectAccountButtonStyle = { fontSize: '24px', padding: '0px 0px' }; // Adjust as needed
const marginStyle = { color: 'white', marginTop: '10px', marginBottom: '90px' };

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
    <p className="feature-text">Engages in Liquidity Wars to maximize returns.</p>
  </div>

  <div className="feature-container-info pop">
    <h2 className="feature-title">Governance</h2>
    <p className="feature-text">Cross-chain governance and liquidity.</p>
  </div>
</div>
<div style={marginStyle}>
        <div style={connectAccountButtonStyle}>
          <ConnectAccount />
        </div>
      </div>

    </Card>
  );
};

export default AcornInfo;




