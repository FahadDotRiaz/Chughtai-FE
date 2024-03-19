const ERROR = {
	SYSTEM_ERROR: "System error. Please try again later!",
};

const PATH = {
	NOPAGE: "*",
	SIGN_IN: "/",
	DASHBOARD: "/dashboard",
	TRANSACTION: "/transaction",
	FORM: "/transaction/form",
	REPORTS: "/reports",
	UTILITIES: "/utilities",
	FILES: "/file",
	WINDOWS: "/windows",

	CONSUMPTION_LIST: "/consumption",
	CONSUMPTION_VIEW: "/consumption/view/:id",
	CONSUMPTION_STORE: "/consumption/store",
	CONSUMPTION_STORE_VIEW: "/consumption/store/view/:id",
	CONSUMPTION_UPDATE: "/consumption/update/:id",
	CONSUMPTION_CREATE: "/consumption/create",

	//DECLARATION
	DECLARATION_LIST: "/declaration",
	DECLARATION_CREATE: "/declaration/create",
	DECLARATION_UPDATE: "/declaration/update/:id",

	//GRN NEW
	GRN_STAFF_LIST: "/grn/staff",
	GRN_STAFF_CREATE: "/grn/staff/create",
	GRN_STAFF_UPDATE: "/grn/staff/update/:id",
	GRN_STAFF_VIEW: "/grn/staff/view/:id",
	GRN_MANAGER_LIST: "/grn/manager",
	GRN_MANAGER_REVIEW: "/grn/manager/review/:id",

	// PRN MODULE
	PRN_LIST: "/prn",
	PRN_CREATE: "/prn/create",
	PRN_UPDATE: "/prn/update/:id",

	//CHATS
	CHATS: "/chat",
	CHATBOT: "/chat-bot",

	//GATE PASS
	IGP_LIST: "/gate-pass/igp",
	IGP_VIEW: "/gate-pass/igp/view/:id",
	IGP_CREATE: "/gate-pass/igp/create",
	IGP_UPDATE: "/gate-pass/igp/update/:id",
	OGP_LIST: "/gate-pass/ogp",
	OGP_VIEW: "/gate-pass/ogp/view/:id",
	OGP_CREATE: "/gate-pass/ogp/create",
	OGP_UPDATE: "/gate-pass/ogp/update/:id",

	//MIR NEW
	MIR_GENERATE_LIST: "/mir",
	MIR_GENERATE: "/mir/generate",
	MIR_GENERATE_SUGGESTED: "/mir/generate/suggested",
	MIR_GENERATE_SUGGESTED_REVIEW: "/mir/generate/suggested/review/:id",
	MIR_GENERATE_VIEW: "/mir/generate/view/:id",
	MIR_ISSUE_VIEW: "/mir/issue/view/:id",
	MIR_REVIEW_VIEW: "/mir/review/view/:id",
	MIR_UPDATE: "/mir/update/:id",
	MIR_REVIEW_LIST: "/mir/review",
	MIR_REVIEW: "/mir/review/:id",
	MIR_ISSUE_LIST: "/mir/issue",
	MIR_ISSUE: "/mir/issue/:id",
	MIR_ISSUE_SUGGESTED: "/mir/issue/suggested",
	MIR_ISSUE_SUGGESTED_REVIEW: "/mir/issue/suggested/review/:id",
	MIR_SMART_DEMAND: "/mir/smart-demand",
	MIR_SMART_EXPIRY: "/mir/smart-expiry",
	MIR_VIEW_VERSION_HISTORY: "/mir/view/version-history/:id",
	MIR_ISSUED_SIN_VIEW: "/mir/issued/sin/:id",

	//MRR NEW
	MRR_GENERATE_LIST: "/mrr",
	MRR_GENERATE: "/mrr/generate",
	MRR_UPDATE: "/mrr/update/:id",
	MRR_STORE_REVIEW_LIST: "/mrr/store/review",
	MRR_STORE_REVIEW: "/mrr/store/review/:id",
	MRR_VIEW_VERSION_HISTORY: "/mir/view/version-history",
	MRR_GENERATE_VIEW: "/mrr/generate/view/:id",
	MRR_STORE_REVIEW_VIEW: "/mrr/view/:id",
	MRR_HOD_VIEW: "/mrr/hod/view/:id",
	MRR_HOD_REVIEW_LIST: "/mrr/hod-review",
	MRR_HOD_REVIEW: "/mrr/hod-review/:id",

	//GRN FINAL
	GRN_GENERATE_LIST: "/grn/generate",
	GRN_GENERATE: "/grn/generate/:id",
	GRN_UPDATE: "/grn/update/:id",
	GRN_GENERATE_VIEW: "/grn/generate/view/:id",
	GRN_REVIEW_VIEW: "/grn/review/view/:id",
	GRN_VIEW_ALL: "/grn/view-all/po/:id",
	GRN_VIEW_HISTORY: "/grn/view/history/:id",
	GRN_REVIEW_LIST: "/grn/review",
	GRN_REVIEW: "/grn/review/:id",

	PO_LIST: "/po",
	PO_REVIEW: "/po/:id/review",

	//Procurement
	PROCUREMENT_PURCHASE_ORDER_LIST: "/procurement/purchase-order",
	PROCUREMENT_PURCHASE_ORDER_CREATE: "/procurement/purchase-order/create",
	PROCUREMENT_PURCHASE_ORDER_UPDATE: "/procurement/purchase-order/update/:id",
	PROCUREMENT_PURCHASE_ORDER_VIEW: "/procurement/purchase-order/view/:id",

	//Purchase Requisition
	PURCHASE_REQUISITION_LIST: "/purchase-requisition",
	PURCHASE_REQUISITION_VIEW: "/purchase-requisition/view",
	PURCHASE_REQUISITION_REVIEW: "/purchase-requisition/review",
	PURCHASE_REQUISITION_CREATE: "/purchase-requisition/create",
	PURCHASE_REQUISITION_UPDATE: "/purchase-requisition/update/:id",

	//ADMIN
	ADMIN_USER_LIST: "/admin-setting/user",
	ADMIN_USER_CREATE: "/admin-setting/user/create",
	ADMIN_USER_UPDATE: "/admin-setting/user/update/:id",
	ADMIN_USER_VIEW: "/admin-setting/user/view/:id",
	USER_ASSIGN_ROLE: "/user/assign-role/:id",
	ADMIN_ROLE_LIST: "/admin-setting/department/role",
	ADMIN_ROLE_CREATE: "/admin-setting/department/role/create",
	ADMIN_ROLE_UPDATE: "/admin-setting/department/role/update/:id",
	ADMIN_DEPARTMENT_LIST: "/admin-setting/department",
	DEPARTMENT_TEMPLATE_LIST: "/admin-setting/department/template",
	ADMIN_DEPARTMENT_CREATE: "/admin-setting/department/create",
	DEPARTMENT_TEMPLATE_CREATE: "/department/template/create",
	ADMIN_DEPARTMENT_UPDATE: "/admin-setting/department/update/:id",
	DEPARTMENT_TEMPLATE_UPDATE: "/admin-setting/department/template/update/:id",
	ADMIN_LOCATION_LIST: "/admin-setting/location",
	ADMIN_LOCATION_CREATE: "/admin-setting/location/create",
	ADMIN_LOCATION_UPDATE: "/admin-setting/location/update/:id",
	ADMIN_STORE_LIST: "/admin-setting/store",
	ADMIN_STORE_CREATE: "/admin-setting/store/create",
	ADMIN_STORE_UPDATE: "/admin-setting/store/update/:id",
	DEPARTMENT_ROLE_LIST: "/department-setting/role",
	DEPARTMENT_ROLE_CREATE: "/department-setting/role/create",
	DEPARTMENT_ROLE_UPDATE: "/department-setting/role/update/:id",
	DEPARTMENT_USER_LIST: "/department-setting/user",
	DEPARTMENT_USER_CREATE: "/department-setting/user/create",
	DEPARTMENT_USER_UPDATE: "/department-setting/user/update/:id",
	DEPARTMENT_USER_VIEW: "/department-setting/user/view/:id",
	DEPARTMENT_REVIEW_LIST: "/department-setting/review",
	STORE_ROLE_LIST: "/store-setting/role",
	STORE_ROLE_CREATE: "/store-setting/role/create",
	STORE_ROLE_UPDATE: "/store-setting/role/update/:id",
	STORE_USER_LIST: "/store-setting/user",
	STORE_USER_CREATE: "/store-setting/user/create",
	STORE_USER_UPDATE: "/store-setting/user/update/:id",
	STORE_USER_VIEW: "/store-setting/user/view/:id",
	STORE_REVIEW_LIST: "/store-setting/review",
	ADMIN_CATEGORY_LIST: "/admin-setting/category",
	ADMIN_CATEGORY_CREATE: "/admin-setting/category/create",
	ADMIN_CATEGORY_UPDATE: "/admin-setting/category/update/:id",

	//VENDOR
	VENDOR_LIST: "/vendor",
	VENDOR_CREATE: "/vendor/create",
	VENDOR_UPDATE: "/vendor/update/:id",
	VENDOR_VIEW: "/vendor/view/:id",

	// INVENTORY
	INVENTORY_DEPARTMENT_LIST: "/inventory/department",
	INVENTORY_STORAGE_LIST: "/inventory/storage",
};

export { ERROR, PATH };
