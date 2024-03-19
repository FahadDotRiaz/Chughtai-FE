/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-unreachable */
/ eslint-disable no-debugger /;
import { useEffect, useMemo, useState } from "react";
import { Form, Row, Col, Checkbox } from "antd";
import GenericButton from "../../components/GenericButton";
import InputFormCheckbox from "../../components/form/InputcheckBox";
import FormFieldGroup from "../../components/form/FormFieldGroup";
import DropdownWithCheckbox from "../../components/form/DropdownWithCheckbox";
import GenericTabs from "../../components/Tabs";
import TitleSearchButton from "../../components/TitleSearchButton";
import IMAGES from "../../assets/images";
import { PATH } from "../../../config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetDeclarationChildItemQuery,
  useLazyGetDeclarationByIdQuery,
  useLazyGetDeclarationChildItemQuery,
  usePostDeclarationItemMutation,
  useUpdateDeclarationItemMutation,
} from "../../redux/slices/declaration";
import useNotification from "../../components/Notification";
import FullScreenLoader from "../../components/FullScreenLoader";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import {
  useGetCategoryItemListQuery,
  useLazyGetCategoryItemListQuery,
} from "../../redux/slices/category";
import useDebounce from "../../hooks/useDebounce";
import LOOKUPS from "../../utils/lookups";
const CreateUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isReqCreated, setIsReqCreated] = useState(false);
  const [isdecChild, setIsDecChild] = useState("");
  const [filterCategory, setFilterCategory] = useState();

  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
  });
  const { openNotification, contextHolder } = useNotification();
  const [form] = Form.useForm();
  const [showSubItems, setSubItems] = useState(false);
  const [categoryItemList, setCategoryItemList] = useState([]);
  const [inputFields, setInputFields] = useState({
    itemCode: "",
    description: "",
    primaryUnit: "",
    secondaryUnit: "",
    conversion: "",
    rack: "",
    brandName: "",
    packingQty: "",
    packingSize: "",
    category: "",
    fileName: "",
    assetAccount: "",
    consumptionAccount: "",
    capitalAccount: "",
    saleAccount: "",
    foreignAccount: "",
    costSaleAccount: "",
    wipAccount: "",
    boxQty: "",
    //checkboxes defalut values
    replacementRequirement: false,
    fastMoving: false,
    batch: false,
    expDate: false,
    mfgDate: false,
    machine: false,
    purchaseable: false,
    insBypass: false,
    tool: false,
    lotReq: false,
    locator: false,
    part: false,
    consumable: false,
    cotton: false,
    isSerial: false,
    shipment: false,
    finishProduct: false,
    saleable: false,
    agreeTerms: false,
    demandItems: false,
    regularItems: false,
    parentItem: false,
    separateInvoice: false,
    literature: false,
    ovr: false,
    temperature: "",
    subItems: "",
    tempcheck: false,
    // Add more input fields here
  });

  // const { data: categoryItemList = [], isLoading: isListLoading } =
  //   useGetCategoryItemListQuery({
  //     tableOptions: {
  //       filters: {},
  //       pagination: {
  //         pageSize: 200,
  //         pageIndex: 0,
  //       },
  //     },
  //   });
  const [getCategory, { data: categoryItemsList, isLoading: isListLoading }] =
    useLazyGetCategoryItemListQuery();
  const [
    getDeclChildItem,
    { data: categoryChildItemList = [], isLoading: isChildListLoading },
  ] = useLazyGetDeclarationChildItemQuery();
  const [createDeclarationItem, { isLoading: postloading }] =
    usePostDeclarationItemMutation();
  const [updateDeclarationItem, { isLoading: updateloading }] =
    useUpdateDeclarationItemMutation();
  const [
    getDeclarationByID,
    { data: declData, isLoading: declLoading, isFetching: declFetching },
  ] = useLazyGetDeclarationByIdQuery();
  
  const debouncedIsdecChild = useDebounce(isdecChild, 300, ["name"]);
  useEffect(() => {
    getDeclChildItem({ name: debouncedIsdecChild });
  }, [debouncedIsdecChild, getDeclChildItem, isdecChild]);
 
  useEffect(() => {
    if (id) {
      getDeclarationByID(id);
    }
  }, []);
  const debouncedTableOptions = useDebounce(tableOptions, 1000, ["name"]);
  useEffect(() => {
    const fetchData = async () => {
     
      const response = await getCategory({
        tableOptions: {
          ...debouncedTableOptions,
          filters: {
            ...tableOptions.filters,
            name: filterCategory,
          },
        },
      });
      setCategoryItemList((prev) => {
        const uniqueItems = response?.data?.list.filter(
          (item) => !prev.some((prevItem) => prevItem.id === item.id)
        );
        return [...prev, ...uniqueItems];
      });
    };

    fetchData();
  }, [
    debouncedTableOptions,
    getCategory,
    tableOptions.filters,
    filterCategory,
  ]);

  useEffect(() => {
    if (id && declData) {
      form.setFieldsValue({
        itemCode: declData.itemCode,
        ItemName: declData.name,
        measuringUnit: declData.measuringUnit,
        secondaryUnit: declData.secondaryUnit,
        packingQty: declData.packingQty,
        packingSize: declData.packingSize,
        batch: declData?.isBatch ? declData?.isBatch : false,
        parentItem: declData?.isParent ? declData?.isParent : false,
        expDate: declData?.expireDate ? declData?.expireDate : false,
        mfgDate: declData?.manufacturingDate
          ? declData?.manufacturingDate
          : false,
        temperature: declData.temprature,
        description: declData.description,
        category: declData.category?.id,
        // rack: values.rack,
        tempcheck: declData.temprature ? true : false,
      });
      setSubItems(declData?.isParent);
      setInputFields({
        ...inputFields,
        tempcheck: declData.temprature ? true : false,
        subItems: declData.children,
      });
    }
  }, [declData, form, id]);

  const onFinish = async (values) => {
    const finalData = {
      itemCode: values.itemCode,
      name: values.ItemName,
      measuringUnit: values.measuringUnit,
      secondaryUnit: values.secondaryUnit,
      packingQty: values.packingQty,
      packingSize: values.packingSize,
      isBatch: values?.batch ? values?.batch : false,
      isParent: values?.parentItem ? values?.parentItem : false,
      expireDate: values?.expDate ? values?.expDate : false,
      manufacturingDate: values?.mfgDate ? values?.mfgDate : false,
      temprature: values.temperature,
      description: values.description,
      category: values.category,
      // rack: values.rack,
      children:
        showSubItems && inputFields?.subItems ? inputFields?.subItems : [],
    };
    
    if (id) {
      const { error } = await updateDeclarationItem({ id, finalData });
      if (!error) {
        setIsReqCreated(true);
      } else {
        openNotification("error", error?.message);
      }
    } else {
      const { error } = await createDeclarationItem(finalData);
      if (!error) {
        setIsReqCreated(true);
      } else {
        openNotification("error", error?.message);
      }
    }
  };
  
  const fieldsConfig = [
    {
      type: "input",
      label: "Item Code",
      name: "itemCode",
      rules: [{ required: true, message: "Item code is required" }],
    },
    {
      type: "input",
      label: "Item Name",
      name: "ItemName",
      rules: [
        { required: true, message: "Item name is required" },
        {
          max: 200,
          message: "Item name should be less than 200 character",
        },
      ],
    },
    {
      type: "input",
      label: "Description",
      name: "description",

      rules: [
        { required: true, message: "Description is required" },
        {
          max: 100,
          message: "Description should be less than 100 character",
        },
      ],
    },
    {
      type: "dropdown",
      label: "Measuring Unit",
      name: "measuringUnit",
      options:
        LOOKUPS?.MEASURING_UNIT?.map((msr) => {
          return { value: msr?.value, label: msr?.label };
        }) || [],
      //   rules: [{ required: true, message: "Measuring unit is required" }],
    },
    {
      type: "dropdown",
      label: "Secondary Unit",
      name: "secondaryUnit",
      options:
        LOOKUPS?.MEASURING_UNIT?.map((msr) => {
          return { value: msr?.value, label: msr?.label };
        }) || [],
      //   rules: [{ required: true, message: "Secondary unit is required" }],
    },
    // {
    //   type: "input",
    //   label: "Rack No",
    //   name: "rack",
    //   //   rules: [{ required: true, message: "Rack no. is required" }],
    // },
    // {
    //   type: "input",
    //   label: "Brand Name",
    //   name: "brandName",
    //   //   rules: [{ required: true, message: "Brand name is required" }],
    // },
    {
      type: "number",
      label: "Packing Qty",
      name: "packingQty",
      defaultValue: 0,
      min: 0,
      //   rules: [{ required: true, message: "Packing qty is required" }],
    },
    {
      type: "number",
      label: "Packing Size",
      name: "packingSize",
      defaultValue: 0,
      min: 0,
      //   rules: [{ required: true, message: "Packing size is required" }],
    },
    {
      type: "dropdown",
      label: "Category",
      name: "category",
      showSearch: true,
      allowClear: true,
      options:
        categoryItemList?.map((cat) => {
          return { value: cat?.id, label: cat?.name };
        }) || [],
      rules: [{ required: true, message: "Category is required" }],
    },
    {
      type: "",
      label: "",
      name: "",
      rules: [],
    },
    {
      type: "checkbox",
      checked: inputFields.batch,
      label: "Batch",
      name: "batch",
      //  defaultChecked: false,
    },
    {
      type: "checkbox",
      checked: inputFields.expDate,
      label: "Exp. Date",
      name: "expDate",
    },
    {
      type: "checkbox",
      checked: inputFields.mfgDate,
      label: "Mfg. Date",
      name: "mfgDate",
    },
    // {
    //   type: "checkbox",
    //   checked: inputFields.expDate,
    //   label: "Exp. Date",
    //   name: "expDate",
    //   defaultChecked: inputFields.expDate,
    // },
    // {
    //   type: "dropdown",
    //   label: "Department",
    //   name: "department",
    //   //   rules: [{ required: true, message: "Department is required" }],
    //   options: [
    //     { value: "usa", label: "USA" },
    //     { value: "canada", label: "Canada" },
    //     { value: "uk", label: "UK" },
    //   ],
    // },
  ];
  // const checkboxesConfig = [
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.replacementRequirement,
  //   //   label: "Replacement Requirement",
  //   //   name: "replacementRequirement",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.fastMoving,
  //   //   label: "Fast Moving",
  //   //   name: "fastMoving",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.batch,
  //   //   label: "Batch",
  //   //   name: "batch",
  //   //   //  defaultChecked: false,
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.expDate,
  //   //   label: "Exp. Date",
  //   //   name: "expDate",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.mfgDate,
  //   //   label: "Mfg. Date",
  //   //   name: "mfgDate",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.machine,
  //   //   label: "Machine",
  //   //   name: "machine",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.purchaseable,
  //   //   label: "Purchaseable",
  //   //   name: "purchaseable",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.insBypass,
  //   //   label: "Inspection Bypass",
  //   //   name: "insBypass",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.tool,
  //   //   label: "Tool",
  //   //   name: "tool",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.cotton,
  //   //   label: "Cotton",
  //   //   name: "cotton",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.isSerial,
  //   //   label: "Is Serial",
  //   //   name: "isSerial",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.locator,
  //   //   label: "Locator",
  //   //   name: "locator",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.saleable,
  //   //   label: "Saleable",
  //   //   name: "saleable",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.consumable,
  //   //   label: "Consumable",
  //   //   name: "consumable",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.demandItems,
  //   //   label: "On Demand Items",
  //   //   name: "demandItems",
  //   // },
  //   // {
  //   //   type: "checkbox",
  //   //   checked: inputFields.regularItems,
  //   //   label: "Regular Items",
  //   //   name: "regularItems",
  //   // },
  //   // Add more checkbox configurations as needed
  // ];
  const checkboxesConfig2 = [
    {
      type: "checkbox",
      checked: inputFields.parentItem,
      // label: "Parent Item",
      name: "parentItem",
    },
    // {
    // 	type: "checkbox",
    // 	checked: inputFields.separateInvoice,
    // 	label: "Separate Invoice",
    // 	name: "separateInvoice",
    // },
    // {
    // 	type: "checkbox",
    // 	checked: inputFields.literature,
    // 	label: "Literature",
    // 	name: "literature",
    // },
  ];
  // const fieldsConfigBarcode = [
  //   {
  //     type: "input",
  //     label: "1234",
  //     name: "expiry",
  //     defaultValue: "expiry",
  //   },
  //   {
  //     type: "date",
  //     cols: 16,
  //     name: "date",
  //   },
  //   {
  //     type: "input",
  //     label: "5678",
  //     name: "ItemCode",
  //     defaultValue: "Item Code",
  //   },
  //   {
  //     type: "dropdown",
  //     cols: 16,
  //     name: "secondaryUnit",
  //     options: [
  //       { value: "usa", label: "USA" },
  //       { value: "canada", label: "Canada" },
  //       { value: "uk", label: "UK" },
  //     ],
  //   },
  //   {
  //     type: "input",
  //     label: "9101112",
  //     name: "Entrance",
  //     defaultValue: "Entrance",
  //   },
  //   {
  //     type: "dropdown",
  //     name: "expenseNature",
  //     cols: 16,
  //     options: [
  //       { value: "usa", label: "USA" },
  //       { value: "canada", label: "Canada" },
  //       { value: "uk", label: "UK" },
  //     ],
  //   },
  // ];

  const handleInputChange = (fieldName, value) => {
   
    if (fieldName === "tempcheck" && value === false) {
      form.setFieldValue("temperature", "");
    }
    if (fieldName === "parentItem") {
      setSubItems(!showSubItems);
    }
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [fieldName]: value,
    }));
  };

  const dropdownOptions = useMemo(() => {
    return categoryChildItemList?.list?.map((child) => {
      return { value: child?.id, label: child?.name };
    });
  }, [categoryChildItemList]);

  const handleCategory = (fieldName, value) => {
    setCategoryItemList([]);
    setTableOptions({
      filters: {},
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    });
    setFilterCategory(value);
  };
  const onPopupScroll = (e) => {
    e.persist();
    let target = e.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
  
      
      if (categoryItemList?.length < categoryItemsList?.totalRows) {
        setTableOptions((prevOptions) => ({
          ...prevOptions,
          pagination: {
            ...prevOptions.pagination,
            pageIndex: prevOptions.pagination.pageIndex + 1,
          },
        }));
      }
    }
  };
  // [
  //   { value: "canada", label: "Canada" },
  //   { value: "uk", label: "UK" },
  // ];

  const generateFields = (fieldsConfig) => {
    return (
      <FormFieldGroup
        fieldsConfig={fieldsConfig}
        handleInputChange={handleCategory}
        onPopupScroll={onPopupScroll}
      />
    );
  };

  const generateCheckboxes = (config, handleInputChange) => {
    return (
      <FormFieldGroup
        fieldsConfig={config}
        handleInputChange={handleInputChange}
        // col={4}
        // gutter={[32, 32]}
      />
    );
  };

  // const tabsData = [
  //   {
  //     label: "Finish Goods",
  //     children: (
  //       <div className="content-section2">
  //         {generateCheckboxes(checkboxesConfig, handleInputChange)}
  //         <div className="input-check mt-5">
  //           <div className="input-checkbox">
  //             <div className="flex items-center">
  //               <InputFormCheckbox
  //                 label={"Temperature"}
  //                 name={"temperature"}
  //                 checked={inputFields.temperature}
  //                 onChange={(e) =>
  //                   handleInputChange("temperature", e.target.checked)
  //                 }
  //                 showLabel={true}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     key: 0,
  //   },
  //   {
  //     label: "Item Parameter",
  //     key: 3,
  //     children: <></>,
  //   },
  //   {
  //     label: "Barcode",
  //     key: 4,
  //     children: (
  //       <>
  //         <Row className="border rounded p-6">
  //           <Col span={24}>
  //             <p className="text-left text-[#3E3F42] font-medium ml-1">
  //               Add Barcode
  //             </p>
  //           </Col>
  //           <Col span={6} className="flex justify-center items-center">
  //             <img src={IMAGES.BARCODE} className="w-full" />
  //           </Col>
  //           <Col span={18}>
  //             <FormFieldGroup
  //               fieldsConfig={fieldsConfigBarcode}
  //               isLoading={declLoading || declFetching}
  //             />
  //           </Col>
  //           <Col span={24} className="flex justify-end mt-3">
  //             <GenericButton type="primary" lable="Genrate Barcode" />
  //           </Col>
  //         </Row>
  //       </>
  //     ),
  //   },
  // ];
  return (
    <div>
      {contextHolder}

      <TitleSearchButton
        isPrint={true}
        title={
          PATH.DECLARATION_CREATE === pathname
            ? "Create Declaration"
            : "Update Declaration"
        }
      />
      <Form
        form={form}
        name="myForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div>
          <div className="content-section">
            {generateFields(fieldsConfig, handleInputChange)}
            <div className="flex">
              {generateCheckboxes(checkboxesConfig2, handleInputChange)}
              <div className="sub-items ">
                <DropdownWithCheckbox
                  label="Is Parent Items"
                  options={dropdownOptions}
                  onChange={(value) => handleInputChange("subItems", value)}
                  showSubItems={showSubItems}
                  defaultValue={declData?.children || []}
                  showSearch={true}
                  setIsDecChild={setIsDecChild}
                />
              </div>
              {/* {generateCheckboxes(checkboxesConfig, handleInputChange)} */}
              <div className="input-check">
                <div className="input-checkbox">
                  <div className="flex items-center">
                    <InputFormCheckbox
                      label={"Temperature"}
                      name={"temperature"}
                      checkBoxname="tempcheck"
                      checked={inputFields.tempcheck}
                      rules={[
                        ({ getFieldValue }) => ({
                          required: getFieldValue("tempcheck"),
                          message: "Temperature is required",
                        }),
                        {
                          pattern: /^[0-9]+$/,
                          message: "Please enter only digits.",
                        },
                        {
                          max: 3,
                          message: "Please enter no more than 3 digits.",
                        },
                      ]}
                      onChange={(e) => {
                        handleInputChange("tempcheck", e.target.checked);
                      }}
                      showLabel={true}
                      suffix="C°"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="checkBoxGroup">
            <GenericTabs tabData={tabsData} />
          </div> */}
        </div>
        <div className="flex justify-between">
          <div>
            <GenericButton
              lable="Back"
              type="outline"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="flex items-center gap-3">
            <GenericButton
              lable="Cancel"
              type="secondary"
              onClick={() => navigate(PATH.DECLARATION_LIST)}
            />
            <GenericButton
              type="primary"
              lable={pathname === PATH.DECLARATION_CREATE ? "Create" : "Update"}
              loading={postloading || updateloading}
              disabled={postloading || updateloading}
              htmlType={"submit"}
            />
          </div>
        </div>
      </Form>
      <AppConfirmDialog
        showModal={isReqCreated}
        title={
          <div className="text-center">
            {pathname === PATH.DECLARATION_CREATE
              ? "Declaration created successfully"
              : "Declaration updated successfully"}
          </div>
        }
        footer={
          <GenericButton
            type="primary"
            lable="OK"
            onClick={() => navigate(PATH.DECLARATION_LIST)}
          />
        }
      />
      {(postloading || updateloading) && <FullScreenLoader forRequest />}
    </div>
  );
};
export default CreateUpdate;
