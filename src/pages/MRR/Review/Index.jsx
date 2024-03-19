/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../config";
import GenericMuiTable from "../../../components/GenericMuiTable";
import StatusTags from "../../../components/StatusTags";
import { useLazyGetIrrReviewListQuery } from "../../../redux/slices/IRR";
import { getFormattedDate } from "../../../utils/helper";
import { useSelector } from "react-redux";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import { useGetDepartmentsQuery } from "../../../redux/slices/department";
import ActionDropdown from "../../../components/ActionDropdown";
import {
	ACTION_KEYS,
	MAKEYS,
	MIR_STAGE,
	MIR_STATUS,
} from "../../../utils/constant";
import OrderTrackModal from "../../MIR/Shared/components/OrderTrackModal";

export default function StoreReview() {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const navigate = useNavigate();
	const [showTrack, setShowTrack] = useState({ show: false, id: null });
	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const [
		irrReviewListData,
		{ data: IrrReviewList, isLoading: irrReviewListLoading, isFetching },
	] = useLazyGetIrrReviewListQuery();
	const { data: departments } = useGetDepartmentsQuery(departmentId);
	const debouncedTableOptions = useDebounce(tableOptions, 1000, ["mrrCode"]);

	useEffect(() => {
		if (debouncedTableOptions) {
			irrReviewListData({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, irrReviewListData, departmentId]);

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.IRR_ISSUE]?.[action];
	};

	const columns = [
		{
			header: "Code",
			accessorKey: "mrrCode",
			size: 200,
		},
		{
			header: "Generated Date",
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		{
			header: "Status",
			size: 200,
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
			header: "From",
			accessorKey: "fromDepartment",
			filterSelectOptions: departments?.map((department) => {
				return {
					label: department?.name,
					value: department?.name,
				};
			}),
			filterVariant: "select",
			Cell: ({ cell }) => <div>{cell?.getValue()?.name}</div>,
			size: 200,
			id: "name",
		},
		{
			header: "Actions",
			accessorKey: "id",
			enableColumnFilter: false,
			size: 20,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			align: "center",
			// eslint-disable-next-line no-unused-vars
			Cell: ({ cell }) => (
				<ActionDropdown
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(
										PATH.MRR_STORE_REVIEW_VIEW.replace(":id", cell?.getValue())
									)
							: undefined
					}
					reViewOnClick={
						hasPermission(ACTION_KEYS.ISSUE)
							? [MIR_STATUS.PENDING].includes(cell.row.original.status) &&
							  [MIR_STAGE.STORE_APPROVAL].includes(cell.row.original.stage)
								? () =>
										navigate(
											PATH.MRR_STORE_REVIEW.replace(":id", cell?.getValue())
										)
								: undefined
							: undefined
					}
					trackOnClick={
						hasPermission(ACTION_KEYS.TRACK)
							? () => {
									setShowTrack({ show: true, id: cell?.getValue() });
							  }
							: undefined
					}
				/>
			),
		},
	];

	const data = IrrReviewList?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	return (
		<>
			<CardButtonFilterGroup
				title={{ text: "Review Inventory Return Request", level: 1 }}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={irrReviewListLoading || isFetching}
					manualPagination={true}
					totalRecords={IrrReviewList?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					enableGlobalFilter={false}
					manualFiltering={true}
				/>
			</CardButtonFilterGroup>
			<OrderTrackModal
				show={showTrack?.show}
				onClose={() => setShowTrack({ show: false, id: null })}
				isTrackId={showTrack?.id}
			/>
		</>
	);
}
