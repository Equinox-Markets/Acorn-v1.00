import { FC, CSSProperties } from "react";

import { MenuOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Layout, Menu, Dropdown, Button } from "antd";
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

interface CustomHeaderProps {
  setCurrentDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const CustomHeader: FC<CustomHeaderProps> = ({ setCurrentDisplay }) => {
  const { isMobile } = useWindowWidthAndHeight();
  const { isActive } = useWeb3React();

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

  const menuLinkStyle: CSSProperties = {
    marginRight: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: "white"
  };

  const menuButtonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "0",
    borderRadius: "10px",
    backgroundColor: "#011F37",
    color: "white"
  };

  const menu = (
    <Menu>
      <Menu.Item>
      <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
      <a href="#" onClick={() => { handleLinkClick('vaults'); setCurrentDisplay('Vaults'); }}>Vaults</a>
      </Menu.Item>
      <Menu.Item>
      <a href="#" onClick={() => { handleLinkClick('swap'); setCurrentDisplay('Swap'); }}>Swap</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://acorn-finance.gitbook.io/acorn-docs/" target="_blank" rel="noopener noreferrer">Docs</a>
      </Menu.Item>
    </Menu>
  );

  const handleLinkClick = (path: string) => {
    window.history.pushState({}, '', path);
  }

  return (
    <Header style={{ ...styles.header, paddingTop: isMobile ? '10px' : '30px' }}>
      <Logo style={logoStyle} />
      <div style={headerRightStyle}>
      {isActive && (
          isMobile ? (
            <Dropdown overlay={menu}>
              <Button style={menuButtonStyle}>
                <MenuOutlined />
              </Button>
            </Dropdown>
          ) : (
            <div style={{ flex: 1, textAlign: 'center' }}>
              <a href="/" style={menuLinkStyle}>Home</a>
              <a href="#" style={menuLinkStyle} onClick={() => { handleLinkClick('vaults'); setCurrentDisplay('Vaults'); }}>Vaults</a>
              <a href="#" style={menuLinkStyle} onClick={() => { handleLinkClick('swap'); setCurrentDisplay('Swap'); }}>Swap</a>
              <a href="https://acorn-finance.gitbook.io/acorn-docs/" style={menuLinkStyle} target="_blank" rel="noopener noreferrer">Docs</a>
            </div>
          )
        )}
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
      <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width={isMobile ? "190px" : "190px"} />
    </div>
  );
};

