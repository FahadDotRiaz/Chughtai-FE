/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { useEffect, useState } from "react";
import useNotification from "../../../components/Notification";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../config";
import GenericMuiTable from "../../../components/GenericMuiTable";
import ActionDropdown from "../../../components/ActionDropdown";
import PropTypes from "prop-types";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import {
	useDeleteCategoryItemMutation,
	useLazyGetCategoryItemListQuery,
} from "../../../redux/slices/category";
import useDebounce from "../../../hooks/useDebounce";

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
	const { openNotification, contextHolder } = useNotification();
	const [
		getCategory,
		{ data: categoryItemList = [], isLoading: isListLoading },
	] = useLazyGetCategoryItemListQuery();
	const [deleteCategory, { isLoading: deleteLoading }] =
		useDeleteCategoryItemMutation();
	const columns = [
		{
			header: "Name",
			accessorKey: "name",
			//   size: 350,
		},
		{
			header: "Description",
			accessorKey: "description",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue() || "N/A"}</div>
			),
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
						navigate(
							PATH.ADMIN_CATEGORY_UPDATE.replace(":id", row?.original?.id)
						)
					}
					deleteOnClick={() =>
						setShowDialog({ show: true, id: row?.original?.id })
					}
				/>
			),
		},
	];
	const data = categoryItemList?.list?.map((item) => {
		return {
			...item,
		};
	});
	const handleDelete = async () => {
		const { error } = await deleteCategory(showDialog?.id);
		if (!error) {
			openNotification("success", "Category deleted successfully");
		} else {
			openNotification("error", error?.message);
		}
		setShowDialog({ show: false, id: null });
	};
	const debouncedTableOptions = useDebounce(tableOptions, 1000, [
		"name",
		"description",
		"search",
	]);
	useEffect(() => {
		getCategory({ tableOptions: debouncedTableOptions });
	}, [debouncedTableOptions, getCategory, tableOptions.filters]);
	// const data = [
	//   {
	//     id: 1,
	//     name: "Panadol",
	//     description: "Panadol can be used for relieving fever",
	//   },
	//   {
	//     id: 2,
	//     name: "Panadol",
	//     description: "Panadol can be used for relieving fever",
	//   },
	//   {
	//     id: 3,
	//     name: "Panadol",
	//     description: "Panadol can be used for relieving fever",
	//   },
	// ];
	return (
		<div>
			{contextHolder}
			<CardButtonFilterGroup
				title={{ text: "Category", level: 1 }}
				button={{
					label: "Create Category",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.ADMIN_CATEGORY_CREATE),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={data || []}
					isLoading={isListLoading || deleteLoading}
					totalRecords={categoryItemList?.totalRows}
					manualPagination={true}
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
				description="Are you sure you want to delete this category?"
				handleCancel={() => setShowDialog({ show: false, id: null })}
				handleOk={handleDelete}
			/>
		</div>
	);
};

export default Index;
Index.propTypes = {
	row: PropTypes.shape({
		original: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};
