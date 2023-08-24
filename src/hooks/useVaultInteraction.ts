import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

type Vault = {
  address: string;
  abi: any[];
  depositTokenAddress: string;
  depositTokenAbi: any[];
};

export const useVaultInteraction = (vault: Vault) => {
  const { account, provider } = useWeb3React();
  const [userBalance, setUserBalance] = useState('0');

  useEffect(() => {
    if (account && vault.depositTokenAddress && provider) {
      const signer = provider.getSigner(account);
      const tokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);

      tokenContract.balanceOf(account)
        .then((balance: ethers.BigNumber) => {
          const formattedBalance = ethers.utils.formatEther(balance);
          setUserBalance(formattedBalance);
        })
        .catch((error: Error) => console.error("Failed to fetch user's token balance:", error));
    }
  }, [account, vault.depositTokenAddress, provider, vault.depositTokenAbi]);

  return { userBalance };
};
