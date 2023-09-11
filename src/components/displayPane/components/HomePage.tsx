import React from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import ConnectAccount from "components/Account/ConnectAccountButton";

import './HomePage.css';
import logo from 'assets/images/header_logo.svg';

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