import React from "react";

const NOPAGE = React.lazy(() => import("./NoPageFound"));
const UNAUTHORIZED = React.lazy(() => import("./NoAccessPage"));
const SIGN_IN = React.lazy(() => import("./Auth/SignInPage.jsx"));
const DASHBOARD = React.lazy(() => import("./Dashboard"));
const File = React.lazy(() => import("./File"));
const Reports = React.lazy(() => import("./Reports"));
const Utilities = React.lazy(() => import("./Utilities"));
const Windows = React.lazy(() => import("./Windows"));

const CONSUMPTION = React.lazy(() => import("./Consumption"));
const CONSUMPTION_UPDATE = React.lazy(() => import("./Consumption/Update.jsx"));
const CONSUMPTION_VIEW = React.lazy(() =>
	import("./Consumption/shared/View.jsx")
);
const CONSUMPTION_CREATE = React.lazy(() => import("./Consumption/Create.jsx"));
const CONSUMPTION_STORE = React.lazy(() =>
	import("./Consumption/StoreConsumption/index.jsx")
);
const CONSUMPTION_STORE_VIEW = React.lazy(() =>
	import("./Consumption/shared/View.jsx")
);

//DECLARATION
const DECLARATION_LIST = React.lazy(() => import("./Declaration"));
const DECLARATION_CREATE_UPDATE = React.lazy(() =>
	import("./Declaration/CreateUpdate.jsx")
);

// PRN MODULE
const PRN_LIST = React.lazy(() => import("./PurchaseReturnNote/Index.jsx"));
const PRN_CREATE_UPDATE = React.lazy(() =>
	import("./PurchaseReturnNote/CreateUpdate.jsx")
);

//CHATS
const CHATS = React.lazy(() => import("./Chat/index.jsx"));
const CHATBOT = React.lazy(() => import("./ChatBot/Index.jsx"));

//GATE PASS
const IGP_LIST = React.lazy(() => import("./GatePass/IGP/Index.jsx"));
const IGP_CREATE_UPDATE = React.lazy(() =>
	import("./GatePass/IGP/CreateUpdate.jsx")
);
const IGP_VIEW = React.lazy(() => import("./GatePass/IGP/View.jsx"));
const OGP_LIST = React.lazy(() => import("./GatePass/OGP/Index.jsx"));
const OGP_CREATE_UPDATE = React.lazy(() =>
	import("./GatePass/OGP/CreateUpdate.jsx")
);
const OGP_VIEW = React.lazy(() => import("./GatePass/OGP/View.jsx"));

