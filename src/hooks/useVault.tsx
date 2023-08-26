import { useState, useEffect } from 'react'; // Import useCallback

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const useVault = (vaultAddress: string, vaultAbi: any[]) => {
  const { provider, account } = useWeb3React();
  const [vaultTokenBalance, setVaultTokenBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

  const updateVaultTokenBalance = (newBalance: string) => {
    setVaultTokenBalance(ethers.BigNumber.from(ethers.utils.parseUnits(newBalance)));
  };

  useEffect(() => {
    if (!provider || !account) return;

    const fetchBalance = async () => {
      const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());
      const balance = await vaultContract.balanceOf(account);
      setVaultTokenBalance(balance);
    };

    fetchBalance();
  }, [provider, account, vaultAddress, vaultAbi]);

return { vaultTokenBalance, updateVaultTokenBalance }; // Return the update method

};

export default useVault;




