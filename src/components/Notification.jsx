import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, description) => {
    api[type]({
      message: title ? title : "Notification",
      description: description ? description : null,
      duration: 2,
    });
  };

  return { openNotification, contextHolder };
};

export default useNotification;
