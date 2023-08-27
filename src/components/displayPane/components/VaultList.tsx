import { FC } from 'react';
import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.png';
import AXLUSDC from 'assets/images/AXLUSDC.png';
import ftmLogo from 'assets/images/fantom_logo.png';
import wFTM from 'assets/images/FTM.svg';
import glpLogo from 'assets/images/glp_logo.png';
import lzUSDT from 'assets/images/lzUSDT.svg';
//import gmxLogo from 'assets/images/gmx_logo.png';
import USDCLODE from 'assets/images/USDC_LODE.svg';
import WSTETHLODE from 'assets/images/WSTETH_LODE.svg';
import aArbGLP from 'data/abi/aArbGLP.json';
import ARBGLPERC20ABI from 'data/abi/ARBGLPERC20.json';
import axlUSDC from 'data/abi/tokens/axlUSDC.json';
import LZUSDT from 'data/abi/tokens/lzUSDT.json';
import WFTM from 'data/abi/tokens/WFTM.json';
import axlUSDCvault from 'data/abi/vaults/axlUSDCvault.json';
import lzUSDTvault from 'data/abi/vaults/lzUSDTvault.json';
import WFTMvault from 'data/abi/vaults/WFTMvault.json';

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
    textAboveTitle: "", // New property
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
  {
    name: 'wFTM Vault',
    address: '0x22fDEDAe3b331f7f9404233996D45b43d939A485',
    abi: WFTMvault,
    chainId: 250, // Fantom mainnet
    logo: wFTM, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // add the deposit token address here
    depositTokenAbi: WFTM, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },
  {
    name: 'axlUSDC Vault',
    address: '0x07E47A4bD927D83C5bB07D374e1861677565440C',
    abi: axlUSDCvault,
    chainId: 250, // Fantom mainnet
    logo: AXLUSDC, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x1B6382DBDEa11d97f24495C9A90b7c88469134a4', // add the deposit token address here
    depositTokenAbi: axlUSDC, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },
  {
    name: 'lzUSDT Vault',
    address: '0x6d0681aB650133c2Dc5F6CcA21Cc186892295B04',
    abi: lzUSDTvault,
    chainId: 250, // Fantom mainnet
    logo: lzUSDT, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This vault generates yield by participating in Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0xcc1b99dDAc1a33c201a742A1851662E87BC7f22C', // add the deposit token address here
    depositTokenAbi: LZUSDT, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },

  // ... More vaults
];



const VaultList: FC = () => {
  const { account, chainId } = useWeb3React();

  const [filteredVaults, setFilteredVaults] = useState<VaultType[]>([]);

  // List of chainIds you want to filter
  const allowedChainIds = [250, 42161];

  useEffect(() => {
    if (chainId && allowedChainIds.includes(chainId)) {
      setFilteredVaults(vaults.filter(vault => vault.chainId === chainId));
    } else {
      setFilteredVaults([]); // Empty the list if the chainId is not allowed
    }
  }, [chainId]);

  const marginStyle = { color: 'white', marginTop: '40px', marginBottom: '100px' };

  if (!account) {
    return <h1 style={marginStyle}>Please connect your wallet</h1>;
  }

  if (!filteredVaults.length) {
    const networkName = vaults.find(vault => vault.chainId === chainId)?.networkName || 'this network';
    return <h1 style={marginStyle}>No Vaults on {networkName} yet. Stay Tooned!</h1>;
  }

  return (
    <div>
    {filteredVaults.map(vault => (
        <Vault key={`${vault.address}-${vault.chainId}`} vault={vault} />
    ))}
    </div>
  );
};

export default VaultList;