//MIR NEW
const MIR_GENERATE_LIST = React.lazy(() => import("./MIR/Generate/Index.jsx"));
const MIR_GENERATE_UPDATE = React.lazy(() =>
	import("./MIR/Generate/CreateUpdate.jsx")
);
const MIR_GENERATE_SUGGESTED = React.lazy(() =>
	import("./MIR/Generate/SuggestedItems/Index.jsx")
);
const MIR_GENERATE_SUGGESTED_REVIEW = React.lazy(() =>
	import("./MIR/Generate/SuggestedItems/Review.jsx")
);
const MIR_ISSUE_LIST = React.lazy(() => import("./MIR/Issue/Index.jsx"));
const MIR_ISSUE_SUGGESTED = React.lazy(() =>
	import("./MIR/Issue/SuggestedItems/Index.jsx")
);
const MIR_ISSUE_SUGGESTED_REVIEW = React.lazy(() =>
	import("./MIR/Issue/SuggestedItems/Review.jsx")
);
const MIR_ISSUE = React.lazy(() => import("./MIR/Issue/Issue.jsx"));
const MIR_REVIEW_LIST = React.lazy(() => import("./MIR/Review/Index.jsx"));
const MIR_REVIEW = React.lazy(() => import("./MIR/Generate/CreateUpdate.jsx"));
const MIR_VIEW = React.lazy(() => import("./MIR/Shared/View.jsx"));
const MIR_SMART_DEMAND = React.lazy(() =>
	import("./MIR/SmartDemand/index.jsx")
);
const MIR_SMART_EXPIRY = React.lazy(() =>
	import("./MIR/SmartExpiry/Index.jsx")
);
const MIR_VIEW_VERSION_HISTORY = React.lazy(() =>
	import("./MIR/Review/ViewVersionHistory.jsx")
);
const MIR_ISSUED_SIN_VIEW = React.lazy(() =>
	import("./MIR/Generate/Issued/View.jsx")
);
//MRR NEW
const MRR_GENERATE_UPDATE = React.lazy(() =>
	import("./MRR/Generate/CreateUpdate.jsx")
);
const MRR_GENERATE_LIST = React.lazy(() => import("./MRR/Generate/Index.jsx"));
const MRR_VIEW = React.lazy(() => import("./MRR/Generate/View.jsx"));
const MRR_STORE_REVIEW_LIST = React.lazy(() =>
	import("./MRR/Review/Index.jsx")
);
const MRR_STORE_REVIEW = React.lazy(() => import("./MRR/Review/Review.jsx"));
const MRR_VIEW_VERSION_HISTORY = React.lazy(() =>
	import("./MRR/Review/ViewVersionHistory.jsx")
);
const MRR_HOD_REVIEW_LIST = React.lazy(() =>
	import("./MRR/ReviewHod/Index.jsx")
);
const MRR_HOD_REVIEW = React.lazy(() =>
	import("./MRR/Generate/CreateUpdate.jsx")
);

//GRN FINAL
const GRN_GENERATE_LIST = React.lazy(() => import("./GRN/Generate/Index.jsx"));
const GRN_GENERATE_UPDTAE = React.lazy(() =>
	import("./GRN/Generate/CreateUpdate.jsx")
);
const GRN_VIEW = React.lazy(() => import("./GRN/Shared/View.jsx"));
const GRN_VIEW_ALL = React.lazy(() => import("./GRN/Review/Index.jsx"));
const GRN_VIEW_HISTORY = React.lazy(() =>
	import("./GRN/Shared/ViewHistory.jsx")
);
const GRN_REVIEW_LIST = React.lazy(() => import("./GRN/Review/Index.jsx"));
const GRN_REVIEW = React.lazy(() => import("./GRN/Generate/CreateUpdate.jsx"));

const PURCHASE_ORDER_LIST = React.lazy(() =>
	import("./PurchaseOrder/index.jsx")
);
const PURCHASE_ORDER_REVIEW = React.lazy(() =>
	import("./PurchaseOrder/Review.jsx")
);

const PROCUREMENT_PURCHASE_ORDER_LIST = React.lazy(() =>
	import("./PurchaseOrder/Procurement/index.jsx")
);

// const PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE = React.lazy(() =>
// 	import("./PurchaseOrder/Procurement/Create.jsx")
// );

const PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE = React.lazy(() =>
	import("./PurchaseOrder/Procurement/Create.jsx")
);

const PROCUREMENT_PURCHASE_ORDER_VIEW = React.lazy(() =>
	import("./PurchaseOrder/Procurement/View.jsx")
);

const PURCHASE_REQUISITION_LIST = React.lazy(() =>
	import("./PurchaseRequisition/index.jsx")
);

const PURCHASE_REQUISITION_VIEW = React.lazy(() =>
	import("./PurchaseRequisition/View.jsx")
);

const PURCHASE_REQUISITION_REVIEW = React.lazy(() =>
	import("./PurchaseRequisition/Review.jsx")
);

const PURCHASE_REQUISITION_CREATE_UPDATE = React.lazy(() =>
	import("./PurchaseRequisition/CreateUpdate.jsx")
);

//ADMIN

