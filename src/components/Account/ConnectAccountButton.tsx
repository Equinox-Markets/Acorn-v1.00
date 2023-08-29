import React, { useCallback, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
import { metaMask } from "connectors/metaMask";
import { walletConnect } from "connectors/walletConnect";
//import { chainIds } from 'data/chainIds';
//import { useSwitchChain } from "hooks";
import { theme } from "styles/theme";
import { getEllipsisTxt } from "utils/formatters";

import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";
import Jazzicons from "../Jazzicons";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#011F37",
    cursor: "pointer"
  },
  button: {
    height: "60px", // Increased height
    padding: "0 30px", // Increased padding
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.2px",
    fontSize: "20px", // Increased font size
    margin: "20px 20px",
    border: "none",
    background: "#011F37",
    color: theme.colors.white,
  },
  text: {
    color: theme.colors.white
  },
  modalTitle: {
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px"
  }
} as const;


interface WantedChain {
  chain?: number;
}

const ConnectAccountButton: React.FC<WantedChain> = () => {
  const { account } = useWeb3React();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const disconnect = useCallback(async () => {
    const connector = metaMask || walletConnect;
    setIsModalVisible(false);
    setIsAuthModalOpen(false);
    localStorage.removeItem("connectorId");
    if (connector.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      await connector.close();
    }
  }, []);

  return (
    <>
      {account === undefined ? (
        <div>
          <Button shape="round" type="primary" style={styles.button} onClick={() => setIsAuthModalOpen(true)}>
            Connect Wallet
          </Button>
          <ConnectModal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen} />
          <br />
        </div>
      ) : (
        <>
          <div style={styles.account} onClick={() => setIsModalVisible(true)}>
            {account && typeof account === "string" && (
              <p style={{ marginRight: "5px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>
            )}
            <Jazzicons seed={account} />
          </div>

          <DisconnectModal isModalOpen={isModalVisible} setIsModalOpen={setIsModalVisible} disconnect={disconnect} />
        </>
      )}
    </>
  );
};

export default ConnectAccountButton;
