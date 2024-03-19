/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import GenericMuiTable from "../../components/GenericMuiTable";
import { PlusOutlined } from "@ant-design/icons";
import ActionDropdown from "../../components/ActionDropdown";
import DropdownField from "../../components/form/DropdownField";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import { PATH } from "../../../config";
import {
	useDeleteConsumptionMutation,
	useLazyGetConsumptionListQuery,
} from "../../redux/slices/consumption";
import { useGetSirListQuery } from "../../redux/slices/sir";
import { getFormattedDate } from "../../utils/helper";
import useNotification from "antd/es/notification/useNotification";
import CardButtonFilterGroup from "../../components/CardButtonFilterGroup";
import useDebounce from "../../hooks/useDebounce";
import { ACTION_KEYS, MAKEYS } from "../../utils/constant";

export default function Consumption() {
	const navigate = useNavigate();

	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [createModal, setCreateModal] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState({
		id: null,
		show: false,
	});
	const { openNotification, contextHolder } = useNotification();

	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const [
		getConsumptionList,
		{ data: consumption, isLoading: isConsumptionListLoading, isFetching },
	] = useLazyGetConsumptionListQuery();

	const [deleteConsumption, { isLoading: isDeleteLoading }] =
		useDeleteConsumptionMutation();

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"consumptionCode",
		"remarks",
		"created",
		"search",
	]);

	useEffect(() => {
		if (debouncedTableOptions) {
			getConsumptionList({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, getConsumptionList, departmentId]);

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.CONSUMPTION_SELF]?.[action];
	};

	const columns = [
		{
			header: "Consumption Code",
			accessorKey: "consumptionCode",
		},
		{
			header: "Date",
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		// {
		// 	header: "Created By",
		// 	accessorKey: "created",
		// },

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
			Cell: ({ cell, row }) => (
				<ActionDropdown
					// editOnClick={() =>
					// 	navigate(PATH.CONSUMPTION_UPDATE.replace(":id", row?.original?.id))
					// }
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () => {
									navigate(
										PATH.CONSUMPTION_VIEW?.replace(":id", cell?.getValue())
									);
							  }
							: undefined
					}
					deleteOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? () => setDeleteDialog({ id: row?.original?.id, show: true })
							: undefined
					}
				/>
			),
		},
	];

	const data = consumption?.list?.map((item) => {
		return {
			...item,
			//   created: "Abid - 1221",
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
		};
	});

	const deleteConsumptionHandler = async () => {
		setDeleteDialog({ id: null, show: false });
		const { error } = await deleteConsumption(deleteDialog?.id);
		if (error) {
			openNotification("error", "Error deleting record");
		}
	};
	return (
		<>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "My Consumption", level: 1 }}
				button={
					hasPermission(ACTION_KEYS.ADD)
						? {
								label: "Generate Consumption",
								onClick: () => setCreateModal(true),
								icon: <PlusOutlined />,
						  }
						: undefined
				}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={isConsumptionListLoading || isDeleteLoading || isFetching}
					// className="cl-table"
					// rowSelection={true}
					manualPagination={true}
					totalRecords={consumption?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					enableGlobalFilter={true}
					manualFiltering={true}
				/>
			</CardButtonFilterGroup>
			<CreateConsumption
				closeModal={() => setCreateModal(false)}
				show={createModal}
			/>
			<AppConfirmDialog
				showModal={deleteDialog?.show}
				description="Are you sure you want to delete this consumption?"
				handleCancel={() => setDeleteDialog({ id: null, show: false })}
				handleOk={deleteConsumptionHandler}
			/>
		</>
	);
}

const CreateConsumption = ({ closeModal, show }) => {
	const navigate = useNavigate();

	const [selectedSin, setSelectedSin] = useState(null);
	const { user } = useSelector((state) => state.auth);

	const departmentId = user?.activeRole?.departmentId;

	const { data: sirList = [], isLoading } = useGetSirListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
		departmentId,
	});

	const columns = [
		{
			header: "Suggested SIR",
			accessorKey: "sinNumber",
			Cell: ({ cell, row }) => (
				<span className="flex gap-2">
					{row?.original?.id === selectedSin && (
						<FaCheck fill="green" size={18} />
					)}
					{cell.getValue()}
				</span>
			),
		},
		{
			header: "Date",
			accessorKey: "createDateTime",
			Cell: ({ cell }) => <span>{getFormattedDate(cell?.getValue())}</span>,
		},
	];

	return (
		<Modal
			title="Select SIR"
			centered
			open={show}
			onCancel={() => {
				setSelectedSin(null);
				closeModal();
			}}
			width={700}
			className="add-item-modal"
			okText="Select"
			onOk={() =>
				navigate(PATH.CONSUMPTION_CREATE, {
					state: {
						sinId: selectedSin,
					},
				})
			}
			okButtonProps={{
				disabled: !selectedSin,
			}}
		>
			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					<div className="multi-select-search">
						<DropdownField
							placeholder="Search SIR"
							options={sirList?.list?.map((item) => {
								return {
									value: item?.id,
									label: item?.sinNumber,
								};
							})}
							showSearch={true}
							onChange={(value) => setSelectedSin(value)}
							allowClear
							value={selectedSin}
						/>
					</div>
					<div className="popup-table">
						<GenericMuiTable
							columns={columns}
							data={sirList?.list?.slice(-3)}
							simpleTable
							slimTable
							enableColumnFilters={false}
							rowClick
							rowClickFunc={(row) => setSelectedSin(row?.id)}
							isModaltable
						/>
					</div>
				</>
			)}
		</Modal>
	);
};

CreateConsumption.propTypes = {
	closeModal: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};
