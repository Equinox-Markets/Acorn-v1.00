import { FC } from "react";

import { GithubOutlined, TwitterOutlined, MediumOutlined } from '@ant-design/icons';
import { Layout } from "antd";


const { Footer } = Layout;


const CustomFooter: FC = () => {

  return (
    <Footer style={styles.footer}>

      <a href="https://docs.com" style={docsLinkStyles}>
        Docs
      </a>

      <TwitterOutlined style={iconStyles}/>

      <GithubOutlined style={iconStyles} />

      <MediumOutlined style={iconStyles}/>

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
    justifyContent: "center",  // Centers the items horizontally
    bottom: "0",
    width: "100%",
    backgroundColor: "#000509",
    padding: "10px 20px",
    paddingBottom: "15px",  // Adds some padding at the bottom
    zIndex: 1
  }
} as const;

const iconStyles = {
  fontSize: '1.4em',
  margin: '0 10px'
}

const docsLinkStyles = {
  color: '#ffffff',
  margin: '0 10px'
}

export default CustomFooter;