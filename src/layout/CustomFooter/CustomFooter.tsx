import { FC } from "react";

import { Layout } from "antd";

import { theme } from "styles/theme";

const { Footer } = Layout;

const styles = {
  footer: {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    color: theme.colors.white,
    backgroundColor: "transparent"
  }
} as const;

const CustomFooter: FC = () => {
  return (
    <Footer style={styles.footer}>

    </Footer>
  );
};

export default CustomFooter;
