import { useState } from "react";

import { Collapse } from "antd";
import "./FAQ.css";

const { Panel } = Collapse;

const FAQ = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>("");

  const handlePanelChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <div className="faq-container">
      <h1>FAQ</h1>
      <Collapse
        activeKey={activeKey}
        onChange={(key) => handlePanelChange(key)}
        className="faq-collapse"
      >
        <Panel header="What is Acorn Finance?" key="1">
          <p>Acorn Finance is a decentralized protocol designed as a cross-chain governance yield aggregator. Its purpose is to optimize liquidity and maximize rewards across multiple blockchains. It primarily offers specialized vaults that allow users to stake tokens and earn yield.</p>
        </Panel>
        <Panel header="What are Acorn Vaults?" key="2">
          <p>Acorn Vaults are specialized financial mechanisms that aim to maximize yield and optimize liquidity for specific tokens within decentralized finance (DeFi) protocols. Each vault employs unique strategies to engage with various DeFi platforms.</p>
        </Panel>
        <Panel header="How do I stake tokens in an Acorn Vault?" key="3">
          <p> You can stake a specific type of token into its corresponding Acorn vault. For example, if it's a wETH Vault, you can only stake wETH tokens in it. Once staked, you'll receive aTokens, which represent your share in the vault.</p>
        </Panel>
        <Panel header="What are aTokens?" key="4">
          <p>aTokens are liquid tokens you receive when staking your assets into an Acorn Vault. These tokens represent your ownership in the vault and are redeemable for the original tokens you staked, plus any yield earned.</p>
        </Panel>
        <Panel header="How do Acorn Vaults generate yield?" key="5">
          <p>Acorn Vaults employ various strategies to maximize yield, such as auto-compounding, liquidity provision, and partner protocol rewards. These strategies compound back into the staked assets, growing your aToken balance over time.</p>
        </Panel>
        <Panel header="Can I redeem my aTokens at any time?" key="6">
          <p>Yes, you can redeem your aTokens for the original tokens at any time. However, a redeem fee of 0.5% applies.</p>
        </Panel>
        <Panel header="What are Liquidity Wars?" key="7">
          <p>In Liquidity Wars, Acorn's Treasury uses liquidity to acquire tokens from other protocols. This allows Acorn to exercise governance power over other protocols and extend its yield-generating capacity.</p>
        </Panel>
        <Panel header="What are the benefits of staking tokens in Acorn Vaults?" key="8">
          <p>By staking your tokens in Acorn's specialized vaults, you benefit from both the underlying growth of the asset and additional yield generated through tailored DeFi strategies.</p>
        </Panel>
        <Panel header="How does Acorn adapt to market conditions?" key="9">
          <p>Acorn Vaults are dynamic and adapt their yield-optimizing strategies according to market conditions. The strategies range from staking in specialized yield farms to providing liquidity in decentralized exchanges.</p>
        </Panel>
        <Panel header="What is the role of governance tokens in Acorn?" key="10">
          <p>When Acorn's vaults generate yield, they may earn governance tokens from other protocols. Acorn's Treasury strategically uses these tokens to participate in Liquidity Wars, thereby increasing Acorn's governance power and influence.</p>
        </Panel>
        <Panel header="How does Acorn's governance influence benefit me as a user?" key="11">
          <p>Acorn's governance actions lead to higher yields and strategic partnerships, providing a more attractive and sustainable environment for vault depositors and token holders.</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FAQ;

