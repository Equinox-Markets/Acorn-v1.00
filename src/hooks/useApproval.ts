import { useState, useEffect } from 'react';

import { ethers } from 'ethers';

type UseApprovalProps = {
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
  vault: {
    address: string;
    depositTokenAddress: string;
    depositTokenAbi: any[];
  };
  depositAmount: string;
};

const useApproval = ({ provider, account, vault, depositAmount }: UseApprovalProps) => {
  const [hasApproval, setHasApproval] = useState(false);

  useEffect(() => {
    if (!provider || !account || !vault.depositTokenAddress) return;

    const checkAllowance = async () => {
      const signer = provider.getSigner(account);

      if (!signer || !vault.depositTokenAddress || !vault.depositTokenAbi || !account || !vault.address || !depositAmount) {
        console.error("Missing required parameters for checkAllowance");
        return;
      }

      if (isNaN(parseFloat(depositAmount)) || depositAmount.trim() === "") {
        console.error("Invalid depositAmount value");
        return;
      }

      const depositTokenContract = new ethers.Contract(vault.depositTokenAddress, vault.depositTokenAbi, signer);
      const allowance = await depositTokenContract.allowance(account, vault.address);
      const weiAmount = ethers.utils.parseEther(depositAmount);

      if (allowance.gte(weiAmount)) {
        setHasApproval(true);
      }
    };

    checkAllowance();
  }, [provider, account, vault.depositTokenAddress, vault.depositTokenAbi, vault.address, depositAmount]);

  const markApprovalDone = () => {
    setHasApproval(true);
  };

  return { hasApproval, markApprovalDone };
};

export default useApproval;
