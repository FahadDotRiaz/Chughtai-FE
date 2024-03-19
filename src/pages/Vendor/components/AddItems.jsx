/* eslint-disable react/prop-types */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import GenericMuiTable from "../../../components/GenericMuiTable";
import TableActionButton from "../../../components/TableActionButton";
import AddItemModal from "./AddItemModal";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import TableEditableField from "../../../components/TableEditableField";

const AddItems = ({ form }) => {
	const [addItemsModal, setAddItemsModal] = useState(false);
	const [formReRender, setFormReRender] = useState(false);

	const handleDeletItem = (id) => {
		const updatedItems = form
			.getFieldValue("items")
			?.filter((item) => item.id !== id);
		form.setFieldsValue({ items: updatedItems });
		setFormReRender(!formReRender);
	};

	const columns = [
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 120,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 120,
		},
		{
			header: "Description",
			accessorKey: "description",
			size: 250,
		},
		{
			header: "Price",
			accessorKey: "price",
			Cell: ({ row, cell }) => (
				<TableEditableField
					field="number"
					defaultValue={cell?.getValue() || 0}
					index={row?.index}
					name="price"
					isArray={true}
				/>
			),
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
				<TableActionButton onDelete={() => handleDeletItem(cell?.getValue())} />
			),
		},
	];

	return (
		<div className="mt-5">
			<CardButtonFilterGroup
				title={{ text: "Items", level: 1 }}
				button={{
					label: "Add Item",
					icon: <PlusOutlined />,
					onClick: () => setAddItemsModal(true),
				}}
			>
				<GenericMuiTable
					columns={columns}
					data={form?.getFieldValue("items") || []}
					simpleTable
				/>
			</CardButtonFilterGroup>
			<AddItemModal
				form={form}
				show={addItemsModal}
				closeModal={() => setAddItemsModal(false)}
			/>
		</div>
	);
};

export default AddItems;

AddItems.propTypes = {
	form: PropTypes.object.isRequired,
};
