import { FC } from "react";
import { Layout } from "antd";
import DiscordIcon from 'assets/images/Discord-icon.svg';
import GitbookIcon from 'assets/images/Docs-icon.svg';
import TwitterIcon from 'assets/images/Twitter-ico.svg';
import './Footer.css';

const { Footer } = Layout;

const CustomFooter: FC = () => {
  return (
    <Footer style={styles.footer}>
      <div className="footer-grid">
        <div className="footer-text">
          &copy; Acorn Finance, All Rights Reserved.
        </div>
        <div className="icon-container">
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
            href="https://discord.gg/AJreE8wxY9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={DiscordIcon} alt="Discord" style={iconStyles} />
          </a>
        </div>
      </div>
    </Footer>
  );
}

// Styles

const styles = {
  footer: {
    position: "fixed",
    color: '#636B8F',
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