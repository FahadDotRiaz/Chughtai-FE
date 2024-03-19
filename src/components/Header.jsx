/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Avatar, Layout, Space, Typography, Dropdown, Tooltip } from "antd";
import IMAGES from "../assets/images";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../config";
import { NavbarWithScroll } from "./NavbarWithScroll";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import { getActiveRole } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setPermissions } from "../redux/features/authSlice";
import { DEPARTMENT_TYPE, MAKEYS } from "../utils/constant";
import { useLogoutMutation, usePermissionsQuery } from "../redux/slices/auth";
import FullScreenLoader from "./FullScreenLoader";
import useNotification from "./Notification";

export const CustomHeader = () => {
  const [optionsList, setOptionsList] = useState({
    active: null,
    list: [],
  });
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;
  const { openNotification, contextHolder } = useNotification();

  
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [activeRole, setActiveRole] = useState(getActiveRole());
  const { Header } = Layout;
  const { Text } = Typography;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const { data = null, error = null } = await logout(userId);
    // localStorage.clear();
    if (!error) {
      localStorage.removeItem("user");
      window.location.href = "/";
    } else {
      openNotification("error", error?.message);
    }
  };
  const handleRoleChange = (role) => {
    setActiveRole(role);
    const obj = {
      ...user,
      activeRole: role,
    };
    localStorage.setItem("user", JSON.stringify(obj));
    dispatch(setCredentials(obj));
    window.location.reload();
  };

  const items = [
    user?.roles?.length && {
      key: "1",
      label: "Switch Roles",
      children: user?.roles?.map((role, index) => {
        return {
          key: `${index}ROLES`,
          label: (
            <div
              className="flex items-center gap-2"
              onClick={() => handleRoleChange(role)}
            >
              {`${role?.roleName} (${role?.departName})`}
              {activeRole?.roleId === role?.roleId && (
                <FaCheck fill="#2e3790" />
              )}
            </div>
          ),
        };
      }),
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: "0",
    },
  ];

  return (
    <>
      {contextHolder}
      <Header className="custom-header">
        <Space className="logo">
          <img src={IMAGES.LOGO} alt="Chughtai-logo" />
        </Space>
        <div className="menu-item">
          <HeaderMenuItem
            setOptionsList={setOptionsList}
            optionsList={optionsList}
          />
        </div>
        <Space className="h-full">
          <NotificationDropdown />
          <Space className="user-profile h-full">
            <Avatar size="large" icon={<UserOutlined />} />
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              // placement="bottomLeft"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="flex flex-col">
                    <Text>{user?.username || "Chugtai User"}</Text>
                    {user?.activeRole && (
                      <Tooltip
                        title={`${user?.activeRole?.roleName ?? "Role Name"} (${
                          user?.activeRole?.departName ?? "Department"
                        })`}
                        color="#9ea0a5"
                      >
                        <Text className="truncate max-w-[10rem]">
                          {user?.activeRole?.roleName ?? "Role Name"} (
                          {user?.activeRole?.departName ?? "Department"})
                        </Text>
                      </Tooltip>
                    )}
                  </div>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Space>
      </Header>

      <NavbarWithScroll optionsList={optionsList} />
    </>
  );
};

