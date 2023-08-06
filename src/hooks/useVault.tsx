import { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';


const useVault = (vaultAddress: string, vaultAbi: any[]) => {
  const { provider, account } = useWeb3React();
  const [vaultTokenBalance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

  useEffect(() => {
    if (!provider || !account) return;

    const fetchBalance = async () => {
      const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());
      const balance = await vaultContract.balanceOf(account);
      setBalance(balance);
    };

    fetchBalance();
  }, [provider, account, vaultAddress, vaultAbi]);

  return { vaultTokenBalance };
};

export default useVault;



