/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import ActionDropdown from "../../../../../components/ActionDropdown";
import GenericMuiTable from "../../../../../components/GenericMuiTable";
// import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import AppConfirmDialog from "../../../../../components/AppConfirmDialog";
import { useEffect, useState } from "react";
import CardButtonFilterGroup from "../../../../../components/CardButtonFilterGroup";
// import AddRoleModal from "./AddRoleModal";
import {
	useDeleteRoleMutation,
	useLazyGetRolesByDepartmentQuery,
} from "../../../../../redux/slices/role";
import useNotification from "../../../../../components/Notification";
import useDebounce from "../../../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import AddRoleModal from "../../../Role/AddRoleModal";
import {
	ACTION_KEYS,
	DEPARTMENT_TYPE,
	MAKEYS,
} from "../../../../../utils/constant";

const Index = () => {
	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [showDialog, setShowDialog] = useState({ show: false, id: null });
	const [showModal, setShowModal] = useState({ show: false, id: null });
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [getRoleList, { data: roles, isLoading, isFetching }] =
		useLazyGetRolesByDepartmentQuery();
	const [deleteRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();
	const { openNotification, contextHolder } = useNotification();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"search",
	]);

	const handleEdit = (id) => {
		if (id) {
			setShowModal({ show: true, id });
		}
	};
	useEffect(() => {
		if (departmentId) {
			getRoleList({ tableOptions: debouncedTableOptions, departmentId });
		}
	}, [debouncedTableOptions, departmentId, getRoleList]);

	const handleDelete = async () => {
		const { error } = await deleteRole(showDialog?.id);
		if (!error) {
			openNotification("success", "Role deleted successfully");
		} else {
			openNotification("error", "Error deleting role");
		}
		setShowDialog({ show: false, id: null });
	};

	const hasPermission = (action) => {
		if (
			user?.activeRole?.departmentType ===
			(DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
		) {
			return permissions?.[MAKEYS.STORE_SETTING_ROLE]?.[action];
		} else if (user?.activeRole?.departmentType === DEPARTMENT_TYPE.OTHERS) {
			return permissions?.[MAKEYS.DEPARTMENT_SETTING_ROLE]?.[action];
		}
	};

	const columns = [
		{
			header: "Name",
			accessorKey: "name",
		},
		// {
		// 	header: "Report To",
		// 	accessorKey: "report",
		// },
		{
			header: "Description",
			accessorKey: "description",
			enableColumnFilter: false,
		},
		{
			header: "Action",
			accessorKey: "id",
			enableColumnFilter: false,
			align: "center",
			size: 20,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ row }) => (
				<ActionDropdown
					editOnClick={
						hasPermission(ACTION_KEYS.EDIT)
							? () => handleEdit(row?.original?.id)
							: undefined
					}
					deleteOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? () => setShowDialog({ show: true, id: row?.original?.id })
							: undefined
					}
				/>
			),
		},
	];

	return (
		<div>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "Roles", level: 1 }}
				button={
					hasPermission(ACTION_KEYS.ADD)
						? {
								label: "Add Role",
								icon: <PlusOutlined />,
								onClick: () => setShowModal({ show: true }),
						  }
						: undefined
				}
			>
				<GenericMuiTable
					columns={columns}
					data={roles?.list || []}
					isLoading={isLoading || isFetching || deleteLoading}
					manualPagination={true}
					totalRecords={roles?.totalRows || 0}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog?.show}
				description="Are you sure you want to delete this role?"
				handleCancel={() => setShowDialog({ show: false, id: null })}
				handleOk={handleDelete}
			/>
			<AddRoleModal
				showModal={showModal}
				onClose={() => setShowModal({ show: false, id: null })}
				departmentId={departmentId}
				// roleData={roleData}
			/>
		</div>
	);
};

export default Index;
