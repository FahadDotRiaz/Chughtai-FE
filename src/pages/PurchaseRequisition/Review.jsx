import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../components/GenericButton";
import GenericMuiTable from "../../components/GenericMuiTable";
import TableActionButton from "../../components/TableActionButton";
import TableEditableField from "../../components/TableEditableField";
import { PATH } from "../../../config";
import TitleSearchButton from "../../components/TitleSearchButton";
import { PlusOutlined } from "@ant-design/icons";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import { Col, Modal, Radio, Row } from "antd";
import { GenericModal } from "../../components/GenericModal";
import DropdownField from "../../components/form/DropdownField";

export default function PurchaseRequisitionReview() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [locationDialog, setLocationDialog] = useState(false);

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
            <div className="table-lable">PR# 443523</div>
            <div className="flex gap-8 mt-3">
              <h6 className="text-[#3E3F42]">Created By: Muneeb</h6>
              <h6 className="text-[#3E3F42]">Created Date: 1/10/2024</h6>
              <h6 className="text-[#3E3F42]">
                From: Jail road, Lahore, Punjab
              </h6>
            </div>
          </div>
        </Col>
      </Row>
      <div className="mt-5">
        <TitleSearchButton
          title="Items"
          btnLable="Add Item"
          secondaryTitle
          icon={<PlusOutlined />}
          filter
          // onButtonChange={() => setAddItemModal(true)}
        />
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
          onClick={() => navigate(PATH.PROCUREMENT_PURCHASE_ORDER_LIST)}
        />

        <div className="flex gap-2">
          <GenericButton
            type="primary"
            lable="Generate PO"
            onClick={() => setLocationDialog(true)}
          />
        </div>
      </div>
      <AppConfirmDialog
        showModal={showDialog}
        description={`Are you sure you want to Generate the request`}
        handleCancel={() => setShowDialog(false)}
        handleOk={() => setShowDialog(false)}
      />
      <PoLocationDialog
        show={locationDialog}
        onHide={() => setLocationDialog(false)}
        onOk={() => navigate(PATH.PURCHASE_REQUISITION_LIST)}
      />
    </>
  );
}

const PoLocationDialog = ({ show, onHide, onOk }) => {
  const [showLocation, setShowLocation] = useState(false);
  return (
    <Modal
      title={"Deliver to"}
      centered
      open={show}
      onOk={onOk}
      onCancel={onHide}
      width={500}
      closeIcon={false}
      okText={"Yes"}
    >
      <div className="mt-5">
        <Radio.Group
          className="gap-4 flex flex-col"
          onChange={(e) => setShowLocation(e.target.value === 2)}
        >
          <Radio className="w-full" value={1}>
            Deliver to the same location
          </Radio>
          <Radio className="w-full" value={2}>
            Deliver to the other location
          </Radio>
        </Radio.Group>
        {showLocation && (
          <DropdownField
            className="mt-4"
            options={[
              { value: "hod", label: "Johar Town Lahore" },
              { value: "manager", label: "Jail Road Lahore" },
            ]}
            name="role"
            placeholder={"Locations"}
            // onChange={handleInputChange}
          />
        )}
      </div>
    </Modal>
  );
};
