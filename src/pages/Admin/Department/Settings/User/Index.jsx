/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { PATH } from "../../../../../../config";
import ActionDropdown from "../../../../../components/ActionDropdown";
import GenericMuiTable from "../../../../../components/GenericMuiTable";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import TagWithShowMore from "../../../../../components/TagWithShowMore";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../../../components/AppConfirmDialog";
import CardButtonFilterGroup from "../../../../../components/CardButtonFilterGroup";
import {
	useDeleteUserMutation,
	useLazyGetUsersListQuery,
} from "../../../../../redux/slices/users";
import useNotification from "../../../../../components/Notification";
import useDebounce from "../../../../../hooks/useDebounce";
// import { useGetDepartmentListQuery } from "../../../../../redux/slices/department";
import { useGetRolesByDepartmentQuery } from "../../../../../redux/slices/role";
import { useSelector } from "react-redux";
import {
	ACTION_KEYS,
	DEPARTMENT_TYPE,
	MAKEYS,
} from "../../../../../utils/constant";

const Index = () => {
	const { user, permissions } = useSelector((state) => state.auth);
	console.log(user?.activeRole?.departmentType);
	const departmentId = user?.activeRole?.departmentId;
	const [showDialog, setShowDialog] = useState({ show: false, id: null });
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});

	const { openNotification, contextHolder } = useNotification();

	const [getUsers, { data: users, isLoading, isFetching }] =
		useLazyGetUsersListQuery();
	// const [getRoleList, { data: roles }] = useLazyGetRolesByDepartmentQuery();
	const { data: roles } = useGetRolesByDepartmentQuery({
		tableOptions: {
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
		departmentId: departmentId,
	});

	const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
	// const { data: departments } = useGetDepartmentListQuery({
	//   tableOptions: {
	//     pagination: {
	//       pageSize: 100,
	//       pageIndex: 0,
	//     },
	//   },
	// });
	const navigate = useNavigate();
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"search",
		"email",
		"cnic",
	]);

	useEffect(() => {
		if (departmentId) {
			getUsers({
				tableOptions: {
					...debouncedTableOptions,
					filters: {
						...debouncedTableOptions.filters,
						department: departmentId,
					},
				},
			});
		}
	}, [debouncedTableOptions, getUsers]);

	const hasPermission = (action) => {
		if (
			user?.activeRole?.departmentType ===
			(DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
		) {
			return permissions?.[MAKEYS.STORE_SETTING_USER]?.[action];
		} else if (user?.activeRole?.departmentType === DEPARTMENT_TYPE.OTHERS) {
			return permissions?.[MAKEYS.DEPARTMENT_SETTING_USER]?.[action];
		}
	};

	// useEffect(() => {
	//   if (tableOptions?.filters?.department) {
	//     getRoleList({
	//       tableOptions: {
	//         pagination: {
	//           pageSize: 100,
	//           pageIndex: 0,
	//         },
	//       },
	//       departmentId: tableOptions?.filters?.department,
	//     });
	//   }
	//   // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [tableOptions?.filters?.department]);

	const getFormattedData = () => {
		if (users?.list) {
			return users?.list?.map((item) => {
				return {
					id: item.id,
					name: item.username,
					cnic: item.cnic,
					email: item.email,
					contact: item.contact,
					department: item?.roles?.reduce((uniqueNames, role) => {
						if (
							role?.department?.name &&
							!uniqueNames.includes(role.department.name)
						) {
							uniqueNames.push(role.department.name);
						}
						return uniqueNames;
					}, []),
					role: item?.roles?.map((role) => role.name),
				};
			});
		}
		return [];
	};

	const handleDelete = async () => {
		const { error } = await deleteUser(showDialog?.id);
		if (!error) {
			openNotification("success", "User deleted successfully");
		} else {
			openNotification("error", "Error deleting user");
		}
		setShowDialog({ show: false, id: null });
	};

	console.log("roles", roles);
	const columns = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Email",
			accessorKey: "email",
		},
		{
			header: "Contact",
			accessorKey: "contact",
		},
		{
			header: "CNIC",
			accessorKey: "cnic",
		},
		// {
		//   header: "Department",
		//   accessorKey: "department",
		//   Cell: ({ cell }) => (
		//     <TagWithShowMore maxCount={1} list={cell?.getValue() || []} />
		//   ),
		//   filterSelectOptions: departments?.list?.map((dep) => {
		//     return {
		//       label: dep.name,
		//       value: dep.id,
		//     };
		//   }),
		//   filterVariant: "select",
		// },
		{
			header: "Role",
			accessorKey: "role",
			Cell: ({ cell }) => (
				<TagWithShowMore maxCount={1} list={cell?.getValue() || []} />
			),
			filterSelectOptions:
				// tableOptions?.filters?.department &&
				roles?.list?.map((dep) => {
					return {
						label: dep.name,
						value: dep.name,
					};
				}),
			filterVariant: "select",
			enableColumnFilters: false,
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
			Cell: ({ cell }) => (
				<ActionDropdown
					editOnClick={
						hasPermission(ACTION_KEYS.EDIT)
							? () =>
									navigate(
										PATH.DEPARTMENT_USER_UPDATE.replace(":id", cell?.getValue())
									)
							: undefined
					}
					viewOnClick={
						hasPermission(ACTION_KEYS.VIEW)
							? () =>
									navigate(
										PATH.DEPARTMENT_USER_VIEW.replace(":id", cell?.getValue())
									)
							: undefined
					}
					// assignOnClick={() => navigate(PATH.USER_ASSIGN_ROLE)}
					deleteOnClick={
						hasPermission(ACTION_KEYS.DELETE)
							? () => setShowDialog({ show: true, id: cell?.getValue() })
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
				title={{ text: "Users", level: 1 }}
				button={
					hasPermission(ACTION_KEYS.ADD)
						? {
								label: "Create User",
								icon: <PlusOutlined />,
								onClick: () => navigate(PATH.DEPARTMENT_USER_CREATE),
						  }
						: undefined
				}
			>
				<GenericMuiTable
					columns={columns}
					data={getFormattedData() || []}
					isLoading={isLoading || isFetching || deleteLoading}
					manualPagination={true}
					totalRecords={users?.totalRows || 0}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					dependentFilterToClear={{
						department: ["role"],
					}}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog?.show}
				description="Are you sure you want to delete this user?"
				handleCancel={() => setShowDialog({ show: false, id: null })}
				handleOk={handleDelete}
			/>
		</div>
	);
};

export default Index;
