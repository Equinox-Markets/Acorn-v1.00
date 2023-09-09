import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { getAddChainParameters } from "data/networks";

export function useSwitchChain() {
  const { connector } = useWeb3React();

  const switchChain = async (desiredChain: number) => {
    console.log('Attempting to switch to chain:', desiredChain)
    try {
      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(desiredChain === -1 ? undefined : desiredChain);
      } else {
        const chainParameters = getAddChainParameters(desiredChain);
        if (!chainParameters) {
          throw new Error(`No chain parameters found for chain ID ${desiredChain}`);
        }
        await connector.activate(chainParameters);
      }
    } catch (error) {
      console.error('Failed to switch chain:', error);
      throw error;
    }
  };

  return switchChain;
}