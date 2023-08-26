import { useState, useEffect } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';

const useDecimals = (vaultAddress: string, vaultAbi: any) => {
  const [decimals, setDecimals] = useState<number>(18); // Default to 18
  const { provider } = useWeb3React<Web3Provider>(); // Access the provider directly

  useEffect(() => {
    const fetchDecimals = async () => {
      if (provider) {
        try {
          const vaultContract = new Contract(vaultAddress, vaultAbi, provider.getSigner());
          const vaultDecimals = await vaultContract.decimals();
          setDecimals(vaultDecimals);
        } catch (error) {
          console.error('Failed to fetch decimals', error);
          // Handle the error as needed
        }
      }
    };

    fetchDecimals();
  }, [vaultAddress, provider]);

  return decimals;
};

export default useDecimals;


