import { FC, CSSProperties, useState } from "react";
import { Layout } from "antd";

import web3Boilerplate_logo from "assets/images/web3Boilerplate_logo.svg";
import ConnectAccount from "components/Account/ConnectAccount";
import ChainSelector from "components/ChainSelector";
import { useWindowWidthAndHeight } from "hooks";
import { FiMenu } from 'react-icons/fi';
import './CustomHeader.css';

const { Header } = Layout;

const CustomHeader: FC<{ onMenuClick: (key: string) => void }> = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <Header>
      <Logo />

      <button onClick={() => setOpen(!open)} className="menu-button">
        <FiMenu />
      </button>

      <div className="header-right">
        {open && (
          <div className="navbar">
            <a href="#" onClick={() => onMenuClick('Home')}>Home</a>
            <a href="#" onClick={() => onMenuClick('Vaults')}>Vaults</a>
            <a href="#" onClick={() => onMenuClick('Convert')}>Convert</a>
          </div>
        )}

        <ChainSelector />
        <ConnectAccount />
      </div>
    </Header>
  );
};

export default CustomHeader;

export const Logo: React.FC = () => {
  const { isMobile } = useWindowWidthAndHeight();

  const logoStyle: CSSProperties = {
    paddingTop: isMobile ? "30px" : "45px",
    paddingLeft: isMobile ? "0px" : "90px",  // Conditionally set left margin
    paddingRight: isMobile ? "0px" : "90px",  // Conditionally set right margin
  };

  return (
    <div style={logoStyle}>
      <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width={isMobile ? "140px" : "190px"} />
    </div>
  );
};


