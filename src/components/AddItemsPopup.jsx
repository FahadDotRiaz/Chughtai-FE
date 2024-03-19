/* eslint-disable no-unused-vars */
import { Button, Input, Modal, Popconfirm, Select, Space } from "antd";
import { useState } from "react";
import GenericMuiTable from "./GenericMuiTable";
import { DeleteTwoTone, SearchOutlined } from "@ant-design/icons";
import GenericButton from "./GenericButton";
import PropTypes from "prop-types";
import TableEditableField from "./TableEditableField";

export const AddItemsPopup = ({ btnLable, icon, onButtonChange }) => {
	const [open, setOpen] = useState(false);
	const options = [];
	for (let i = 10; i < 36; i++) {
		options.push({
			label: i.toString(36) + i,
			value: i.toString(36) + i,
		});
	}
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	return (
		<>
			<GenericButton
				lable={btnLable}
				type="primary"
				icon={icon}
				htmlType="button"
				onClick={() => setOpen(true)}
			/>
			<Modal
				title="Select Items"
				centered
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				width={700}
				className="add-item-modal"
				okText="Add"
			>
				<div className="multi-select-search">
					<Input placeholder="Search" prefix={<SearchOutlined />} />
				</div>
				<div className="popup-table">
					<GenericMuiTable
						columns={columns}
						data={data}
						enablePagination={false}
					/>
				</div>
			</Modal>
		</>
	);
};

const columns = [
	{
		header: "Item code",
		accessorKey: "itemCode",
	},
	{
		header: "Name",
		accessorKey: "name",
	},
	{
		header: "Item Description",
		accessorKey: "itemDesc",
	},
	{
		header: "Requisition",
		accessorKey: "requisition",
		Cell: () => <TableEditableField field="number" defaultValue={0} />,
	},
	// {
	// 	header: "actions",
	// 	accessorKey: "actions",enableColumnFilter: false,
	// size: 30,
	// muiTableHeadCellProps: {
	//         align: "center",
	//       },
	//       muiTableBodyCellProps: {
	//         align: "center",
	//       },
	// 	// eslint-disable-next-line no-unused-vars
	// 	Cell: (_, record) => <DeleteTwoTone twoToneColor="#ED2626" />,
	// },
];
const data = [
	{
		key: "1",
		itemCode: `1023`,
		name: "Amoxicillin",
		itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
		requisition: 23,
	},
	{
		key: "1",
		name: "Amoxicillin",
		itemCode: `1023`,
		requisition: 23,
		itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
	},
	{
		key: "1",
		requisition: 23,
		name: "Amoxicillin",
		itemCode: `1023`,
		itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
	},
	{
		key: "1",
		name: "Amoxicillin",
		requisition: 23,
		itemCode: `1023`,
		itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
	},
];

AddItemsPopup.propTypes = {
	btnLable: PropTypes.string.isRequired,
	icon: PropTypes.element,
	onButtonChange: PropTypes.func,
};
