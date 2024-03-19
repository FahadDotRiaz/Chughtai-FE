import { useEffect, useState } from "react";
import { PATH } from "../../../../config";
import ActionDropdown from "../../../components/ActionDropdown";
import GenericMuiTable from "../../../components/GenericMuiTable";
import StatusTags from "../../../components/StatusTags";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useLazyGetGrnListQuery } from "../../../redux/slices/GRN";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../../utils/helper";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import { useGetVendorsListQuery } from "../../../redux/slices/vendors";
import { GRN_STATUS } from "../../../utils/constant";
import OrderTrackModal from "../../MIR/Shared/components/OrderTrackModal";

const Index = () => {
	const { id: poCode } = useParams();
	const [showTrack, setShowTrack] = useState({ show: false, id: null });

	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const { data: vendorsList = [] } = useGetVendorsListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 500,
				pageIndex: 0,
			},
		},
	});
	const [grnListData, { data: grnList, isLoading: grnLoading, isFetching }] =
		useLazyGetGrnListQuery();
	const navigate = useNavigate();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"grnCode",
		"poCode",
	]);

	useEffect(() => {
		if (debouncedTableOptions) {
			grnListData({
				tableOptions: {
					...debouncedTableOptions,
					filters: {
						...tableOptions.filters,
						poCode: poCode && poCode,
					},
				},
				departmentId,
			});
		}
	}, [debouncedTableOptions, grnListData, departmentId]);

	const columns = [
		{
			header: "GRN",
			accessorKey: "grnCode",
			size: 120,
		},
		{
			header: "Generated Date",
			accessorKey: "createDateTime",
			size: 120,
			filterVariant: "date",
		},
		{
			header: "PO",
			accessorKey: "po.poCode",
			id: "poCode",
			size: 120,
		},
		{
			header: "Status",
			accessorKey: "status",
			size: 120,
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
			filterSelectOptions: LOOKUPS.GRN_STATUS,
			filterVariant: "select",
		},
		{
			header: "Vendor",
			accessorKey: "po.vendor.name",
			size: 120,
			id: "vendorId",
			filterSelectOptions: vendorsList?.list?.map((vendor) => {
				return {
					label: vendor.name,
					value: vendor.id,
				};
			}),
			filterVariant: "select",
		},

		{
			header: "Remarks",
			accessorKey: "remarks",
			size: 200,
			Cell: ({ cell }) => (
				<div className="">
					{cell?.getValue()?.length > 120
						? cell?.getValue()?.substring(0, 120) + "..."
						: cell?.getValue() || "N/A"}
				</div>
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
			Cell: ({ cell }) => (
				<ActionDropdown
					viewOnClick={() =>
						navigate(PATH.GRN_VIEW.replace(":id", cell?.getValue()))
					}
					editOnClick={
						cell?.row?.original?.status === GRN_STATUS.PENDING
							? () => navigate(PATH.GRN_UPDATE.replace(":id", cell?.getValue()))
							: undefined
					}
					reViewOnClick={
						cell?.row?.original?.status === GRN_STATUS.PENDING
							? () => navigate(PATH.GRN_REVIEW.replace(":id", cell?.getValue()))
							: undefined
					}
					trackOnClick={() => {
						setShowTrack({ show: true, id: cell?.getValue() });
					}}
				/>
			),
		},
	];

	const data = grnList?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	return (
		<>
			<CardButtonFilterGroup
				title={{ text: poCode ? "All GRN's" : "GRN Requests", level: 1 }}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={grnLoading || isFetching}
					manualPagination={true}
					totalRecords={grnList?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<OrderTrackModal
				show={showTrack?.show}
				onClose={() => setShowTrack({ show: false, id: null })}
				isTrackId={showTrack?.id}
				trackType={"grn"}
			/>
		</>
	);
};

export default Index;

Index.propTypes = {
	cell: PropTypes.object,
};
