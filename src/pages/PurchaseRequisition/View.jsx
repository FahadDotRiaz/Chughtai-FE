import { useNavigate } from "react-router-dom";
import GenericMuiTable from "../../components/GenericMuiTable";
import TableActionButton from "../../components/TableActionButton";
import TableEditableField from "../../components/TableEditableField";
import TitleSearchButton from "../../components/TitleSearchButton";
import { Col, Row } from "antd";
import { BsCircleFill } from "react-icons/bs";
import GenericButton from "../../components/GenericButton";
import { PATH } from "../../../config";

export default function PurchaseRequisitionView() {
  const navigate = useNavigate();

  const vendor = [
    {
      label: "10 Trading",
      key: "0",
    },
    {
      label: "Abott",
      key: "1",
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
    {
      header: "UOM",
      accessorKey: "uom",
      size: 150,
    },
    // {
    //   header: "Price",
    //   accessorKey: "price",
    //   size: 150,
    // },
    {
      header: "Items In Stock",
      accessorKey: "stock",
      size: 150,
      Cell: () => (
        <TableEditableField field="number" defaultValue={5} min={0} />
      ),
    },
    {
      header: "QTY",
      accessorKey: "qty",
      size: 150,
      Cell: () => (
        <TableEditableField field="number" defaultValue={15} min={0} />
      ),
    },
    {
      header: "Sales Tax",
      accessorKey: "sales",
      size: 150,
      Cell: () => (
        <TableEditableField
          field="number"
          defaultValue={2.5}
          min={0}
          prefix="%"
        />
      ),
    },
    {
      header: "Federal Tax",
      accessorKey: "federal",
      size: 150,
      Cell: () => (
        <TableEditableField
          field="number"
          defaultValue={0.0}
          min={0}
          prefix="%"
        />
      ),
    },
    {
      header: "Total Price",
      accessorKey: "price",
      size: 150,
    },
    {
      header: "Delivery Date",
      accessorKey: "vendor",
      size: 150,
      Cell: () => <TableEditableField field="date" defaultValue="01-23-2024" />,
    },
    {
      header: "Vendor",
      accessorKey: "date",
      size: 150,
      Cell: () => (
        <TableEditableField field="dropdown" dropdownItems={vendor} />
      ),
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
      size: 150,
      Cell: () => (
        <TableEditableField field="input" defaultValue={"Need Urgent..."} />
      ),
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
      Cell: () => (
        <TableActionButton
          onDelete={() => {}}
          onView={() => console.log("view")}
        />
      ),
    },
  ];

  const items = [
    {
      mir: "01022344",
      key: "1",
      itemCode: `1023`,
      name: "Amoxicillin",
      itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
      requisition: 23,
      approved: 14,
      uom: "unit",
      department: "1245",
      username: "zain",
      genrated_date: `11/01/2023`,
      stage: `HOD Approval`,
      actions: `HOD Approval`,
      status: "Approved",
      from: "Karachi",
      to: "Lahore",
      branch: "Lahore,Johar town",
      stnStatus: "process",
      pending: 100,
      issue: 70,
      store: 112,
      assigned: 70,
      vendor: "Rose patel",
      expiry: "N/A",
      parentItem: "tissue",
      qty: "20",
      batchNo: "N/A",
      dept: "Pathology",
      price: "6412.5",
    },
    {
      mir: "01022344",
      key: "1",
      itemCode: `1023`,
      name: "Amoxicillin",
      itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
      requisition: 23,
      approved: 14,
      uom: "unit",
      department: "1245",
      username: "zain",
      genrated_date: `11/01/2023`,
      stage: `HOD Approval`,
      actions: `HOD Approval`,
      status: "Pending",
      from: "Karachi",
      to: "Lahore",
      branch: "Lahore,Johar town",
      stnStatus: "process",
      pending: 100,
      price: "6412.5",
      issue: 70,
      store: 112,
      assigned: 70,
      vendor: "Rose patel",
      expiry: "N/A",
      parentItem: "tissue",
      qty: "20",
      batchNo: "N/A",
      dept: "Pathology",
    },
    {
      mir: "01022344",
      key: "1",
      itemCode: `1023`,
      name: "Amoxicillin",
      itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
      requisition: 23,
      approved: 14,
      uom: "unit",
      department: "1245",
      price: "6412.5",
      username: "zain",
      genrated_date: `11/01/2023`,
      stage: `HOD Approval`,
      actions: `HOD Approval`,
      status: "Approved",
      from: "Karachi",
      to: "Lahore",
      branch: "Lahore,Johar town",
      stnStatus: "process",
      pending: 100,
      issue: 70,
      store: 112,
      assigned: 70,
      vendor: "Rose patel",
      expiry: "N/A",
      parentItem: "tissue",
      qty: "20",
      batchNo: "N/A",
      dept: "Pathology",
    },
    {
      mir: "01022344",
      key: "1",
      itemCode: `1023`,
      name: "Amoxicillin",
      itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
      requisition: 23,
      approved: 14,
      price: "6412.5",
      uom: "unit",
      department: "1245",
      username: "zain",
      genrated_date: `11/01/2023`,
      stage: `HOD Approval`,
      actions: `HOD Approval`,
      status: "Pending",
      from: "Karachi",
      to: "Lahore",
      branch: "Lahore,Johar town",
      stnStatus: "process",
      pending: 100,
      issue: 70,
      store: 112,
      assigned: 70,
      vendor: "Rose patel",
      expiry: "N/A",
      parentItem: "tissue",
      qty: "20",
      batchNo: "N/A",
      dept: "Pathology",
    },
    {
      mir: "01022344",
      key: "1",
      itemCode: `1023`,
      name: "Amoxicillin",
      itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
      requisition: 23,
      approved: 14,
      uom: "unit",
      department: "1245",
      username: "zain",
      genrated_date: `11/01/2023`,
      stage: `HOD Approval`,
      actions: `HOD Approval`,
      status: "Rejected",
      from: "Karachi",
      to: "Lahore",
      branch: "Lahore,Johar town",
      stnStatus: "process",
      pending: 100,
      issue: 70,
      price: "6412.5",
      store: 112,
      assigned: 70,
      vendor: "Rose patel",
      expiry: "N/A",
      parentItem: "tissue",
      qty: "20",
      batchNo: "N/A",
      dept: "Pathology",
    },
  ];
  return (
    <>
      <Row gutter={12}>
        <Col>
          <div>
            <div className="flex items-center">
              <div className="table-lable flex items-center">PR# 443523</div>
              <div className="flex items-center ml-3">
                <BsCircleFill fill="#34D858" size={10} className="mr-1" />{" "}
                Approved
              </div>
            </div>
            <div className="flex gap-8 mt-3">
              <h6 className="text-[#3E3F42]">Created By: Muneeb</h6>
              <h6 className="text-[#3E3F42]">Created Date: 1/10/2024</h6>
              <h6 className="text-[#3E3F42]">
                From: Jail road, Lahore, Punjab
              </h6>
            </div>
          </div>
        </Col>
        <Col className="border-s-[2px] border-[#E6E6E6] mx-10"></Col>
        <Col>
          <div className="table-lable">Purchase Order</div>
          <div className="flex items-center gap-5 mt-3">
            <span className="text-[#2656E5] cursor-pointer">15643135</span>
            <span className="text-[#2656E5] cursor-pointer">15643135</span>
            <span className="text-[#2656E5] cursor-pointer">15643135</span>
            <span className="text-[#2656E5] cursor-pointer">15643135</span>
          </div>
        </Col>
      </Row>
      <div className="mt-5">
        <TitleSearchButton title="Items" secondaryTitle filter />
      </div>
      <GenericMuiTable
        columns={columns}
        data={items}
        simpleTable
        enableColumnFilters={false}
      />
      <div className="footer-buttons">
        <GenericButton
          type="outline"
          lable="Back"
          onClick={() => navigate(PATH.PURCHASE_REQUISITION_LIST)}
        />
      </div>
    </>
  );
}
