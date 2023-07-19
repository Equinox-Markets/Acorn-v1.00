//import { Vault as VaultType } from 'path/to/your/vault/type';

import { FC, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Button, Card, Divider, Input, Space } from 'antd';
import { ethers } from 'ethers';
import { useMediaQuery } from 'react-responsive';

import { useVault, useNativeBalance } from 'hooks';

type VaultProps = {
  vault: {
    name: string;
    address: string;
    abi: any[];
    chainId: number;
    logo: string;
    description: string;
    networkName: string;
    networkLogo: string;
    apr: number;
  };
};

const Vault: FC<VaultProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { account, provider } = useWeb3React();
  const { balance } = useVault(vault.address, vault.abi);
  const nativeBalance = useNativeBalance(provider, account);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });


  if (!provider || !account) return null;

const signer = provider.getSigner(account);
const contract = new ethers.Contract(vault.address, vault.abi, signer);

const handleDeposit = async () => {
  try {
    const weiAmount = ethers.utils.parseEther(depositAmount);
    const transactionResponse = await contract.deposit(weiAmount);
    const transactionResult = await transactionResponse.wait();
    console.log(transactionResult);
  } catch (error) {
    console.error('Deposit failed', error);
    // show an error message to the user
  }
};

const handleWithdraw = async () => {
  try {
    const weiAmount = ethers.utils.parseEther(withdrawAmount);
    const transactionResponse = await contract.deposit(weiAmount);
    const transactionResult = await transactionResponse.wait();
    console.log(transactionResult);
  } catch (error) {
    console.error('Withdraw failed', error);
    // show an error message to the user
  }
};

  const handleModalToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "30px",
        marginTop: "15px",
        transition: 'transform .2s, border-color .2s',
      }}
      onMouseOver={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1.02)';
        const card = target.querySelector('.ant-card') as HTMLElement;
        if (card) card.style.borderColor = '#064576';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1)';
        const card = target.querySelector('.ant-card') as HTMLElement;
        if (card) card.style.borderColor = '#011F37';
      }}
    >
      <Card
        hoverable
        style={{
          backgroundColor: "#011F37",
          borderColor: "#011F37",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        onClick={handleModalToggle}
      >
        <div>
          <img src={vault.logo} alt="vault logo" width={34} style={{ verticalAlign: 'middle', position: 'relative', top: '-4px' }} />
          <h2 style={{ fontSize: '24px', display: 'inline-block', marginLeft: '10px' }}>{vault.name}</h2>
          <p style={{ fontSize: '17px', marginTop: '-3px' }}>{vault.description}</p>
        </div>

        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
          <div style={{display: "flex", alignItems: "center"}}>
            <img src={vault.networkLogo} alt="network logo" width={28} style={{ verticalAlign: 'middle', position: 'relative', top: '-0px' }} />
            <h2 style={{ fontSize: '17px', display: 'inline-block', marginLeft: '10px' }}>{vault.networkName}</h2>
          </div>
          <h2 style={{ fontSize: '17px', display: 'inline-block', marginRight: '10px' }}>{vault.apr}% APR</h2>
        </div>

      </Card>

      {isModalVisible && (
        <Card
          style={{
            backgroundColor: "#011F37",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            minHeight: "10vh",
            marginTop: "20px"
          }}
        >
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>{vault.name}</h2>
            <Button
              onClick={handleModalToggle}
              style={{
                alignSelf: "flex-start",
                background: "#011F37",
                boxShadow: "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #011F37",
                border: "none",
                borderRadius: "10px",
                color: "white" // to make the text white
              }}
            >
              Close
            </Button>
          </div>
          <p>Balance: {balance}</p>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Space style={{ flex: 1, flexDirection: isMobile ? "column" : "row", marginRight: 10 }}>
            <Input
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              placeholder={`Deposit amount (Max: ${ethers.utils.formatEther(nativeBalance || 0)})`}
              style={{ borderColor: "white", color: "grey", marginBottom: isMobile ? 10 : 0 }}
            />
            <Button
              onClick={handleDeposit}
              style={{
                background: "#011F37",
                boxShadow: "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #011F37",
                border: "none",
                borderRadius: "10px",
                color: "white"
              }}
            >
              Deposit
            </Button>
          </Space>

          {!isMobile && <Divider type="vertical" />}

          <Space style={{ flex: 1, flexDirection: isMobile ? "column" : "row", marginLeft: 10 }}>
            <Input
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
              placeholder="Withdraw amount"
              style={{ borderColor: "white", color: "grey", marginBottom: isMobile ? 10 : 0 }}
            />
            <Button
              onClick={handleWithdraw}
              style={{
                background: "#011F37",
                boxShadow: "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #011F37",
                border: "none",
                borderRadius: "10px",
                color: "white"
              }}
            >
              Withdraw
            </Button>
          </Space>
        </div>

        </Card>
      )}
    </div>
  );
};

export default Vault;