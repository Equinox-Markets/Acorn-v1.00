import { FC } from 'react';
import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
//import ethLogo from 'assets/images/ethereum_Logo.png';
import arbLogo from 'assets/images/arbitrum_logo.svg';
//import AXLUSDC from 'assets/images/AXLUSDC.png';
//import ftmLogo from 'assets/images/fantom_logo.png';
//import wFTM from 'assets/images/FTM.svg';
//import glpLogo from 'assets/images/glp_logo.svg';
//import plvGLPLogo from 'assets/images/plvGLP_logo.svg';
//import wstETHLogo from 'assets/images/wstETH_logo.svg';
//import wstETHLogo from 'assets/images/WSTETH_LODE.svg';
import wETH_ARB_Logo from 'assets/images/wETH_ARB.svg';
import USDC_ARB_Logo from 'assets/images/USDC_ARB.svg';
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
//import GLP from 'data/abi/tokens/GLP.json';
//import plvGLP from 'data/abi/tokens/plvGLP.json';
//import wstETH from 'data/abi/tokens/wstETH.json';
import USDC from 'data/abi/tokens/USDC.json';
import ETH from 'data/abi/tokens/wETH.json';
import AcornRewardVault from 'data/abi/vaults/AcornRewardVault.json';
//import aGLP from 'data/abi/vaults/aGLP.json';
//import aGLP2 from 'data/abi/vaults/aGLP2.json';

import Vault from './Vault';


type VaultType = {
  name: string;
  address: string;
  abi: any[]
  chainId: number;
  logo: string;
  description: string;
  networkName: string;
  networkLogo: string;
  apr: number;
  depositTokenAddress: string;
  strategy: string | JSX.Element;
  depositTokenAbi: any[]
  textAboveTitle: string | JSX.Element;
  textBelowDescription: string;
  depositTokenName: string;
  TokenName: string;
};

const vaults: VaultType[] = [
  {
    name: 'wETH → awETH',
    address: '0xeCE034a5D33AacBbD723dD44fad4752cF02446d9',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: wETH_ARB_Logo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 103.4,
    strategy: "This vault earns yield by utilizing a strategy router smart contract that routes users deposits to whitelisted yield strategies and adapts to market conditions based on the assigned risk-scores of each strategy.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // add the deposit token address here
    depositTokenName: "wETH",
    TokenName: "awETH",
    depositTokenAbi: ETH, // Set ABI here
    textAboveTitle: (
      <>
        Stake wETH and receive awETH, a liquid staked version of wETH that earns yield from Acorn Finance.
      </>
    ),
    textBelowDescription: "Your balance of awETH will increase every wednesday and is redeemable 1:1 for wETH. Note: Redeem fees are .5%",

  },
  {
    name: 'USDC → aUSDC',
    address: '0x59a11f630d1614148774f9329A4B6970fC298840',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: USDC_ARB_Logo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 102.5,
    strategy: "This vault earns yield by utilizing a strategy router smart contract that routes users deposits to whitelisted yield strategies and adapts to market conditions based on the assigned risk-scores of each strategy.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // add the deposit token address here
    depositTokenName: "USDC",
    TokenName: "aUSDC",
    depositTokenAbi: USDC, // Set ABI here
    textAboveTitle: (
      <>
        Stake USDC and receive aUSDC, a liquid staked version of USDC that earns yield from Acorn Finance.
      </>
    ),
    textBelowDescription: "Your balance of aUSDC will increase every wednesday and is redeemable 1:1 for USDC. Note: Redeem fees are .5%",

  },/*
  {
    name: 'wstETH → asETH',
    address: '0x811fb486851B0b1162021b3834CFb7aA8568d2A7',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: wstETHLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 14.3,
    strategy: "This vault earns yield by looping wstETH and then max-locking LODE rewards for 6 months. The ETH rewards from staking LODE is then converted into more wstETH.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5979D7b546E38E414F7E9822514be443A4800529', // add the deposit token address here
    depositTokenName: "wstETH",
    TokenName: "asETH",
    depositTokenAbi: wstETH, // Set ABI here
    textAboveTitle: (
      <>
        Stake wstETH and receive asETH, a liquid staked version of wstETH that earns yield from {" "}
        <a style={{ color: '#008FFF'}} href="https://www.lodestarfinance.io/" target="_blank" rel="noopener noreferrer">Lodestar Finance</a>.
      </>
    ),
    textBelowDescription: "Your balance of asETH will grow over time and is redeemable 1:1 for wstETH. Note: Redeem fees are 0.5%",

  },*/
  /*{
    name: 'plvGLP → alGLP',
    address: '0xF0086020b5E70a10f4CebF843D13c60cea58fAcc',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: plvGLPLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 56.37,
    strategy: "This yield strategy loops plvGLP and then max-locks LODE rewards for 6 months. The ETH rewards from staking LODE is then converted into more plvGLP.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5326E71Ff593Ecc2CF7AcaE5Fe57582D6e74CFF1', // add the deposit token address here
    depositTokenName: "plvGLP",
    TokenName: "alGLP",
    depositTokenAbi: plvGLP, // Set ABI here
    textAboveTitle: (
      <>
        Stake plvGLP and receive alGLP, a liquid staked version of plvGLP that earns yield from {" "}
        <a href="https://www.lodestarfinance.io/" target="_blank" rel="noopener noreferrer">Lodestar Finance</a>.
      </>
    ),
    textBelowDescription: "Your balance of alGLP will grow over time and is redeemable 1:1 for plvGLP. Note: Redeem fees are 0.5%",

  },
  {
    name: 'GLP → aGLP',
    address: '0xA45B443B4562A7F2FDcB78F449814601c287c991',
    abi: aGLP,
    chainId: 42161, // Arbitrum mainnet
    logo: glpLogo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 34.63,
    strategy: "This is an auto-compounding yield strategy integrated with GMX and Equalizer. 50% of your GLP balance is compounded from the standard ETH rewards from GMX. The other 50% is converted into Equity from Equalizer, the EQUAL rewards are sold from Equity and converted into more GLP.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf', // add the deposit token address here
    depositTokenName: "GLP",
    TokenName: "aGLP",
    depositTokenAbi: GLP, // Set ABI here
    textAboveTitle: (
      <>
        Stake GLP and receive aGLP, a liquid staked version of GLP that earns yield from {" "}
        <a href="https://gmx.io/" target="_blank" rel="noopener noreferrer">GMX</a> {" "}
        and {" "}
        <a href="https://v2.equity.equalizer.exchange/dashboard" target="_blank" rel="noopener noreferrer">Equalizer</a>.
      </>
    ),
    textBelowDescription: "Your balance of aGLP will grow over time and is redeemable 1:1 for GLP. Note: Redeem fees are 0.5%",

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

  const marginStyle = { color: 'white', marginTop: '0px', marginBottom: '90px' };
  const connectAccountButtonStyle = { fontSize: '24px', padding: '0px 0px' }; // Adjust as needed

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



