const MIR_STATUS = [
	{
		value: "APPROVED",
		label: "Approved",
	},
	{
		value: "PENDING",
		label: "Pending",
	},
	{
		value: "REJECTED",
		label: "Rejected",
	},
	{
		value: "CANCELLED",
		label: "Cancelled",
	},
	{
		value: "COMPLETED",
		label: "Completed",
	},
	{
		value: "PARTIAL_ISSUED",
		label: "Partial Issued",
	},
];

const MIR_STAGE = [
	{ label: "Completed", value: "COMPLETED" },
	{ label: "HOD Approval", value: "HOD_APPROVAL" },
	{ label: "Store Approval", value: "STORE_APPROVAL" },
	{ label: "Partial Complete", value: "PARTIAL_COMPLETE" },
];
const VENDOR_TYPE = [
	{
		label: "Goods",
		value: "Store",
	},
	{
		label: "Service",
		value: "CollectionCenter",
	},
];

const DEPARTMENT_TYPE = [
	{
		value: "Store",
		label: "Store",
	},
	{
		value: "SubStore",
		label: "SubStore",
	},
	{
		value: "Others",
		label: "Others",
	},
];

const SERVICE_TYPE = [
	{ label: "Store", value: "Store" },
	{ label: "CollectionCenter", value: "CollectionCenter" },
	{ label: "StateLab", value: "StateLab" },
	{ label: "SubStore", value: "SubStore" },
];

const GP_TYPE = [
	{ label: "Dedicated Vehicle", value: "Dedicated Vehicle" },
	{ label: "Hand Carry", value: "Hand carry" },
	{ label: "Courier", value: "Courier" },
	{ label: "Rent", value: "Rent" },
];

const ITEM_UNIT = [
	{ label: "Box", value: "Box" },
	{ label: "Pack", value: "Pack" },
	{ label: "Item", value: "Item" },
];

const GRN_STATUS = [
	{
		value: "APPROVED",
		label: "Approved",
	},
	{
		value: "PENDING",
		label: "Pending",
	},
	{
		value: "COMPLETED",
		label: "Completed",
	},
	{
		value: "PARTIAL_COMPLETE",
		label: "Partial Complete",
	},
];
const MEASURING_UNIT = [
	{ value: "Bar", label: "Bar" },
	{ value: "Bottle", label: "Bottle" },
	{ value: "Vails", label: "Vails" },
	{ value: "Box", label: "Box" },
	{ value: "Bucket", label: "Bucket" },
	{ value: "Bundle", label: "Bundle" },
	{ value: "Can", label: "Can" },
	{ value: "Coil", label: "Coil" },
	{ value: "Cylinder", label: "Cylinder" },
	{ value: "Drum", label: "Drum" },
	{ value: "Gallon", label: "Gallon" },
	{ value: "Bag", label: "Bag" },
];
const LOOKUPS = {
	MIR_STATUS,
	VENDOR_TYPE,
	DEPARTMENT_TYPE,
	SERVICE_TYPE,
	MIR_STAGE,
	GP_TYPE,
	ITEM_UNIT,
	GRN_STATUS,
	MEASURING_UNIT,
};
export default LOOKUPS;
