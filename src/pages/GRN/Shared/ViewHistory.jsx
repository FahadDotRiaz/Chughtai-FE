import GenericCard from "../../../components/GenericCard";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TitleSearchButton from "../../../components/TitleSearchButton";
import { Row, Col } from "antd";
const ViewHistory = () => {
	const columns = [
		{
			header: "PO",
			accessorKey: "po",
		},
		{
			header: "Item Code",
			accessorKey: "itemCode",
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "UOM",
			accessorKey: "uom",
		},
		{
			header: "Store",
			accessorKey: "store",
		},
		{
			header: "QTY Requested",
			accessorKey: "qtyRequested",
		},
		{
			header: "GRN QTY",
			accessorKey: "grnQty",
		},
		{
			header: "Balance",
			accessorKey: "balance",
		},
		{
			header: "Cancel",
			accessorKey: "cancel",
		},
		{
			header: "Remaining",
			accessorKey: "remaining",
		},
	];

	const data = [
		{
			po: "48094",
			itemCode: "020103143",
			description: "Tissues, Rose petal received",
			uom: "Box",
			store: 0,
			qtyRequested: 10,
			grnQty: 10,
			balance: 10,
			cancel: 4,
			remaining: 6,
		},
		{
			po: "48094",
			itemCode: "020103143",
			description: "Tissues, Rose petal received",
			uom: "Box",
			store: 0,
			qtyRequested: 10,
			grnQty: 10,
			balance: 10,
			cancel: 4,
			remaining: 6,
		},
		{
			po: "48094",
			itemCode: "020103143",
			description: "Tissues, Rose petal received",
			uom: "Box",
			store: 0,
			qtyRequested: 10,
			grnQty: 10,
			balance: 10,
			cancel: 4,
			remaining: 6,
		},
	];

	const infoData = [
		{ label: "PO", value: "121153" },
		{ label: "IGP", value: "101134" },
		{ label: "Branch", value: "Lahore" },
		{ label: "Store", value: "Head office:store warehouse" },
		{ label: "Vendor", value: "S.ejazudin & company" },
		{ label: "Remarks", value: "Tissues received" },
	];

	return (
		<div>
			<GenericCard>
				{["User", "HOD", "HOD Dept."].map((role, index) => {
					return (
						<div className="border-b pb-10 mb-10" key={index}>
							<TitleSearchButton title={`${role} History`} />
							<TitleSearchButton
								title="Items Received"
								secondaryTitle
								printBtn
								scanBtn
							/>
							<GenericMuiTable columns={columns} data={data} simpleTable />
							<Row gutter={[16, 30]} className="mt-10 ">
								{infoData.map(({ label, value }, index) => {
									return (
										<Col span={8} key={index}>
											<div>
												<label>{label}</label>
												<div className="name mt-2">{value}</div>
											</div>
										</Col>
									);
								})}
							</Row>
						</div>
					);
				})}
			</GenericCard>
		</div>
	);
};

export default ViewHistory;
