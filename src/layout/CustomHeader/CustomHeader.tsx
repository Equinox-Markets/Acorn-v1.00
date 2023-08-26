import { FC, CSSProperties } from "react";
import { Layout } from "antd";

import web3Boilerplate_logo from "assets/images/web3Boilerplate_logo.svg";
import ConnectAccount from "components/Account/ConnectAccount";
import ChainSelector from "components/ChainSelector";
import { useWindowWidthAndHeight } from "hooks";

const { Header } = Layout;

const styles = {
  header: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    padding: "0px 20px",
    zIndex: 1
  }
} as const;

const CustomHeader: FC = () => {
  const { isMobile } = useWindowWidthAndHeight();

  const headerRightStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: isMobile ? "10px" : "90px",  // Conditionally set right padding
    paddingLeft: isMobile ? "0px" : "90px",  // Conditionally set left padding
    fontSize: "15px",
    fontWeight: 600,
    marginTop: isMobile ? "10px" : "30px", // Set margin conditionally
  };

  const logoStyle: CSSProperties = {
    paddingTop: isMobile ? "30px" : "45px",
    paddingLeft: isMobile ? "0px" : "90px",  // Conditionally set left margin
    paddingRight: isMobile ? "0px" : "90px",  // Conditionally set right margin
  };

  return (
    <Header style={{ ...styles.header, paddingTop: isMobile ? "10px" : "30px" }}>
      <Logo style={logoStyle} />
      <div style={headerRightStyle}>
        <ChainSelector />
        <ConnectAccount />
      </div>
    </Header>
  );
};

export default CustomHeader;

export const Logo: React.FC<{ style: CSSProperties }> = ({ style }) => {
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <div style={style}>
      <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width={isMobile ? "140px" : "190px"} />
    </div>
  );
};


