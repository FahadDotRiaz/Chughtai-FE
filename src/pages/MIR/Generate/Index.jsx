/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../config";
import StatusTags from "../../../components/StatusTags";
import ActionDropdown from "../../../components/ActionDropdown";
import { useEffect, useState } from "react";
import OrderTrackModal from "../Shared/components/OrderTrackModal";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { Space } from "antd";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import GenericButton from "../../../components/GenericButton";
import {
	useDeleteItemRequestMutation,
	useLazyGetItemRequestQuery,
} from "../../../redux/slices/IRF";
import useNotification from "../../../components/Notification";
import { getFormattedDate } from "../../../utils/helper";
import { useSelector } from "react-redux";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useDebounce from "../../../hooks/useDebounce";
import CustomTabs from "../../../components/CustomTabs";
import Issued from "./Issued/Index";
import SuggestedItems from "./SuggestedItems/Index";
import LOOKUPS from "../../../utils/lookups";
import {
	ACTION_KEYS,
	MAKEYS,
	MIR_STAGE,
	MIR_STATUS,
} from "../../../utils/constant";

export default function Index() {
	const navigate = useNavigate();
	const [showDialog, setShowDialog] = useState(false);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const { openNotification, contextHolder } = useNotification();
	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [getItems, { data: requests, isLoading, isFetching }] =
		useLazyGetItemRequestQuery();
	const [deleteItemRequest, { isLoading: deleteLoading }] =
		useDeleteItemRequestMutation();
	const [showTrack, setShowTrack] = useState(false);
	const [isTrackId, setShowTrackId] = useState(null);

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"mirNumber",
		"search",
	]);

	useEffect(() => {
		if (departmentId) {
			getItems({ departmentId, tableOptions: debouncedTableOptions });
		}
	}, [debouncedTableOptions, getItems, departmentId]);

	const handleEdit = (cell) => {
		if (cell.row.original.status === "APPROVED") {
			setShowDialog({ show: true, type: "status" });
		} else {
			navigate(PATH.MIR_UPDATE?.replace(":id", cell?.getValue()));
		}
	};
	const handleCancel = async () => {
		const { error } = await deleteItemRequest(showDialog?.id);
		if (!error) {
			openNotification("success", "Request cancelled successfully");
		} else {
			openNotification("error", error?.message || "Error cancelling request");
		}
		setShowDialog({ show: false });
	};

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.IRF_GENERATE]?.[action];
	};

	const columns = [
		{
			header: "IRF N0#",
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
				<ActionDropdown
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(
										PATH.MIR_GENERATE_VIEW?.replace(":id", cell?.getValue())
									)
							: undefined
					}
					editOnClick={
						hasPermission(ACTION_KEYS.EDIT)
							? [MIR_STATUS.PENDING].includes(cell.row.original.status) &&
							  [MIR_STAGE.HOD_APPROVAL].includes(cell.row.original.stage)
								? () => handleEdit(cell)
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
					cancelOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? [MIR_STATUS.PENDING].includes(cell.row.original.status) &&
							  [MIR_STAGE.HOD_APPROVAL].includes(cell.row.original.stage)
								? () =>
										setShowDialog({
											show: true,
											type: "cancel",
											id: cell?.getValue(),
										})
								: undefined
							: undefined
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

	const MyMIR = (
		<>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "My Inventory Requisition Form", level: 1 }}
				button={
					hasPermission(ACTION_KEYS.ADD)
						? {
								label: "Generate New IRF",
								icon: <PlusOutlined />,
								onClick: () => navigate(PATH.MIR_GENERATE),
						  }
						: undefined
				}
			>
				<GenericMuiTable
					columns={columns}
					data={data ? data : []}
					maxHeight={"60vh"}
					isLoading={isLoading || deleteLoading || isFetching}
					manualPagination={true}
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
				isTrackId={isTrackId}
				onClose={() => setShowTrack(false)}
			/>
			<AppConfirmDialog
				showModal={showDialog?.show}
				description={`Are you sure you want to ${showDialog?.type} this request?`}
				footer={
					<Space>
						<GenericButton
							type="secondary"
							lable="Cancel"
							onClick={() => setShowDialog({ show: false })}
						/>
						<GenericButton type="primary" lable="OK" onClick={handleCancel} />
					</Space>
				}
			/>
		</>
	);

	const tabsData = [
		{
			label: "My Requests",
			content: MyMIR,
		},
		{
			label: "Suggested From Store",
			content: <SuggestedItems />,
		},
		{
			label: "Issued",
			content: <Issued />,
		},
	];

	return <CustomTabs tabsData={tabsData} />;
}
