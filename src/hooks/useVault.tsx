import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const useVault = (vaultAddress: string, vaultAbi: any[]) => {
  const { provider, account } = useWeb3React();
  const [vaultTokenBalance, setVaultTokenBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
  const [vaultDecimals, setVaultDecimals] = useState<number>(18); // Default to 18

  const updateVaultTokenBalance = (newBalance: string) => {
    setVaultTokenBalance(ethers.BigNumber.from(ethers.utils.parseUnits(newBalance, vaultDecimals)));
  };

  useEffect(() => {
    if (!provider || !account) return;

    const fetchBalanceAndDecimals = async () => {
      const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());

      // Fetch balance
      const balance = await vaultContract.balanceOf(account);
      setVaultTokenBalance(balance);

      // Fetch decimals
      const decimals = await vaultContract.decimals();
      setVaultDecimals(decimals);
    };

    fetchBalanceAndDecimals();
  }, [provider, account, vaultAddress, vaultAbi]);

  return { vaultTokenBalance, updateVaultTokenBalance, vaultDecimals }; 
};

export default useVault;





