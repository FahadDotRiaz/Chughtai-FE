import { useEffect, useState } from "react";
import { PATH } from "../../../../config";
import ActionDropdown from "../../../components/ActionDropdown";
import GenericMuiTable from "../../../components/GenericMuiTable";
import StatusTags from "../../../components/StatusTags";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CreateGRN from "./components/CreateGRN";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import GenericButton from "../../../components/GenericButton";
import PropTypes from "prop-types";
import { useGetPOListQuery } from "../../../redux/slices/purchaseOrder";
import {
	useDeleteGrnMutation,
	useLazyGetGrnListQuery,
} from "../../../redux/slices/GRN";
import { useSelector } from "react-redux";
import useNotification from "../../../components/Notification";
import { getFormattedDate } from "../../../utils/helper";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import { useGetVendorsListQuery } from "../../../redux/slices/vendors";
import OrderTrackModal from "../../MIR/Shared/components/OrderTrackModal";

const Index = () => {
	const [createModal, setCreateModal] = useState(false);
	const [showTrack, setShowTrack] = useState({ show: false, id: null });

	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	console.log(tableOptions, "tableOptions");
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [isEditable, setIsEditable] = useState(false);
	const { data: POList = {} } = useGetPOListQuery({
		departmentId,
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
	});
	const [showDialog, setShowDialog] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);
	const { openNotification, contextHolder } = useNotification();
	const [deleteGrn, { isLoading: isDeleteLoading }] = useDeleteGrnMutation();
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
			grnListData({ tableOptions: debouncedTableOptions, departmentId });
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
		// {
		// 	header: "PO Date",
		// 	accessorKey: "poDate",
		// },
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
						navigate(PATH.GRN_GENERATE_VIEW.replace(":id", cell?.getValue()))
					}
					deleteOnClick={() => handleOpenModal(cell?.getValue())}
					trackOnClick={() => {
						setShowTrack({ show: true, id: cell?.getValue() });
					}}
				/>
			),
		},
	];

	const handleOpenModal = (id) => {
		setIdToDelete(id);
		setShowDialog(true);
	};

	const handleDelete = async (id) => {
		const { error } = await deleteGrn(id);
		if (!error) {
			openNotification("success", "GRN deleted successfully");
		} else {
			openNotification("error", "Error deleting request");
		}
	};

	const handleOk = () => {
		if (idToDelete) {
			handleDelete(idToDelete);
			setShowDialog(false);
		}
	};

	const data = grnList?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	return (
		<>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "My GRN", level: 1 }}
				button={{
					label: "Create GRN",
					icon: <PlusOutlined />,
					onClick: () => setCreateModal(true),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={grnLoading || isFetching || isDeleteLoading}
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
			<CreateGRN
				onClose={() => setCreateModal(false)}
				show={createModal}
				POList={POList}
			/>
			<AppConfirmDialog
				showModal={isEditable}
				title="Unable to edit this GRN as it has been Completed"
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => setIsEditable(false)}
					/>
				}
			/>
			<AppConfirmDialog
				showModal={showDialog}
				description="Are you sure you want to delete this GRN?"
				handleCancel={() => setShowDialog(false)}
				handleOk={handleOk}
			/>
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