const HeaderMenuItem = ({ setOptionsList, optionsList }) => {
  const { user } = useSelector((state) => state.auth);
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = user?.activeRole?.roleId;
  const {
    data: permissions = {},
    isLoading,
    isSuccess,
  } = usePermissionsQuery(roleId);
  console.log("permissions", permissions, isLoading);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPermissions(permissions));
    }
  }, [isSuccess, permissions]);

  const handleClick = (item, key) => {
    if (!item.path) {
      const alreadyOpen = optionsList?.active === key;
      if (alreadyOpen) {
        setOptionsList({
          active: null,
          list: [],
        });
      } else {
        setOptionsList({
          active: key,
          list: item?.subMenu,
        });
      }
    } else {
      setOptionsList({
        active: null,
        list: [],
      });
      navigate(item.path);
    }
  };

	const IRF_SUBMENU = [
		{
			label: <Link to={PATH.MIR_GENERATE_LIST}>Generate</Link>,
			key: 0,
			show: permissions?.[MAKEYS.IRF_GENERATE] || false,
		},
		{
			label: <Link to={PATH.MIR_REVIEW_LIST}>Review</Link>,
			show: permissions?.[MAKEYS.IRF_REVIEW] || false,
			key: 1,
		},
		{
			label: <Link to={PATH.MIR_SMART_DEMAND}>Smart Demand</Link>,
			show: false,
			key: 2,
		},
		{
			label: <Link to={PATH.MIR_ISSUE_LIST}>Issue</Link>,
			show: permissions?.[MAKEYS.IRF_ISSUE] || false,
			key: 3,
		},
	];
	const IRR_SUBMENU = [
		{
			label: <Link to={PATH.MRR_GENERATE_LIST}>Generate</Link>,
			show: permissions?.[MAKEYS.IRR_GENERATE] || false,
			key: 0,
		},
		{
			label: <Link to={PATH.MRR_HOD_REVIEW_LIST}>Hod Review</Link>,
			show: permissions?.[MAKEYS.IRR_REVIEW] || false,
			key: 1,
		},
		{
			label: <Link to={PATH.MRR_STORE_REVIEW_LIST}>Store Review</Link>,
			show: permissions?.[MAKEYS.IRR_ISSUE] || false,
			key: 2,
		},
	];
	const CONSUMPTION_OPTIONS = [
		{
			label: <Link to={PATH.CONSUMPTION_LIST}>My Consumption</Link>,
			show: permissions?.[MAKEYS.CONSUMPTION_SELF] || false,
			key: 0,
		},
		{
			label: <Link to={PATH.CONSUMPTION_STORE}>Other Consumption</Link>,
			show: permissions?.[MAKEYS.CONSUMPTION_STORE] || false,
			key: 1,
		},
	];
	const GATE_PASS_OPTIONS = [
		{
			label: <Link to={PATH.IGP_LIST}>IGP</Link>,
			show: permissions?.[MAKEYS.IGP] || false,
			key: 0,
		},
		{
			label: <Link to={PATH.OGP_LIST}>OGP</Link>,
			show: permissions?.[MAKEYS.OGP] || false,
			key: 1,
		},
	];

  const GRN_OPTIONS = [
    {
      show: permissions?.[MAKEYS.GRN_GENERATE] || false,
      label: <Link to={PATH.GRN_GENERATE_LIST}>Generate</Link>,
      key: "0",
    },
    {
      show: permissions?.[MAKEYS.GRN_REVIEW] || false,
      label: <Link to={PATH.GRN_REVIEW_LIST}>Review</Link>,
      key: "2",
    },
  ];

  const INVENTORY_MANAGEMENT_OPTIONS = [
    {
      show: permissions?.[MAKEYS.INVENTORY_MANAGEMENT_DEPARTMENT] || false,
      label: <Link to={PATH.INVENTORY_DEPARTMENT_LIST}>Department</Link>,
      key: 0,
    },
    {
      show: permissions?.[MAKEYS.INVENTORY_MANAGEMENT_STORAGE] || false,
      label: <Link to={PATH.INVENTORY_STORAGE_LIST}>Storage</Link>,
      key: 1,
    },
  ];

  const INVENTORY_SUBMENU = [
    {
      id: "2.1",
      path: null,
      hasDropdown: true,
      show: permissions?.[MAKEYS.IRF] || false,
      type: "Inventory Requisition Form",
      subMenu: IRF_SUBMENU.filter((item) => item.show),
    },
    {
      id: "2.2",
      show: permissions?.[MAKEYS.IRR] || false,
      path: null,
      hasDropdown: true,
      type: "Inventory Return Request",
      subMenu: IRR_SUBMENU.filter((item) => item.show),
    },
    {
      id: "2.3",
      path: null,
      show: permissions?.[MAKEYS.INVENTORY_MANAGEMENT] || false,
      hasDropdown: true,
      type: "Inventory Management",
      subMenu: INVENTORY_MANAGEMENT_OPTIONS.filter((item) => item.show),
    },
    {
      id: "2.4",
      path: null,
      hasDropdown: true,
      show: permissions?.[MAKEYS.CONSUMPTION] || false,
      type: "Consumption",
      subMenu: CONSUMPTION_OPTIONS.filter((item) => item.show),
    },
    {
      id: "2.5",
      path: null,
      hasDropdown: true,
      show: permissions?.[MAKEYS.GATE_PASS] || false,
      type: "Gate Pass",
      subMenu: GATE_PASS_OPTIONS.filter((item) => item.show),
    },

    {
      id: "2.6",
      path: null,
      show: permissions?.[MAKEYS.GRN] || false,
      hasDropdown: true,
      type: "GRN",
      subMenu: GRN_OPTIONS.filter((item) => item.show),
    },
    {
      id: "2.7",
      path: PATH.PURCHASE_REQUISITION_LIST,
      show: true,
      hasDropdown: false,
      type: "Purchase Requisition",
    },
  ];
  const PROCUREMENT_SUBMENU = [
    {
      id: "3.1",
      path: PATH.DECLARATION_LIST,
      hasDropdown: false,
      type: "Declaration",
      show: true,
      subMenu: null,
    },
    {
      id: "3.2",
      path: PATH.PROCUREMENT_PURCHASE_ORDER_LIST,
      hasDropdown: false,
      type: "Purchase Order",
      show: true,
    },

    {
      id: "3.3",
      path: PATH.VENDOR_LIST,
      hasDropdown: false,
      type: "Vendor",
      show: true,
    },
  ];

  const ADMIN_SUBMENU = [
    {
      id: "5.1",
      path: PATH.ADMIN_USER_LIST,
      hasDropdown: false,
      show:
        user?.isSuperAdmin || permissions?.[MAKEYS.ADMIN_SETTING_USER] || false,
      type: "User",
    },
    {
      id: "5.2",
      path: PATH.ADMIN_DEPARTMENT_LIST,
      hasDropdown: false,
      show:
        user?.isSuperAdmin ||
        permissions?.[MAKEYS.ADMIN_SETTING_DEPARTMENT] ||
        false,
      type: "Department",
    },
    {
      id: "5.3",
      path: PATH.ADMIN_STORE_LIST,
      hasDropdown: false,
      show:
        user?.isSuperAdmin ||
        permissions?.[MAKEYS.ADMIN_SETTING_STORE] ||
        false,
      type: "Store",
    },
    {
      id: "5.4",
      path: PATH.ADMIN_LOCATION_LIST,
      hasDropdown: false,
      show:
        user?.isSuperAdmin ||
        permissions?.[MAKEYS.ADMIN_SETTING_LOCATION] ||
        false,
      type: "Location",
    },
    {
      id: "5.5",
      path: PATH.ADMIN_CATEGORY_LIST,
      hasDropdown: false,
      show:
        user?.isSuperAdmin ||
        permissions?.[MAKEYS.ADMIN_SETTING_ITEM_CATEGORY] ||
        false,
      type: "Item Category",
    },
  ];

  const DEPARTMENT_SUBMENU = [
    {
      id: "6.1",
      path: PATH.DEPARTMENT_USER_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.DEPARTMENT_SETTING_USER] || false,
      type: "User",
    },
    {
      id: "6.2",
      path: PATH.DEPARTMENT_ROLE_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.DEPARTMENT_SETTING_ROLE] || false,
      type: "Role",
    },
    {
      id: "6.3",
      path: PATH.DEPARTMENT_REVIEW_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.DEPARTMENT_SETTING_REVIEW] || false,
      type: "Manage Reviews",
    },
  ];
  const STORE_SUBMENU = [
    {
      id: "7.1",
      path: PATH.STORE_USER_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.STORE_SETTING_USER] || false,
      type: "User",
    },
    {
      id: "7.2",
      path: PATH.STORE_ROLE_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.STORE_SETTING_ROLE] || false,
      type: "Role",
    },
    {
      id: "7.3",
      path: PATH.STORE_REVIEW_LIST,
      hasDropdown: false,
      show: permissions?.[MAKEYS.STORE_SETTING_REVIEW] || false,
      type: "Manage Reviews",
    },
  ];

  const MENU_ITEMS_DATA = [
    {
      id: 0,
      icon: IMAGES.DASHBOARD_ICON,
      Lable: "Dashboard",
      path: PATH.DASHBOARD,
      show: false,
      subMenu: [],
    },
    {
      id: 1,
      icon: IMAGES.CHAT_ICON,
      Lable: "Chats",
      show: false,
      subMenu: [],
      path: PATH.CHATS,
    },
    {
      id: 2,
      icon: IMAGES.TRANSACTION_ICON,
      Lable: "Inventory",
      path: null,
      show: permissions?.[MAKEYS.INVENTORY] || false,
      subMenu: INVENTORY_SUBMENU.filter((item) => item.show),
    },
    {
      id: 3,
      icon: IMAGES.PROCUREMENT_ICON,
      Lable: "Procurement",
      show: permissions?.[MAKEYS.PROCUREMENT] || false,
      path: null,
      subMenu: PROCUREMENT_SUBMENU.filter((item) => item.show),
    },
    {
      id: 4,
      icon: IMAGES.CHAT_BOT_ICON1,
      Lable: "Chughtai AI Bot",
      path: PATH.CHATBOT,
      show: false,
      subMenu: [],
    },
    {
      id: 5,
      icon: IMAGES.MAINTENANCE_ICON,
      Lable: "Admin Settings",
      show: user?.isSuperAdmin || permissions?.[MAKEYS.ADMIN_SETTING] || false,
      path: null,
      subMenu: ADMIN_SUBMENU.filter((item) => item.show),
    },
    {
      id: 6,
      icon: IMAGES.MAINTENANCE_ICON,
      Lable: "Department Settings",
      show: permissions?.[MAKEYS.DEPARTMENT_SETTING] || false,
      // show: true || false,
      path: null,
      // subMenu: DEPARTMENT_SUBMENU.filter((item) => item.show),
      subMenu: DEPARTMENT_SUBMENU,
    },
    {
      id: 7,
      icon: IMAGES.MAINTENANCE_ICON,
      Lable: "Store Settings",
      show: permissions?.[MAKEYS.STORE_SETTING] || false,
      // show: true || false,
      path: null,
      // subMenu: DEPARTMENT_SUBMENU.filter((item) => item.show),
      subMenu: STORE_SUBMENU,
    },
  ];

  return (
    <>
      {isLoading && <FullScreenLoader />}
      {!isLoading &&
        MENU_ITEMS_DATA?.filter((item) => item.show).map((item, i) => {
          return (
            item && (
              <div
                onClick={() => handleClick(item, i)}
                key={i}
                className={`header-menu-item cursor-pointer ${
                  item.path === location.pathname ? `active-item` : ``
                } ${optionsList.active === i && `active-item`}`}
              >
                <img src={item.icon} alt={item.Lable} />
                <p className="menu-item-lable flex gap-3 items-center">
                  {item.Lable}
                  {optionsList?.active === i ? (
                    <FaChevronUp />
                  ) : (
                    !item.path && <FaChevronDown />
                  )}
                </p>
              </div>
            )
          );
        })}
    </>
  );
};

