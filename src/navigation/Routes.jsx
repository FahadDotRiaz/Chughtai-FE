import { PATH } from "../../config";
import WEB_PAGES from "../pages";
import { ACTION_KEYS, MAKEYS } from "../utils/constant";
import PrivateRoute from "./Routes/PrivateRoutes";
import PublicRoute from "./Routes/PublicRoutes";

const AUTH_ROUTES = [
	{
		name: "Login",
		path: PATH.SIGN_IN,
		page: <WEB_PAGES.SIGN_IN />,
		routeType: PublicRoute,
	},
];
const PROTECTED_ROUTES = [
	{
		name: "Dashboard",
		path: PATH.DASHBOARD,
		page: <WEB_PAGES.DASHBOARD />,
		routeType: PrivateRoute,
	},
	{
		name: "DECLARATION LIST",
		path: PATH.DECLARATION_LIST,
		page: <WEB_PAGES.DECLARATION_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "DECLARATION UPDATE",
		path: PATH.DECLARATION_UPDATE,
		page: <WEB_PAGES.DECLARATION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "DECLARATION CREATE",
		path: PATH.DECLARATION_CREATE,
		page: <WEB_PAGES.DECLARATION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},

	/*-- Start --- CONSUMPTION -- */
	{
		name: "CONSUMPTION LIST",
		path: PATH.CONSUMPTION_LIST,
		page: <WEB_PAGES.CONSUMPTION />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_SELF,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "CONSUMPTION CREATE",
		path: PATH.CONSUMPTION_CREATE,
		page: <WEB_PAGES.CONSUMPTION_CREATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_SELF,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "CONSUMPTION VIEW",
		path: PATH.CONSUMPTION_VIEW,
		page: <WEB_PAGES.CONSUMPTION_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_SELF,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "CONSUMPTION UPDATE",
		path: PATH.CONSUMPTION_UPDATE,
		page: <WEB_PAGES.CONSUMPTION_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_SELF,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "CONSUMPTION STORE",
		path: PATH.CONSUMPTION_STORE,
		page: <WEB_PAGES.CONSUMPTION_STORE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_STORE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "CONSUMPTION STORE VIEW",
		path: PATH.CONSUMPTION_STORE_VIEW,
		page: <WEB_PAGES.CONSUMPTION_STORE_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.CONSUMPTION_STORE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- CONSUMPTION -- */

	{
		name: "PRN LIST",
		path: PATH.PRN_LIST,
		page: <WEB_PAGES.PRN_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "PRN CREATE",
		path: PATH.PRN_CREATE,
		page: <WEB_PAGES.PRN_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "PRN UPDATE",
		path: PATH.PRN_UPDATE,
		page: <WEB_PAGES.PRN_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "PO",
		path: PATH.PO_LIST,
		page: <WEB_PAGES.PURCHASE_ORDER_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "PO Review",
		path: PATH.PO_REVIEW,
		page: <WEB_PAGES.PURCHASE_ORDER_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurment PO List",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_LIST,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO Create",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_CREATE,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO Update",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_UPDATE,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO View",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_VIEW,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_VIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition List",
		path: PATH.PURCHASE_REQUISITION_LIST,
		page: <WEB_PAGES.PURCHASE_REQUISITION_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition View",
		path: PATH.PURCHASE_REQUISITION_VIEW,
		page: <WEB_PAGES.PURCHASE_REQUISITION_VIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Review",
		path: PATH.PURCHASE_REQUISITION_REVIEW,
		page: <WEB_PAGES.PURCHASE_REQUISITION_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Create",
		path: PATH.PURCHASE_REQUISITION_CREATE,
		page: <WEB_PAGES.PURCHASE_REQUISITION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Update",
		path: PATH.PURCHASE_REQUISITION_UPDATE,
		page: <WEB_PAGES.PURCHASE_REQUISITION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},

	{
		name: "VENDOR LIST",
		path: PATH.VENDOR_LIST,
		page: <WEB_PAGES.VENDOR_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR CREATE",
		path: PATH.VENDOR_CREATE,
		page: <WEB_PAGES.VENDOR_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR CREATE",
		path: PATH.VENDOR_UPDATE,
		page: <WEB_PAGES.VENDOR_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR VIEW",
		path: PATH.VENDOR_VIEW,
		page: <WEB_PAGES.VENDOR_VIEW />,
		routeType: PrivateRoute,
	},

	/*-- start --- IGP -- */
	{
		name: "GATE PASS IGP LIST",
		path: PATH.IGP_LIST,
		page: <WEB_PAGES.IGP_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IGP,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "GATE PASS IGP CREATE",
		path: PATH.IGP_CREATE,
		page: <WEB_PAGES.IGP_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IGP,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "GATE PASS IGP UPDATE",
		path: PATH.IGP_UPDATE,
		page: <WEB_PAGES.IGP_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IGP,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "GATE PASS IGP VIEW",
		path: PATH.IGP_VIEW,
		page: <WEB_PAGES.IGP_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IGP,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- IGP -- */

	/*-- Start --- OGP -- */
	{
		name: "GATE PASS OGP LIST",
		path: PATH.OGP_LIST,
		page: <WEB_PAGES.OGP_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.OGP,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "GATE PASS OGP CREATE",
		path: PATH.OGP_CREATE,
		page: <WEB_PAGES.OGP_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.OGP,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "GATE PASS OGP UPDATE",
		path: PATH.OGP_UPDATE,
		page: <WEB_PAGES.OGP_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.OGP,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "GATE PASS OGP VIEW",
		path: PATH.OGP_VIEW,
		page: <WEB_PAGES.OGP_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.OGP,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- OGP -- */

	/*--Start---MIR -- */
	{
		name: "MIR CREATE",
		path: PATH.MIR_GENERATE,
		page: <WEB_PAGES.MIR_GENERATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_GENERATE,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "MIR GENERATE SUGGESTED",
		path: PATH.MIR_GENERATE_SUGGESTED,
		page: <WEB_PAGES.MIR_GENERATE_SUGGESTED />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR GENERATE SUGGESTED REVIEW",
		path: PATH.MIR_GENERATE_SUGGESTED_REVIEW,
		page: <WEB_PAGES.MIR_GENERATE_SUGGESTED_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR UPDATE",
		path: PATH.MIR_UPDATE,
		page: <WEB_PAGES.MIR_GENERATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_GENERATE,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "MIR CREATED LIST",
		path: PATH.MIR_GENERATE_LIST,
		page: <WEB_PAGES.MIR_GENERATE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_GENERATE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MIR GENERATE VIEW",
		path: PATH.MIR_GENERATE_VIEW,
		page: <WEB_PAGES.MIR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_GENERATE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "MIR REVIEW",
		path: PATH.MIR_REVIEW,
		page: <WEB_PAGES.MIR_REVIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_REVIEW,
			subKey: ACTION_KEYS.REVIEW,
		},
	},
	{
		name: "MIR REVIEW LIST",
		path: PATH.MIR_REVIEW_LIST,
		page: <WEB_PAGES.MIR_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_REVIEW,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MIR REVIEW VIEW",
		path: PATH.MIR_REVIEW_VIEW,
		page: <WEB_PAGES.MIR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_REVIEW,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "MIR ISSUE",
		path: PATH.MIR_ISSUE,
		page: <WEB_PAGES.MIR_ISSUE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_ISSUE,
			subKey: ACTION_KEYS.ISSUE,
		},
	},
	{
		name: "MIR ISSUE LIST",
		path: PATH.MIR_ISSUE_LIST,
		page: <WEB_PAGES.MIR_ISSUE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_ISSUE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MIR ISSUE SUGGESTED",
		path: PATH.MIR_ISSUE_SUGGESTED,
		page: <WEB_PAGES.MIR_ISSUE_SUGGESTED />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR ISSUE SUGGESTED REVIEW",
		path: PATH.MIR_ISSUE_SUGGESTED_REVIEW,
		page: <WEB_PAGES.MIR_ISSUE_SUGGESTED_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR ISSUE VIEW",
		path: PATH.MIR_ISSUE_VIEW,
		page: <WEB_PAGES.MIR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRF_ISSUE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "MIR SMART DEMAND",
		path: PATH.MIR_SMART_DEMAND,
		page: <WEB_PAGES.MIR_SMART_DEMAND />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR SMART EXPIRY",
		path: PATH.MIR_SMART_EXPIRY,
		page: <WEB_PAGES.MIR_SMART_EXPIRY />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR VERSION HISTORY",
		path: PATH.MIR_VIEW_VERSION_HISTORY,
		page: <WEB_PAGES.MIR_VIEW_VERSION_HISTORY />,
		routeType: PrivateRoute,
	},
	{
		name: "MIR ISSUED SIN VIEW",
		path: PATH.MIR_ISSUED_SIN_VIEW,
		page: <WEB_PAGES.MIR_ISSUED_SIN_VIEW />,
		routeType: PrivateRoute,
	},
	/*-- End --- MIR -- */

	/*-- Start --- MRR -- */
	{
		name: "MRR GENERATE LIST",
		path: PATH.MRR_GENERATE_LIST,
		page: <WEB_PAGES.MRR_GENERATE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_GENERATE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MRR GENERATE ",
		path: PATH.MRR_GENERATE,
		page: <WEB_PAGES.MRR_GENERATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_GENERATE,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "MRR UPDATE ",
		path: PATH.MRR_UPDATE,
		page: <WEB_PAGES.MRR_GENERATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_GENERATE,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "MRR STORE REVIEW",
		path: PATH.MRR_STORE_REVIEW,
		page: <WEB_PAGES.MRR_STORE_REVIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_ISSUE,
			subKey: ACTION_KEYS.ISSUE,
		},
	},
	{
		name: "MRR HOD REVIEW",
		path: PATH.MRR_HOD_REVIEW,
		page: <WEB_PAGES.MRR_HOD_REVIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_REVIEW,
			subKey: ACTION_KEYS.REVIEW,
		},
	},
	{
		name: "MRR HOD REVIEW LIST",
		path: PATH.MRR_HOD_REVIEW_LIST,
		page: <WEB_PAGES.MRR_HOD_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_REVIEW,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MRR STORE REVIEW LIST",
		path: PATH.MRR_STORE_REVIEW_LIST,
		page: <WEB_PAGES.MRR_STORE_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_ISSUE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "MRR VERSION HISTORY",
		path: PATH.MRR_VIEW_VERSION_HISTORY,
		page: <WEB_PAGES.MRR_VIEW_VERSION_HISTORY />,
		routeType: PrivateRoute,
	},
	{
		name: "MRR GENERATE VIEW",
		path: PATH.MRR_GENERATE_VIEW,
		page: <WEB_PAGES.MRR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_GENERATE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "MRR HOD VIEW",
		path: PATH.MRR_HOD_VIEW,
		page: <WEB_PAGES.MRR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_REVIEW,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "MRR STORE REVIEW VIEW",
		path: PATH.MRR_STORE_REVIEW_VIEW,
		page: <WEB_PAGES.MRR_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.IRR_ISSUE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- MRR -- */

	/*-- Start --- GRN -- */
	{
		name: "GRN GENERATE LIST",
		path: PATH.GRN_GENERATE_LIST,
		page: <WEB_PAGES.GRN_GENERATE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_GENERATE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "GRN GENERATE",
		path: PATH.GRN_GENERATE,
		page: <WEB_PAGES.GRN_GENERATE_UPDTAE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_GENERATE,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "GRN UPDATE",
		path: PATH.GRN_UPDATE,
		page: <WEB_PAGES.GRN_GENERATE_UPDTAE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_GENERATE,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "GRN REVIEW",
		path: PATH.GRN_REVIEW,
		page: <WEB_PAGES.GRN_REVIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_REVIEW,
			subKey: ACTION_KEYS.REVIEW,
		},
	},
	{
		name: "GRN REVIEW LIST",
		path: PATH.GRN_REVIEW_LIST,
		page: <WEB_PAGES.GRN_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_REVIEW,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "GRN GENERATE VIEW ",
		path: PATH.GRN_GENERATE_VIEW,
		page: <WEB_PAGES.GRN_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_GENERATE,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "GRN REVIEW VIEW ",
		path: PATH.GRN_REVIEW_VIEW,
		page: <WEB_PAGES.GRN_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.GRN_REVIEW,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	{
		name: "GRN VIEW ALL",
		path: PATH.GRN_VIEW_ALL,
		page: <WEB_PAGES.GRN_VIEW_ALL />,
		routeType: PrivateRoute,
	},
	/*-- End --- GRN -- */

	{
		name: "PO",
		path: PATH.PO_LIST,
		page: <WEB_PAGES.PURCHASE_ORDER_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "PO Review",
		path: PATH.PO_REVIEW,
		page: <WEB_PAGES.PURCHASE_ORDER_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurment PO List",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_LIST,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO Create",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_CREATE,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO Update",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_UPDATE,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Procurement PO View",
		path: PATH.PROCUREMENT_PURCHASE_ORDER_VIEW,
		page: <WEB_PAGES.PROCUREMENT_PURCHASE_ORDER_VIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition List",
		path: PATH.PURCHASE_REQUISITION_LIST,
		page: <WEB_PAGES.PURCHASE_REQUISITION_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition View",
		path: PATH.PURCHASE_REQUISITION_VIEW,
		page: <WEB_PAGES.PURCHASE_REQUISITION_VIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Review",
		path: PATH.PURCHASE_REQUISITION_REVIEW,
		page: <WEB_PAGES.PURCHASE_REQUISITION_REVIEW />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Create",
		path: PATH.PURCHASE_REQUISITION_CREATE,
		page: <WEB_PAGES.PURCHASE_REQUISITION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "Purchase Requisition Update",
		path: PATH.PURCHASE_REQUISITION_UPDATE,
		page: <WEB_PAGES.PURCHASE_REQUISITION_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},

	/*-- start --- ADMIN --*/
	{
		name: "ADMIN LOCATION LIST",
		path: PATH.ADMIN_LOCATION_LIST,
		page: <WEB_PAGES.ADMIN_LOCATION_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN LOCATION CREATE",
		path: PATH.ADMIN_LOCATION_CREATE,
		page: <WEB_PAGES.LOCATION_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN LOCATION UPDATE",
		path: PATH.ADMIN_LOCATION_UPDATE,
		page: <WEB_PAGES.LOCATION_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN ROLE LIST",
		path: PATH.ADMIN_ROLE_LIST,
		page: <WEB_PAGES.ADMIN_ROLE_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN STORE LIST",
		path: PATH.ADMIN_STORE_LIST,
		page: <WEB_PAGES.ADMIN_STORE_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN STORE CREATE",
		path: PATH.ADMIN_STORE_CREATE,
		page: <WEB_PAGES.STORE_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN STORE UPDATE",
		path: PATH.ADMIN_STORE_UPDATE,
		page: <WEB_PAGES.STORE_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN USER LIST",
		path: PATH.ADMIN_USER_LIST,
		page: <WEB_PAGES.ADMIN_USER_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN USER CREATE",
		path: PATH.ADMIN_USER_CREATE,
		page: <WEB_PAGES.USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN USER UPDATE",
		path: PATH.ADMIN_USER_UPDATE,
		page: <WEB_PAGES.USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN USER VIEW",
		path: PATH.ADMIN_USER_VIEW,
		page: <WEB_PAGES.ADMIN_USER_VIEW />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN DEPARTMENT LIST",
		path: PATH.ADMIN_DEPARTMENT_LIST,
		page: <WEB_PAGES.ADMIN_DEPARTMENT_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN DEPARTMENT CREATE",
		path: PATH.ADMIN_DEPARTMENT_CREATE,
		page: <WEB_PAGES.DEPARTMENT_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN DEPARTMENT UPDATE",
		path: PATH.ADMIN_DEPARTMENT_UPDATE,
		page: <WEB_PAGES.DEPARTMENT_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN CATEGORY LIST",
		path: PATH.ADMIN_CATEGORY_LIST,
		page: <WEB_PAGES.ADMIN_CATEGORY_LIST />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN CATEGORY CREATE",
		path: PATH.ADMIN_CATEGORY_CREATE,
		page: <WEB_PAGES.CATEGORY_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	{
		name: "ADMIN CATEGORY UPDATE",
		path: PATH.ADMIN_CATEGORY_UPDATE,
		page: <WEB_PAGES.CATEGORY_CREATE_UPDATE />,
		routeType: PrivateRoute,
		isSuperAdmin: true,
	},
	/*-- End --- ADMIN --*/

	{
		name: "VENDOR LIST",
		path: PATH.VENDOR_LIST,
		page: <WEB_PAGES.VENDOR_LIST />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR CREATE",
		path: PATH.VENDOR_CREATE,
		page: <WEB_PAGES.VENDOR_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR CREATE",
		path: PATH.VENDOR_UPDATE,
		page: <WEB_PAGES.VENDOR_CREATE_UPDATE />,
		routeType: PrivateRoute,
	},
	{
		name: "VENDOR VIEW",
		path: PATH.VENDOR_VIEW,
		page: <WEB_PAGES.VENDOR_VIEW />,
		routeType: PrivateRoute,
	},

	/*-- Start --- INVENTORY -- */
	{
		name: "INVENTORY DEPARTMENT LIST",
		path: PATH.INVENTORY_DEPARTMENT_LIST,
		page: <WEB_PAGES.INVENTORY_DEPARTMENT_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.INVENTORY_MANAGEMENT_DEPARTMENT,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "INVENTORY STORAGE LIST",
		path: PATH.INVENTORY_STORAGE_LIST,
		page: <WEB_PAGES.INVENTORY_STORAGE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.INVENTORY_MANAGEMENT_STORAGE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	/*-- End --- INVENTORY -- */

	/*-- start --- DEPARTMENT SETTING --*/
	{
		name: "DEPARTMENT SETTING ROLE LIST",
		path: PATH.DEPARTMENT_ROLE_LIST,
		page: <WEB_PAGES.DEPARTMENT_ROLE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_ROLE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "DEPARTMENT SETTING REVIEW LIST",
		path: PATH.DEPARTMENT_REVIEW_LIST,
		page: <WEB_PAGES.DEPARTMENT_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_REVIEW,
		},
	},
	{
		name: "DEPARTMENT SETTING USER LIST",
		path: PATH.DEPARTMENT_USER_LIST,
		page: <WEB_PAGES.DEPARTMENT_USER_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_USER,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "DEPARTMENT SETTING USER CREATE",
		path: PATH.DEPARTMENT_USER_CREATE,
		page: <WEB_PAGES.DEPARTMENT_USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_USER,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "DEPARTMENT SETTING USER UPDATE",
		path: PATH.DEPARTMENT_USER_UPDATE,
		page: <WEB_PAGES.DEPARTMENT_USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_USER,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "DEPARTMENT SETTING USER VIEW",
		path: PATH.DEPARTMENT_USER_VIEW,
		page: <WEB_PAGES.DEPARTMENT_USER_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.DEPARTMENT_SETTING_USER,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- DEPARTMENT SETTING --*/

	/*-- start --- STORE SETTING --*/
	{
		name: "STORE SETTING ROLE LIST",
		path: PATH.STORE_ROLE_LIST,
		page: <WEB_PAGES.DEPARTMENT_ROLE_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING_ROLE,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "STORE SETTING REVIEW LIST",
		path: PATH.STORE_REVIEW_LIST,
		page: <WEB_PAGES.DEPARTMENT_REVIEW_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING,
		},
	},
	{
		name: "STORE SETTING USER LIST",
		path: PATH.STORE_USER_LIST,
		page: <WEB_PAGES.DEPARTMENT_USER_LIST />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING_USER,
			subKey: ACTION_KEYS.LIST,
		},
	},
	{
		name: "STORE SETTING USER CREATE",
		path: PATH.STORE_USER_CREATE,
		page: <WEB_PAGES.DEPARTMENT_USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING_USER,
			subKey: ACTION_KEYS.ADD,
		},
	},
	{
		name: "STORE SETTING USER UPDATE",
		path: PATH.STORE_USER_UPDATE,
		page: <WEB_PAGES.DEPARTMENT_USER_CREATE_UPDATE />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING_USER,
			subKey: ACTION_KEYS.EDIT,
		},
	},
	{
		name: "STORE SETTING USER VIEW",
		path: PATH.STORE_USER_VIEW,
		page: <WEB_PAGES.DEPARTMENT_USER_VIEW />,
		routeType: PrivateRoute,
		permissionKey: {
			mainKey: MAKEYS.STORE_SETTING_USER,
			subKey: ACTION_KEYS.VIEW,
		},
	},
	/*-- End --- STORE SETTING --*/
];

const SHARED_ROUTES = [
	{
		name: "Chat",
		path: PATH.CHATS,
		routeType: PrivateRoute,
		page: <WEB_PAGES.CHATS />,
	},
	{
		name: "Chat bot",
		path: PATH.CHATBOT,
		routeType: PrivateRoute,
		page: <WEB_PAGES.CHATBOT />,
	},
];

const ROUTES = [...AUTH_ROUTES, ...PROTECTED_ROUTES, ...SHARED_ROUTES];

export default ROUTES;
