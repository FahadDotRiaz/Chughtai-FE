/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import TitleSearchButton from "../../components/TitleSearchButton";
import { PATH } from "../../../config";
import ActionDropdown from "../../components/ActionDropdown";
import { useState } from "react";
import GenericMuiTable from "../../components/GenericMuiTable";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import TableEditableField from "../../components/TableEditableField";
import { PlusOutlined } from "@ant-design/icons";

export default function Index() {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const navigate = useNavigate();
	const columns = [
		{
			header: "PR",
			accessorKey: "pr",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "PR Date",
			accessorKey: "date",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "Vendor",
			accessorKey: "vendor",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			enableColumnFilter: false,
		},
		{
			header: "Store",
			accessorKey: "store",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			filterVariant: "multi-select",
			filterSelectOptions: [
				"California",
				"Virginia",
				"South Carolina",
				"New York",
				"Texas",
			],
		},
		{
			header: "Voucher",
			accessorKey: "voucher",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			enableColumnFilter: false,
		},
		{
			header: "Amount",
			accessorKey: "amount",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: () => <TableEditableField field="number" defaultValue={1000} />,
		},
		{
			header: "Remarks",
			accessorKey: "remarks",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "Action",
			accessorKey: "actions",
			enableColumnFilter: false,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => (
				<ActionDropdown
					editOnClick={() => navigate(PATH.PRN_UPDATE.replace(":id", 0))}
					deleteOnClick={() => setShowDeleteDialog(true)}
				/>
			),
			size: 30,
		},
	];
	const data = [
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
		{
			pr: "2132",
			date: "11/24/2023",
			vendor: "Muneeb",
			store: "Lahore",
			amount: "1000",
			remarks: "Not in use",
			voucher: "N/A",
		},
	];

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	return (
		<>
			<TitleSearchButton
				title="PRR"
				isPrint
				btnLable="Generate PRR"
				onButtonChange={() => navigate(PATH.PRN_CREATE)}
				icon={<PlusOutlined />}
			/>
			<GenericMuiTable
				columns={columns}
				data={data}
				// paginationValue={pagination}
				// updatePaginationFunc={setPagination}
				// manualPagination={false}
				// totalRecords={50}
				enableColumnFilters={true}
			/>
			<AppConfirmDialog
				showModal={showDeleteDialog}
				description={`Are you sure you want to delete ?`}
				handleCancel={() => setShowDeleteDialog(false)}
				handleOk={() => setShowDeleteDialog(false)}
			/>
		</>
	);
}
