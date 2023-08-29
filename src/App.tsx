import { Buffer } from "buffer";

import { Layout } from "antd";
import background from "assets/images/background.png";
import backgroundImage from "assets/images/background_image1.png";
import DisplayPane from "components/displayPane/DisplayPane";
import { CustomHeader, MainContent, CustomFooter } from "layout";
import "styles/App.css";
// eslint-disable-next-line import/order
import { useWeb3React } from "@web3-react/core";
import loadingSpinner from "assets/images/acorn_spinner.gif"; // Your loading spinner
import { useState, useLayoutEffect } from "react";


const styles = {
  layout: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "repeat-y",  // Repeat vertically
    backgroundAttachment: "fixed",  // Should fix it on the page
    width: "100vw",
    height: "100vh",
    minHeight: "100vh", // But at least fill the viewport
    overflow: "auto",
    fontFamily: "Sora, sans-serif"
  },
  loadingScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    background: '#000509',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initialLoadingScreen: {
    background: '#000509', // or a color similar to the final state or an initial loading image
  }
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;
  const { isActive } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerSrc, setSpinnerSrc] = useState(loadingSpinner); // New state to hold src

  useLayoutEffect(() => {
    setIsLoading(true);

    // Manipulate src to force reload and restart animation
    setSpinnerSrc(`${loadingSpinner}?${new Date().getTime()}`);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isActive]);

  const backgroundStyle = isActive ? {} : {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-y', // Repeat vertically
  backgroundAttachment: 'fixed' // Fixed background
  };

  return (
    <>
      {isLoading && (
        <div style={styles.loadingScreen}>
          <img src={spinnerSrc} alt="Loading..." />
        </div>
      )}
      <Layout style={{ ...styles.layout, ...backgroundStyle }}>
        <CustomHeader />
        <MainContent>
          <DisplayPane />
        </MainContent>
        <CustomFooter />
      </Layout>
    </>
  );
}

export default App;


