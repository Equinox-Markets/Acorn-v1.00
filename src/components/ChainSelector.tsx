import { FC, useEffect, useMemo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

import Arbitrum_Logo from "assets/images/arbitrum_logo.svg";
// import Avalanche_Logo from "assets/images/avalanche_logo.png";
// import ethereum_Logo from "assets/images/ethereum_Logo.png";
import Fantom_Logo from "assets/images/fantom_logo.svg";
import { chainIds } from "data/chainIds";
import { useSwitchChain, useWindowWidthAndHeight } from "hooks";

const styles = {
  item: {
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    color: "white"
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "0",
    borderRadius: "10px",
    backgroundColor: "#011F37",
  }
};

type MenuItem = Required<MenuProps>["items"][number];

const ChainSelector: FC = () => {
  const { chainId, isActive } = useWeb3React();
  const switchChain = useSwitchChain();
  const [selected, setSelected] = useState<MenuItem | undefined>();
  const [label, setLabel] = useState<JSX.Element>();
  const [isChainRecognized, setIsChainRecognized] = useState(true);
  const { isMobile } = useWindowWidthAndHeight();

  const labelToShow = (logo: string, alt: string) => {
    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <img src={logo} alt={alt} style={{ width: "25px", height: "25px", borderRadius: "10px", marginRight: "5px" }} />
      </div>
    );
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      { label: "Arbitrum", key: chainIds.arbitrum, icon: labelToShow(Arbitrum_Logo, "Arbitrum_logo") },
      { label: "Fantom", key: chainIds.fantom, icon: labelToShow(Fantom_Logo, "Fantom_logo") },
    ],
    []
  );

  useEffect(() => {
    if (!chainId) return;

    let selectedLabel;
    let recognized = true;

    // if (chainId === 1 || chainId === 5) {
    //   selectedLabel = labelToShow(ethereum_Logo, "Ethereum_logo");
    // }
    if (chainId === 42161 || chainId === 421611) {
      selectedLabel = labelToShow(Arbitrum_Logo, "Arbitrum_logo");
    } else if (chainId === 250 || chainId === 0xfa2) {
      selectedLabel = labelToShow(Fantom_Logo, "Fantom_logo");
    }
    // else if (chainId === 43114 || chainId === 43113) {
    //   selectedLabel = labelToShow(Avalanche_Logo, "Avalanche_logo");
    // }
    else {
      recognized = false;
    }

    setIsChainRecognized(recognized);
    setLabel(selectedLabel);
    setSelected(items.find((item) => item?.key === chainId.toString()));
  }, [chainId]);

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    await switchChain(Number(key)).catch((error) => {
      console.error(`"Failed to switch chains: " ${error}`);
    });
  };

  if (!chainId || !isActive) return null;

  return (
    <div>
      <Dropdown menu={{ items, onClick }}>
        <Button style={{ ...styles.button, ...styles.item }}>
          {isChainRecognized ? (
            <div style={{ display: "flex", alignItems: "center", minWidth: isMobile ? "25px" : "100px" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
              <span style={{ marginRight: "10px" }}>{(selected as any)?.label}</span>
            </div>
          ) : (
            <span style={{ color: 'red' }}>Wrong Network!</span>
          )}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ChainSelector;


