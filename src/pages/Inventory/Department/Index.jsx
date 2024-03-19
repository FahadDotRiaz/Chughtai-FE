/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import TitleSearchButton from "../../../components/TitleSearchButton";
import ActionDropdown from "../../../components/ActionDropdown";
import { useEffect, useState } from "react";
import GenericMuiTable from "../../../components/GenericMuiTable";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CreateUpdate from "../components/CreateUpdate";
import {
	useDeleteInventoryItemMutation,
	useGetInventoryItemListQuery,
	useLazyGetInventoryItemListQuery,
} from "../../../redux/slices/inventory";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useNotification from "../../../components/Notification";

import useDebounce from "../../../hooks/useDebounce";
import { ACTION_KEYS, MAKEYS } from "../../../utils/constant";

export default function Index() {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [addUpdateDialog, setAddUpdateDialog] = useState({
		show: false,
		record: null,
	});
	const { openNotification, contextHolder } = useNotification();
	const [deleteDialog, setDeleteDialog] = useState({
		id: null,
		show: false,
	});
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const [
		getDepartInventory,
		{ data: intentoryItemList = {}, isLoading: isListLoading, isFetching },
	] = useLazyGetInventoryItemListQuery();
	const [deleteInventoryItem, { isLoading: isDeleteLoading }] =
		useDeleteInventoryItemMutation();

	const navigate = useNavigate();

	const deleteHandler = async () => {
		setDeleteDialog({ id: null, show: false });
		const { error } = await deleteInventoryItem(deleteDialog?.id);
		if (error) {
			openNotification("error", "Error deleting record");
		}
	};
	const hasPermission = (action) => {
		return permissions?.[MAKEYS.INVENTORY_MANAGEMENT_DEPARTMENT]?.[action];
	};
	const columns = [
		{
			header: "Item Code",
			accessorKey: "item.itemCode",
			id: "itemCode",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "Name",
			accessorKey: "item.name",
			id: "name",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "UOM",
			accessorKey: "uom",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "In Stock",
			accessorKey: "quantity",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			//   filterVariant: "multi-select",
			//   filterSelectOptions: [
			//     "California",
			//     "Virginia",
			//     "South Carolina",
			//     "New York",
			//     "Texas",
			//   ],
		},
		{
			header: "Min",
			accessorKey: "min",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => <span>{cell.getValue() || "0"}</span>,
		},
		{
			header: "Max",
			accessorKey: "max",
			size: 150,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => <span>{cell.getValue() || "0"}</span>,
		},
		// {
		//   header: "Department",
		//   accessorKey: "department",
		//   size: 150,
		//   muiTableHeadCellProps: {
		//     align: "center",
		//   },
		//   muiTableBodyCellProps: {
		//     align: "center",
		//   },
		// },
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
			Cell: ({ row }) => (
				<ActionDropdown
					editOnClick={
						hasPermission(ACTION_KEYS.EDIT)
							? () => setAddUpdateDialog({ record: row?.original, show: true })
							: undefined
					}
					deleteOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? () => setDeleteDialog({ id: row?.original?.id, show: true })
							: undefined
					}
				/>
			),
			size: 30,
		},
	];
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"itemCode",
		"quantity",
		"min",
		"max",
	]);
	useEffect(() => {
		if (departmentId) {
			getDepartInventory({
				departmentId,
				type: "SELF",
				tableOptions: debouncedTableOptions,
			});
		}
	}, [
		debouncedTableOptions,
		getDepartInventory,
		departmentId,
		tableOptions.filters,
	]);
	const data =
		intentoryItemList?.list?.map((item) => {
			return {
				...item,
				uom: "Unit",
				// department: "Bio Chemistry",
			};
		}) || [];

	return (
		<>
			{/* <TitleSearchButton
				title="Inventory Management"
				// btnLable="Add Item"
				// onButtonChange={() => setAddUpdateDialog({ record: null, show: true })}
				icon={<PlusOutlined />}
			/> */}
			<CardButtonFilterGroup title={{ text: "Department Inventory", level: 1 }}>
				<GenericMuiTable
					columns={columns}
					data={data}
					isLoading={isListLoading || isFetching || isDeleteLoading}
					// enableColumnFilters={true}
					enableGlobalFilter={false}
					totalRecords={intentoryItemList?.totalRows}
					manualPagination={true}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDeleteDialog}
				description={`Are you sure you want to delete ?`}
				handleCancel={() => setShowDeleteDialog(false)}
				handleOk={() => setShowDeleteDialog(false)}
			/>
			<CreateUpdate
				show={addUpdateDialog?.show}
				record={addUpdateDialog?.record}
				onHide={() => setAddUpdateDialog({ record: null, show: false })}
				onOk={() => setAddUpdateDialog({ record: null, show: false })}
			/>
			<AppConfirmDialog
				showModal={deleteDialog?.show}
				description="Are you sure you want to delete this Item?"
				handleCancel={() => setDeleteDialog({ id: null, show: false })}
				handleOk={deleteHandler}
			/>
		</>
	);
}
