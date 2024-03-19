import { Input, Modal, Typography } from "antd";
import GenericMuiTable from "../../components/GenericMuiTable";
import { PlusOutlined } from "@ant-design/icons";
import TitleSearchButton from "../../components/TitleSearchButton";
import ActionDropdown from "../../components/ActionDropdown";
import LOOKUPS from "../../utils/lookups";
import DropdownField from "../../components/form/DropdownField";
import PropTypes from "prop-types";
import { useState } from "react";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import { PATH } from "../../../config";
import { useNavigate } from "react-router-dom";
import TableActionButton from "../../components/TableActionButton";
import StatusTags from "../../components/StatusTags";
import GenericButton from "../../components/GenericButton";

export default function Review() {
  const { Title } = Typography;

  const { TextArea } = Input;
  const navigate = useNavigate();
  const [reject, setReject] = useState(false);
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
      <TitleSearchButton title="Purchase Orders Review" printBtn />
      <GenericMuiTable
        columns={columns}
        data={data}
        // className="cl-table"
      />
      <div className="footer-buttons">
        <GenericButton
          type="outline"
          lable="Back"
          onClick={() => navigate(PATH.PO_LIST)}
        />
        <div className="flex gap-2 justify-end mt-5">
          <GenericButton
            type="primary"
            lable="Reject Request"
            isDanger={true}
            onClick={() => setReject(true)}
          />
          <GenericButton
            type="primary"
            lable="Approve Request"
            // onClick={() => setShowDeleteDialog({ show: true, type: "approve" })}
          />
        </div>
      </div>

      <Modal
        className="confirm-dialog"
        centered
        open={reject}
        destroyOnClose={true}
        cancelButtonProps={{ type: "secondary" }}
        okText="Yes"
        cancelText="Cancel"
        closeIcon={false}
        footer={null}
      >
        <p className="text-lg !font-bold mb-5">Reason of Refusal</p>
        <TextArea
          defaultValue={
            "Product does not meet quality standards outlined in our specifications.Inadequate compliance with regulatory requirements"
          }
        />
        <GenericButton
          className="mt-5 mx-auto"
          type="primary"
          lable="OK"
          onClick={() => setReject(false)}
          // onClick={() => setShowDeleteDialog({ show: true, type: "approve" })}
        />
      </Modal>
    </>
  );
}
