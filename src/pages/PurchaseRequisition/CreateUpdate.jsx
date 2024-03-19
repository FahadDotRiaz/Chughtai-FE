import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Form } from "antd";

import TitleSearchButton from "../../components/TitleSearchButton";
import GenericMuiTable from "../../components/GenericMuiTable";
import { AddItems } from "../MIR/Shared/components/AddItems";
import TableEditableField from "../../components/TableEditableField";
import TableActionButton from "../../components/TableActionButton";
import GenericCard from "../../components/GenericCard";
import FormFieldGroup from "../../components/form/FormFieldGroup";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import GenericButton from "../../components/GenericButton";
import { PATH } from "../../../config";
import CardButtonFilterGroup from "../../components/CardButtonFilterGroup";
import { useCreatePurchaseRequisitionMutation } from "../../redux/slices/purchaseRequisition";
import useNotification from "../../components/Notification";

export default function CreateUpdate() {
  const [form] = Form.useForm();
  const { openNotification, contextHolder } = useNotification();

  const [addItemModal, setAddItemModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [createPurchaseRequisition, { isLoading: createLoading }] =
    useCreatePurchaseRequisitionMutation();

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
  const data = [
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
  ];

  const fieldsConfig = [
    {
      type: "dropdown",
      label: "Store",
      name: "store",
      rules: [{ required: true, message: "Please input this field!" }],
      options: [
        { value: "Adhoc", label: "Johar Town Lahore" },
        { value: "Recurrent", label: "Jail Road Lahore" },
      ],
    },
    {
      type: "textarea",
      label: "Remarks",
      name: "remarks",
      rows: 3,
      rules: [{ required: true, message: "Please input this field!" }],
    },
  ];

  const onFinish = async (values) => {
    const finalData = {
      requester: values?.requester,
      comments: values?.comments,
    //   items: form.getFieldValue("item").map((item) => item),
    };
    let response;
    response = await createPurchaseRequisition({ finalData });
    if (!response.error) {
      setShowDialog(true);
    } else {
      openNotification("error", "Error performing action");
    }
  };

  const generateFields = (fieldsConfig) => {
    return <FormFieldGroup fieldsConfig={fieldsConfig} />;
  };

  return (
    <>
      {contextHolder}
      <Form form={form} name="purchaseRequisitionForm" onFinish={onFinish}>
        <TitleSearchButton
          title={
            false
              ? "Update Purchase Requisition"
              : "Create Purchase Requisition"
          }
          importDropdown={true}
        />

        <CardButtonFilterGroup
          title={{ text: "Requested Items", level: 2 }}
          button={{
            label: "Add Item",
            icon: <PlusOutlined />,
            onClick: () => setAddItemModal(true),
          }}
        >
          <GenericMuiTable
            columns={columns}
            data={data}
            simpleTable
            enableColumnFilters={false}
            // isLoading={isLoading}
            maxHeight={"50vh"}
          />
        </CardButtonFilterGroup>
        <GenericCard className="mt-5">
          {generateFields(fieldsConfig)}
        </GenericCard>

        <div className="footer-buttons">
          <GenericButton
            type="outline"
            lable="Back"
            onClick={() => navigate(PATH.PURCHASE_REQUISITION_LIST)}
          />

          <div className="flex gap-2">
            {!false ? (
              <GenericButton
                type="primary"
                lable="Generate Request"
                htmlType="submit"
                //   disabled={createLoading}
                //   loading={createLoading}
                // onClick={() => setShowDialog(true)}
              />
            ) : (
              <GenericButton
                type="primary"
                lable="Update"
                onClick={() => setShowDialog(true)}
              />
            )}
          </div>
        </div>

        <AddItems show={addItemModal} onClose={() => setAddItemModal(false)} />
        <AppConfirmDialog
          showModal={showDialog}
          description={`Are you sure you want to ${
            !false ? `Generate the request` : `update`
          }?`}
          handleCancel={() => setShowDialog(false)}
          handleOk={() => navigate(PATH.PURCHASE_REQUISITION_LIST)}
        />
      </Form>
    </>
  );
}
