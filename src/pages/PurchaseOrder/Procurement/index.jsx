/* eslint-disable react/prop-types */
import { PATH } from "../../../../config";
import StatusTags from "../../../components/StatusTags";
import GenericMuiTable from "../../../components/GenericMuiTable";
import ActionDropdown from "../../../components/ActionDropdown";
import { PlusOutlined } from "@ant-design/icons";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { useLazyGetPOListQuery } from "../../../redux/slices/purchaseOrder";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../../utils/helper";
import useDebounce from "../../../hooks/useDebounce";

import { useSelector } from "react-redux";
import { useGetVendorsListQuery } from "../../../redux/slices/vendors";

export default function POProcurement() {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	// const departmentId = useMemo(
	//   () => "ebe00ec3-c54e-43bd-a523-41beb9cf9f63",
	//   []
	// );
	const { data: vendorsList = [] } = useGetVendorsListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 200,
				pageIndex: 0,
			},
		},
	});

	const [getPurchaseOrder, { data: purchaseOrderList = [], isLoading }] =
		useLazyGetPOListQuery();

	const columns = [
		{
			header: "PO #",
			accessorKey: "poCode",
		},
		{
			header: "Created Date ",
			accessorKey: "createDateTime",
		},
		{
			header: "Approval Date ",
			accessorKey: "date",
		},
		{
			header: "Vendor ",
			accessorKey: "vendor.name",
			id: "vendorName",
			filterSelectOptions: vendorsList?.list?.map((vendor) => {
				return {
					label: vendor.name,
					value: vendor.name,
				};
			}),

			filterVariant: "select",
		},
		{
			header: "Currency",
			accessorKey: "currency",
		},
		{
			header: "Status",
			accessorKey: "status",
			// eslint-disable-next-line react/prop-types
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
		},
		{
			header: "Remarks",
			accessorKey: "remarks",
			// id: "remarks",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue() || "N/A"}</div>
			),
		},
		{
			header: "Action",
			accessorKey: "id",
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
			Cell: ({ cell }) => (
				<ActionDropdown
					viewOnClick={() =>
						navigate(
							PATH.PROCUREMENT_PURCHASE_ORDER_VIEW.replace(
								":id",
								cell?.getValue()
							)
						)
					}
					editOnClick={() =>
						navigate(
							PATH.PROCUREMENT_PURCHASE_ORDER_UPDATE.replace(
								":id",
								cell?.getValue()
							)
						)
					}
				/>
			),
		},
	];

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"remarks",
		"poCode",
		"status",
		"vendorName",
		"search",
	]);
	useEffect(() => {
		if (departmentId) {
			getPurchaseOrder({ departmentId, tableOptions: debouncedTableOptions });
		}
	}, [
		debouncedTableOptions,
		getPurchaseOrder,
		departmentId,
		tableOptions.filters,
	]);
	const data = purchaseOrderList?.list?.map((items) => {
		return {
			...items,
			createDateTime: getFormattedDate(items?.createDateTime, "DD-MM-YYYY"),
		};
	});
	return (
		<>
			<CardButtonFilterGroup
				title={{ text: "Purchase Orders", level: 1 }}
				button={{
					label: "Create",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.PROCUREMENT_PURCHASE_ORDER_CREATE),
				}}
				filterBtn
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={isLoading}
					totalRecords={purchaseOrderList?.totalRows}
					manualPagination={true}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					// className="cl-table"
				/>
			</CardButtonFilterGroup>
		</>
	);
}
