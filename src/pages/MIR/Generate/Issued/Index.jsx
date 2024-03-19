/* eslint-disable react/prop-types */
import CardButtonFilterGroup from "../../../../components/CardButtonFilterGroup";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import { useLazyGetSirListQuery } from "../../../../redux/slices/sir";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../../../utils/helper";
import TableActionButton from "../../../../components/TableActionButton";
import { useEffect, useState } from "react";
import { PATH } from "../../../../../config";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../../hooks/useDebounce";

const Issued = () => {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});

	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const [sirListData, { data: sirList, isLoading, isFetching }] =
		useLazyGetSirListQuery();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"sinNumber",
		"mirNumber",
	]);

	useEffect(() => {
		if (debouncedTableOptions) {
			sirListData({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, sirListData, departmentId]);

	const navigate = useNavigate();
	const columns = [
		{
			header: "SIR N0#",
			size: 250,
			accessorKey: "sinNumber",
			id: "sinNumber",
			// muiFilterTextFieldProps: { type: "number" },
		},
		{
			header: "MIR N0#",
			size: 250,
			accessorKey: "mir.mirNumber",
			id: "mirNumber",
			// muiFilterTextFieldProps: { type: "number" },
		},
		{
			header: "generated date",
			size: 250,
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		{
			header: "actions",
			accessorKey: "id",
			size: 5,
			enableColumnFilter: false,
			align: "center",
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => (
				<TableActionButton
					onView={() =>
						navigate(PATH.MIR_ISSUED_SIN_VIEW.replace(":id", cell?.getValue()))
					}
				/>
			),
		},
	];

	const data = sirList?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	return (
		<>
			<CardButtonFilterGroup title={{ text: "Issued", level: 1 }}>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					maxHeight={"60vh"}
					isLoading={isLoading || isFetching}
					enableGlobalFilter={false}
					manualPagination={true}
					totalRecords={sirList?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
				/>
			</CardButtonFilterGroup>
		</>
	);
};

export default Issued;