// const itemsForGatePass = [
// 	{
// 		label: <Link to={PATH.IGP_LIST}>IGP</Link>,
// 		key: "0",
// 	},
// 	{
// 		label: <Link to={PATH.OGP_LIST}>OGP</Link>,
// 		key: "1",
// 	},
// ];

// const GRN_OPTIONS = [
// 	{
// 		label: <Link to={PATH.GRN_GENERATE_LIST}>Generate</Link>,
// 		key: "0",
// 	},
// 	{
// 		label: <Link to={PATH.GRN_REVIEW_LIST}>Review</Link>,
// 		key: "2",
// 	},
// ];

// const CONSUMPTION_OPTIONS = [
// 	{
// 		label: <Link to={PATH.CONSUMPTION_LIST}>My</Link>,
// 		key: "0",
// 	},
// 	{
// 		label: <Link to={PATH.CONSUMPTION_STORE}>Other</Link>,
// 		key: "1",
// 	},
// ];

// const GATE_PASS_OPTIONS = [
// 	{
// 		label: <Link to={PATH.IGP_LIST}>IGP</Link>,
// 		key: "0",
// 	},
// 	{
// 		label: <Link to={PATH.OGP_LIST}>OGP</Link>,
// 		key: "1",
// 	},
// ];

// const ccOptions = [
// 	{
// 		id: 2,
// 		path: null,
// 		hasDropdown: true,
// 		type: "Consumption",
// 		subMenu: CONSUMPTION_OPTIONS,
// 	},
// 	{
// 		id: 3,
// 		path: null,
// 		hasDropdown: true,
// 		type: "Gate Pass",
// 		subMenu: GATE_PASS_OPTIONS,
// 	},
// ];