const ADMIN_USER_LIST = React.lazy(() => import("./Admin/User/Index.jsx"));
const USER_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/User/CreateUpdate.jsx")
);
const ADMIN_USER_VIEW = React.lazy(() => import("./Admin/User/View.jsx"));
const USER_ASSIGN_ROLE = React.lazy(() =>
	import("./Admin/User/AssignRole.jsx")
);
const ADMIN_ROLE_LIST = React.lazy(() => import("./Admin/Role/Index.jsx"));
const ADMIN_ROLE_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Role/CreateUpdate.jsx")
);
const ADMIN_DEPARTMENT_LIST = React.lazy(() =>
	import("./Admin/Department/Index.jsx")
);
const DEPARTMENT_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Department/CreateUpdate.jsx")
);
const DEPARTMENT_TEMPLATE_LIST = React.lazy(() =>
	import("./Admin/Department/Template/Index.jsx")
);
const DEPARTMENT_TEMPLATE_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Department/Template/CreateUpdate.jsx")
);
const ADMIN_LOCATION_LIST = React.lazy(() =>
	import("./Admin/Location/Index.jsx")
);
const ADMIN_CATEGORY_LIST = React.lazy(() =>
	import("./Admin/Category/Index.jsx")
);
const CATEGORY_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Category/CreateUpdate.jsx")
);

const LOCATION_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Location/CreateUpdate.jsx")
);
const ADMIN_STORE_LIST = React.lazy(() => import("./Admin/Store/Index.jsx"));
const STORE_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Store/CreateUpdate.jsx")
);
const DEPARTMENT_ROLE_LIST = React.lazy(() =>
	import("./Admin/Department/Settings/Role/Index.jsx")
);
const DEPARTMENT_USER_LIST = React.lazy(() =>
	import("./Admin/Department/Settings/User/Index.jsx")
);
const DEPARTMENT_USER_CREATE_UPDATE = React.lazy(() =>
	import("./Admin/Department/Settings/User/CreateUpdate.jsx")
);
const DEPARTMENT_USER_VIEW = React.lazy(() =>
	import("./Admin/Department/Settings/User/View.jsx")
);
const DEPARTMENT_REVIEW_LIST = React.lazy(() =>
	import("./Admin/Department/Settings/Review/Index.jsx")
);
// //DEPARTMENT_SETTING
// const DEPARTMENT_ROLE_LIST = React.lazy(() =>
// 	import("./Admin/Department/Settings/Role/Index.jsx")
// );
// const DEPARTMENT_ROLE_CREATE_UPDATE = React.lazy(() =>
// 	import("./Admin/Department/Settings/Role/CreateUpdate.jsx")
// );
// const DEPARTMENT_USER_LIST = React.lazy(() =>
// 	import("./Admin/Department/Settings/User/Index.jsx")
// );
// const DEPARTMENT_USER_CREATE_UPDATE = React.lazy(() =>
// 	import("./Admin/Department/Settings/User/CreateUpdate.jsx")
// );
// const DEPARTMENT_USER_VIEW = React.lazy(() =>
// 	import("./Admin/Department/Settings/User/View.jsx")
// );

//VENDOR
const VENDOR_LIST = React.lazy(() => import("./Vendor/Index.jsx"));
const VENDOR_CREATE_UPDATE = React.lazy(() =>
	import("./Vendor/CreateUpdate.jsx")
);
const VENDOR_VIEW = React.lazy(() => import("./Vendor/View.jsx"));

const INVENTORY_DEPARTMENT_LIST = React.lazy(() =>
	import("./Inventory/Department/Index.jsx")
);
const INVENTORY_STORAGE_LIST = React.lazy(() =>
	import("./Inventory/Storage/Index.jsx")
);

