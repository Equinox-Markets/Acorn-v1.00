import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import glpLogo from 'assets/images/glp_logo.png';
//import gmxLogo from 'assets/images/gmx_logo.png';
//import aArbGLP from 'data/abi/aArbGLP.json';
import axlUSDC from 'data/abi/AXLUSDC.json';
import faxlUSDC from 'data/abi/fAXLUSDC.json';
//import ARBGMXERC20ABI from 'data/abi/ARBGMXERC20.json';
//import BeefyVaultABI from 'data/abi/BeefyVaultV7.json';

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
    name: 'axlUSDC',
    address: '0x24ccd5f17E29dcD63aC08f27D81F5d0b025f80de',
    abi: faxlUSDC,
    chainId: 250, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 66.4,
    strategy: "The vault deposits the user's axlUSDC-FTM vLP in a Equalizer farm, earning the platform's governance token. Earned token is swapped for axlUSDC and FTM in order to acquire more of the same LP token. To complete the compounding cycle, the new axlUSDC-FTM vLP is added to the farm, ready to go for the next earning event. The transaction cost required to do all this is socialized among the vault's users.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x1B6382DBDEa11d97f24495C9A90b7c88469134a4', // add the deposit token address here
    depositTokenAbi: axlUSDC, // Set ABI here

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

