import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';

import VaultList from './VaultList';

const Dashboard: FC = () => {
  const { chainId } = useWeb3React();

  // Function to get network name based on chainId for the title
  const getNetworkName = (chainId: number | undefined) => {
    if (!chainId) return 'Unknown';
    switch (chainId) {
      case 42161:
        return 'Arbitrum';
      case 43114:
        return 'Avalanche';
      // Add more cases for other networks
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      <h1>My {getNetworkName(chainId)} Dashboard</h1>
      <hr />
      <h2>My Positions</h2>
      <VaultList />
    </div>
  );
};

export default Dashboard;