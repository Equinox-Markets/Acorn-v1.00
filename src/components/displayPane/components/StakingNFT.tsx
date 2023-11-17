import React, { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { Button, Typography, Card, Checkbox, Divider, message } from 'antd';
import NFTlogo from 'assets/images/Acorn_NFT.png';
import STAKING_ABI  from 'data/abi/vaults/NftStaking.json';
import './StakingNFT.css';
import { ethers } from 'ethers';

const { Paragraph } = Typography;

const STAKING_CONTRACT_ADDRESS = '0x5A8A64EAe69F52603ace5d3C629E57fdc2C2d8D2';

interface NFT {
  id: number;
  name: string;
  isStaked: boolean;
}

const StakingNFT: React.FC = () => {
  const { account, provider } = useWeb3React();
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [pendingReward, setPendingReward] = useState<string>('0');

    const fetchNFTs = async () => {
      try {
        if (!provider || !account) return;

        // Initialize the contracts
        const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());

        // Fetch user's NFTs
        const userNFTs: number[] = await stakingContract.getUserNFTs(account);

        // Map each NFT id to its name and staking status
        const nftData: NFT[] = await Promise.all(
          userNFTs.map(async (id: number) => {
            const isStaked = await stakingContract.isNFTStaked(id);
            return {
              id,
              name: 'Acorn NFT',
              isStaked,
            };
          })
        );

        // Update the nfts state
        setNfts(nftData);

        // Fetch and update the pending rewards
        const reward: number = await stakingContract.pendingRewards(account);
        setPendingReward(ethers.utils.formatEther(reward));

      } catch (error) {
        message.error('An error occurred while fetching data.');
      }
    };

  useEffect(() => {
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
    try {
      if (!provider || !account || !selectedNFTs.length) return;
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
      await stakingContract.stakeNFTs(selectedNFTs);
      message.success('Successfully staked NFTs.');
      fetchNFTs();  // Refresh state
    } catch (error) {
      message.error('An error occurred while staking.');
    }
  };

  const unstakeNFT = async () => {
    try {
      if (!provider || !account || !selectedNFTs.length) return;
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
      await stakingContract.unstakeNFTs(selectedNFTs);
      message.success('Successfully unstaked NFTs.');
      fetchNFTs();  // Refresh state
    } catch (error) {
      message.error('An error occurred while unstaking.');
    }
  };

  const claimRewards = async () => {
    try {
      if (!provider || !account) return;
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider.getSigner());
      await stakingContract.claimRewards();
      message.success('Successfully claimed rewards.');
    } catch (error) {
      message.error('An error occurred while claiming rewards.');
    }
  };


  return (
    <div className="app-container">
      <Card className="staking-container" bordered={false}>
      <div className="top-info-wrapper">
        </div>
        <div className="claim-rewards-flex-wrapper">
        <h2 className="eth-rewards">ETH Rewards: {pendingReward}</h2>
          <Button className="custom-button claim-rewards" onClick={claimRewards}>
            Claim
          </Button>
          </div>
        <div className="claim-rewards-wrapper">
        </div>
        <Divider style={{ borderColor: '#064576', borderWidth: '1.5px', marginTop: '20px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
        <h3>NFTs Staked:</h3>
        <h2>{nfts.filter(nft => nft.isStaked).length}/1000</h2>
      </div>
      <div>
        <h3>APR:</h3>
        <h2>7.1%</h2>
      </div>
      </div>
      <Divider style={{ borderColor: '#064576', borderWidth: '1.5px', marginTop: '20px', marginBottom: '0px' }} />
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