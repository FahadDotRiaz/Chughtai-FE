import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ActionDropdown from "../../../../components/ActionDropdown";
import { PATH } from "../../../../../config";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import { useState } from "react";
import AppConfirmDialog from "../../../../components/AppConfirmDialog";
import CardButtonFilterGroup from "../../../../components/CardButtonFilterGroup";

const Index = () => {
	const navigate = useNavigate();
	const [showDialog, setShowDialog] = useState(false);

	const columns = [
		{
			header: "Department Type",
			accessorKey: "type",
		},
		{
			header: "Designation Tree",
			accessorKey: "tree",
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
			Cell: () => (
				<ActionDropdown
					editOnClick={() => navigate(PATH.DEPARTMENT_TEMPLATE_UPDATE)}
					deleteOnClick={() => setShowDialog(true)}
				/>
			),
		},
	];

	const data = [
		{
			tree: "HOD,Manager,User",
			type: "Chemistry",
		},
		{
			tree: "HOD,Manager,User",
			type: "Chemistry",
		},
		{
			tree: "HOD,Manager,User",
			type: "Chemistry",
		},
		{
			tree: "HOD,Manager,User",
			type: "Collection Center",
		},
	];
	return (
		<div>
			<CardButtonFilterGroup
				title={{ text: "Department Template Creation", level: 1 }}
				button={{
					label: "Create Template",
					icon: <PlusOutlined />,
					onClick: () => navigate(PATH.DEPARTMENT_TEMPLATE_CREATE),
				}}
			>
				<GenericMuiTable columns={columns} data={data} />
			</CardButtonFilterGroup>
			<AppConfirmDialog
				showModal={showDialog}
				description="Are you sure you want to delete this department template?"
				handleCancel={() => setShowDialog(false)}
				handleOk={() => setShowDialog(false)}
			/>
		</div>
	);
};

export default Index;
