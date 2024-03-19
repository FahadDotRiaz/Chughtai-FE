/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PATH } from "../../../../../config";
import GenericButton from "../../../../components/GenericButton";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import { useNavigate } from "react-router-dom";
import { useLazyGetItemRequestQuery } from "../../../../redux/slices/IRF";
import useDebounce from "../../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../../../utils/helper";
import StatusTags from "../../../../components/StatusTags";
import LOOKUPS from "../../../../utils/lookups";

const SuggestedItems = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [getItems, { data: requests, isLoading, isFetching }] =
		useLazyGetItemRequestQuery();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"mirNumber",
		"search",
	]);

	useEffect(() => {
		if (departmentId) {
			getItems({
				departmentId,
				tableOptions: {
					...debouncedTableOptions,
					filters: {
						...tableOptions.filters,
						isSuggested: true,
					},
				},
			});
		}
	}, [debouncedTableOptions, getItems, departmentId]);

	const data = requests?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	const columns = [
		{
			header: "MIR N0#",
			size: 250,
			accessorKey: "mirNumber",
			muiFilterTextFieldProps: { type: "number" },
		},
		{
			header: "generated date",
			size: 250,
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		{
			header: "status",
			size: 250,
			accessorKey: "status",
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
			filterSelectOptions: LOOKUPS.MIR_STATUS,
			filterVariant: "select",
		},
		{
			header: "stage",
			accessorKey: "stage",
			size: 250,
			Cell: ({ cell }) => <span>{cell?.getValue()?.replace(/_/g, " ")}</span>,
			filterSelectOptions: LOOKUPS?.MIR_STAGE,
			filterVariant: "select",
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
				<div className="flex justify-center">
					<GenericButton
						type="primary"
						lable="Review"
						onClick={() =>
							navigate(
								PATH.MIR_GENERATE_SUGGESTED_REVIEW.replace(
									":id",
									cell?.getValue()
								)
							)
						}
					/>
				</div>
			),
		},
	];
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	return (
		<>
			<TitleSearchButton title="Suggested From Store" printBtn />
			<GenericMuiTable
				columns={columns}
				data={data ? data : []}
				maxHeight={"60vh"}
				isLoading={isLoading || isFetching}
				manualPagination={true}
				totalRecords={requests?.totalRows || 0}
				updatePaginationFunc={(data) =>
					setTableOptions({ ...tableOptions, pagination: data })
				}
				updateColumnFilters={setTableOptions}
				manualFiltering={true}
				enableGlobalFilter={false}
			/>
		</>
	);
};

export default SuggestedItems;
