import { useMemo, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { LiFiWidget, WidgetConfig, WidgetWalletManagement } from '@lifi/widget';
import { useWeb3React } from '@web3-react/core';
import wstETHLogo from 'assets/images/wstETH_logo1.svg';
import { Signer } from 'ethers';
import { useSwitchChain } from 'hooks';

const WidgetPage = () => {
  const { provider } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState(false);
  const switchChain = useSwitchChain();


  // Use useMemo to memoize your config object
  const widgetConfig: WidgetConfig = useMemo(() => ({
    containerStyle: {
      border: '2px solid #064576', // Your specified color
      borderRadius: '16px',
    },
    theme: {
      palette: {
        primary: { main: '#064576' },
        secondary: { main: '#064576' },
        background: {
          paper: '#000509',
          default: '#000509',
        },
      },
      grey: {
        300: '#000000', // border light theme
        800: '#000000', // border dark theme
        },
      shape: {
        borderRadius: 16,
        borderRadiusSecondary: 24,
      },
    },
    appearance: 'dark',
    hiddenUI: ['appearance'],
    integrator: 'Acorn Finance',
    variant: 'expandable',
    chains: {
      allow: [8453, 250, 324, 42161]
    },
    tokens: {
      featured: [
        {
          address: '0x5979D7b546E38E414F7E9822514be443A4800529',
          symbol: 'wstETH',
          decimals: 18,
          chainId: 42161,
          name: 'wstETH',
          logoURI: wstETHLogo,
        },
      ],
      // Include and deny can be kept empty if you're not using them
      include: [],
      deny: [],
    },
  }), []);

  // Wallet management object
  const walletManagement: WidgetWalletManagement = {
    async connect() {
      if (provider) {
        const signer = provider.getSigner();
        return signer as Signer;
      }
      return null as unknown as Signer;
    },
    async disconnect() {
      return Promise.resolve();
    },
    switchChain: async (desiredChain: number) => {
      try {
        setLoading(true);
        await switchChain(desiredChain);
        setLoading(false);
        if (provider) {
          const signer = provider.getSigner();
          return signer as Signer;
        }
      } catch (error) {
        setLoading(false);
        alert('Failed to switch network.');
      }
      return null as unknown as Signer;
    },
  };

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      <LiFiWidget
        integrator="Acorn Finance"
        config={widgetConfig}
        walletManagement={walletManagement}
      />
    </div>
  );
};

export default WidgetPage;
