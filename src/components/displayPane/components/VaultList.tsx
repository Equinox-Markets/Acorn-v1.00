import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import glpLogo from 'assets/images/glp_logo.png';
//import gmxLogo from 'assets/images/gmx_logo.png';
import aArbGLP from 'data/abi/aArbGLP.json';
import ARBGLPERC20ABI from 'data/abi/ARBGLPERC20.json';
//import ARBGMXERC20ABI from 'data/abi/ARBGMXERC20.json';

import Vault from './Vault';


type VaultType = {
  name: string;
  address: string;
  abi: any[]
  chainId: number;
  logo: string; // add this line
  description: string; // add a description for each vault
  networkName: string;  // Add networkName
  networkLogo: string;  // Add networkLogo
  apr: number;
  depositTokenAddress: string; // Add this line
  strategy: string;
  depositTokenAbi: any[] // Add this line
};

const vaults: VaultType[] = [
  {
    name: 'aGLP',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 66.4,
    strategy: "This Vault auto compounds the ETH rewards from staking GLP into more GLP.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

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

