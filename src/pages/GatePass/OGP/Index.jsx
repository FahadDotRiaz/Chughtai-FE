/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { PATH } from "../../../../config";
import ActionDropdown from "../../../components/ActionDropdown";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
	useDeleteGatePassMutation,
	useLazyGetGatePassListQuery,
} from "../../../redux/slices/gatePass";
import { getFormattedDate } from "../../../utils/helper";
import { Spin } from "antd";
import useNotification from "../../../components/Notification";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import useDebounce from "../../../hooks/useDebounce";
import LOOKUPS from "../../../utils/lookups";
import { useGetVendorsListQuery } from "../../../redux/slices/vendors";
import { useSelector } from "react-redux";
import { ACTION_KEYS, MAKEYS } from "../../../utils/constant";

const Index = () => {
	const { permissions } = useSelector((state) => state.auth);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});

	const navigate = useNavigate();
	const { openNotification, contextHolder } = useNotification();
	const [showDialog, setShowDialog] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);

	const [gatePassData, { data: gatePassList, isLoading, isFetching }] =
		useLazyGetGatePassListQuery();

	const { data: vendorsList = [] } = useGetVendorsListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 500,
				pageIndex: 0,
			},
		},
	});

	const [deleteGatePass, { isLoading: deleteLoading }] =
		useDeleteGatePassMutation();

	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"OgpCode",
		"poCode",
	]);
	useEffect(() => {
		if (debouncedTableOptions) {
			gatePassData({ tableOptions: debouncedTableOptions, type: "Outward" });
		}
	}, [debouncedTableOptions, gatePassData]);

	const handleOpenModal = (id) => {
		setIdToDelete(id);
		setShowDialog(true);
	};
	const handleDelete = async (id) => {
		const { error } = await deleteGatePass(id);
		if (!error) {
			openNotification("success", "OGP deleted successfully");
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

	const hasPermission = (action) => {
		return permissions?.[MAKEYS.OGP]?.[action];
	};

	const columns = [
		{
			header: "OGP",
			accessorKey: "OgpCode",
			id: "OgpCode",
			// eslint-disable-next-line react/prop-types
			Cell: ({ row, cell }) => <span>{cell?.getValue() || row?.id}</span>,
		},
		{
			header: "Type",
			accessorKey: "type",
			id: "gpType",
			size: 250,
			filterSelectOptions: LOOKUPS.GP_TYPE,
			filterVariant: "select",
		},
		{
			header: "Vendor",
			accessorKey: "po.vendor.name",
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
			header: "Driver name",
			accessorKey: "driverName",
		},
		{
			header: "Item Unit",
			accessorKey: "itemUnit",
			size: 250,
			filterSelectOptions: LOOKUPS.ITEM_UNIT,
			filterVariant: "select",
		},
		{
			header: "PO",
			accessorKey: "po.poCode",
			id: "poCode",
		},
		{
			header: "Date",
			accessorKey: "createDateTime",
			filterVariant: "date",
		},
		// {
		//   header: "Time",
		//   accessorKey: "time",
		//   filterVariant: "time-range",
		// },
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
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () => navigate(PATH.OGP_VIEW.replace(":id", cell?.getValue()))
							: undefined
					}
					editOnClick={
						hasPermission(ACTION_KEYS.EDIT)
							? () => navigate(PATH.OGP_UPDATE.replace(":id", cell?.getValue()))
							: undefined
					}
					deleteOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? () => handleOpenModal(cell?.getValue())
							: undefined
					}
				/>
			),
		},
	];

	const data = gatePassList?.list?.map((item) => {
		return {
			...item,
			createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
			time: getFormattedDate(item?.createDateTime, "hh:mm A"),
		};
	});
	return isLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<div>
			{contextHolder}

			<CardButtonFilterGroup
				title={{ text: "Outward Gate Pass", level: 1 }}
				button={
					hasPermission(ACTION_KEYS.ADD)
						? {
								label: "Create OGP",
								icon: <PlusOutlined />,
								onClick: () => navigate(PATH.OGP_CREATE),
						  }
						: undefined
				}
			>
				<GenericMuiTable
					columns={columns}
					data={data ? data : []}
					isLoading={isLoading || deleteLoading || isFetching}
					manualPagination={true}
					totalRecords={gatePassList?.totalRows}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog}
				description="Are you sure you want to delete this OGP?"
				handleCancel={() => setShowDialog(false)}
				handleOk={handleOk}
			/>
		</div>
	);
};

export default Index;
