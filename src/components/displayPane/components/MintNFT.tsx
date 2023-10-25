import React, { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { Button, InputNumber, Typography } from 'antd';
import './MintNFT.css';
import { Alert } from 'antd';
import logo from 'assets/images/Acorn_NFT.png';

const { Title, Paragraph } = Typography;

const MintNFT: React.FC = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [minted, /*setMinted*/] = useState<number>(0);
    const [chainId, setChainId] = useState<number | null>(null); // To hold the current chain ID
    const { account, provider, chainId: web3ChainId } = useWeb3React();

    useEffect(() => {
        if (web3ChainId !== undefined) {
          setChainId(web3ChainId);
        }
      }, [web3ChainId]);

  const fetchMinted = async () => {
    // Fetch the current number of minted NFTs from the contract
    // Placeholder logic, replace with actual implementation
    // setMinted(await contract.methods.currentMinted().call());
  };

  useEffect(() => {
    fetchMinted();
  }, []);

  const mintNFT = async () => {
    if (!provider || !account) return;

    const abi = [{ /* your ABI items here */ }];
    const contractAddress = "0xYourContractAddressHere";
    const contract = new Contract(contractAddress, abi, provider.getSigner());
    const price = parseFloat((0.1 * quantity).toString()) * 10 ** 18; // convert to wei

    await contract.mintNFT(quantity, { from: account, value: price });

    fetchMinted();
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <div className="mint-container">
      <Title style={{ color: 'white', textAlign: 'left' }}>Mint Acorn NFTs</Title>
      <div className="image-section">
      <img src={logo} alt="NFT" />
      </div>

      <div className="info-section">
        <Paragraph style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>
          By minting Acorn NFTs, you will receive an airdrop of 300 ACORN tokens per NFT, valued at $300.
          You can stake these NFTs to earn 10% of Acorns total revenue in ETH.
        </Paragraph>
        <Paragraph style={{ color: 'white', textAlign: 'center', fontSize: '18px', marginTop: '40px', marginBottom: '0px' }}><strong>NFTs Available: {1000 - minted} / 1000</strong></Paragraph>
      </div>
      <div className="quantity-section">
        <span style={{ display: 'block', marginBottom: '10px', textAlign: 'center' }}>Quantity:</span>
        <div className="center-horizontally">
            <Button className="custom-button" onClick={decreaseQuantity}>-</Button>
            <InputNumber
            className="custom-input-number"
            min={1}
            value={quantity}
            onChange={(value) => value !== null && setQuantity(value)}
            />
            <Button className="custom-button" onClick={increaseQuantity}>+</Button>
        </div>
      </div>
      <div className="price-section">
      <span>Price: {(0.1 * quantity).toFixed(2)} ETH</span>
      </div>
      <Button type="primary"
              onClick={mintNFT}
              disabled={chainId !== 42161}
              style={{ fontSize: '20px', height: '60px', width: '140px', marginTop: '10px' }}>
        Mint NFTs
      </Button>
      { chainId !== 42161 && <Alert message="Please connect to the Arbitrum network." type="warning" showIcon style={{ marginTop: '20px', textAlign: 'left' }} /> }
    </div>
  );
};

export default MintNFT;



