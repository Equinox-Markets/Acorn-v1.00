import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

//import ethLogo from 'assets/images/ethereum_Logo.png';

import arbLogo from 'assets/images/arbitrum_logo.png';
import AXLUSDC from 'assets/images/AXLUSDC.png';
//import glpLogo from 'assets/images/glp_logo.png';
import DAILODE from 'assets/images/DAI_LODE.svg';
import ftmLogo from 'assets/images/fantom_logo.png';
import USDCLODE from 'assets/images/USDC_LODE.svg';
import USDTLODE from 'assets/images/USDT_LODE.svg';
//import WFTM from 'assets/images/WFTM.png';
import WSTETHLODE from 'assets/images/WSTETH_LODE.svg';
//import gmxLogo from 'assets/images/gmx_logo.png';
import aArbGLP from 'data/abi/aArbGLP.json';
import ARBGLPERC20ABI from 'data/abi/ARBGLPERC20.json';
import axlUSDCERC20 from 'data/abi/axlUSDCERC20.json';
import faxlUSDCERC20 from 'data/abi/faxlUSDCERC20.json';
//import NewArbGLP from 'data/abi/NewArbGLP.json';
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

  },
  {
    name: 'USDT Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: USDTLODE, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 36.87,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out USDT, opens a borrow position in USDT, then deposits the USDT in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more USDT.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

  },
  {
    name: 'DAI Vault',
    address: '0xEAa69FFDF61262d82b1155A68727101ca6cC704c',
    abi: aArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: DAILODE, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 34.89,
    strategy: "This vault generates yield by participating in Lodestar Finance, it lends out DAI, opens a borrow position in DAI, then deposits the DAI in a stablecoin farm. It then claims the reward tokens from both platforms and converts the tokens into more DAI.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

  },
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

  },
  {
    name: 'axlUSDC Vault',
    address: '0x28F53DD931BC60FB5a5813b02A8EaCECCC91A5c8',
    abi: faxlUSDCERC20,
    chainId: 250, // Fantom mainnet
    logo: AXLUSDC, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x1B6382DBDEa11d97f24495C9A90b7c88469134a4', // add the deposit token address here
    depositTokenAbi: axlUSDCERC20, // Set ABI here

  },
  /*{
    name: 'WFTM Vault',
    address: '',
    abi: aArbGLP,
    chainId: 250, // Fantom mainnet
    logo: WFTM, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

  },*/
  /*{
    name: 'GLP',
    address: '0xA8813661e29922Dc66Cd03aDfbc33B0D5Fd4d3C2',
    abi: NewArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 66.4,
    strategy: "This vault generates yield by participating in GMX. It automatically compounds the ETH rewards from staking GLP into more GLP.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

  },*/
  /*{
    name: 'GLP',
    address: '0xA8813661e29922Dc66Cd03aDfbc33B0D5Fd4d3C2',
    abi: NewArbGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 66.4,
    strategy: "This vault generates yield by participating in various DeFi protocols. It might lend the assets to lending platforms, provide liquidity to decentralized exchanges, or stake tokens in yield-generating protocols.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: ARBGLPERC20ABI, // Set ABI here

  },*/

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


