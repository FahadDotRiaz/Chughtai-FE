import GenericMuiTable from "../../../../components/GenericMuiTable";

export default function ItemMirDetail() {
	const columns = [
		{
			header: "IRF",
			accessorKey: "mir",
		},
		{
			header: "Date",
			accessorKey: "date",
		},
		{
			header: "Status",
			accessorKey: "status",
		},
		{
			header: "QTY",
			accessorKey: "qty",
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
			stock: "in Hnad Stock",
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
			stock: "in Hnad Stock",
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
			stock: "in Hnad Stock",
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
			stock: "in Hnad Stock",
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
			stock: "in Hnad Stock",
			demand: "100",
		},
	];
	return (
		<GenericMuiTable
			columns={columns}
			data={data}
			enableColumnFilters={false}
			simpleTable
		/>
	);
}
