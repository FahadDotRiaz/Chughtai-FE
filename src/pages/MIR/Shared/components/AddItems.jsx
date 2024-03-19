/* eslint-disable react/prop-types */
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import TableEditableField from "../../../../components/TableEditableField";
import { useState } from "react";

export const AddItems = ({
	show,
	onClose,
	data,
	selectedRow,
	setSelectedRow,
	form,
}) => {
	const [items, setItems] = useState([]);
	const [selectedItemList, setSelectedItemsList] = useState([]);
	const [filteredData, setFilteredData] = useState(data);

	const handleRequisition = (id, value) => {
		if (value !== null) {
			const existingItemIndex = items.findIndex((item) => item.id === id);

			if (existingItemIndex !== -1) {
				const updatedItems = [...items];
				updatedItems[existingItemIndex].quantity = value;
				setItems(updatedItems);
			} else {
				setItems((prevItems) => [
					...prevItems,
					{
						id: id,
						quantity: value,
					},
				]);
			}
		} else {
			const updatedItems = items.filter((item) => item.id !== id);
			setItems(updatedItems);
		}
	};

	const handleAdd = () => {
		const selectedIds = Object.keys(selectedRow);
		const selectedData = data.filter((item) => selectedIds?.includes(item.id));

		const mergedArray = selectedData.map((item1) => {
			const matchingIndex = items.findIndex((item2) => item2.id === item1.id);

			if (matchingIndex !== -1) {
				return {
					...item1,
					quantity: items[matchingIndex].quantity,
				};
			} else {
				return item1;
			}
		});

		const currentItems = form.getFieldValue("items") || [];
		const updatedItems = currentItems.map((existingItem) => {
			const matchingIndex = mergedArray.findIndex(
				(selectedItem) => selectedItem.id === existingItem.id
			);

			if (matchingIndex !== -1) {
				return mergedArray[matchingIndex];
			} else {
				return existingItem;
			}
		});

		mergedArray.forEach((selectedItem) => {
			const existingIndex = updatedItems.findIndex(
				(item) => item.id === selectedItem.id
			);
			if (existingIndex === -1) {
				updatedItems.push(selectedItem);
			}
		});

		form?.setFieldsValue({ items: updatedItems });
		onClose();
		setItems([]);
		setSelectedRow({});
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
			header: "Item Description",
			accessorKey: "description",
			size: 250,
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		{
			header: "Requisition",
			accessorKey: "requisition",
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					// name={`index-${row?.index}`}
					value={items?.find((item) => item.id === row?.original.id)?.quantity}
					onChange={(value) => handleRequisition(row.original.id, value)}
					disabled={(selectedRow && !selectedRow[row?.original?.id]) || false}
				/>
			),
		},
	];

	const filterData = (search) => {
		const lowerCaseSearch = search.toLowerCase();
		const filtered = data?.filter(
			(item) =>
				item?.itemCode?.includes(lowerCaseSearch) ||
				item?.name?.toLowerCase()?.includes(lowerCaseSearch)
		);
		setFilteredData(filtered);
	};

	return (
		<>
			<Modal
				title="Select Items"
				centered
				open={show}
				onOk={handleAdd}
				onCancel={onClose}
				width={850}
				className="add-item-modal"
				okText="Add"
				okButtonProps={{
					disabled: selectedRow && Object?.keys(selectedRow)?.length === 0,
				}}
				maskClosable={false}
			>
				<div className="multi-select-search">
					<Input
						placeholder="Search"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							filterData(e.target.value);
						}}
					/>
				</div>

				<div className="popup-table">
					<GenericMuiTable
						columns={columns}
						data={filteredData || []}
						simpleTable
						slimTable
						rowSelection
						enableColumnFilters={false}
						selectedRow={selectedRow || selectedItemList}
						setSelectedRow={setSelectedRow || setSelectedItemsList}
						rowSelectionKey={"id"}
						maxHeight={"40vh"}
						enablePagination={false}
						isModaltable
					/>
				</div>
			</Modal>
		</>
	);
};

AddItems.propTypes = {
	btnLable: PropTypes.string.isRequired,
	icon: PropTypes.element,
	onButtonChange: PropTypes.func,
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	data: PropTypes.array,
	selectedRow: PropTypes.object.isRequired,
	setSelectedRow: PropTypes.func.isRequired,
};
AddItems.defaultProps = {
	data: [
		{
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			description: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
		},
		{
			key: "1",
			name: "Amoxicillin",
			itemCode: `1023`,
			requisition: 23,
			description: "25 OH Vitamin D 100T Ref#310600 (Liason)",
		},
		{
			key: "1",
			requisition: 23,
			name: "Amoxicillin",
			itemCode: `1023`,
			description: "25 OH Vitamin D 100T Ref#310600 (Liason)",
		},
		{
			key: "1",
			name: "Amoxicillin",
			requisition: 23,
			itemCode: `1023`,
			description: "25 OH Vitamin D 100T Ref#310600 (Liason)",
		},
	],
};
