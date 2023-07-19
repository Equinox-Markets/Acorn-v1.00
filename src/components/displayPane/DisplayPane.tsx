import { useWeb3React } from "@web3-react/core";
import { Divider } from "antd";

import { useWindowWidthAndHeight } from "hooks";


import { Status, VaultList } from "./components";


const styles = {
  container: {
    background: "#000000)",
    width: "80%",
    minWidth: "330px",
    maxWidth: "900px",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "10px",
    boxShadow: "0px 12px 18px -6px rgba(0, 0, 0, 0.3)"
  },
  title: {
    color: "#ffffff",
    fontWeight: 600,
    fontFamily: "'Roboto', sans-serif",
    fontSize: "32px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "17px",
    color: "#ffffff"
  },
  action: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }
} as const;

const DisplayPane: React.FC = () => {
  const { isActivating, isActive } = useWeb3React();
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Deposit into a Vault and Start Earning</div>
      <div style={styles.content}> Each Vault is auto-compounding and utilizes specific strategies designed for maximum yield
        <Status isActivating={isActivating} isActive={isActive} />

        {isActive && (
          <>
            <Divider />
            <div style={styles.action}>
              <VaultList />
              {!isMobile && <Divider type="vertical" style={{ fontSize: "120px !important" }} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayPane;