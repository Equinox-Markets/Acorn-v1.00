import { useWeb3React } from "@web3-react/core";
import { Divider } from "antd";
import { useWindowWidthAndHeight } from "hooks";
import { VaultList } from "./components";
//import AcornInfo from "./components/AcornInfo";
import AcornCard from "./components/AcornCard";
import AcornCardWidget from "./components/AcornCardWidget";
import FAQ from "./components/FAQ";
import HomePage from "./components/HomePage";
import WidgetPage from "./components/WidgetPage";
import MintNFT from "./components/MintNFT";
import StakingNFT from "./components/StakingNFT";
import StakeList from "./components/StakeList";
import AcornStakeInfo from "./components/AcornStakeInfo";
import AcornNFTInfo from "./components/AcornNFTInfo";

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
  },
  homePageStyles: {
    background: "transparent",
    width: "90%",
    minWidth: "330px",
    maxWidth: "1500px",
    // Add other styles as needed
  },
} as const;

const DisplayPane: React.FC<{ currentDisplay: string }> = ({ currentDisplay }) => {
  const { isActive, chainId } = useWeb3React();
  const { isMobile } = useWindowWidthAndHeight();

  const vaultStyle = isMobile ? { ...styles.vaultcontent, ...styles.vaultcontentSmall } : styles.vaultcontent;

  return (
    <div style={isActive ? styles.container : styles.homePageStyles}>
      {!isActive ? <HomePage /> : null}
      <div style={styles.content}>
        <div style={vaultStyle}>
          {isActive && (
            <>
              {currentDisplay === 'Vaults' ? <AcornCard /> : null}
              {currentDisplay === 'Vaults' ? <VaultList key={chainId} /> : null}
              {currentDisplay === 'Vaults' ? <FAQ /> : null}
              {currentDisplay === 'Bridge' ? <AcornCardWidget /> : null}
              {currentDisplay === 'Bridge' ? <WidgetPage /> : null}
              {currentDisplay === 'Mint' ? <MintNFT /> : null}
              {currentDisplay === 'Stake' ? <AcornStakeInfo /> : null}
              {currentDisplay === 'Stake' ? <StakeList /> : null}
              {currentDisplay === 'Stake' ? <AcornNFTInfo /> : null}
              {currentDisplay === 'Stake' ? <StakingNFT /> : null}
              {currentDisplay === '' && <AcornCard/>}
              {currentDisplay === '' && <VaultList key={chainId} />}
              {currentDisplay === '' && <FAQ/>}
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