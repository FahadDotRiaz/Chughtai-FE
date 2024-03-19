/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import StatusTags from "../../../components/StatusTags";
import ActionDropdown from "../../../components/ActionDropdown";
import { PATH } from "../../../../config";
import { useState } from "react";
import OrderTrackModal from "../Shared/components/OrderTrackModal";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { useLazyGetItemRequestHODReviewListQuery } from "../../../redux/slices/IRF";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { getFormattedDate } from "../../../utils/helper";
import LOOKUPS from "../../../utils/lookups";
import {
	ACTION_KEYS,
	MAKEYS,
	MIR_STAGE,
	MIR_STATUS,
} from "../../../utils/constant";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";

export default function Index() {
	const navigate = useNavigate();
	const [showTrack, setShowTrack] = useState(false);
	const [isTrackId, setShowTrackId] = useState(null);
	const { user, permissions } = useSelector((state) => state.auth);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const departmentId = user?.activeRole?.departmentId;
	const [getItems, { data: requests, isLoading, isFetching }] =
		useLazyGetItemRequestHODReviewListQuery();

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"mirNumber",
		"search",
	]);

	useEffect(() => {
		if (departmentId) {
			getItems({ departmentId, tableOptions: debouncedTableOptions });
		}
	}, [debouncedTableOptions, getItems, departmentId]);

	const data = requests?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.IRF_REVIEW]?.[action];
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
		// {
		// 	header: "From",
		// 	size: 250,
		// 	accessorKey: "fromDepartment.name",
		// filterSelectOptions: departments?.map((department) => {
		// 	return {
		// 		label: department?.name,
		// 		value: department?.name,
		// 	};
		// }),
		// filterVariant: "select",
		// id: "toDepartment",
		// Cell: ({ cell }) => <span>{cell?.getValue()?.name}</span>,
		// },
		// {
		// 	header: "Department",
		// 	size: 250,
		// 	accessorKey: "department",
		// 	Cell: ({ cell }) => <span>{cell?.getValue() || "N/A"}</span>,
		// },
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
					reViewOnClick={
						hasPermission(ACTION_KEYS.REVIEW)
							? [MIR_STAGE.HOD_APPROVAL].includes(cell.row.original.stage) &&
							  [MIR_STATUS.PENDING].includes(cell.row.original.status)
								? () =>
										navigate(PATH.MIR_REVIEW.replace(":id", cell?.getValue()))
								: undefined
							: undefined
					}
					trackOnClick={
						hasPermission(ACTION_KEYS.TRACK)
							? [MIR_STATUS.CANCELLED].includes(cell.row.original.status)
								? undefined
								: () => {
										setShowTrack(true);
										setShowTrackId(cell?.getValue());
								  }
							: undefined
					}
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(
										PATH.MIR_REVIEW_VIEW.replace(":id", cell?.getValue())
									)
							: undefined
					}
				/>
			),
		},
	];

	return (
		<>
			<CardButtonFilterGroup
				title={{ text: "Review Inventory Requisition Form", level: 1 }}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					manualPagination={true}
					isLoading={isLoading || isFetching}
					totalRecords={requests?.totalRows || 0}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<OrderTrackModal
				show={showTrack}
				onClose={() => setShowTrack(false)}
				isTrackId={isTrackId}
			/>
		</>
	);
}