const WEB_PAGES = {
	NOPAGE,
	UNAUTHORIZED,
	SIGN_IN,
	DASHBOARD,
	FILES: File,
	REPORTS: Reports,
	UTILITIES: Utilities,
	WINDOWS: Windows,
	CONSUMPTION,
	CONSUMPTION_VIEW,
	CONSUMPTION_CREATE,
	CONSUMPTION_UPDATE,
	CONSUMPTION_STORE,
	CONSUMPTION_STORE_VIEW,

	//DECLARATION
	DECLARATION_LIST,
	DECLARATION_CREATE_UPDATE,

	// PRN MODULE
	PRN_LIST,
	PRN_CREATE_UPDATE,

	//CHATS
	CHATS,
	CHATBOT,

	//GATE PASS
	OGP_LIST,
	OGP_CREATE_UPDATE,
	OGP_VIEW,
	IGP_LIST,
	IGP_CREATE_UPDATE,
	IGP_VIEW,

	//MIR NEW
	MIR_ISSUE_LIST,
	MIR_GENERATE_LIST,
	MIR_REVIEW_LIST,
	MIR_GENERATE_UPDATE,
	MIR_ISSUE,
	MIR_REVIEW,
	MIR_VIEW,
	MIR_GENERATE_SUGGESTED,
	MIR_GENERATE_SUGGESTED_REVIEW,
	MIR_ISSUE_SUGGESTED,
	MIR_ISSUE_SUGGESTED_REVIEW,
	MIR_ISSUED_SIN_VIEW,
	MIR_SMART_DEMAND,
	MIR_SMART_EXPIRY,
	MIR_VIEW_VERSION_HISTORY,

	//MRR NEW
	MRR_GENERATE_LIST,
	MRR_GENERATE_UPDATE,
	MRR_STORE_REVIEW,
	MRR_STORE_REVIEW_LIST,
	MRR_VIEW_VERSION_HISTORY,
	MRR_VIEW,
	MRR_HOD_REVIEW_LIST,
	MRR_HOD_REVIEW,

	//GRN FINAL
	GRN_GENERATE_LIST,
	GRN_GENERATE_UPDTAE,
	GRN_VIEW,
	GRN_VIEW_ALL,
	GRN_VIEW_HISTORY,
	GRN_REVIEW_LIST,
	GRN_REVIEW,

	PURCHASE_ORDER_LIST,
	PURCHASE_ORDER_REVIEW,

	//PROCUREMENT
	PROCUREMENT_PURCHASE_ORDER_LIST,
	PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE,
	PROCUREMENT_PURCHASE_ORDER_VIEW,

	//PURCHASE REQUISITION
	PURCHASE_REQUISITION_LIST,
	PURCHASE_REQUISITION_VIEW,
	PURCHASE_REQUISITION_REVIEW,
	PURCHASE_REQUISITION_CREATE_UPDATE,

	//ADMIN
	ADMIN_USER_LIST,
	USER_CREATE_UPDATE,
	USER_ASSIGN_ROLE,
	ADMIN_USER_VIEW,
	ADMIN_ROLE_LIST,
	ADMIN_ROLE_CREATE_UPDATE,
	ADMIN_DEPARTMENT_LIST,
	DEPARTMENT_CREATE_UPDATE,
	DEPARTMENT_TEMPLATE_LIST,
	DEPARTMENT_TEMPLATE_CREATE_UPDATE,
	ADMIN_LOCATION_LIST,
	LOCATION_CREATE_UPDATE,
	ADMIN_STORE_LIST,
	STORE_CREATE_UPDATE,

	DEPARTMENT_ROLE_LIST,
	DEPARTMENT_USER_LIST,
	DEPARTMENT_USER_CREATE_UPDATE,
	DEPARTMENT_USER_VIEW,
	DEPARTMENT_REVIEW_LIST,
	ADMIN_CATEGORY_LIST,
	CATEGORY_CREATE_UPDATE,
	// //DEPARTMENT_SETTING
	// DEPARTMENT_ROLE_LIST,
	// DEPARTMENT_ROLE_CREATE_UPDATE,
	// DEPARTMENT_USER_LIST,
	// DEPARTMENT_USER_CREATE_UPDATE,
	// DEPARTMENT_USER_VIEW,

	//VENDOR
	VENDOR_LIST,
	VENDOR_CREATE_UPDATE,
	VENDOR_VIEW,

	//INVENTORY
	INVENTORY_DEPARTMENT_LIST,
	INVENTORY_STORAGE_LIST,
};

export default WEB_PAGES;
