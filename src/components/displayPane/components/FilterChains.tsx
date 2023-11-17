import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Card } from 'antd';

import './FilterChains.css';
import arbitrum_Logo from 'assets/images/arbitrum_logo.svg';
import avalanche_Logo from 'assets/images/avalanche_logo.png';
import fantom_Logo from 'assets/images/fantom_logo.svg';
import optimism_Logo from 'assets/images/optimistim_Logo.svg';
import { chainIds } from 'data/chainIds';
import { useSwitchChain } from 'hooks';

const FilterChains: React.FC = () => {
  const { chainId } = useWeb3React();
  const switchChain = useSwitchChain();
  const [cache, setCache] = useState<Record<number, boolean>>({});

  const handleSwitchChain = async (targetChainId: number) => {
    if (chainId !== targetChainId) {
      try {
        await switchChain(targetChainId);
        setCache({ ...cache, [targetChainId]: true });
      } catch (error) {
        console.error(`Failed to switch chains: ${error}`);
      }
    } else {
      console.log(`Already on chain ${targetChainId}, no need to switch.`);
    }
  };


  return (
    <Card className="acorn-card-5" bordered={false}>
      <div className="airdrop-container-5">
        <div className="airdrop-text-5">
          <h2></h2>
        </div>
        <div className="chain-icons">
          {['arbitrum', 'optimism', 'fantom', 'avalanche'].map((chain) => (
            <div
              className={`chain-card ${Number(chainId) === Number((chainIds as any)[chain]) ? 'active' : ''}`}
              key={chain}
              onClick={() => handleSwitchChain(Number((chainIds as any)[chain]))}

            >
              <img
                className="chain-icon"
                src={
                  chain === 'arbitrum'
                    ? arbitrum_Logo
                    : chain === 'optimism'
                    ? optimism_Logo
                    : chain === 'fantom'
                    ? fantom_Logo
                    : avalanche_Logo
                }
                alt={chain}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FilterChains;
