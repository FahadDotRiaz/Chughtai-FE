/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { PATH } from "../../../../config";
import ActionDropdown from "../../../components/ActionDropdown";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { useEffect, useState } from "react";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import {
	useDeleteDepartmentMutation,
	useLazyGetDepartmentListQuery,
} from "../../../redux/slices/department";
import useNotification from "../../../components/Notification";

const Index = () => {
	const navigate = useNavigate();
	const [showDialog, setShowDialog] = useState({ show: false, id: null });
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			pageSize: 10,
			pageIndex: 0,
		},
	});
	const [getDepartments, { data: departments, isLoading, isFetching }] =
		useLazyGetDepartmentListQuery();
	const [deleteDepartment, { isLoading: deleteLoading }] =
		useDeleteDepartmentMutation();
	const { openNotification, contextHolder } = useNotification();
	const { data: locations } = useGetLocationListQuery({
		tableOptions: {
			filters: {
				service: ["Store", "SubStore"],
			},
			pagination: {
				pageSize: 1000,
				pageIndex: 0,
			},
		},
	});
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"search",
	]);

	useEffect(() => {
		getDepartments({
			tableOptions: {
				...debouncedTableOptions,
				filters: {
					...tableOptions.filters,
					type: tableOptions.filters?.type
						? [tableOptions.filters?.type]
						: ["Store", "SubStore"],
				},
			},
		});
	}, [debouncedTableOptions]);

	const columns = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Type",
			accessorKey: "type",
			filterSelectOptions: [
				{ label: "Store", value: "Store" },
				{ label: "SubStore", value: "SubStore" },
			],
			filterVariant: "select",
		},
		{
			header: "Location",
			accessorKey: "location",
			filterSelectOptions:
				locations?.list
					// ?.filter((item) => ["Store", "SubStore"].includes(item.service))
					?.map((loc) => {
						return {
							value: loc?.id,
							label: `${
								loc?.address
									? `${
											loc?.address?.length > 50
												? loc?.address?.substring(0, 35) + "..."
												: loc?.address
									  } - `
									: ""
							} ${loc?.area?.name} - ${loc?.city?.name} - ${
								loc?.province?.name
							}`,
						};
					}) || [],
			filterVariant: "select",
		},
		{
			header: "Action",
			accessorKey: "actions",
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
					editOnClick={() =>
						navigate(PATH.ADMIN_STORE_UPDATE.replace(":id", row?.original?.id))
					}
					deleteOnClick={() =>
						setShowDialog({ show: true, id: row?.original?.id })
					}
					manageOnClick={() =>
						navigate(PATH.ADMIN_ROLE_LIST, {
							state: { departmentId: row?.original?.id },
						})
					}
				/>
			),
		},
	];

	const getFormattedData = () => {
		const data = departments?.list?.map((department) => {
			return {
				...department,
				location: department?.location
					? `${
							department?.location?.address
								? `${department?.location?.address} -`
								: ""
					  }  ${department?.location?.area?.name} - ${
							department?.location?.city?.name
					  } - ${department?.location?.province?.name}`
					: "N/A",
			};
		});
		return data;
	};

	const handleDelete = async () => {
		const { error } = await deleteDepartment(showDialog?.id);
		if (!error) {
			openNotification("success", "Store deleted successfully");
		} else {
			openNotification("error", "Error deleting store");
		}
		setShowDialog({ show: false, id: null });
	};
	return (
		<div>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "Store", level: 1 }}
				button={{
					label: "Create Store",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.ADMIN_STORE_CREATE),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={getFormattedData() || []}
					isLoading={isLoading || deleteLoading || isFetching}
					manualPagination={true}
					totalRecords={departments?.totalRows || 0}
					updatePaginationFunc={(data) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					updateColumnFilters={setTableOptions}
					manualFiltering={true}
					enableGlobalFilter={false}
				/>
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog?.show}
				description="Are you sure you want to delete this department?"
				handleCancel={() => setShowDialog({ show: false, id: null })}
				handleOk={handleDelete}
			/>
		</div>
	);
};

export default Index;

import PropTypes from "prop-types";
import useDebounce from "../../../hooks/useDebounce";
import { useGetLocationListQuery } from "../../../redux/slices/location";

Index.propTypes = {
	row: PropTypes.shape({
		original: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};
