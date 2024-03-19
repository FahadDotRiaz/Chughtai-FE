/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import GenericMuiTable from "../../../components/GenericMuiTable";
import { useLazyGetConsumptionDeptListQuery } from "../../../redux/slices/consumption";
import ActionDropdown from "../../../components/ActionDropdown";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { PATH } from "../../../../config";
import { getFormattedDate } from "../../../utils/helper";
import useDebounce from "../../../hooks/useDebounce";
import { useGetDepartmentsQuery } from "../../../redux/slices/department";
import { ACTION_KEYS, MAKEYS } from "../../../utils/constant";

export default function Consumption() {
	const navigate = useNavigate();
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
		getConsumptionList,
		{ data: consumption, isLoading: isConsumptionListLoading, isFetching },
	] = useLazyGetConsumptionDeptListQuery();
	const { data: departments } = useGetDepartmentsQuery(departmentId);

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"consumptionCode",
		"remarks",
		"search",
	]);
	useEffect(() => {
		if (debouncedTableOptions) {
			getConsumptionList({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, getConsumptionList, departmentId]);

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.CONSUMPTION_STORE]?.[action];
	};

	const columns = [
		{
			header: "Consumption Code",
			accessorKey: "consumptionCode",
		},
		{
			header: "Department Name",
			accessorKey: "department.name",
			filterSelectOptions: departments?.map((department) => {
				return {
					label: department?.name,
					value: department?.name,
				};
			}),
			filterVariant: "select",
			id: "name",
		},
		{
			header: "Date",
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		{
			header: "Remarks",
			accessorKey: "remarks",
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
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(
										PATH.CONSUMPTION_STORE_VIEW?.replace(
											":id",
											cell?.getValue()
										)
									)
							: undefined
					}
				/>
			),
		},
	];

	const data = consumption?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	return (
		<>
			<CardButtonFilterGroup title={{ text: "Other Consumption", level: 1 }}>
				<GenericMuiTable
					columns={columns}
					data={data ? data : []}
					isLoading={isConsumptionListLoading || isFetching}
					manualPagination={true}
					totalRecords={consumption?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					// className="cl-table"
					// rowSelection={true}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
		</>
	);
}
