import { useNavigate } from "react-router-dom";
import { PATH } from "../../../config";
import TitleSearchButton from "../../components/TitleSearchButton";
import StatusTags from "../../components/StatusTags";
import ActionDropdown from "../../components/ActionDropdown";
import GenericMuiTable from "../../components/GenericMuiTable";
import { PlusOutlined } from "@ant-design/icons";
import { getUserRole } from "../../utils/helper";
import CardButtonFilterGroup from "../../components/CardButtonFilterGroup";

export default function PurchaseRequisitionList() {
	const navigate = useNavigate();

	const user = getUserRole();
	const columns = [
		{
			header: "PR #",
			accessorKey: "code",
		},
		{
			header: "Created Date ",
			accessorKey: "date",
		},
		{
			header: "Store",
			accessorKey: "store",
		},
		{
			header: "Department",
			accessorKey: "department",
		},
		{
			header: "Requisting Employee",
			accessorKey: "employee",
		},
		{
			header: "Remarks",
			accessorKey: "remarks",
		},
		{
			header: "Status",
			accessorKey: "status",
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
		},
		{
			header: "Action",
			accessorKey: "actions",
			enableColumnFilter: false,
			align: "center",
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			// eslint-disable-next-line no-unused-vars
			Cell: () => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.PURCHASE_REQUISITION_VIEW)}
					reViewOnClick={
						user?.toLowerCase() !== "store"
							? () => navigate(PATH.PURCHASE_REQUISITION_REVIEW)
							: undefined
					}
				/>
			),
		},
	];
	const data = [
		{
			code: "01022344",
			key: "1",
			store: "Head Office: Wear House",
			department: "Attok Chughtai Medical center CMC(73901)",
			employee: "ABID,4515",
			date: `11/13/2023`,
			created: "Muneeb",
			vendor: "10 Trading's",
			currency: "PKR",
			remarks: "Consumption added against items",
			status: "Completed",
		},
		{
			code: "01022344",
			key: "1",
			store: "Head Office: Wear House",
			department: "Attok Chughtai Medical center CMC(73901)",
			employee: "ABID,4515",
			date: `11/13/2023`,
			created: "Muneeb",
			vendor: "10 Trading's",
			currency: "PKR",
			remarks: "Consumption added against items",
			status: "Completed",
		},
		{
			code: "01022344",
			key: "1",
			store: "Head Office: Wear House",
			department: "Attok Chughtai Medical center CMC(73901)",
			employee: "ABID,4515",
			date: `11/13/2023`,
			created: "Muneeb",
			vendor: "10 Trading's",
			currency: "PKR",
			remarks: "Consumption added against items",
			status: "Completed",
		},
		{
			code: "01022344",
			key: "1",
			store: "Head Office: Wear House",
			department: "Attok Chughtai Medical center CMC(73901)",
			employee: "ABID,4515",
			date: `11/13/2023`,
			created: "Muneeb",
			vendor: "10 Trading's",
			currency: "PKR",
			remarks: "Consumption added against items",
			status: "Completed",
		},
	];
	return (
		<>
			<CardButtonFilterGroup
				title={{ text: "Purchase Requisitions", level: 1 }}
				button={{
					label: "Create",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.PURCHASE_REQUISITION_CREATE),
				}}
				filterBtn
			>
				<GenericMuiTable
					columns={columns}
					data={data}
					columnVisibility={{ store: user === "store" ? false : true }}
					// className="cl-table"
				/>
			</CardButtonFilterGroup>
		</>
	);
}