// const storeOptions = [
// 	// {
// 	// 	id: 1,
// 	// 	path: PATH.DECLARATION_LIST,
// 	// 	hasDropdown: false,
// 	// 	type: "Declaration",
// 	// 	subMenu: null,
// 	// },
// 	// {
// 	//   id: 3,
// 	//   path: PATH.PRN_LIST,
// 	//   hasDropdown: false,
// 	//   subMenu: null,
// 	//   type: "Procurement Return Record (PRR)",
// 	// },
// 	{
// 		id: 2,
// 		path: null,
// 		hasDropdown: true,
// 		type: "Consumption",
// 		subMenu: CONSUMPTION_OPTIONS,
// 	},
// 	{
// 		id: 4,
// 		path: PATH.PURCHASE_REQUISITION_LIST,
// 		hasDropdown: false,
// 		type: "Purchase Requisition",
// 	},
// 	{
// 		id: 5,
// 		path: null,
// 		hasDropdown: true,
// 		type: "Goods Receiving Note (GRN)",
// 		subMenu: GRN_OPTIONS,
// 	},
// 	{
// 		id: 8,
// 		path: null,
// 		hasDropdown: true,
// 		type: "Gate Pass",
// 		subMenu: itemsForGatePass,
// 	},
// 	{
// 		id: 9,
// 		path: PATH.MIR_SMART_EXPIRY,
// 		hasDropdown: false,
// 		type: "AI Usage Detection",
// 		subMenu: null,
// 	},
// ];

