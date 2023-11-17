import { FC } from 'react';
import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import arbLogo from 'assets/images/arbitrum_logo.svg';
import wETH_ARB_Logo from 'assets/images/wETH_ARB.svg';
import ConnectAccount from "components/Account/ConnectAccountButton";
import ACORN from 'data/abi/tokens/ACORN.json';
import AcornRewardVault from 'data/abi/vaults/AcornRewardVault.json';

import AcornStake from './StakeAcorn';


type AcornStakeProps = {
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

const vaults: AcornStakeProps[] = [
  {
    name: 'Stake Acorn',
    address: '0x8C9C7fA94FbBfEf16baaB4f7bFfAE136e2a8AeD6',
    abi: AcornRewardVault,
    chainId: 42161, // Arbitrum mainnet
    logo: wETH_ARB_Logo, // add logo path
    networkName: 'ARB',
    networkLogo: arbLogo,
    apr: 13.4,
    strategy: "20% of all revenue from fees and treasury yield will be distributed every 7 days in ETH to all ACORN stakers.",
    description: 'Deposit GLP and Earn',
    depositTokenAddress: '0x32C3d7DB51439d7e7B1E6039d1d0c08cCC4beC4A', // add the deposit token address here
    depositTokenName: "ACORN",
    TokenName: "stACORN:",
    depositTokenAbi: ACORN, // Set ABI here
    textAboveTitle: (
      <>
         {" "}
        <a href="https://acornfinance.io/" target="_blank" rel="noopener noreferrer"></a>
      </>
    ),
    textBelowDescription: "",

  },

  // ... More vaults
];



const VaultList: FC = () => {
  const { account, chainId } = useWeb3React();
  const [filteredVaults, setFilteredVaults] = useState<AcornStakeProps[]>([]);
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
          <AcornStake key={`${vault.address}-${vault.chainId}`} vault={vault} />

      ))}
    </div>
  );
};

export default VaultList;



