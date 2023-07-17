import { Web3ReactHooks, useWeb3React } from "@web3-react/core";
import styled from 'styled-components';

import { CHAINS } from "data/networks";
import { useNativeBalance, useWindowWidthAndHeight } from "hooks";
import { getEllipsisTxt, parseBigNumberToFloat } from "utils/formatters";

const InfoDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  font-size: 0.8em;
`;

const StatusText = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 800;
`;

const InfoTitle = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  margin-right: 8px;
`;

interface InfosProps {
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
}

const Infos: React.FC<InfosProps> = ({ chainId }) => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const { isMobile } = useWindowWidthAndHeight();

  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;
  const displayAddress = isMobile && account ? getEllipsisTxt(account, 4) : account;
  const displayBalance = balance ? `Ξ ${parseBigNumberToFloat(balance).toFixed(4)}` : 0;

  return (
    <InfoDisplay>
      <div><InfoTitle>Address:</InfoTitle> <StatusText>{displayAddress}</StatusText></div>
      {name ? (
        <div>
          <InfoTitle>Chain:</InfoTitle> <StatusText>{name} ({chainId})</StatusText>
        </div>
      ) : (
        <div><InfoTitle>Chain Id:</InfoTitle> <StatusText>{chainId}</StatusText></div>
      )}
      <div><InfoTitle>Balance:</InfoTitle> <StatusText>{displayBalance}</StatusText></div>
    </InfoDisplay>
  );
};

export default Infos;

