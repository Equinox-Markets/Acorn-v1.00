import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import gmxLogo from 'assets/images/gmx_logo.png';
import ARBGMXERC20ABI from 'data/abi/ARBGMXERC20.json';

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
  depositTokenAddress: string; // Add this line
  strategy: string;
  depositTokenAbi: any[]; // Add this line
};

const vaults: VaultType[] = [
  {
    name: 'GMX',
    address: '0x...',
    abi: [ /* ABI array here */ ],
    chainId: 42161, // Arbitrum mainnet
    logo: gmxLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 13.6,
    strategy: "This Vault auto compounds the ETH rewards from staking GMX into more GMX and re-stakes it.",
    description: 'Deposit GMX and Earn',
    depositTokenAddress: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a', // add the deposit token address here
    depositTokenAbi: ARBGMXERC20ABI, // Set ABI here

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

