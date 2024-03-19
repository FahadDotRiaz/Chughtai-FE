import GenericMuiTable from "../../components/GenericMuiTable";
import TitleSearchButton from "../../components/TitleSearchButton";
import { PATH } from "../../../config";
import { useNavigate } from "react-router-dom";
import TableActionButton from "../../components/TableActionButton";
import StatusTags from "../../components/StatusTags";

export default function PurchaseOrder() {
  const navigate = useNavigate();
  const columns = [
    {
      header: "PO #",
      accessorKey: "code",
    },
    {
      header: "Requested By",
      accessorKey: "created",
    },
    {
      header: "Status",
      accessorKey: "status",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell }) => <StatusTags status={cell?.getValue()} />,
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Action",
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
      // eslint-disable-next-line no-unused-vars
      Cell: () => (
        <TableActionButton
          type="view"
          onClick={() => navigate(PATH.PO_REVIEW)}
        />
      ),
    },
  ];
  const data = [
    {
      code: "01022344",
      key: "1",
      date: `11/13/2023`,
      created: "Muneeb",
      department: "Lahore",
      remarks: "Consumption added against items",
      status: "Pending",
    },
    {
      code: "01022344",
      key: "1",
      date: `11/13/2023`,
      created: "Muneeb",
      department: "Lahore",
      remarks: "Consumption added against items",
      status: "Completed",
    },
    {
      code: "01022344",
      key: "1",
      date: `11/13/2023`,
      created: "Muneeb",
      department: "Lahore",
      status: "Completed",
      remarks: "Consumption added against items",
    },
    {
      code: "01022344",
      key: "1",
      date: `11/13/2023`,
      created: "Muneeb",
      department: "Lahore",
      status: "Pending",
      remarks: "Consumption added against items",
    },
    {
      code: "01022344",
      key: "1",
      date: `11/13/2023`,
      created: "Muneeb",
      department: "Lahore",
      status: "Pending",
      remarks: "Consumption added against items",
    },
  ];
  return (
    <>
      <TitleSearchButton title="Purchase Orders" printBtn />
      <GenericMuiTable
        columns={columns}
        data={data}
        // className="cl-table"
      />
    </>
  );
}
