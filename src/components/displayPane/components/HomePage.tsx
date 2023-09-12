import React from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import ConnectAccount from "components/Account/ConnectAccountButton";

import './HomePage.css';
//import AcornStats from './AcornStats';
//import './AcornStats.css';
import chainLogo1 from 'assets/images/arbitrum_logo.svg';
import chainLogo2 from 'assets/images/optimistim_Logo.svg';
import chainLogo3 from 'assets/images/zksync_logo.svg';
import chainLogo4 from 'assets/images/fantom_logo.svg';
import chainLogo5 from 'assets/images/base_logo.svg';
import partnerLogo2 from 'assets/images/gelato_partner.svg';
import logo from 'assets/images/header_logo.svg';
import partnerLogo1 from 'assets/images/lifi_partner.svg';
import partnerLogo3 from 'assets/images/lodestar_partner.svg';
//import partnerLogo4 from 'assets/images/gelato_partner.svg';

const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="acorn-landing">
      {/* Header */}
      <section className="header-section">
        <div className="header-content-wrapper">
          <div className="header-text">
            <Title className="main-title" style={{ color: '#ffffff' }}>
              Stake Your Tokens with Acorn
            </Title>
            <Paragraph className="small-title" style={{ color: '#ffffff' }}>
              Diversify your portfolio and maximize your returns.
            </Paragraph>
            <ConnectAccount/>
          </div>
          <div className="header-image">
            <img src={logo} alt="Your Description Here" />
          </div>
        </div>
      </section>


      <Title className="acorn-card-title" style={{ color: '#ffffff' }}>
          How Acorn Works
        </Title>

        {/* Three Key Features */}
        <Row gutter={16} className="acorn-cards">
        {/* Stake */}
        <Col xs={24} sm={24} md={8}>
          <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Stake</Text>} bordered={false} className="acorn-card">
            <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
              Stake your tokens to earn aTokens, a 1:1 liquid staked version which accrue interest directly on your balance.
            </Text>
          </Card>
        </Col>

        {/* Yield Generation */}
        <Col xs={24} sm={24} md={8}>
          <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Earn Yield</Text>} bordered={false} className="acorn-card">
            <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
              Our trustless algorithmic yield strategies ensure that you're always getting the best possible returns.
            </Text>
          </Card>
        </Col>

        {/* Redeem */}
        <Col xs={24} sm={24} md={8}>
          <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Redeem</Text>} bordered={false} className="acorn-card">
            <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
              Need your assets back? Redeem your aTokens for the underlying assets anytime, without any lock-in period.
            </Text>
          </Card>
        </Col>
      </Row>


      {/* Supported Chains */}
      <section className="section-supported-chains">
        <Title className="chains-title" style={{ color: '#ffffff' }}>Supported Chains</Title>
        <Row gutter={16} className="chain-logos">
          <Col xs={24} sm={4}>
            <a href="https://arbitrum.io/" target="_blank" rel="noopener noreferrer">
              <img src={chainLogo1} alt="Chain 1" className="chain-logo" />
            </a>
          </Col>
          <Col xs={24} sm={4}>
            <a href="https://www.optimism.io/" target="_blank" rel="noopener noreferrer">
              <img src={chainLogo2} alt="Chain 2" className="chain-logo" />
            </a>
          </Col>
          <Col xs={24} sm={4}>
            <a href="https://zksync.io/" target="_blank" rel="noopener noreferrer">
              <img src={chainLogo3} alt="Chain 3" className="chain-logo" />
            </a>
          </Col>
          <Col xs={24} sm={4}>
            <a href="https://fantom.foundation/" target="_blank" rel="noopener noreferrer">
              <img src={chainLogo4} alt="Chain 4" className="chain-logo" />
            </a>
          </Col>
          <Col xs={24} sm={4}>
            <a href="https://base.org/" target="_blank" rel="noopener noreferrer">
              <img src={chainLogo5} alt="Chain 5" className="chain-logo" />
            </a>
          </Col>
        </Row>
      </section>


            {/* Why Acorn Section */}
            <section className="section-why-acorn">
        <Title className="acorn-card-title" style={{ color: '#ffffff' }}>
          Why Acorn?
        </Title>
        <Row gutter={16} className="acorn-cards">

          {/* Liquidity Management */}
          <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Optimized Liquidity Management</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Specialized vaults designed for efficient liquidity management and maximized yields.
              </Text>
            </Card>
          </Col>
          {/* Automated Operations */}
          <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Automated Operations</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Once tokens are staked, all activities are automated to maximize your yield.
              </Text>
            </Card>
          </Col>
          {/* Governance Influence */}
          <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Governance Influence</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Participate in Liquidity Wars to extend Acorn's yield-generating capacity.
              </Text>
            </Card>
          </Col>
        </Row>
      </section>


      {/* Why Acorn Section */}
      <section className="section-why-acorn-2">
      <Row gutter={16} className="acorn-cards">
        {/* Vault System Overview */}
        <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Vault System Overview</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Acorn's specialized vaults optimize liquidity and maximize yield within specific DeFi protocols, tailored for each token.
              </Text>
            </Card>
          </Col>
          {/* Strategy Rotation */}
          <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>Strategy Rotation</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Adapting yield-optimizing strategies to market conditions, ranging from staking to providing liquidity in decentralized exchanges.
              </Text>
            </Card>
          </Col>
          {/* aTokens */}
          <Col xs={24} sm={24} md={8}>
            <Card title={<Text className="acorn-card-description" style={{ color: '#ffffff' }}>aTokens</Text>} bordered={false} className="why-acorn-card">
              <Text className="acorn-card-description" style={{ color: '#ffffff' }} strong>
                Receive aTokens when you stake assets, serving as a claim on a share of the vault's total assets and unlocking yield-generating opportunities.
              </Text>
            </Card>
          </Col>
        </Row>
      </section>


      {/* Partnership Section */}
      <section className="section-partnership">
        <Title className="partnership-title" style={{ color: '#ffffff' }}>Our Partners</Title>
        <Row gutter={16} className="partnership-logos">
          <Col xs={24} sm={8}>
            <a href="https://li.fi/" target="_blank" rel="noopener noreferrer">
              <img src={partnerLogo1} alt="Partner 1" className="partner-logo" />
            </a>
          </Col>
          <Col xs={24} sm={8}>
            <a href="https://www.gelato.network/" target="_blank" rel="noopener noreferrer">
              <img src={partnerLogo2} alt="Partner 2" className="partner-logo" />
            </a>
          </Col>
          <Col xs={24} sm={8}>
            <a href="https://www.lodestarfinance.io/" target="_blank" rel="noopener noreferrer">
              <img src={partnerLogo3} alt="Partner 3" className="partner-logo" />
            </a>
          </Col>
        </Row>
      </section>


      {/* Community Engagement */}
      <section className="section-community">
        <Title level={2} style={{ color: '#ffffff' }}>Join the Community</Title>
        <Paragraph className="small-title" style={{ color: '#ffffff' }}>
          Get involved. Vote on governance proposals, discuss strategies, and grow with us.
        </Paragraph>
        <a href="https://discord.gg/Uv3F9Cw44" target="_blank" rel="noopener noreferrer">
          <Button className="cta-button">Join Now</Button>
        </a>
      </section>

    </div>
  );
};

export default HomePage;