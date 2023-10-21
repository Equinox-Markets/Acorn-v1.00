import React, { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { Button, Typography, Card, Checkbox, Divider } from 'antd';
//import { STAKING_ABI } from 'data/abi/tokens/wstETH.json';
//import { NFT_ABI } from 'data/abi/tokens/wstETH.json';
import NFTlogo from 'assets/images/Acorn_NFT.png';
import './StakingNFT.css';



const { Paragraph } = Typography;

const NFT_CONTRACT_ADDRESS = '0xYourNFTContractAddress';
const STAKING_CONTRACT_ADDRESS = '0xYourStakingContractAddress';

interface NFT {
  id: number;
  name: string;
  isStaked: boolean;
}

const StakingNFT: React.FC = () => {
  const { account, provider } = useWeb3React();
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  //const [nfts, setNfts] = useState<NFT[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([
    { id: 1, name: 'Acorn NFT', isStaked: false },
    { id: 2, name: 'Acorn NFT', isStaked: false },
    { id: 3, name: 'Acorn NFT', isStaked: false }, // Example NFT
  ]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!provider || !account) return;

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider.getSigner());
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());


      // Fetch user's NFTs
      const userNFTs: number[] = await nftContract.getUserNFTs(account); // Replace with your contract's method
      const nftData: NFT[] = userNFTs.map((id: number) => ({ id, name: 'Acorn NFT', isStaked: false }));

      // Fetch staking status
      for (const nft of nftData) {  // Changed 'let' to 'const'
        nft.isStaked = await stakingContract.isNFTStaked(nft.id); // Replace with your contract's method
      }

      setNfts(nftData);
    };

    fetchNFTs();
  }, [provider, account]);


  const toggleNFTSelection = (id: number) => {
    setSelectedNFTs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedNFTs([]);
    } else {
      setSelectedNFTs(nfts.map(nft => nft.id));
    }
    setSelectAll(!selectAll);
  };


  const stakeNFT = async () => {
    if (!provider || !account || !selectedNFTs.length) return;

    const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
    await stakingContract.stakeNFTs(selectedNFTs, { from: account }); // Replace with your contract's method
  };

  const unstakeNFT = async () => {
    if (!provider || !account || !selectedNFTs.length) return;

    const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
    await stakingContract.unstakeNFTs(selectedNFTs, { from: account }); // Replace with your contract's method
  };

  const claimRewards = async () => {
    if (!provider || !account) return;

    const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
    await stakingContract.claimRewards({ from: account }); // Replace with your contract's method
  };


  return (
    <div className="app-container">
      <Card className="staking-container" bordered={false}>
        <div className="top-info-wrapper">
        </div>
        <div className="claim-rewards-flex-wrapper">
          <div className="fake-button">ETH Rewards: 0.0000</div>
          <Button className="custom-button claim-rewards" onClick={claimRewards}>
            Claim ETH Rewards
          </Button>
          </div>
        <div className="claim-rewards-wrapper">
        </div>
        <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
        <h3>NFTs Staked:</h3>
        <h2>701/1000</h2>
      </div>
      <div>
        <h3>APR:</h3>
        <h2>7.1%</h2>
      </div>
      </div>
      <Divider style={{ borderColor: '#064576', borderWidth: '2px', marginTop: '20px', marginBottom: '0px' }} />
        <div className="action-section">
          <Button className="custom-button" onClick={stakeNFT} disabled={!selectedNFTs.length}>
            Stake Selected NFTs
          </Button>
          <Button className="custom-button" onClick={unstakeNFT} disabled={!selectedNFTs.length}>
            Unstake Selected NFTs
          </Button>
        </div>
        <div className="nft-list">
        <h2>Your Acorn NFTs</h2>
        <Checkbox className="select-all-checkbox" checked={selectAll} onChange={toggleSelectAll}>
          Select All
        </Checkbox>
          {nfts.length > 0 ? (
            nfts.map((nft) => (
              <div key={nft.id} className="nft-item">
                <Checkbox
                  className="nft-checkbox"
                  checked={selectedNFTs.includes(nft.id)}
                  onChange={() => toggleNFTSelection(nft.id)}
                />
                <img src={NFTlogo} alt="NFT Logo" className="nft-logo" />
                <span>{nft.name}</span>
                <span className="nft-status">{nft.isStaked ? 'Staked' : 'Not Staked'}</span>
              </div>
            ))
          ) : (
            <Paragraph className="no-nfts-message">You currently have no NFTs.</Paragraph>
          )}
        </div>
      </Card>
    </div>
  );

};

export default StakingNFT;