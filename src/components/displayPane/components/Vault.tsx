import { FC, useState, useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Button, Card, Divider, Input, Modal } from 'antd';
import { ethers } from 'ethers';
import { useVault } from 'hooks';
import { useDecimals } from 'hooks';
import  useApproval from 'hooks/useApproval';
import { useMediaQuery } from 'react-responsive';

type VaultProps = {
  vault: {
    name: string;
    address: string;
    abi: any[]
    chainId: number;
    logo: string;
    description: string;
    networkName: string;
    networkLogo: string;
    apr: number;
    strategy: string;
    depositTokenAddress: string;
    depositTokenAbi: any[]
    textAboveTitle: string; // New property
    textBelowDescription: string; // New property

  };
};


const Vault: FC<VaultProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showStrategyInfo, setShowStrategyInfo] = useState(false);
  const [showActions, setShowActions] = useState(false); // Add this line to manage visibility
  const [depositSuccessMessage, setDepositSuccessMessage] = useState<string | null>(null);
  const [withdrawSuccessMessage, setWithdrawSuccessMessage] = useState<string | null>(null);
  const { account: accountFromWeb3, provider: providerFromWeb3 } = useWeb3React();
  const provider = providerFromWeb3 || null;
  const account = accountFromWeb3 || null;
  const { vaultTokenBalance, updateVaultTokenBalance } = useVault(vault.address, vault.abi);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [userBalance, setUserBalance] = useState('0'); // new state variable for user's token balance
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const decimals = useDecimals(vault.address, vault.abi);
  const { hasApproval, markApprovalDone } = useApproval({
    provider,
    account,
    vault: {
      address: vault.address,
      depositTokenAddress: vault.depositTokenAddress,
      depositTokenAbi: vault.depositTokenAbi
    },
    depositAmount,
  });
  const vaultBalanceFormatted = vaultTokenBalance.isZero()
  ? "0.0"
  : ethers.utils.formatUnits(vaultTokenBalance, decimals);


  if (!provider || !account) return null;

  const signer = provider.getSigner(account);

  useEffect(() => {
    if (account && vault.depositTokenAddress && signer) {
      const tokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);
      Promise.all([
        tokenContract.balanceOf(account),
        tokenContract.decimals()
      ])
        .then(([balance, decimals]: [ethers.BigNumber, number]) => {
          const formattedBalance = ethers.utils.formatUnits(balance, decimals);
          setUserBalance(formattedBalance);
        })
        .catch((error: Error) => console.error("Failed to fetch user's token balance and decimals:", error));
    }
  }, [account, vault.depositTokenAddress, signer, vault.depositTokenAbi, vaultTokenBalance]);


  const contract = new ethers.Contract(vault.address, vault.abi, signer);

  const deposit = async () => {
    setDepositSuccessMessage(null);
    try {
      const weiAmount = ethers.utils.parseUnits(depositAmount, decimals);
      const depositTokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);
      const userBalanceWei = ethers.utils.parseUnits(userBalance, decimals);
      if (weiAmount.isZero()) {
        setErrorMessage("The deposit amount cannot be zero.");
        return;
      }
      if (weiAmount.gt(userBalanceWei)) {
        setErrorMessage("Insufficient balance to complete this deposit.");
        return;
      }

      if (!hasApproval) {
        console.log('Approving...');
        const maxApprovalAmount = ethers.constants.MaxUint256; // Approving the maximum possible amount
        const approveResponse = await depositTokenContract.approve(vault.address, maxApprovalAmount);
        const approveReceipt = await approveResponse.wait();
        console.log('Approve Receipt:', approveReceipt);
        markApprovalDone(); // Mark the approval as done

      }

      console.log('Depositing...');
      const transactionResponse = await contract.deposit(weiAmount);
      const transactionResult = await transactionResponse.wait();
      console.log('Deposit Transaction Result:', transactionResult);
      setDepositSuccessMessage('Deposit was successful!');
      refreshBalances(); // Trigger the refresh

    } catch (error) {
      console.error('Deposit failed', error);
      setErrorMessage(`The deposit transaction failed with the following error: ${(error as Error).message}`);
    }
  };

  const handleWithdraw = async () => {
    setWithdrawSuccessMessage(null);
    try {
      const weiAmount = ethers.utils.parseUnits(withdrawAmount, decimals);
      if (weiAmount.isZero()) {
        setErrorMessage("The withdraw amount cannot be zero.");
        return;
      }
      const vaultBalanceFormattedWei = ethers.utils.parseUnits(vaultBalanceFormatted, decimals);
      if (weiAmount.gt(vaultBalanceFormattedWei)) {
        setErrorMessage("Insufficient balance to complete this withdrawal.");
        return;
      }
      const transactionResponse = await contract.withdraw(weiAmount);
      const transactionResult = await transactionResponse.wait();
      console.log(transactionResult);
      setWithdrawSuccessMessage('Withdrawal was successful!');
      refreshBalances(); // Trigger the refresh

    } catch (error) {
      console.error('Withdraw failed', error);
      setErrorMessage(`The withdraw transaction failed with the following error: ${(error as Error).message}`);
    }
  };

  const refreshBalances = async () => {
    // Fetch decimals for deposit token
    const tokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, provider);
    const depositTokenDecimals = await tokenContract.decimals();

    // Fetch user balance for deposit token
    const balance = await tokenContract.balanceOf(account);

    // Format user balance using fetched decimals for deposit token
    const formattedBalance = ethers.utils.formatUnits(balance, depositTokenDecimals);

    // Update user balance state
    setUserBalance(formattedBalance);

    // Fetch vault contract
    const vaultContract = new ethers.Contract(vault.address, vault.abi, provider);

    // Fetch decimals for vault
    const vaultDecimals = await vaultContract.decimals();

    // Fetch and format vault balance
    const vaultBalance = await vaultContract.balanceOf(account);
    const formattedVaultBalance = ethers.utils.formatUnits(vaultBalance, vaultDecimals);

    // Update vault balance state
    updateVaultTokenBalance(formattedVaultBalance);
  };


  const handleModalOpen = () => {
    setIsModalVisible(true);
    setShowStrategyInfo(true);
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsModalVisible(false);
    setShowStrategyInfo(false);
  };

  const handleCardClick = () => {
    setShowActions(!showActions);
  };


  return (
  <div
    onClick={handleCardClick}
    style={{
      width: "100%",
      marginBottom: "30px",
      marginTop: "15px",
      display: 'flex',
      justifyContent: 'center',
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
      if (card) card.style.borderColor = '#064576';
    }}
  >
    {depositSuccessMessage && (
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#000509" }}>
            {"Transaction Successful"}
          </div>
        }
        visible={!!depositSuccessMessage}
        onCancel={() => {
          setDepositSuccessMessage(null);
          handleCardClick();
        }}
        footer={null}
        centered
        bodyStyle={{ backgroundColor: "transparent", color: "white" }}
        wrapClassName="custom-modal"
      >
        <Card
          style={{
            backgroundColor: "#000509",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            minHeight: "10vh",
            marginTop: "20px",
            border: "transparent"
          }}
        >
          <p style={{ fontSize: "20px" }}>{depositSuccessMessage}</p>
        </Card>
      </Modal>
    )}
    {withdrawSuccessMessage && (
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#000509" }}>
            {"Transaction Successful"}
          </div>
        }
        visible={!!withdrawSuccessMessage}
        onCancel={() => {
          setWithdrawSuccessMessage(null);
          handleCardClick();
        }}
        footer={null}
        centered
        bodyStyle={{ backgroundColor: "transparent", color: "white" }}
        wrapClassName="custom-modal"
      >
        <Card
          style={{
            backgroundColor: "#000509",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            minHeight: "10vh",
            marginTop: "20px",
            border: "transparent"
          }}
        >
          <p style={{ fontSize: "20px" }}>{withdrawSuccessMessage}</p>
        </Card>
      </Modal>
    )}
    {errorMessage && (
      <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#000509" }}>
          {"Transaction failed"}
        </div>
      }
        visible={errorMessage ? true : false}
        onCancel={() => {
          setErrorMessage(null);
          handleCardClick();
        }}
        footer={null}
        centered
        bodyStyle={{ backgroundColor: "transparent", color: "white" }}
        wrapClassName="custom-modal"
      >
        <Card
          style={{
            backgroundColor: "#000509",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            minHeight: "10vh",
            marginTop: "20px",
            border: "transparent"
          }}
        >
          <p style={{ fontSize: "20px" }}>{errorMessage}</p>
        </Card>
      </Modal>
    )}
    <Card
      style={{
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: '12px',
      border: '2px solid #064576',
      transition: 'border-color .2s',
      maxWidth: "100%",
      width: '100%',
      }}
      >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={vault.logo} alt={`${vault.name} Logo`} width={isMobile ? '45px' : '60px'} />
        <h2 style={{ marginLeft: '20px' }}>{vault.name}</h2>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleModalOpen();
        }}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          border: '1px solid #011F37',
          borderRadius: '12px',
        }}
      >
        Strategy Info
      </Button>
      </div>
      <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
        <h3>Deposited:</h3>
        <h2>{vaultTokenBalance.isZero() ? "0.0" : parseFloat(ethers.utils.formatUnits(vaultTokenBalance, decimals)).toFixed(2)}</h2>
      </div>
      <div>
        <h3>APR:</h3>
        <h2>{vault.apr}%</h2>
      </div>
      </div>
      <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
      {showActions && !showStrategyInfo && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ width: '48%' }}>
      <Input
        placeholder={`Balance: ${userBalance}`}
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          borderColor: '#011F37',
        }}
      />
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Stop event from propagating to parent
          setDepositAmount(userBalance);
        }}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          border: '1px solid #011F37',
          borderRadius: '12px',
          marginTop: '10px',
          width: '100%',  // Add this line
        }}
      >
        MAX
      </Button>

      <Button
        onClick={(e) => {
          e.stopPropagation(); // Stop event from propagating to parent
          deposit();
        }}
        style={{
          color: 'white',
          backgroundColor: '#011F37',  // Add this line
          border: '1px solid #011F37',  // Change this line
          borderRadius: '12px',
          marginTop: '10px',
          width: '100%',
        }}
      >
        Deposit
      </Button>
      </div>

      <div style={{ width: '48%' }}>
      <Input
        placeholder={`Vault balance: ${vaultBalanceFormatted}`}
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          borderColor: '#011F37',
        }}
      />
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Stop event from propagating to parent
          setWithdrawAmount(ethers.utils.formatUnits(vaultTokenBalance, decimals));
        }}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          border: '1px solid #011F37',
          borderRadius: '12px',
          marginTop: '10px',
          width: '100%',
        }}
      >
        MAX
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Stop event from propagating to parent
          handleWithdraw();
        }}
        style={{
          color: 'white',
          backgroundColor: '#011F37',
          border: '1px solid #011F37',
          borderRadius: '12px',
          marginTop: '10px',
          width: '100%',
        }}
      >
        Withdraw
      </Button>
      </div>
      </div>
    )}
  </Card>

    {isModalVisible && (
      <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#000509", }}>
          <img src={vault.logo} alt={`${vault.name} Logo`} style={{ width: '24px', marginRight: '10px' }} />
          {vault.name}
        </div>
      }
      visible={isModalVisible}
      onCancel={(e) => handleModalClose(e)}
      footer={null}
      centered
      bodyStyle={{ backgroundColor: "transparent", color: "transparent" }}
      wrapClassName="custom-modal"
    >
        <Card
          style={{
            backgroundColor: "#000509",  // Change this line
            color: "white",  // Change this line
            border: "0px solid #064576",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            minHeight: "10vh",
            marginTop: "20px",
          }}
        >
          <p style={{ fontSize: "15px" }}>{vault.textAboveTitle}</p>
          <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
          <h2 style={{ fontSize: "17px" }}>Vault Strategy</h2>
          <p style={{ fontSize: "17px" }}>{vault.strategy}</p>
          <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: "15px" }}>
            <p>{vault.textBelowDescription}</p>
          </div>
        </Card>
      </Modal>
    )}
  </div>
  );
};

export default Vault;