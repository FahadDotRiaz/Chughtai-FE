/* eslint-disable no-debugger */
import { Badge, Space, Dropdown } from "antd";
import IMAGES from "../assets/images";
import { RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLazyGetNotificationListByIdQuery } from "../redux/slices/notification";
import { useSelector } from "react-redux";
// import { getFormattedDateTime } from "../utils/helper";
import { onMessageListener } from "../../firebase";
import { isString } from "highcharts";

const NotificationDropdown = () => {
  const [notificationItems, setNotificationItems] = useState([]);
  const [notificationList, setNotificationList] = useState({
    totalRows: 0,
    list: [],
  });
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
  });
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const [getNotificationList, { data: allNotification = [] }] =
    useLazyGetNotificationListByIdQuery();
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await getNotificationList({
          tableOptions,
          userId,
        });
        setNotificationList((prev) => {
          const uniqueItems =
            response?.data?.list.filter(
              (item) => !prev.list.some((prevItem) => prevItem.id === item.id)
            ) || [];
          const newList = [...prev.list, ...uniqueItems];

          return {
            totalRows: response?.data?.totalRows,
            list: newList,
          };
        });
      };

      fetchData();
    }
  }, [getNotificationList, tableOptions, tableOptions.filters, userId]);
  // useEffect(() => {
  //   getTokenFunc();
  // }, []);

  const handleNotification = async () => {
    try {
      const payload = await onMessageListener();
      if (payload?.data) {
        setNotificationList((prevList) => {
          const newNotification = {
            date: payload.data.date,
            message: payload.data.message,
          };
          const newList = [
            { payload: JSON.stringify(newNotification) },
            ...prevList.list,
          ];
          return {
            ...prevList,
            list: newList,
            totalRows: prevList.totalRows + 1,
          };
        });
      }
    } catch (err) {
      console.log("failed: ", err);
    }
  };

  handleNotification();

  const loadMoreNotifications = () => {
    if (notificationItems?.length < notificationList?.totalRows) {
      setTableOptions((prevOptions) => ({
        ...prevOptions,
        pagination: {
          ...prevOptions.pagination,
          pageIndex: prevOptions.pagination.pageIndex + 1,
        },
      }));
    }
  };
  useEffect(() => {
    if (notificationList?.list?.length > 0) {
      const mappedItems = notificationList.list.map((item, index) => {
        const payloadObj = isString(item.payload)
          ? JSON.parse(item.payload)
          : item.payload;

        return {
          label: (
            <Space className="flex items-center justify-between" key={index}>
              {/* <Avatar size="large" src={item.img} /> */}
              <div>
                {/* <div className="text-black font-[500] text-sm">{item.name}</div> */}
                <div className="text-xs text-[#5A6474]">
                  {payloadObj.message}
                </div>
                <small className="text-[#5A6474] text-[10px]">
                  {payloadObj.date}
                </small>
              </div>
              <Space>
                <Badge
                  status="error"
                  dot
                  text={<RightOutlined />}
                  className="flex items-center"
                />
              </Space>
            </Space>
          ),
          key: index,
          id: item.id,
        };
      });
      // setNotificationItems((prev) => {
      //   const uniqueItems = mappedItems.filter(
      //     (item) => !prev.some((prevItem) => prevItem.id === item.id)
      //   );
      //   return [...uniqueItems, ...prev];
      // });
      setNotificationItems(mappedItems);
    }
  }, [notificationList]);
  return (
    <Space className="notify-icon">
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <div className="font-medium text-lg py-2">Notifications</div>
              ),
              key: "Header",
            },
            { type: "divider" },
            ...notificationItems,
            ...(notificationItems?.length < notificationList?.totalRows
              ? [
                  {
                    label: (
                      <Space className="flex justify-center">
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            loadMoreNotifications();
                          }}
                        >
                          Load more
                        </div>
                      </Space>
                    ),
                    key: "load-more",
                  },
                ]
              : []),
          ],
          style: { maxHeight: "600px", overflow: "auto" },
        }}
        trigger={["click"]}
        overlayStyle={{ width: "370px" }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Badge count={1} size="small" className="notify-badge">
            <img
              src={IMAGES.NOTIFY_ICON}
              alt="Chughtai-logo"
              className="w-[75%]"
            />
          </Badge>
        </a>
      </Dropdown>
    </Space>
  );
};

export default NotificationDropdown;
