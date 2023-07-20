import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import gmxLogo from 'assets/images/gmx_logo.png';

import Vault from './Vault';


type VaultType = {
  name: string;
  address: string;
  abi: any[];
  chainId: number;
  logo: string; // add this line
  description: string; // add a description for each vault
  networkName: string;  // Add networkName
  networkLogo: string;  // Add networkLogo
  apr: number;
};

const vaults: VaultType[] = [
  {
    name: 'GMX Staking',
    address: '0x...',
    abi: [ /* ABI array here */ ],
    chainId: 1, // Ethereum mainnet
    logo: ethLogo, // add logo path
    networkName: 'ETH',
    networkLogo: ethLogo,
    apr: 125,
    description: 'This Vault stakes GMX and then sells the ETH rewards back into GMX and stakes it.'
  },
  {
    name: 'GMX',
    address: '0x...',
    abi: [ /* ABI array here */ ],
    chainId: 42161, // Arbitrum mainnet
    logo: gmxLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 13.6,
    description: 'This Vault stakes GMX and then sells the ETH rewards back into GMX and stakes it.'
  },
  {
    name: 'GMX Staking',
    address: '0x...',
    abi: [ /* ABI array here */ ],
    chainId: 1, // Ethereum mainnet
    logo: ethLogo, // add logo path
    networkName: 'FTM',
    networkLogo: ethLogo,
    apr: 587,
    description: 'This Vault stakes GMX and then sells the ETH rewards back into GMX and stakes it.'
  },
  {
    name: 'GMX Staking',
    address: '0x...',
    abi: [ /* ABI array here */ ],
    chainId: 1, // Ethereum mainnet
    logo: ethLogo, // add logo path
    networkName: 'AVAX',
    networkLogo: ethLogo,
    apr: 254,
    description: 'This Vault stakes GMX and then sells the ETH rewards back into GMX and stakes it.'
  },
  // ... More vaults
];

const VaultList: FC = () => {
  const { account, chainId } = useWeb3React();

  if (!account) {
    return <div>Please connect your wallet</div>;
  }

  const filteredVaults = vaults.filter(vault => vault.chainId === chainId);

  if (!filteredVaults.length) {
    const networkName = vaults.find(vault => vault.chainId === chainId)?.networkName || 'this network';
    return <h1 style={{ color: 'white' }}>No Vaults on {networkName} yet. Stay Tooned!</h1>;
  }

  return (
    <div>
      {filteredVaults.map(vault => (
        <Vault key={vault.address} vault={vault} />
      ))}
    </div>
  );
};

export default VaultList;

