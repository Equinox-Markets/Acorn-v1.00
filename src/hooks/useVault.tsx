import { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

const useVault = (vaultAddress: string, vaultAbi: any[]) => {
  const { provider, account } = useWeb3React();
  const [vaultTokenBalance, setBalance,] = useState<number>(0);

  useEffect(() => {
    if (!provider || !account) return;

    const fetchBalance = async () => {
      const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());
      const vaultTokenBalance = await vaultContract.balanceOf(account); // Replace getUserBalance with the actual function in your smart contract
      setBalance(vaultTokenBalance);
    };

    fetchBalance();
  }, [provider, account, vaultAddress, vaultAbi]);

  return { vaultTokenBalance };
};

export default useVault;


