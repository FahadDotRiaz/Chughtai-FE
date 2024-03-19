/* eslint-disable react/prop-types */
import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";

import GenericMuiTable from "../../../components/GenericMuiTable";
import { useGetItemsQuery } from "../../../redux/slices/items";

export default function AddItemModal({ show, closeModal, form }) {
	// eslint-disable-next-line no-unused-vars
	const [selectedRow, setSelectedRow] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const { data: itemsList = [] } = useGetItemsQuery();

	useEffect(() => {
		if (itemsList) {
			setFilteredData(itemsList?.items);
		}
	}, [itemsList]);

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
			header: "Description",
			accessorKey: "description",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue() || "N/A"}</div>
			),
		},
	];

	const filterData = (search) => {
		const lowerCaseSearch = search.toLowerCase();
		const filtered = itemsList?.items?.filter(
			(item) =>
				item.itemCode.toLowerCase().includes(lowerCaseSearch) ||
				item.name.toLowerCase().includes(lowerCaseSearch)
		);
		setFilteredData(filtered);
	};

	const handleAddItems = () => {
		const selectedIds = Object.keys(selectedRow);
		const currentItems = form.getFieldValue("items") || [];
		const selectedData = itemsList?.items?.filter((item) =>
			selectedIds?.includes(item.id)
		);

		const uniqueSelectedData = selectedData.filter((selectedItem) => {
			return !currentItems.some(
				(currentItem) =>
					(currentItem.id || currentItem.itemId) === selectedItem.id
			);
		});

		const itemsWithPrice = uniqueSelectedData.map((item) => {
			return {
				...item,
				price: 0,
			};
		});

		const updatedItems = [...currentItems, ...itemsWithPrice];

		form.setFieldsValue({ items: updatedItems });
		closeModal();
	};

	return (
		<Modal
			title="Select Items"
			centered
			open={show}
			onCancel={closeModal}
			width={950}
			className="add-item-modal"
			onOk={handleAddItems}
			okText="Add"
		>
			<div className="mb-5">
				<div className="multi-select-search">
					<Input
						placeholder="Search"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							filterData(e.target.value);
						}}
					/>
				</div>
			</div>
			<GenericMuiTable
				columns={columns}
				data={filteredData?.slice(0, 10)}
				simpleTable
				slimTable
				enableColumnFilters={false}
				rowSelection
				setSelectedRow={setSelectedRow}
				selectedRow={selectedRow}
				rowSelectionKey="id"
				isModaltable
				maxHeight={"40vh"}
				enablePagination={false}
			/>
		</Modal>
	);
}

AddItemModal.propTypes = {
	show: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
};
