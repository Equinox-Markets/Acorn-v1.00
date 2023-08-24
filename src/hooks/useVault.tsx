import { useState, useEffect } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const useVault = (vaultAddress: string, vaultAbi: any[]) => {
  const { provider, account } = useWeb3React();
  const [vaultTokenBalance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

  useEffect(() => {
    if (!provider || !account || !vaultAddress || !vaultAbi) return;

    const fetchBalance = async () => {
      const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());
      const balance = await vaultContract.balanceOf(account);
      setBalance(balance);
    };

    const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());

    const onDeposit = async () => {
      await fetchBalance(); // Re-fetch the balance on deposit
    };

    const onWithdraw = async () => {
      await fetchBalance(); // Re-fetch the balance on withdraw
    };

    vaultContract.on('Deposit', onDeposit);
    vaultContract.on('Withdraw', onWithdraw);

    fetchBalance(); // Initial fetch

    // Cleanup function to remove listeners when the component using this hook unmounts
    return () => {
      vaultContract.off('Deposit', onDeposit);
      vaultContract.off('Withdraw', onWithdraw);
    };
  }, [provider, account, vaultAddress, vaultAbi]);

  return { vaultTokenBalance };
};

export default useVault;