// const HeaderMenuItem = ({ setOptionsList, optionsList }) => {
// 	// const user = getUserRole();
// 	const { user } = useSelector((state) => state.auth);
// 	// console.log(user?.activeRole?.departmentType, "USER");
// 	const departmentType = user?.activeRole?.departmentType;

// 	let location = useLocation();
// 	const navigate = useNavigate();
// 	const handleClick = (item, key) => {
// 		if (!item.path) {
// 			const alreadyOpen = optionsList?.active === key;
// 			if (alreadyOpen) {
// 				setOptionsList({
// 					active: null,
// 					list: [],
// 				});
// 			} else {
// 				setOptionsList({
// 					active: key,
// 					list: item?.subMenu,
// 				});
// 			}
// 		} else {
// 			setOptionsList({
// 				active: null,
// 				list: [],
// 			});
// 			navigate(item.path);
// 		}
// 	};

// 	const MIR_OPTIONS_OTHERS = [
// 		// {
// 		// 	label: <Link to={PATH.MIR_REVIEW_LIST}>Review</Link>,
// 		// 	key: "2",
// 		// },
// 		{
// 			label: <Link to={PATH.MIR_ISSUE_LIST}>Issue</Link>,
// 			key: "1",
// 		},
// 	];

// 	const MIR_OPTIONS_CC = [
// 		{
// 			label: <Link to={PATH.MIR_GENERATE_LIST}>Generate</Link>,
// 			key: "0",
// 		},
// 		{
// 			label: <Link to={PATH.MIR_REVIEW_LIST}>Review</Link>,
// 			key: "2",
// 		},
// 		{
// 			label: <Link to={PATH.MIR_SMART_DEMAND}>Smart Demand</Link>,
// 			key: "3",
// 		},
// 	];

