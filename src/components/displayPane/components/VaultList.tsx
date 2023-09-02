import { FC } from 'react';
import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.svg';
//import AXLUSDC from 'assets/images/AXLUSDC.png';
//import ftmLogo from 'assets/images/fantom_logo.png';
//import wFTM from 'assets/images/FTM.svg';
import glpLogo from 'assets/images/glp_logo.svg';
import wstETHLogo from 'assets/images/wstETH_logo.svg';
import plvGLPLogo from 'assets/images/plvGLP_logo.svg';
//import lzUSDT from 'assets/images/lzUSDT.svg';
//import gmxLogo from 'assets/images/gmx_logo.png';
//import USDCLODE from 'assets/images/USDC_LODE.svg';
//import WSTETHLODE from 'assets/images/WSTETH_LODE.svg';
import ConnectAccount from "components/Account/ConnectAccountButton";
//import axlUSDC from 'data/abi/tokens/axlUSDC.json';
//import LZUSDT from 'data/abi/tokens/lzUSDT.json';
//import WFTM from 'data/abi/tokens/WFTM.json';
//import axlUSDCvault from 'data/abi/vaults/axlUSDCvault.json';
//import lzUSDTvault from 'data/abi/vaults/lzUSDTvault.json';
//import WFTMvault from 'data/abi/vaults/WFTMvault.json';
import GLP from 'data/abi/tokens/GLP.json';
import plvGLP from 'data/abi/tokens/plvGLP.json';
import wstETH from 'data/abi/tokens/wstETH.json';
import AcornRewardVault from 'data/abi/vaults/AcornRewardVault.json';
import aGLP from 'data/abi/vaults/aGLP.json';
//import aGLP2 from 'data/abi/vaults/aGLP2.json';

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
    address: '0x811fb486851B0b1162021b3834CFb7aA8568d2A7',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: wstETHLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 30.91,
    strategy: "This is an auto-compounding vault integrated with Lodestar Finance.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5979D7b546E38E414F7E9822514be443A4800529', // add the deposit token address here
    depositTokenAbi: wstETH, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.5%", // New property

  },
  {
    name: 'GLP Vault',
    address: '0xA45B443B4562A7F2FDcB78F449814601c287c991',
    abi: aGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 30.63,
    strategy: "This is an auto-compounding vault integrated with GMX.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenAbi: GLP, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Withdraw fees are 0.5%", // New property

  },
  {
    name: 'plvGLP Vault',
    address: '0xF0086020b5E70a10f4CebF843D13c60cea58fAcc',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: plvGLPLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 31.27,
    strategy: "This is an auto-compounding vault integrated with Lodestar Finance.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5326E71Ff593Ecc2CF7AcaE5Fe57582D6e74CFF1', // add the deposit token address here
    depositTokenAbi: plvGLP, // Set ABI here
    textAboveTitle: "", // New property
    textBelowDescription: "Note: Withdraw fees are 0.5%", // New property

  },
/*
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

  },*/
  /*{
    name: 'wFTM Vault',
    address: '0x19851B2f6da1ac664F4437bdc527e42C50636d44',
    abi: WFTMvault,
    chainId: 250, // Fantom mainnet
    logo: wFTM, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This is an auto-compounding vault integrated with Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // add the deposit token address here
    depositTokenAbi: WFTM, // Set ABI here
    textAboveTitle: "TVL: $17,217", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },
  {
    name: 'axlUSDC Vault',
    address: '0xf1023eD4fEEE0fE4C66470446048e2db42769aC2',
    abi: axlUSDCvault,
    chainId: 250, // Fantom mainnet
    logo: AXLUSDC, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This is an auto-compounding vault integrated with Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x1B6382DBDEa11d97f24495C9A90b7c88469134a4', // add the deposit token address here
    depositTokenAbi: axlUSDC, // Set ABI here
    textAboveTitle: "TVL: $25,826", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },
  {
    name: 'lzUSDT Vault',
    address: '0xAFBa6d26A7601A9477BD0cEC188CCff8aD674B43',
    abi: lzUSDTvault,
    chainId: 250, // Fantom mainnet
    logo: lzUSDT, // add logo path
    networkName: 'FTM',
    networkLogo: ftmLogo,
    apr: 38.91,
    strategy: "This is an auto-compounding vault integrated with Equalizer Exchange.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0xcc1b99dDAc1a33c201a742A1851662E87BC7f22C', // add the deposit token address here
    depositTokenAbi: LZUSDT, // Set ABI here
    textAboveTitle: "$14,348", // New property
    textBelowDescription: "Note: Deposit and withdraw fees are 0.1%",
  },*/

  // ... More vaults
];



const VaultList: FC = () => {
  const { account, chainId } = useWeb3React();
  const [filteredVaults, setFilteredVaults] = useState<VaultType[]>([]);
  const [showNoVaultMessage, setShowNoVaultMessage] = useState(false); // New state

  // List of chainIds you want to filter
  const allowedChainIds = [42161];

  useEffect(() => {
    setShowNoVaultMessage(false); // Reset message state

    if (chainId && allowedChainIds.includes(chainId)) {
      setFilteredVaults(vaults.filter(vault => vault.chainId === chainId));
    } else {
      setFilteredVaults([]); // Empty the list if the chainId is not allowed

      // Delay showing the message
      setTimeout(() => {
        setShowNoVaultMessage(true);
      }, 500); // 1-second delay
    }
  }, [chainId]);

  const marginStyle = { color: 'white', marginTop: '10px', marginBottom: '75px' };
  const connectAccountButtonStyle = { fontSize: '24px', padding: '10px 20px' }; // Adjust as needed

  if (!account) {
    return (
      <div style={marginStyle}>
        <div style={connectAccountButtonStyle}>
          <ConnectAccount />
        </div>
      </div>
    );
  }

  if (!filteredVaults.length && showNoVaultMessage) {  // Adjusted this line
    const networkName = vaults.find(vault => vault.chainId === chainId)?.networkName || 'this network';
    return <h1 style={marginStyle}>No vaults on {networkName} yet! Coming Soon!</h1>;
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



