import { useState, useEffect } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';

const useDepositDecimals = (depositTokenAddress: string, depositTokenAbi: any) => {
  const [decimals, setDecimals] = useState<number>(18); // Default to 18
  const { provider } = useWeb3React<Web3Provider>(); // Access the provider directly

  useEffect(() => {
    const fetchDecimals = async () => {
      if (provider) {
        try {
          const depositTokenContract = new Contract(depositTokenAddress, depositTokenAbi, provider.getSigner());
          const depositTokenDecimals = await depositTokenContract.decimals();
          setDecimals(depositTokenDecimals);
        } catch (error) {
          console.error('Failed to fetch deposit token decimals', error);
          // Handle the error as needed
        }
      }
    };

    fetchDecimals();
  }, [depositTokenAddress, provider]);

  return decimals;
};

export default useDepositDecimals;