// 	const MRR_OPTIONS_CC = [
// 		{
// 			label: <Link to={PATH.MRR_GENERATE_LIST}>Generate</Link>,
// 			key: "0",
// 		},
// 	];
// 	const MRR_OPTIONS_OTHER = [
// 		{
// 			label: <Link to={PATH.MRR_STORE_REVIEW_LIST}>Review</Link>,
// 			key: "2",
// 		},
// 	];
// 	// const INVENTORY_OPTIONS = [
// 	//   {
// 	//     label: <Link to={PATH.INVENTORY_DEPARTMENT_LIST}>Department</Link>,
// 	//     key: "0",
// 	//   },
// 	//   {
// 	//     label: <Link to={PATH.INVENTORY_STORAGE_LIST}>Storage</Link>,
// 	//     key: "1",
// 	//   },
// 	// ];

// 	const subMenuOpt = [
// 		{
// 			id: 5,
// 			path: null,
// 			hasDropdown: true,
// 			type: "Inventory Requisition Form",
// 			subMenu:
// 				departmentType === DEPARTMENT_TYPE.OTHERS
// 					? MIR_OPTIONS_CC
// 					: departmentType ===
// 					  (DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
// 					? MIR_OPTIONS_OTHERS
// 					: [],
// 			// user === "COLLECTIONCENTER"
// 			// 	? MIR_OPTIONS_CC
// 			// 	: user === "STORE"
// 			// 	? [...MIR_OPTIONS_CC, ...MIR_OPTIONS_OTHERS]
// 			// 	: [],
// 		},
// 		{
// 			id: 6,
// 			path: null,
// 			hasDropdown: true,
// 			type: "Inventory Return Request",
// 			subMenu:
// 				departmentType === DEPARTMENT_TYPE.OTHERS
// 					? MRR_OPTIONS_CC
// 					: departmentType ===
// 					  (DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
// 					? MRR_OPTIONS_OTHER
// 					: [],
// 			// user === "COLLECTIONCENTER"
// 			// 	? MRR_OPTIONS_CC
// 			// 	: user === "STORE"
// 			// 	? [...MRR_OPTIONS_CC, ...MRR_OPTIONS_OTHER]
// 			// 	: [],
// 		},
// 		{
// 			id: 7,
// 			path: PATH.INVENTORY_DEPARTMENT_LIST,
// 			hasDropdown: false,
// 			type: "Inventory Management",
// 		},
// 	];
// 	const subMenuForProcurement = [
// 		{
// 			id: 1,
// 			path: PATH.DECLARATION_LIST,
// 			hasDropdown: false,
// 			type: "Declaration",
// 			subMenu: null,
// 		},
// 		{
// 			id: 2,
// 			path: PATH.GRN_GENERATE_LIST,
// 			hasDropdown: false,
// 			type: "GRN",
// 			subMenu: null,
// 		},
// 		{
// 			id: 4,
// 			path: PATH.PURCHASE_REQUISITION_LIST,
// 			hasDropdown: false,
// 			type: "Purchase Requisition",
// 		},
// 	];

// 	const subMenuForCC = [...subMenuOpt, ...ccOptions, ...subMenuForProcurement];
// 	const subMenuForStore = [...subMenuOpt, ...storeOptions];
// 	// const subMenuForStore = [...subMenuOpt, ...ccOptions, ...storeOptions];

