import { Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TableActionButton from "../../../components/TableActionButton";
import GenericButton from "../../../components/GenericButton";
import { PATH } from "../../../../config";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { useGetPOItemsByIdQuery } from "../../../redux/slices/purchaseOrder";
import { useState } from "react";
import ItemDetails from "../../../components/ItemDetails";

export default function ViewPOProcurement() {
	const { id } = useParams();
	const [itemView, setItemView] = useState({
		item: null,
		show: false,
	});

	const { data: vendorsDataByID, isLoading } = useGetPOItemsByIdQuery({ id });
	const navigate = useNavigate();

	const viewFields = [
		{
			label: "Vendor Name",
			value: vendorsDataByID?.vendor?.name ?? "N/A",
		},
		{
			label: "Currency",
			value: "PKR",
		},

		{
			label: "Payment Terms",
			value: "45 Days Credit",
		},
		{
			label: "Delivery Terms",
			value: "Free Carriage",
		},
		{
			label: "Expected Delivery Date",
			value: "12/227/2023",
		},
		{
			label: "Freight",
			value: "Feight here",
		},
		{
			label: "Remarks",
			value: vendorsDataByID?.comments ?? "N/A",
		},
		{
			label: "PR #",
			value: "718267216",
		},
	];

	const columns = [
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 150,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 150,
		},
		// {
		// 	header: "Department",
		// 	accessorKey: "department.name",
		// 	size: 150,
		// },
		{
			header: "Description",
			accessorKey: "description",
			size: 150,
		},
		{
			header: "Qty",
			accessorKey: "quantity",
			size: 150,
		},
		{
			header: "actions",
			accessorKey: "actions",
			enableColumnFilter: false,
			align: "center",
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ row }) => (
				<TableActionButton
					onView={() => {
						setItemView({
							item: {
								name: row.original.item.name,
								code: row.original.item.itemCode,
								quantity: row.original.quantity,
							},
							show: true,
						});
					}}
				/>
			),
		},
	];

	return (
		<>
			<TitleSearchButton title={"View PO"} />
			<GenericCard className="mt-5">
				<Row gutter={[16, 30]}>
					{viewFields.map((item, index) => {
						return (
							<Col span={6} key={index}>
								<div>
									<label>{item.label}</label>
									<div className="name mt-2">{item.value}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</GenericCard>

			<CardButtonFilterGroup
				topSpace
				title={{ text: "Items", level: 2 }}
				filterBtn
			>
				<GenericMuiTable
					columns={columns}
					data={vendorsDataByID?.items ?? []}
					simpleTable
					enableColumnFilters={false}
					isLoading={isLoading}
				/>
			</CardButtonFilterGroup>
			<div className="footer-buttons">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(PATH.PROCUREMENT_PURCHASE_ORDER_LIST)}
				/>
			</div>
			<ItemDetails
				show={itemView?.show}
				onHide={() => setItemView({ item: null, show: false })}
				onOk={() => setItemView({ item: null, show: false })}
				item={itemView?.item}
			/>
		</>
	);
}
