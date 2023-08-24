import { useEffect, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers'; // Import the correct type
import { useWeb3React } from '@web3-react/core';

const useNetworkChange = (): number | undefined => {
  const context = useWeb3React<Web3Provider>(); // Correctly use the type here
  const library = context.provider as Web3Provider; // You may need to adjust this line
  const [chainId, setChainId] = useState<number | undefined>();

  useEffect(() => {
    if (library) {
      library
        .getNetwork()
        .then((network: any) => setChainId(network.chainId))
        .catch((error: any) => console.error(error));

      library.on('networkChanged', (newChainId: number) => {
        setChainId(newChainId);
      });

      return () => {
        library.removeAllListeners('networkChanged');
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}; // Adding a no-op return function
    }
  }, [library]);

  return chainId;
};

export default useNetworkChange;



