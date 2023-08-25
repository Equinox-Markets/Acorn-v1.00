import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import glpLogo from 'assets/images/glp_logo.png';
//import gmxLogo from 'assets/images/gmx_logo.png';
import USDCLODE from 'assets/images/USDC_LODE.svg';
import WSTETHLODE from 'assets/images/WSTETH_LODE.svg';
import aArbGLP from 'data/abi/aArbGLP.json';
import ARBGLPERC20ABI from 'data/abi/ARBGLPERC20.json';
//import axlUSDC from 'data/abi/AXLUSDC.json';
//import faxlUSDC from 'data/abi/fAXLUSDC.json';
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
  textAboveTitle: string; // New property
    textBelowDescription: string; // New property
};

const vaults: VaultType[] = [
  {
    name: 'wstETH Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: WSTETHLODE, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out wstETH, opens a borrow position in wstETH, then deposits the wstETH in a (Redacted) farm. It then claims the reward tokens from both platforms and converts the tokens into more wstETH.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%", // New property

  },
  {
    name: 'USDC Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: USDCLODE, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 37.22,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out USDC, opens a borrow position in USDC, then deposits the USDC in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more USDC.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here
    textAboveTitle: "Note: There is a UI bug that is not displaying balances correctly. We are working on a solution. In the meantime, the vault is fully functional and working as expected.", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%", // New property

  },
  {
    name: 'WETH Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 36.87,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out USDT, opens a borrow position in USDT, then deposits the USDT in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more USDT.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",


  },
  {
    name: 'WBTC Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 36.87,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out USDT, opens a borrow position in USDT, then deposits the USDT in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more USDT.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",


  },
  {
    name: 'GLP Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 36.87,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out USDT, opens a borrow position in USDT, then deposits the USDT in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more USDT.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",

  },

  // ... More vaults
];

const VaultList: FC = () => {
  const { account, chainId } = useWeb3React();

  if (!account) {
    return <h1 style={{ color: 'white' }}>Please connect your wallet</h1>;
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

