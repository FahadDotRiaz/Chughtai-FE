/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { Avatar, Form, Modal } from "antd";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import {
  usePostInventoryItemMutation,
  useUpdateInventoryItemMutation,
} from "../../../redux/slices/inventory";
import { useEffect, useState } from "react";
import useNotification from "antd/es/notification/useNotification";
import GenericButton from "../../../components/GenericButton";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { useGetItemsQuery } from "../../../redux/slices/items";

export default function CreateUpdate({ show, onHide, record }) {
  const [isReqCreated, setIsReqCreated] = useState(false);
  const { openNotification, contextHolder } = useNotification();
  const [form] = Form.useForm();

  const [createInventoryItem, { isLoading: isAddLoading }] =
    usePostInventoryItemMutation();

  const [updateInventoryItem, { isLoading: isUpdateLoading }] =
    useUpdateInventoryItemMutation();

  const { data: itemsList = [], isLoading: isItemsLoading } =
    useGetItemsQuery();

  const validation = () => {
    form.validateFields();
  };
  const fieldsConfig = [
    {
      type: "dropdown",
      label: "Item",
      name: "item",
      rules: [{ required: true, message: "This field is required" }],
      options: itemsList?.items?.map((item) => {
        return { value: item.id, label: item.name };
      }),
      disabled: record ? true : false,
    },
    {
      type: "number",
      label: "Quantity",
      defaultValue: 0,
      name: "quantity",
      rules: [{ required: true, message: "This field is required" }],
      min: 0,
      disabled: record ? true : false,
    },
    {
      type: "number",
      label: "Minimum",
      // defaultValue: 0,
      name: "min",
      rules: [
        { required: true, message: "This field is required" },
        (formInstance) => ({
          message: "Min value must not be greater than Max",
          validator(rule, value) {
            if (value === null) {
              return Promise.resolve();
            }
            const maxValue = formInstance.getFieldValue("max");
            if (value > maxValue) {
              return Promise.reject(new Error());
            }
            return Promise.resolve();
          },
        }),
      ],
      min: 0,
      onChange: () => validation(),
    },
    {
      type: "number",
      label: "Maximum",
      // defaultValue: 0,
      name: "max",
      rules: [
        { required: true, message: "This field is required" },
        (formInstance) => ({
          message: "Max value must not be less than Min",
          validator(rule, value) {
            if (value === null) {
              return Promise.resolve();
            }
            const minValue = formInstance.getFieldValue("min");
            if (value < minValue) {
              return Promise.reject(new Error());
            }
            return Promise.resolve();
          },
        }),
      ],
      min: 0,
      onChange: () => validation(),
    },
  ];
  const generateFields = (fieldsConfig) => {
    return <FormFieldGroup fieldsConfig={fieldsConfig} col={12} />;
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        quantity: record?.quantity,
        item: record?.item?.itemCode,
        min: record?.min || 0,
        max: record?.max || 0,
      });
    }
  }, [record]);

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const request = {
        ...form?.getFieldsValue(),
        item: record?.item?.id,
        type: record?.inventory?.type,
        location: record?.inventory?.department?.id,
      };
      if (record) {
        const { error } = await updateInventoryItem({
          finalData: request,
          id: record?.inventory?.id,
        });
        if (!error) {
          setIsReqCreated(true);
          // onHide();
          form?.resetFields();
        } else {
          openNotification("error", "Error updating item");
        }
      } else {
        const { error } = await createInventoryItem(request);
        if (!error) {
          setIsReqCreated(true);
          // onHide();
          form?.resetFields();
        } else {
          openNotification("error", "Error adding item");
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <>
      {contextHolder}
      {isItemsLoading ? (
        <Avatar active />
      ) : (
        <Modal
          open={show}
          title={`${record ? "Update" : "Add"} Item`}
          onCancel={() => {
            form?.resetFields();
            onHide();
          }}
          onOk={onSubmit}
          centered
          width={700}
          okText={`${record ? "Update" : "Add"}`}
          closeIcon={false}
          okButtonProps={{
            htmlType: "submit",
            disabled: isAddLoading || isUpdateLoading,
            loading: isAddLoading || isUpdateLoading,
          }}
        >
          <Form
            form={form}
            rem
            name="myForm"
            // initialValues={{
            //   quantity: record?.quantity || 0,
            // }}
            onFinish={onSubmit}
          >
            {generateFields(fieldsConfig)}
          </Form>
        </Modal>
      )}

      <AppConfirmDialog
        showModal={isReqCreated}
        title={
          <div className="text-center">
            Item {`${record ? "Updated" : "Added"}`} Successfully
          </div>
        }
        footer={
          <GenericButton
            type="primary"
            lable="OK"
            onClick={() => {
              onHide();
              setIsReqCreated(false);
            }}
          />
        }
      />
    </>
  );
}
