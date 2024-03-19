import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { PATH } from "../../../../config";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useCreateGatePassMutation,
  useLazyGetGatePassByIDQuery,
  useUpdateGatePassMutation,
} from "../../../redux/slices/gatePass";
import { Form } from "antd";
import useNotification from "../../../components/Notification";
import dayjs from "dayjs";
import { useGetPOListQuery } from "../../../redux/slices/purchaseOrder";
import { useSelector } from "react-redux";

const CreateUpdate = () => {
  const { id } = useParams();
  const [isReqCreated, setIsReqCreated] = useState(false);
  const { openNotification, contextHolder } = useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [createGatePass, { isLoading: createLoading }] =
    useCreateGatePassMutation();
  const [updateGatePass, { isLoading: updateLoading }] =
    useUpdateGatePassMutation();
  const { user } = useSelector((state) => state.auth);
  const departmentId = user?.activeRole?.departmentId;

  const [getGatePassByID, { data: GpData, isLoading }] =
    useLazyGetGatePassByIDQuery();

  const tableOptions = {
    filters: {},
    pagination: {
      pageSize: 500,
      pageIndex: 0,
    },
  };
  const { data: POList } = useGetPOListQuery({
    departmentId,
    tableOptions,
  });

  useEffect(() => {
    if (id) {
      getGatePassByID({ id });
    }
  }, []);

  useEffect(() => {
    if (GpData) {
      form.setFieldValue("driverName", GpData?.driverName);
      form.setFieldValue("driverCell", GpData?.driverCell);
      form.setFieldValue("driverId", GpData?.driverId);
      form.setFieldValue("type", GpData?.type);
      form.setFieldValue("transportMode", GpData?.transportMode);
      form.setFieldValue("itemUnit", GpData?.itemUnit);
      form.setFieldValue("po", GpData?.po?.poCode);
      form.setFieldValue("truckNo", GpData?.truckNumber);
      form.setFieldValue(
        "date",
        dayjs(GpData?.date?.split("T")[0], "YYYY-MM-DD")
      );
    }
  }, [GpData, form]);

  const onFinish = async (values) => {
    const finalData = {
      driverName: values?.driverName,
      driverId: values?.driverId,
      driverCell: values?.driverCell,
      type: values?.type,
      transportMode: values?.transportMode,
      itemUnit: values?.itemUnit,
      po: values?.po,
      truckNumber: values?.truckNo,
      date: dayjs(values.date).format("YYYY-MM-DDTHH:mm:ssZ"),
      inwardOutward: "Inward",
    };
    let response;
    if (id) {
      response = await updateGatePass({ id, finalData });
    } else {
      response = await createGatePass({ finalData });
    }

    if (!response.error) {
      setIsReqCreated(true);
    } else {
      openNotification("error", "Error performing action");
    }
  };

  const fieldsConfig = [
    {
      type: "input",
      placeholder: "Enter driver name",
      label: "Driver Name",
      name: "driverName",
      rules: [{ required: true, message: "This field is required" }],
    },
    {
      type: "input",
      label: "Driver Cell",
      placeholder: "Enter driver cell",
      name: "driverCell",
      rules: [{ required: true, message: "This field is required" }],
    },
    {
      type: "input",
      label: "Driver ID",
      placeholder: "Enter driver id",
      name: "driverId",
      rules: [{ required: true, message: "This field is required" }],
    },
    {
      type: "input",
      label: "Truck Number",
      placeholder: "Enter truck number",
      name: "truckNo",
      rules: [{ required: true, message: "This field is required" }],
    },
    {
      type: "dropdown",
      label: "Type",
      placeholder: "Select type",
      name: "type",
      rules: [{ required: true, message: "This field is required" }],
      options: [
        { value: "Dedicated Vehicle", label: "Dedicated Vehicle" },
        { value: "Hand carry", label: "Hand carry" },
        { value: "Rent", label: "Rent" },
      ],
    },
    {
      type: "dropdown",
      label: "Transport Mode",
      placeholder: "Select transport mode",
      name: "transportMode",
      rules: [{ required: true, message: "This field is required" }],
      options: [
        { value: "pickup", label: "Pickup" },
        { value: "delivery", label: "Delivery" },
      ],
    },
    {
      type: "dropdown",
      label: "Item Unit",
      placeholder: "Select item unit",
      name: "itemUnit",
      rules: [{ required: true, message: "This field is required" }],
      options: [
        { value: "Box", label: "Box" },
        { value: "Pack", label: "Pack" },
        { value: "Item", label: "Item" },
      ],
    },
    {
      type: "dropdown",
      label: "PO#",
      showSearch: true,
      name: "po",
      placeholder: "Select PO number",
      rules: [{ required: true, message: "This field is required" }],
      options: POList?.list?.map((item) => ({
        value: item.id,
        label: item.poCode,
      })),
    },
    // {
    //   type: "datetime",
    //   label: "Date",
    //   placeholder: "Select date",
    //   name: "date",
    //   // defaultValue: dayjs("2023-01-01", "YYYY-MM-DD"),
    //   rules: [{ required: true, message: "This field is required" }],
    // },
  ];
  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        name="myForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <TitleSearchButton title="Inward Gate Pass" printBtn />
        <GenericCard>
          <FormFieldGroup
            fieldsConfig={fieldsConfig}
            isLoading={isLoading}
            // handleInputChange={handleInputChange}
          />
        </GenericCard>
        <div className="mt-5 flex justify-between">
          <GenericButton
            type="outline"
            lable="Back"
            onClick={() => navigate(PATH.IGP_LIST)}
          />
          <GenericButton
            type="primary"
            lable={pathname === PATH.IGP_CREATE ? "Create IGP" : "Update IGP"}
            htmlType="submit"
            disabled={createLoading || updateLoading}
            loading={createLoading || updateLoading}
          />
        </div>

        <AppConfirmDialog
          showModal={isReqCreated}
          title={
            <div className="text-center">
              {pathname === PATH.IGP_CREATE
                ? "IGP created successfully"
                : "IGP updated successfully"}
            </div>
          }
          footer={
            <GenericButton
              type="primary"
              lable="OK"
              onClick={() => navigate(PATH.IGP_LIST)}
            />
          }
        />
      </Form>
    </div>
  );
};

export default CreateUpdate;
