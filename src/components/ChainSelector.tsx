import { FC, useEffect, useMemo, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import Arbitrum_Logo from "assets/images/arbitrum_logo.svg";
//import Avalanche_Logo from "assets/images/avalanche_logo.png";
//import ethereum_Logo from "assets/images/ethereum_Logo.png";
import base_Logo from "assets/images/base_logo.svg";
import Fantom_Logo from "assets/images/fantom_logo.svg";
import zksync_Logo from "assets/images/zksync_Logo.png";
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
      //{ label: "Ethereum", key: chainIds.ethereum, icon: labelToShow(ethereum_Logo, "ethereum_logo") },
      { label: "zkSync Era", key: chainIds.zkSync, icon: labelToShow(zksync_Logo, "zksync_Logo") },
      { label: "Arbitrum", key: chainIds.arbitrum, icon: labelToShow(Arbitrum_Logo, "Arbitrum_logo") },
      { label: "Fantom", key: chainIds.fantom, icon: labelToShow(Fantom_Logo, "Fantom_logo") },
      { label: "Base", key: chainIds.base, icon: labelToShow(base_Logo, "base_Logo") },
      //{ label: "Avalanche", key: chainIds.avalanche, icon: labelToShow(Avalanche_Logo, "Avalanche_logo") },
    ],
    []
  );

  useEffect(() => {
    if (!chainId) return;

    let selectedLabel;
    let recognized = true;

     //if (chainId === 1 || chainId === 5) {
       //selectedLabel = labelToShow(ethereum_Logo, "Ethereum_logo");
     //}
    if (chainId === 42161 || chainId === 421611) {
      selectedLabel = labelToShow(Arbitrum_Logo, "Arbitrum_logo");
    } else if (chainId === 250 || chainId === 0xfa2) {
      selectedLabel = labelToShow(Fantom_Logo, "Fantom_logo");
    }
      else if (chainId === 280 || chainId === 324) {
      selectedLabel = labelToShow(zksync_Logo, "zksync_Logo");
    }
    else if (chainId === 8453) {
      selectedLabel = labelToShow(base_Logo, "base_Logo");
    }
     //else if (chainId === 43114 || chainId === 43113) {
       //selectedLabel = labelToShow(Avalanche_Logo, "Avalanche_logo");
     //}
    else {
      recognized = false;
    }

    setIsChainRecognized(recognized);
    setLabel(selectedLabel);
    setSelected(items.find((item) => item?.key === chainId.toString()));
  }, [chainId]);

  //Made Arbitrum the default network
  if (!isChainRecognized) {
    switchChain(Number(chainIds.arbitrum)).catch((error) => {
      console.error(`Failed to switch to default chain: ${error}`);
    });
  }

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
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && isMobile ? (
            <div style={{ display: "flex", alignItems: "center", minWidth: "25px" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", minWidth: "100px" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
              {/* @ts-expect-error title is a valid object*/}
              <span style={{ marginRight: "10px" }}>{selected?.label}</span>
            </div>
          )}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ChainSelector;


