import { Buffer } from "buffer";

import { Layout } from "antd";
import background from "assets/images/background.png";
import backgroundImage from "assets/images/background_image.png";
import DisplayPane from "components/displayPane/DisplayPane";
import { CustomHeader, MainContent, CustomFooter } from "layout";
import "styles/App.css";
// eslint-disable-next-line import/order
import { useWeb3React } from "@web3-react/core";

const styles = {
  layout: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    fontFamily: "Sora, sans-serif"
  }
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;
  const { isActive } = useWeb3React();

  const backgroundStyle = isActive ? {} : {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <Layout style={{ ...styles.layout, ...backgroundStyle }}>
      <CustomHeader />

      <MainContent>
        <DisplayPane />
      </MainContent>

      <CustomFooter />
    </Layout>
  );
}

export default App;
