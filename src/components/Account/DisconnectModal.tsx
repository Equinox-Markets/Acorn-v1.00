import { SelectOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Button, Card, Modal } from "antd";
import { getExplorer } from "data/networks";

import Address from "./Address";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disconnect: () => Promise<void>;
}

const DisconnectModal: React.FC<ConnectModalProps> = ({ isModalOpen, setIsModalOpen, disconnect }) => {
  const { account, chainId } = useWeb3React();

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      wrapClassName="custom-modal"
      onCancel={() => setIsModalOpen(false)}
      bodyStyle={{
        width: "350px",
        padding: "10px",
        fontSize: "17px",
        fontWeight: "500",
        color: "white",
      }}
    >
      Account
      <Card
        style={{
          marginTop: "10px",
          borderRadius: "10px",
          backgroundColor: "#011F37", // Change card background color to #011F37
          border: "0px solid #064576" // Change card border color to #064576
        }}
        bodyStyle={{ padding: "15px", color: "white" }} // Change card body text color to white
      >
        <Address avatar="left" size={6} copyable style={{ fontSize: "20px", color: "white" }} />
        <div style={{ marginTop: "10px", padding: "0 10px" }}>
          {chainId !== undefined && (
            <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer" style={{ color: "white" }}> {/* Change link text color to white */}
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          )}
        </div>
      </Card>
            <Button
        className="hover-shadow-button no-hover-shadow"
        size="large"
        type="primary"
        onClick={() => disconnect()}
      >
        Disconnect Wallet
      </Button>
    </Modal>
  );
};

export default DisconnectModal;

