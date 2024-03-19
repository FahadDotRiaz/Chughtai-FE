import { GenericModal } from "../../../../components/GenericModal";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import TableEditableField from "../../../../components/TableEditableField";
import TitleSearchButton from "../../../../components/TitleSearchButton";

const ExpirableItemsModal = () => {
	const columnsItemView = [
		{
			header: "Batch No",
			accessorKey: "batchNo",
			size: 120,
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
			size: 250,
		},
		{
			header: "Item QTY",
			accessorKey: "qty",
			size: 120,
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
	const expirableItemsCol = [
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 120,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 120,
		},
		{
			header: "Item Description",
			accessorKey: "itemDesc",
			size: 250,
		},
		{
			header: "Store",
			accessorKey: "store",
			size: 120,
		},
		{
			header: "Expiray Date",
			accessorKey: "expiry",
			size: 120,
		},
		{
			header: "Days to Expire",
			accessorKey: "daysToExpire",
			size: 120,
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
			expiry: "04/12/23",
			daysToExpire: 6,
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
			expiry: "04/12/23",
			daysToExpire: 6,
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
	];
	return (
		<GenericModal
			btnLable="Issue"
			btnType="primary"
			width={1200}
			okText={"Submit"}
			className="expireable-item-modal"
			title={"Expirable Items"}
			content={
				<>
					<GenericMuiTable
						columns={expirableItemsCol}
						data={data}
						enablePagination={false}
						simpleTable
						className="mt-10 cl-table"
						slimTable
						enableColumnFilters={false}
						enableExpanding={true}
						// eslint-disable-next-line no-unused-vars
						renderDetailPanel={({ row }) => (
							<GenericMuiTable
								columns={columnsItemView}
								data={data}
								enablePagination={false}
								simpleTable
								isExpandable={true}
								slimTable
								enableColumnFilters={false}
							/>
						)}
					/>
				</>
			}
		/>
	);
};

export default ExpirableItemsModal;
