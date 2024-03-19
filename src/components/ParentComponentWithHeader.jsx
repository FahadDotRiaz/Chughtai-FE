import { Layout, Button, Modal } from "antd";
import { CustomHeader } from "./Header";
import PropTypes from "prop-types";
import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import { PATH } from "../../config";
import { useState } from "react";
import IMAGES from "../assets/images";
import ChatBot from "./ChatBot";
import Draggable from "react-draggable";

export const ParentComponentWithHeader = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const location = useLocation();
  return (
    <Layout>
      <CustomHeader />
      <Content
        style={{
          padding: location.pathname === PATH.CHATS ? "0" : "25px 50px",
        }}
      >
        <Draggable axis="y">
          <Button
            className="button-float"
            onClick={showModal}
            size="large"
            icon={<img src={IMAGES.CHAT_BOT_ICON} />}
          >
            Inventory Bot
          </Button>
        </Draggable>

        <Modal
          open={isModalOpen}
          footer={null}
          closable={false}
          className="chatBot-modal"
        >
          <ChatBot handleCancel={handleCancel} />
        </Modal>
        {children}
      </Content>
    </Layout>
  );
};

ParentComponentWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
