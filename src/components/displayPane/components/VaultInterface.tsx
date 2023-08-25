/*import { FC, useState, useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Button, Card, Divider, Input, Modal } from 'antd';
import { ethers } from 'ethers';
import { useMediaQuery } from 'react-responsive';

import { useVault } from 'hooks';


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

  };
};


const Vault: FC<VaultProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { account, provider } = useWeb3React();
  const { vaultTokenBalance } = useVault(vault.address, vault.abi);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [userBalance, setUserBalance] = useState('0'); // new state variable for user's token balance
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  if (!provider || !account) return null;

  const signer = provider.getSigner(account);

  useEffect(() => {
    if (account && vault.depositTokenAddress && signer) {
      const tokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);

      tokenContract.balanceOf(account)
        .then((balance: ethers.BigNumber) => {
          const formattedBalance = ethers.utils.formatEther(balance);
          setUserBalance(formattedBalance);
        })
        .catch((error: Error) => console.error("Failed to fetch user's token balance:", error));
    }
  }, [account, vault.depositTokenAddress, signer, vault.depositTokenAbi, vaultTokenBalance]);


  const contract = new ethers.Contract(vault.address, vault.abi, signer);

  const deposit = async () => {
    try {
      const weiAmount = ethers.utils.parseEther(depositAmount);
      const depositTokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);

      console.log('Approving...');
      const approveResponse = await depositTokenContract.approve(vault.address, weiAmount);
      const approveReceipt = await approveResponse.wait();
      console.log('Approve Receipt:', approveReceipt);

      console.log('Depositing...');
      const transactionResponse = await contract.deposit(weiAmount);
      const transactionResult = await transactionResponse.wait();
      console.log('Deposit Transaction Result:', transactionResult);

    } catch (error) {
      console.error('Deposit failed', error);
      setErrorMessage(`The deposit transaction failed with the following error: ${(error as Error).message}`);
    }
  };


  const handleWithdraw = async () => {
    try {
      const weiAmount = ethers.utils.parseEther(withdrawAmount);
      const transactionResponse = await contract.withdraw(weiAmount);
      const transactionResult = await transactionResponse.wait();
      console.log(transactionResult);
    } catch (error) {
      console.error('Withdraw failed', error);
      setErrorMessage(`The withdraw transaction failed with the following error: ${(error as Error).message}`);
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
      {errorMessage && (
        <Modal
          title="Transaction Failed"
          visible={errorMessage ? true : false}
          onCancel={() => setErrorMessage(null)}
          footer={null}
          centered
          bodyStyle={{ backgroundColor: "transparent", color: "white" }}
          wrapClassName="custom-modal"
        >
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
              marginTop: "20px",
              border: "transparent"
            }}
          >
            <p>{errorMessage}</p>
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
      onClick={handleModalToggle}
      style={{
        color: 'white',
        backgroundColor: '#011F37',  // Add this line
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
      <h3>Vault Balance:</h3>
      <h2>{vaultTokenBalance.isZero() ? "0.0" : parseFloat(ethers.utils.formatEther(vaultTokenBalance)).toFixed(2)}</h2>
    </div>
    <div>
      <h3>APR:</h3>
      <h2>{vault.apr}%</h2>
    </div>
  </div>
  <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ width: '48%' }}>
    <Input
      placeholder={`Balance: ${userBalance}`}
      value={depositAmount}
      onChange={(e) => setDepositAmount(e.target.value)}
      style={{
        color: 'white',  // Add this line
        backgroundColor: '#011F37',  // Add this line
        borderColor: '#011F37',  // Add this line
      }}
    />
    <Button
      onClick={() => setDepositAmount(userBalance)}
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
      onClick={deposit}
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
      placeholder={`Vault balance: ${ethers.utils.formatEther(vaultTokenBalance)}`}
      value={withdrawAmount}
      onChange={(e) => setWithdrawAmount(e.target.value)}
      style={{
        color: 'white',
        backgroundColor: '#011F37',
        borderColor: '#011F37',
      }}
    />
    <Button
      onClick={() => setWithdrawAmount(ethers.utils.formatEther(vaultTokenBalance))}
      // Here it sets the withdrawAmount to be the user's vaultTokenBalance
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
      onClick={handleWithdraw}
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
   </Card>


      {isModalVisible && (
        <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={vault.logo} alt={`${vault.name} Logo`} style={{ width: '24px', marginRight: '10px' }} />
            {vault.name}
          </div>
        }
        visible={isModalVisible}
        onCancel={handleModalToggle}
        footer={null}
        centered
        bodyStyle={{ backgroundColor: "transparent", color: "transparent" }}
        wrapClassName="custom-modal"
      >
          <Card
            style={{
              backgroundColor: "#011F37",  // Change this line
              color: "white",  // Change this line
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
            <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
            <h2 style={{ fontSize: "17px" }}>Vault Strategy</h2>
            <p style={{ fontSize: "17px" }}>{vault.strategy}</p>
            <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default Vault;*/
