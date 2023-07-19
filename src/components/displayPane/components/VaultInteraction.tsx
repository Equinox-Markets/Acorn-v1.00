import { FC, useState } from "react";

import { InfoCircleOutlined } from '@ant-design/icons';
import { useWeb3React } from "@web3-react/core";
import { Button, Form, InputNumber, Card, Modal } from "antd";

// import { BigNumber } from "ethers";
// import VaultContract from "contracts/VaultContract"; // placeholder for your contract

import ethLogo from 'assets/images/ethereum_Logo.png';
//import polygonLogo from 'assets/images/polygon_logo.png';
import { useNativeBalance } from "hooks";
import { parseBigNumberToFloat } from "utils/formatters";

const VaultInteraction: FC = () => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);

  // TODO: Initialize your vault contracts



  // TODO: Replace with actual balance and APY fetching from contract
 // const vaultInfo = {
 //   balance: BigNumber.from(0),
 //   apy: 0
 // }

 const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

 const showModal = (vault: any) => {
   setSelectedVault(vault);
   setIsModalVisible(true);
 };

 const handleOk = () => {
   setIsModalVisible(false);
 };

 const handleCancel = () => {
   setIsModalVisible(false);
 };

 const handleDeposit = () => {
  if (depositAmount === null || depositAmount === undefined) return;
  console.log(`Depositing ${depositAmount} to ${selectedVault.name}`);
  // TODO: Replace this with actual deposit function call from your smart contract
};

const handleWithdraw = () => {
  if (withdrawAmount === null || withdrawAmount === undefined) return;
  console.log(`Withdrawing ${withdrawAmount} from ${selectedVault.name}`);
  // TODO: Replace this with actual withdraw function call from your smart contract
};

const vaults = [
  { name: 'Arbitrum Vault A',  logo: ethLogo, chain: 'Arbitrum' },
  { name: 'Fantom Vault B',  logo: ethLogo, chain: 'Fantom' },
  { name: 'Ethereum Vault C',  logo: ethLogo, chain: 'Ethereum' },
];

return (
  <div style={{ width: "100%", minWidth: "300px", margin: "0 auto" }}>
    <div>
      {vaults.map((vault) => (
         <Card
         hoverable
         style={{
         width: "100%",
         backgroundColor: "transparent",
         borderColor: "grey",
         marginTop: "15px",
         }}
         bodyStyle={{ display: "flex", alignItems: "center", color: "white" }}
         onClick={() => showModal(vault)}
         >
        <img alt={vault.chain} src={vault.logo} style={{ width: '30px', marginRight: '10px' }} />
        {vault.name}
        </Card>
      ))}
    </div>
    <Modal

      title={selectedVault ? selectedVault.name : "Vault"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Deposit Amount">
          <InputNumber
            value={depositAmount}
            onChange={setDepositAmount}
            placeholder="Amount to deposit"
            min={0}
            max={balance ? parseBigNumberToFloat(balance) : 0}
            style={{ width: "100%" }}
          />
          <Button type="primary" onClick={() => handleDeposit}>
            Deposit
          </Button>
        </Form.Item>
        <Form.Item label="Withdraw Amount">
          <InputNumber
            value={withdrawAmount}
            onChange={setWithdrawAmount}
            placeholder="Amount to withdraw"
            min={0}
            style={{ width: "100%" }}
          />
          <Button type="primary" onClick={() => handleWithdraw}>
            Withdraw
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
      <InfoCircleOutlined style={{ color: 'white', marginRight: '10px' }} />
      </div>
    </Modal>
  </div>
);
};


export default VaultInteraction;