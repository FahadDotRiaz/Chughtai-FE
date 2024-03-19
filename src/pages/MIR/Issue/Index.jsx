/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import StatusTags from "../../../components/StatusTags";
import ActionDropdown from "../../../components/ActionDropdown";
import { PATH } from "../../../../config";
import GenericMuiTable from "../../../components/GenericMuiTable";
import CustomTabs from "../../../components/CustomTabs";
import { useLazyGetItemRequestReviewListQuery } from "../../../redux/slices/IRF";
import { Spin } from "antd";
import { getFormattedDate } from "../../../utils/helper";
import { useLazyGetSirToListQuery } from "../../../redux/slices/sir";
import TableActionButton from "../../../components/TableActionButton";
import { useSelector } from "react-redux";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import { useGetDepartmentsQuery } from "../../../redux/slices/department";
import {
	ACTION_KEYS,
	MAKEYS,
	MIR_STAGE,
	MIR_STATUS,
} from "../../../utils/constant";
import OrderTrackModal from "../Shared/components/OrderTrackModal";

export default function Index() {
	const { user, permissions } = useSelector((state) => state.auth);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [showTrack, setShowTrack] = useState({ show: false, id: null });
	const departmentId = user?.activeRole?.departmentId;
	const [getItems, { data: requests, isLoading, isFetching }] =
		useLazyGetItemRequestReviewListQuery();
	const { data: departments } = useGetDepartmentsQuery(departmentId);
	const [
		sirListData,
		{ data: sirToList, isLoading: isSirToLoading, isFetching: isSirToFetching },
	] = useLazyGetSirToListQuery();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"mirNumber",
		"sinNumber",
	]);

	useEffect(() => {
		if (departmentId) {
			getItems({ departmentId, tableOptions: debouncedTableOptions });
		} else if (debouncedTableOptions) {
			sirListData({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, getItems, sirListData, departmentId]);

	useEffect(() => {
		if (debouncedTableOptions) {
			sirListData({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, sirListData, departmentId]);

	const navigate = useNavigate();

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.IRF_ISSUE]?.[action];
	};

	const columns = [
		{
			header: "CODE",
			accessorKey: "mirNumber",
			size: 250,
			muiFilterTextFieldProps: { type: "number" },
		},
		{
			header: "generated date",
			size: 250,
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		{
			header: "From",
			size: 250,
			accessorKey: "fromDepartment.name",
			filterSelectOptions: departments?.map((department) => {
				return {
					label: department?.name,
					value: department?.name,
				};
			}),
			filterVariant: "select",
			id: "toDepartment",
			// Cell: ({ cell }) => <span>{cell?.getValue()?.name}</span>,
		},
		{
			header: "Stage",
			size: 250,
			accessorKey: "stage",
			Cell: ({ cell }) => <span>{cell?.getValue()?.replace(/_/g, " ")}</span>,
			filterSelectOptions: LOOKUPS?.MIR_STAGE,
			filterVariant: "select",
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
			header: "actions",
			accessorKey: "id",
			enableColumnFilter: false,
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			align: "center",
			Cell: ({ cell }) => (
				<ActionDropdown
					issueOnClick={
						hasPermission(ACTION_KEYS.ISSUE)
							? [MIR_STATUS.PENDING, MIR_STATUS.PARTIAL_ISSUED].includes(
									cell.row.original.status
							  ) &&
							  [MIR_STAGE.STORE_APPROVAL].includes(cell.row.original.stage)
								? () =>
										navigate(PATH.MIR_ISSUE.replace(":id", cell?.getValue()))
								: undefined
							: undefined
					}
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(PATH.MIR_ISSUE_VIEW.replace(":id", cell?.getValue()))
							: undefined
					}
					trackOnClick={
						hasPermission(ACTION_KEYS.TRACK)
							? [MIR_STATUS.CANCELLED].includes(cell.row.original.status)
								? undefined
								: () => {
										setShowTrack({ show: true, id: cell?.getValue() });
								  }
							: undefined
					}
				/>
			),
		},
	];
	const issuedColumns = [
		{
			header: "SIR #",
			accessorKey: "sinNumber",
			id: "sinNumber",
			//   size: 250,
		},
		{
			header: "IRF #",
			//   size: 250,
			accessorKey: "mir.mirNumber",
			id: "mirNumber",
		},
		// {
		//   header: "Issued By",
		//   //   size: 250,
		//   accessorKey: "issuedBy",
		// },
		{
			header: "Issue Date",
			//   size: 250,
			accessorKey: "generatedDate",
			filterVariant: "date",
		},
		// {
		//   header: "Status",
		//   size: 200,
		//   accessorKey: "status",
		//   Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
		//   filterSelectOptions: LOOKUPS.MIR_STATUS,
		//   filterVariant: "select",
		// },
		{
			header: "actions",
			accessorKey: "mir.id",
			enableColumnFilter: false,
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			align: "center",
			Cell: ({ cell }) => (
				<TableActionButton
					type="view"
					onClick={() =>
						navigate(PATH.MIR_ISSUE_VIEW?.replace(":id", cell?.getValue()))
					}
				/>
			),
		},
	];

	const data = requests?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});
	const issuedData = sirToList?.list?.map((item) => {
		return {
			...item,
			generatedDate: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	//   const issuedData = [
	//     {
	//       sir: "130345",
	//       irf: "02010010981",
	//       issuedBy: "Muneeb",
	//       issuedDate: "12-01-2024",
	//       status: "Completed",
	//     },
	//     {
	//       sir: "130345",
	//       irf: "02010010981",
	//       issuedBy: "Muneeb",
	//       issuedDate: "12-01-2024",
	//       status: "Completed",
	//     },
	//     {
	//       sir: "130345",
	//       irf: "02010010981",
	//       issuedBy: "Muneeb",
	//       issuedDate: "12-01-2024",
	//       status: "Completed",
	//     },
	//   ];
	const tabsData = [
		{
			label: "Requested",
			content: (
				<>
					<CardButtonFilterGroup topSpace>
						<GenericMuiTable
							columns={columns}
							data={data || []}
							maxHeight={"60vh"}
							isLoading={isLoading || isFetching}
							manualPagination={true}
							totalRecords={requests?.totalRows || 0}
							updatePaginationFunc={(data) =>
								setTableOptions({ ...tableOptions, pagination: data })
							}
							updateColumnFilters={setTableOptions}
							manualFiltering={true}
						/>
					</CardButtonFilterGroup>
					<OrderTrackModal
						show={showTrack?.show}
						onClose={() => setShowTrack({ show: false, id: null })}
						isTrackId={showTrack?.id}
					/>
				</>
			),
		},
		// {
		//   label: "Suggested Items",
		//   content: <SuggestedItems />,
		// },
		{
			label: "Issued",
			content: (
				<CardButtonFilterGroup topSpace>
					<GenericMuiTable
						columns={issuedColumns}
						data={issuedData || []}
						maxHeight={"60vh"}
						isLoading={isSirToLoading || isSirToFetching}
						enableGlobalFilter={false}
						manualPagination={true}
						totalRecords={sirToList?.totalRows}
						updatePaginationFunc={(data) =>
							setTableOptions({ ...tableOptions, pagination: data })
						}
						updateColumnFilters={setTableOptions}
						manualFiltering={true}
					/>
				</CardButtonFilterGroup>
			),
		},
	];
	return isLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<CustomTabs tabsData={tabsData} />
	);
}
