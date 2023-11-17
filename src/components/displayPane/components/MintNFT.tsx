import React, { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
// eslint-disable-next-line import/order
import { ethers } from 'ethers';
import { Button, Card, InputNumber, Modal, Typography } from 'antd';
import './MintNFT.css';
import { Alert } from 'antd';
import logo from 'assets/images/Acorn_NFT.png';
import AIRDROP_ABI from 'data/abi/tokens/AirdropNFTabi.json';
import NFT_ABI  from 'data/abi/tokens/NFTabi.json';

const { Title, Paragraph } = Typography;

const MintNFT: React.FC = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [minted, setMinted] = useState<number>(0);
    const [chainId, setChainId] = useState<number | null>(null); // To hold the current chain ID
    const { account, provider, chainId: web3ChainId } = useWeb3React();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        if (web3ChainId !== undefined) {
          setChainId(web3ChainId);
        }
      }, [web3ChainId]);

      const fetchMinted = async () => {
        if (!provider || !account) return;
        const contractAddress = "0xac47f0cD7AFb799EaE43da6E6Bc8078C67ddd048";
        const contract = new Contract(contractAddress, NFT_ABI, provider);

        // Fetch currentMinted from the contract and update state
        const currentMinted = await contract.currentMinted();
        setMinted(currentMinted);
      };

      useEffect(() => {
        fetchMinted();
      }, [account, provider]);

      const mintNFT = async () => {
        if (!provider || !account) return;

        const contractAddress = "0xac47f0cD7AFb799EaE43da6E6Bc8078C67ddd048";
        const contract = new Contract(contractAddress, NFT_ABI, provider.getSigner());
        const price = ethers.utils.parseUnits((0.1 * quantity).toString(), 'ether');
        const balance = await provider.getBalance(account);
        if (balance.lt(price)) {
          setErrorMessage("You do not have enough ETH to buy an Acorn NFT.");
          return;
        }

        try {
          // Get the current minted count before minting
          const currentMintedBefore = await contract.getCurrentMinted();

          const mintTx = await contract.mintNFT(quantity, { from: account, value: price });
          await mintTx.wait(); // Wait for the minting transaction to be confirmed

          // Get the current minted count after minting
          const currentMintedAfter = await contract.getCurrentMinted();

          // Calculate the range of newly minted token IDs
          const newTokenIds = [];
          for (let i = currentMintedBefore.toNumber() + 1; i <= currentMintedAfter.toNumber(); i++) {
            newTokenIds.push(i);
          }

          // Interact with the airdrop contract for each newly minted token
          const airdropContractAddress = '0xbcE52A152A12C603b1580e0779B99904aDBA31c1';
          const airdropContract = new Contract(airdropContractAddress, AIRDROP_ABI, provider.getSigner());
          // Loop over new token IDs and call claimTokens for each
          for (const tokenId of newTokenIds) {
            const airdropTx = await airdropContract.claimTokens(tokenId);
            await airdropTx.wait(); // Wait for the airdrop transaction to be confirmed
          }

          // Fetch updated data
          fetchMinted();
        } catch (error) {
          console.error('Transaction error:', error);
        }
      };



  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  return (
<div>
    <Alert
      message="NFT minting is live! Only on the Arbitrum network."
      type="info"
      showIcon
      style={{ marginBottom: '20px' }}
    />
    <div className="mint-container">
      <Title style={{ color: 'white', textAlign: 'left', fontSize: '32px' }}>Mint Acorn NFTs</Title>
      <div className="image-section">
        <img src={logo} alt="NFT" />
      </div>

      <div className="info-section">
        <Paragraph style={{ color: 'white', textAlign: 'center', fontSize: '18px'}}>
        Mint Acorn NFTs and receive an airdrop of 300 ACORN tokens per NFT, valued at $300.
        Stake Acorn NFTs to earn 10% of Acorns total revenue in ETH.
      </Paragraph>
      <Paragraph style={{ color: 'white', textAlign: 'center', fontSize: '20px', marginTop: '40px', marginBottom: '0px' }}><strong>NFTs Available: {1000 - minted} / 1000</strong></Paragraph>
    </div><div className="quantity-section">
        <span style={{ fontSize: '20px' }}>Quantity:</span>
        <div className="center-horizontally">
          <Button className="custom-button" onClick={decreaseQuantity}>-</Button>
          <InputNumber
            className="custom-input-number"
            min={1}
            value={quantity}
            onChange={(value) => value !== null && setQuantity(value)} />
          <Button className="custom-button" onClick={increaseQuantity}>+</Button>
        </div>
      </div><div className="price-section">
        <span style={{ color: 'white', textAlign: 'center', fontSize: '20px', marginTop: '40px', marginBottom: '0px' }}>Price: {(0.1 * quantity).toFixed(2)} ETH</span>
      </div><Button type="primary"
        onClick={mintNFT}
        disabled={chainId !== 42161}
        style={{ fontSize: '22px', height: '60px', width: '140px', marginTop: '10px' }}>
        Mint NFTs
      </Button>
      { chainId !== 42161 && <Alert message="Please connect to the Arbitrum network." type="warning" showIcon style={{ marginTop: '20px', textAlign: 'left' }} /> }
      {/* Error Message Modal */}
      {errorMessage && (
        <Modal
          title={<div style={{ display: 'flex', alignItems: 'center', backgroundColor: "#000509" }}>{"Transaction Failed"}</div>}
          visible={!!errorMessage}
          onCancel={() => setErrorMessage(null)}
          footer={null}
          centered
          bodyStyle={{ backgroundColor: "transparent", color: "white" }}
          wrapClassName="custom-modal responsive-modal"
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
    </div>
    </div>
  );
};

export default MintNFT;



