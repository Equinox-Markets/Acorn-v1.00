import { useWeb3React } from "@web3-react/core";
import { Divider } from "antd";
import { useWindowWidthAndHeight } from "hooks";
import { VaultList } from "./components";
import AcornInfo from "./components/AcornInfo";
import AcornCard from "./components/AcornCard";
import WidgetPage from "./components/WidgetPage";

const styles = {
  container: {
    background: "transparent",
    width: "100%",
    minWidth: "330px",
    maxWidth: "1000px",
    margin: "auto",
    textAlign: "center",
    padding: "0px 0",
    borderRadius: "10px",
    marginTop: "0px",
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
    width: "87%",
    margin: "auto",
    fontSize: "17px",
    marginTop: "10px",
    color: "#ffffff"
  },
  vaultcontent: {
    width: "80%",
    margin: "auto",
    fontSize: "18px",
    color: "#ffffff"
  },
  vaultcontentSmall: {
    width: "100%",  // Increase width for smaller devices
    fontSize: "16px"  // Reduce font size for smaller devices
  },
  action: {
    background: "#000509",
    width: "100%",
    minWidth: "330px",
    maxWidth: "900px",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "10px",
    boxShadow: "0px 12px 18px -6px rgba(0, 0, 0, 0.3)"
  }
} as const;

const DisplayPane: React.FC<{ currentDisplay: string }> = ({ currentDisplay }) => {
  const { isActive, chainId } = useWeb3React();
  const { isMobile } = useWindowWidthAndHeight();

  const vaultStyle = isMobile ? { ...styles.vaultcontent, ...styles.vaultcontentSmall } : styles.vaultcontent;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {!isActive ? <AcornInfo /> : null}
        <div style={vaultStyle}>
          {isActive && (
            <>
              {currentDisplay === 'Vaults' ? <VaultList key={chainId} /> : null}
              {currentDisplay === 'AcornCard' ? <AcornCard /> : null}
              {currentDisplay === 'Swap' ? <WidgetPage /> : null}
              {currentDisplay === '' && <AcornCard />}
              {currentDisplay === '' && <VaultList key={chainId} />}
            </>
          )}
        </div>
        {isActive && (
          <>
            <Divider />
            <div style={styles.action}>
              {!isMobile && <Divider type="vertical" style={{ fontSize: "120px !important" }} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayPane;