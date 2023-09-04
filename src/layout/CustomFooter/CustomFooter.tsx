import  { FC } from "react";

import { Layout } from "antd";
import DiscordIcon from 'assets/images/discord.svg';
import GitbookIcon from 'assets/images/gitbook.svg';
import TwitterIcon from 'assets/images/twitter.svg';

const { Footer } = Layout;

const CustomFooter: FC = () => {
  return (
    <Footer style={styles.footer}>

      <a
        href="https://acorn-finance.gitbook.io/acorn-docs/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GitbookIcon} alt="Docs" style={iconStyles} />
      </a>

      <a
        href="https://twitter.com/AcornFinanceio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={TwitterIcon} alt="Twitter" style={iconStyles} />
      </a>

      <a
        href="https://discord.gg/F8AQJ35j"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={DiscordIcon} alt="Discord" style={iconStyles} /> {/* Use the imported Discord SVG as an image */}
      </a>

    </Footer>
  );
}

// Styles

const styles = {
  footer: {
    position: "fixed",
    color: '#ffffff',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: "0",
    width: "100%",
    backgroundColor: "#000509",
    padding: "10px 20px",
    paddingBottom: "15px",
  }
} as const;

const iconStyles = {
  fontSize: '1.6em',
  margin: '0 10px',
  width: '26px',
  height: '26px'
};

export default CustomFooter;