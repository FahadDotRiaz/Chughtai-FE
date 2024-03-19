import GenericMuiTable from "../../../../components/GenericMuiTable";

export default function StockEstimationDetail() {
	const columns = [
		{
			header: "Stock Estimation",
			accessorKey: "stock",
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "QTY",
			accessorKey: "qty",
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
		{
			header: "Demand Prediction",
			accessorKey: "demand",
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
		},
	];
	const data = [
		{
			sin: "0311311",
			date: "11/12/25",
			mir: "12345",
			consumption: "15789",
			qty: "20",
			status: "pending",
			prpo: "001221222",
			stock: "in Hand Stock",
			demand: "100",
		},
		{
			sin: "0311311",
			date: "11/12/25",
			mir: "12345",
			consumption: "15789",
			qty: "20",
			status: "pending",
			prpo: "001221222",
			stock: "in Hand Stock",
			demand: "100",
		},
		{
			sin: "0311311",
			date: "11/12/25",
			mir: "12345",
			consumption: "15789",
			qty: "20",
			status: "pending",
			prpo: "001221222",
			stock: "in Hand Stock",
			demand: "100",
		},
		{
			sin: "0311311",
			date: "11/12/25",
			mir: "12345",
			consumption: "15789",
			qty: "20",
			status: "pending",
			prpo: "001221222",
			stock: "in Hand Stock",
			demand: "100",
		},
		{
			sin: "0311311",
			date: "11/12/25",
			mir: "12345",
			consumption: "15789",
			qty: "20",
			status: "pending",
			prpo: "001221222",
			stock: "in Hand Stock",
			demand: "100",
		},
	];
	return (
		<GenericMuiTable
			columns={columns}
			data={data}
			simpleTable
			enableColumnFilters={false}
		/>
	);
}