// 	const MENU_ITEMS_DATA = [
// 		{
// 			id: 0,
// 			icon: IMAGES.DASHBOARD_ICON,
// 			Lable: "Dashboard",
// 			path: PATH.DASHBOARD,
// 			subMenu: [],
// 		},
// 		{
// 			id: 1,
// 			icon: IMAGES.CHAT_ICON,
// 			Lable: "Chats",
// 			subMenu: [],
// 			path: PATH.CHATS,
// 		},
// 		{
// 			id: 2,
// 			icon: IMAGES.TRANSACTION_ICON,
// 			Lable: "Inventory",
// 			path: null,
// 			subMenu:
// 				departmentType === DEPARTMENT_TYPE.OTHERS
// 					? subMenuForCC
// 					: departmentType ===
// 					  (DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
// 					? subMenuForStore
// 					: [],
// 		},
// 		departmentType === DEPARTMENT_TYPE.OTHERS && {
// 			id: 3,
// 			icon: IMAGES.PROCUREMENT_ICON,
// 			Lable: "Procurement",
// 			path: null,
// 			subMenu: [
// 				{
// 					id: 5,
// 					path: PATH.PROCUREMENT_PURCHASE_ORDER_LIST,
// 					hasDropdown: false,
// 					type: "Purchase Order",
// 				},

// 				{
// 					id: 12,
// 					path: PATH.VENDOR_LIST,
// 					hasDropdown: false,
// 					type: "Vendor",
// 				},
// 			],
// 		},
// 		// {
// 		// 	id: 4,
// 		// 	icon: IMAGES.REPORT_ICON,
// 		// 	Lable: "Reports",
// 		// 	path: PATH.REPORTS,
// 		// 	subMenu: [],
// 		// },
// 		{
// 			id: 5,
// 			icon: IMAGES.CHAT_BOT_ICON1,
// 			Lable: "Chughtai AI Bot",
// 			path: PATH.CHATBOT,
// 			subMenu: [],
// 		},
// 		user?.isSuperAdmin && {
// 			id: 3,
// 			icon: IMAGES.MAINTENANCE_ICON,
// 			Lable: "Admin Settings",
// 			path: null,
// 			subMenu: [
// 				{
// 					id: 22,
// 					path: PATH.ADMIN_USER_LIST,
// 					hasDropdown: false,
// 					type: "User",
// 				},
// 				{
// 					id: 23,
// 					path: PATH.ADMIN_DEPARTMENT_LIST,
// 					hasDropdown: false,
// 					type: "Department",
// 				},
// 				{
// 					id: 24,
// 					path: PATH.ADMIN_STORE_LIST,
// 					hasDropdown: false,
// 					type: "Store",
// 				},
// 				{
// 					id: 25,
// 					path: PATH.ADMIN_LOCATION_LIST,
// 					hasDropdown: false,
// 					type: "Location",
// 				},
// 				{
// 					id: 25,
// 					path: PATH.ADMIN_CATEGORY_LIST,
// 					hasDropdown: false,
// 					type: "Item Category",
// 				},
// 			],
// 		},
// 		departmentType === DEPARTMENT_TYPE.OTHERS && {
// 			id: 3,
// 			icon: IMAGES.MAINTENANCE_ICON,
// 			Lable: "Department Settings",
// 			path: null,
// 			subMenu: [
// 				{
// 					id: 32,
// 					path: PATH.DEPARTMENT_USER_LIST,
// 					hasDropdown: false,
// 					type: "User",
// 				},
// 				{
// 					id: 33,
// 					path: PATH.DEPARTMENT_ROLE_LIST,
// 					hasDropdown: false,
// 					type: "Role",
// 				},
// 			],
// 		},
// 	];

// 	return MENU_ITEMS_DATA?.map((item, i) => {
// 		return (
// 			item && (
// 				<div
// 					onClick={() => handleClick(item, i)}
// 					key={i}
// 					className={`header-menu-item cursor-pointer ${
// 						item.path === location.pathname ? `active-item` : ``
// 					} ${optionsList.active === i && `active-item`}`}
// 				>
// 					<img src={item.icon} alt={item.Lable} />
// 					<p className="menu-item-lable flex gap-3 items-center">
// 						{item.Lable}
// 						{optionsList?.active === i ? (
// 							<FaChevronUp />
// 						) : (
// 							!item.path && <FaChevronDown />
// 						)}
// 					</p>
// 				</div>
// 			)
// 		);
// 	});
// };
