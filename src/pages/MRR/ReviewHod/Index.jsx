/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GenericMuiTable from "../../../components/GenericMuiTable";
import { PATH } from "../../../../config";
// import { PlusOutlined } from "@ant-design/icons";
import ActionDropdown from "../../../components/ActionDropdown";
// import CustomTabs from "../../../components/CustomTabs";

import StatusTags from "../../../components/StatusTags";
import { useLazyGetIrrHodReviewListQuery } from "../../../redux/slices/IRR";
import { getFormattedDate } from "../../../utils/helper";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import {
	ACTION_KEYS,
	MAKEYS,
	MIR_STAGE,
	MIR_STATUS,
} from "../../../utils/constant";
import OrderTrackModal from "../../MIR/Shared/components/OrderTrackModal";

export default function Index() {
	const [showTrack, setShowTrack] = useState({ show: false, id: null });

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
		irrReviewListData,
		{ data: IrrReviewList, isLoading: irrReviewListLoading, isFetching },
	] = useLazyGetIrrHodReviewListQuery();

	const debouncedTableOptions = useDebounce(tableOptions, 1000, ["mrrCode"]);

	useEffect(() => {
		if (debouncedTableOptions) {
			irrReviewListData({ departmentId, tableOptions: debouncedTableOptions });
		}
	}, [debouncedTableOptions, irrReviewListData, departmentId]);

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.IRR_REVIEW]?.[action];
	};

	const columns = [
		{
			header: "Code",
			accessorKey: "mrrCode",
		},
		{
			header: "Generated Date",
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		// {
		//   header: "Generated By",
		//   accessorKey: "fromDepartment.name",
		// },
		{
			header: "Status",
			accessorKey: "status",
			size: 250,
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
			filterSelectOptions: LOOKUPS.MIR_STATUS,
			filterVariant: "select",
		},
		{
			header: "stage",
			accessorKey: "stage",
			size: 250,
			Cell: ({ cell }) => <span>{cell?.getValue()?.replace(/_/g, " ")}</span>,
			filterSelectOptions: [
				{ label: "Completed", value: "COMPLETED" },
				{ label: "HOD Approval", value: "HOD_APPROVAL" },
				{ label: "Store Approval", value: "STORE_APPROVAL" },
				{ label: "Partial Complete", value: "PARTIAL_COMPLETE" },
			],
			filterVariant: "select",
		},
		{
			header: "Actions",
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
			Cell: ({ cell, row }) => (
				<ActionDropdown
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(PATH.MRR_HOD_VIEW.replace(":id", cell?.getValue()))
							: undefined
					}
					reViewOnClick={
						hasPermission(ACTION_KEYS.REVIEW)
							? [MIR_STATUS.PENDING].includes(cell.row.original.status) &&
							  [MIR_STAGE.HOD_APPROVAL].includes(cell.row.original.stage)
								? () =>
										navigate(
											PATH.MRR_HOD_REVIEW.replace(":id", cell?.getValue())
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

	const navigate = useNavigate();
	return (
		<>
			<CardButtonFilterGroup
				title={{ text: "Inventory Retrun Request (HOD)", level: 1 }}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={irrReviewListLoading || isFetching}
					manualPagination={true}
					totalRecords={IrrReviewList?.totalRows || 0}
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