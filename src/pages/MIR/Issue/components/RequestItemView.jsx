import { Modal } from "antd";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import PropTypes from "prop-types";
import TableEditableField from "../../../../components/TableEditableField";

export default function RequestItemView({ show, onClose }) {
	const columns = [
		{
			header: "Batch No",
			accessorKey: "batchNo",
			size: 80,
		},
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 120,
		},
		{
			header: "Parent Item",
			accessorKey: "parentItem",
			size: 120,
		},
		{
			header: "Item Description",
			accessorKey: "itemDesc",
			size: 220,
		},
		{
			header: "Item QTY",
			accessorKey: "qty",
			size: 80,
		},
		{
			header: "Expiray Date",
			accessorKey: "expiry",
			size: 120,
		},
		{
			header: "Vendor",
			accessorKey: "vendor",
			size: 120,
		},
		{
			header: "Assigned QTY",
			accessorKey: "assigned",
			size: 120,
			Cell: () => <TableEditableField field="number" defaultValue={0} />,
		},
	];

	const data = [
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Pending",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Pending",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Rejected",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
	];
	return (
		<Modal
			title="Items View"
			centered
			open={show}
			onOk={onClose}
			onCancel={onClose}
			width={1100}
			okText="Save"
			cancelText="Cancel"
		>
			<GenericMuiTable
				columns={columns}
				data={data}
				simpleTable
				slimTable
				enableColumnFilters={false}
			/>
		</Modal>
	);
}

RequestItemView.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
