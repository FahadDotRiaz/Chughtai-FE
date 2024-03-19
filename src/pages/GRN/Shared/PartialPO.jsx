import { PATH } from "../../../../config";
import GenericMuiTable from "../../../components/GenericMuiTable";
import StatusTags from "../../../components/StatusTags";
import TableActionButton from "../../../components/TableActionButton";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";

const PartialPO = () => {
	const navigate = useNavigate();
	const columns = [
		{
			header: "GRN",
			accessorKey: "grn",
		},
		{
			header: "Date",
			accessorKey: "date",
		},
		{
			header: "PO",
			accessorKey: "po",
		},
		{
			header: "PO Date",
			accessorKey: "poDate",
		},
		{
			header: "Status",
			accessorKey: "status",
			Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
		},
		{
			header: "Vendor",
			accessorKey: "vendor",
		},
		{
			header: "Store",
			accessorKey: "store",
		},
		{
			header: "Remarks",
			accessorKey: "remarks",
		},
		{
			header: "Actions",
			accessorKey: "actions",
			enableColumnFilter: false,
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: () => (
				<TableActionButton
					type="view"
					onClick={() => navigate(PATH.GRN_VIEW_ALL)}
				/>
			),
		},
	];

	const data = [
		{
			grn: "71439",
			date: "11/23/2023",
			poDate: "11/05/2023",
			po: "48094",
			status: "Pending",
			vendor: "rose petal",
			store: "Head office",
			remarks: "IMS created IGP",
		},

		{
			grn: "71439",
			date: "11/23/2023",
			poDate: "11/05/2023",
			po: "48094",
			status: "Pending",
			vendor: "rose petal",
			store: "Head office",
			remarks: "IMS created IGP",
		},
		{
			grn: "71439",
			date: "11/23/2023",
			poDate: "11/05/2023",
			po: "48094",
			status: "Pending",
			vendor: "rose petal",
			store: "Head office",
			remarks: "IMS created IGP",
		},
	];
	return (
		<div>
			<CardButtonFilterGroup title={{ text: "Partial PO", level: 1 }}>
				<GenericMuiTable columns={columns} data={data} simpleTable />
			</CardButtonFilterGroup>
		</div>
	);
};

export default PartialPO;

PartialPO.propTypes = {
	cell: PropTypes.object.isRequired,
};
