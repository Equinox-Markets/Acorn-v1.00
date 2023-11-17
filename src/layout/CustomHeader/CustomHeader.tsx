import { FC, CSSProperties, useState } from "react";

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
  const [glow, setGlow] = useState<string | null>(null);  // State to keep track of which item is glowing


 const glowStyle: CSSProperties = {
    textDecoration: 'underline',
    textShadow: `0 0 10px #064576, 0 0 20px #064576, 0 0 30px #064576`,
  };

  const handleMouseOver = (item: string) => setGlow(item);
  const handleMouseOut = () => setGlow(null);

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

  // Dropdown menu
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/"
           style={glow === 'Home' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Home')}
           onMouseOut={handleMouseOut}>
           Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#"
           style={glow === 'Vaults' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Vaults')}
           onMouseOut={handleMouseOut}
           onClick={() => { handleLinkClick('vaults'); setCurrentDisplay('Vaults'); }}>
           Vaults
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#"
           style={glow === 'Bridge' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Bridge')}
           onMouseOut={handleMouseOut}
           onClick={() => { handleLinkClick('bridge'); setCurrentDisplay('Bridge'); }}>
           Bridge
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#"
           style={glow === 'Mint' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Mint')}
           onMouseOut={handleMouseOut}
           onClick={() => { handleLinkClick('mint'); setCurrentDisplay('Mint'); }}>
           Mint
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#"
           style={glow === 'Stake' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Stake')}
           onMouseOut={handleMouseOut}
           onClick={() => { handleLinkClick('stake'); setCurrentDisplay('Stake'); }}>
            Stake
          </a>
      </Menu.Item>
      {/*<Menu.Item>
        <a href="#"
           style={glow === 'Dashboard' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Dashboard')}
           onMouseOut={handleMouseOut}
           onClick={() => { handleLinkClick('dashboard'); setCurrentDisplay('Dashboard'); }}>
            Dashboard
          </a>
  </Menu.Item>*/}
      <Menu.Item>
        <a href="https://acorn-finance.gitbook.io/acorn-docs/" target="_blank" rel="noopener noreferrer"
           style={glow === 'Docs' ? glowStyle : {}}
           onMouseOver={() => handleMouseOver('Docs')}
           onMouseOut={handleMouseOut}>
           Docs
        </a>
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
              <a href="/" style={glow === 'Home' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Home')}
                 onMouseOut={handleMouseOut}>Home</a>
              <a href="#" style={glow === 'Vaults' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Vaults')}
                 onMouseOut={handleMouseOut}
                 onClick={() => { handleLinkClick('vaults'); setCurrentDisplay('Vaults'); }}>Vaults</a>
              <a href="#" style={glow === 'Bridge' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Bridge')}
                 onMouseOut={handleMouseOut}
                 onClick={() => { handleLinkClick('bridge'); setCurrentDisplay('Bridge'); }}>Bridge</a>
              <a href="#" style={glow === 'Mint' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Mint')}
                 onMouseOut={handleMouseOut}
                onClick={() => { handleLinkClick('mint'); setCurrentDisplay('Mint'); }}>Mint</a>
              <a href="#" style={glow === 'Stake' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Stake')}
                 onMouseOut={handleMouseOut}
                 onClick={() => { handleLinkClick('stake'); setCurrentDisplay('Stake'); }}>Stake</a>
              {/*<a href="#" style={glow === 'Dashboard' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Dashboard')}
                 onMouseOut={handleMouseOut}
          onClick={() => { handleLinkClick('dashboard'); setCurrentDisplay('Dashboard'); }}>Dashboard</a>*/}
              <a href="https://acorn-finance.gitbook.io/acorn-docs/" style={glow === 'Docs' ? { ...menuLinkStyle, ...glowStyle } : menuLinkStyle}
                 onMouseOver={() => handleMouseOver('Docs')}
                 onMouseOut={handleMouseOut}
                 target="_blank" rel="noopener noreferrer">Docs</a>
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

