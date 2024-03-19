/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Modal, Row, Col, Checkbox, Form, Spin } from "antd";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import {
  useGetRoleLevelsQuery,
  useLazyGetRoleByIdQuery,
  usePostRoleMutation,
  useUpdateRoleMutation,
} from "../../../redux/slices/role";
import useNotification from "../../../components/Notification";
import { PERMISSION_LEVELS } from "../../../utils/constant";

const AddRoleModal = ({ showModal, onClose, departmentId }) => {
  const [form] = Form.useForm();
  const [getRoleByID, { data: roleData = {}, isLoading, isFetching }] =
    useLazyGetRoleByIdQuery();

  const regexPattern = /^[a-fA-F0-9-]{36}$/;
  const { data: roleLevels } = useGetRoleLevelsQuery({
    type: [
      PERMISSION_LEVELS.STORE_SETTING,
      PERMISSION_LEVELS.INVENTORY,
      PERMISSION_LEVELS.DEPARTMENT_SETTING,
      PERMISSION_LEVELS.ADMIN_SETTING,
    ],
  });
  const [checkedValues, setCheckedValues] = useState({});
  const [postRoles, { isLoading: postLoading }] = usePostRoleMutation();
  const [updateRoles, { isLoading: updateLoading }] = useUpdateRoleMutation();
  const { openNotification, contextHolder } = useNotification();
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    if (showModal?.id) {
      getRoleByID(showModal?.id);
    }
  }, [showModal?.id]);

  useEffect(() => {
    if (showModal?.id && roleData?.actions) {
      form.setFieldsValue({
        name: roleData?.name,
        description: roleData?.description,
      });
      const uuidObject = roleData?.actions?.reduce((acc, uuid) => {
        acc[uuid] = true;
        return acc;
      }, {});
      setCheckedValues(uuidObject);
      setActiveKeys(roleData?.menu);
    }
  }, [roleData, showModal?.id]);

  const fieldsConfig = [
    {
      type: "input",
      label: "Name",
      name: "name",
      rules: [
        { required: true, message: "Name is required", whitespace: true },
      ],
      cols: 12,
    },
    {
      type: "input",
      label: "Description",
      name: "description",
      rules: [
        {
          required: true,
          message: "Description is required",
          whitespace: true,
        },
      ],
      cols: 12,
    },
  ];

  const handleClose = () => {
    form.resetFields();
    setCheckedValues({});
    onClose();
  };

  const onHandleOk = () => {
    form.validateFields().then(async (values) => {
      const ids = Object.keys(checkedValues).filter(
        (key) => checkedValues?.[key] === true && regexPattern.test(key)
      );
      const finalData = {
        name: values?.name,
        description: values?.description,
        department: departmentId,
        actions: ids,
      };
      if (showModal?.id && roleData) {
        const { error } = await updateRoles({ id: showModal?.id, finalData });
        if (!error) {
          openNotification(
            "success",
            error?.message || "Role Updated Successfully"
          );
          handleClose();
        } else {
          openNotification("error", error?.message || "Error updating user");
        }
      } else {
        const { error } = await postRoles(finalData);
        if (!error) {
          openNotification(
            "success",
            error?.message || "Role Added Successfully"
          );
          handleClose();
        } else {
          openNotification("error", error?.message || "Error creating user");
        }
      }
    });
  };
  const handleCheckboxChange = (key, isId, value) => {
    const obj = { ...checkedValues };
    if (value) {
      if (isId) {
        obj[key] = true;
      } else {
        obj[key] = false;
      }
    } else {
      delete obj[key];
    }
    setCheckedValues(obj);
  };
  return (
    <Modal
      title={showModal?.id ? "Update Role" : "Add Role"}
      centered
      open={showModal?.show}
      onOk={onHandleOk}
      onCancel={handleClose}
      width={800}
      okButtonProps={{
        htmlType: "submit",
        loading: postLoading || updateLoading,
      }}
      okText={showModal?.id ? "Update" : "Add"}
    >
      {contextHolder}
      <Form name="AddRoleModalForm" autoComplete="off" form={form}>
        <FormFieldGroup
          fieldsConfig={fieldsConfig}
          isLoading={isLoading || isFetching}
        />
        {isLoading || isFetching ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : (
          <div className="h-[50vh] overflow-auto mt-5">
            <Row>
              <Col span={18} className="border p-4 font-semibold">
                Modules
              </Col>
              <Col span={6} className="border p-4 font-semibold text-center">
                Permissions
              </Col>
            </Row>
            {roleLevels && (
              <RoleAndPermissions
                data={roleLevels || []}
                checkedValues={checkedValues}
                onCheckedFunc={handleCheckboxChange}
                activeKeys={activeKeys}
                setActiveKeys={setActiveKeys}
              />
            )}
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddRoleModal;

const RoleAndPermissions = React.memo(
  ({ data, checkedValues, onCheckedFunc, setActiveKeys, activeKeys }) => {
    //   const [expandedKeys, setExpandedKeys] = useState([]);
    //   const toggleExpand = (key) => {
    //     if (expandedKeys.includes(key)) {
    //       setExpandedKeys(expandedKeys.filter((k) => k !== key));
    //     } else {
    //       setExpandedKeys([...expandedKeys, key]);
    //     }
    //   };

    //   console.log("expandedKeys", expandedKeys);
    //   const handleCheckboxChange = (key, isId, value) => {
    //     const obj = { ...checkedValues };
    //     if (value) {
    //       if (isId) {
    //         obj[key] = true;
    //       } else {
    //         obj[key] = false;
    //       }
    //     } else {
    //       delete obj[key];
    //     }
    //     setCheckedValues(obj);
    //     // handleAllCheck(key, value);
    //   };

    //   const handleAllCheck = (key, value) => {
    //     data?.forEach((item) => {
    //       item?.modules?.forEach((module) => {
    //         if (item.key === key || module.key === key) {
    //           setCheckedValues((prevCheckedValues) => {
    //             const updatedCheckedValues = {
    //               ...prevCheckedValues,
    //               [module.key]: !value,
    //             };
    //             return updatedCheckedValues;
    //           });
    //           module?.childern?.forEach((child) => {
    //             setCheckedValues((prevCheckedValues) => {
    //               const updatedCheckedValues = {
    //                 ...prevCheckedValues,
    //                 [child.key]: !value,
    //               };
    //               return updatedCheckedValues;
    //             });
    //             child?.actions?.forEach((action) => {
    //               setCheckedValues((prevCheckedValues) => {
    //                 const updatedCheckedValues = {
    //                   ...prevCheckedValues,
    //                   [action.id]: value,
    //                 };
    //                 return updatedCheckedValues;
    //               });
    //             });
    //             if (child?.key === key) {
    //               setCheckedValues((prevCheckedValues) => {
    //                 const updatedCheckedValues = {
    //                   ...prevCheckedValues,
    //                   [child.key]: !value,
    //                 };
    //                 return updatedCheckedValues;
    //               });
    //               child?.actions?.forEach((action) => {
    //                 setCheckedValues((prevCheckedValues) => {
    //                   const updatedCheckedValues = {
    //                     ...prevCheckedValues,
    //                     [action.id]: value,
    //                   };
    //                   return updatedCheckedValues;
    //                 });
    //               });
    //             }
    //           });
    //         }
    //         module?.childern?.forEach((child) => {
    //           if (child.key === key) {
    //             setCheckedValues((prevCheckedValues) => {
    //               const updatedCheckedValues = {
    //                 ...prevCheckedValues,
    //                 [child.key]: !value,
    //               };
    //               return updatedCheckedValues;
    //             });
    //             child?.actions?.forEach((action) => {
    //               setCheckedValues((prevCheckedValues) => {
    //                 const updatedCheckedValues = {
    //                   ...prevCheckedValues,
    //                   [action.id]: value,
    //                 };
    //                 return updatedCheckedValues;
    //               });
    //             });
    //           }
    //         });
    //       });
    //     });
    //   };

    //   const renderModules = (modules, depth = 1) => {
    //     return modules.map((module) => (
    //       <React.Fragment key={module.key}>
    //         <Row>
    //           <Col
    //             span={18}
    //             className="border border-t-0 p-2 flex items-center cursor-pointer"
    //             onClick={() => toggleExpand(module.key)}
    //             style={{ paddingLeft: depth * 16 }}
    //           >
    //             <span>
    //               {(module.childern || module.actions) &&
    //                 (expandedKeys.includes(module.key) ? (
    //                   <IoMdArrowDropdown />
    //                 ) : (
    //                   <IoMdArrowDropright />
    //                 ))}
    //             </span>
    //             <span className="ml-2">{module.name}</span>
    //           </Col>
    //           <Col span={6} className="border border-t-0 p-2">
    //             {/* <Checkbox
    // 							className="custom-checkbox"
    // 							checked={checkedValues?.[module.key] === false}
    // 							onChange={(e) =>
    // 								handleCheckboxChange(module.key, false, e.target.checked)
    // 							}
    // 						/> */}
    //           </Col>
    //         </Row>
    //         {module.childern &&
    //           expandedKeys.includes(module.key) &&
    //           renderChildren(module.childern, depth + 1)}
    //         {module.actions &&
    //           expandedKeys.includes(module.key) &&
    //           renderActions(module.actions, depth + 1)}
    //       </React.Fragment>
    //     ));
    //   };

    //   const renderChildren = (children, depth = 0) => {
    //     return children.map((child) => (
    //       <React.Fragment key={child.key}>
    //         <Row>
    //           <Col
    //             span={18}
    //             className="border border-t-0 p-2 flex items-center cursor-pointer"
    //             onClick={() => toggleExpand(child.key)}
    //             style={{ paddingLeft: depth * 16 }}
    //           >
    //             <span>
    //               {child.actions &&
    //                 (expandedKeys.includes(child.key) ? (
    //                   <IoMdArrowDropdown />
    //                 ) : (
    //                   <IoMdArrowDropright />
    //                 ))}
    //             </span>
    //             <span className="ml-2">{child.name}</span>
    //           </Col>
    //           <Col span={6} className="border border-t-0 p-2 text-center">
    //             <Checkbox
    //               className="custom-checkbox"
    //               checked={checkedValues?.[child.key] === false}
    //               onChange={(e) =>
    //                 handleCheckboxChange(child.key, false, e.target.checked)
    //               }
    //             />
    //           </Col>
    //         </Row>
    //         {child.actions &&
    //           expandedKeys.includes(child.key) &&
    //           renderActions(child.actions, depth + 1)}
    //       </React.Fragment>
    //     ));
    //   };

    //   const renderActions = (actions, depth = 0) => {
    //     return actions.map((action) => (
    //       <Row key={action.key}>
    //         <Col
    //           span={18}
    //           className="border border-t-0 p-2"
    //           style={{ paddingLeft: depth * 16 }}
    //         >
    //           {action.name}
    //         </Col>
    //         <Col span={6} className="border border-t-0 p-2 text-center">
    //           <Checkbox
    //             className="custom-checkbox"
    //             checked={checkedValues?.[action.id]}
    //             onChange={(e) => {
    //               handleCheckboxChange(action.id, true, e.target.checked);
    //             }}
    //           />
    //         </Col>
    //       </Row>
    //     ));
    //   };

    //   const data1 = [
    //     {
    //       key: "inventory",
    //       name: "Inventory",
    //       actions: [],
    //       children: [
    //         {
    //           key: "store_issue_notes",
    //           name: "Store Issue Notes",
    //           actions: [
    //             {
    //               key: "LIST",
    //               name: "List",
    //               id: "7c83f1ed-83e3-4d4d-8c9e-b196abfd9892",
    //             },
    //             {
    //               key: "VIEW",
    //               name: "View",
    //               id: "918ae381-816c-40d2-9e10-db7a0284f6ba",
    //             },
    //           ],
    //           children: [],
    //         },
    //         {
    //           key: "consumption",
    //           name: "Consumption",
    //           actions: [],
    //           children: [
    //             {
    //               key: "self_consumption",
    //               name: "Self",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "9af90062-9dee-4790-8d54-fbd5263cfc49",
    //                 },
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "dee75e0f-7107-4b52-bd1b-d7c6ef20a3fc",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "EDIT",
    //                   id: "21b75e81-567b-4521-b68f-e7bb281e1a51",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "a0d9a95f-f0ee-4496-8079-84b4b0d0301f",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "4340ad29-a374-450b-aa04-d2b3ec3314c0",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "department_consumption",
    //               name: "Department",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "316bd0c5-b574-40f2-b086-f00ba115fc42",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "c2630e94-4cd1-44dd-b228-75e6bddd112d",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //         {
    //           key: "inventory_management",
    //           name: "Inventory Management",
    //           actions: [],
    //           children: [
    //             {
    //               key: "department_inventory_management",
    //               name: "Deparment",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "e148e896-f52a-432f-9c9b-798f4885f317",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "e90fe376-7466-4154-9963-8f826b4083db",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "ab7fce57-b359-4dde-8b15-9d1fe5a5f17d",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "d0bdd676-3540-4fb6-88ef-5aa7569ba049",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "storage_inventory_management",
    //               name: "Storage",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "73f2dd96-41a7-440e-a548-f4ebfc0c8187",
    //                 },
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "067d95a9-ec0d-477e-bb8f-fac04c1a4fdf",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "c23eeed9-998e-413e-bc86-9f699d352ff7",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "1125653c-ff8b-499c-a69b-285455e47b41",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "c11fb8db-86ec-4e08-855d-3d5acb58e497",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //         {
    //           key: "item_requisition_form",
    //           name: "Inventory Requisition Form",
    //           actions: [],
    //           children: [
    //             {
    //               key: "item_requisition_form_generate",
    //               name: "Generate",
    //               actions: [
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "1e08c388-2d03-4c6a-acaa-56303b316d59",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "820cd114-23c3-4c20-bf75-664649904039",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "3234f354-46c9-4be8-9f09-adc1cf82528b",
    //                 },
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "c52c1469-ee3c-4c27-93a3-e0efe62263ab",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "4510bc97-feee-4083-ac72-20b1ae5edb65",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "f109e117-3636-4f46-85a5-063c9598c66b",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "item_requisition_form_review",
    //               name: "Review",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "249c1520-bb4e-44e0-91ec-065d433878a4",
    //                 },
    //                 {
    //                   key: "REVIEW",
    //                   name: "Review",
    //                   id: "e187d6d5-7998-4a54-8d58-fef058c3b3cc",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "7ab5a138-0f5a-44fd-abd8-7f49c66b1c5e",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "bb7de1b6-e7c0-40d2-b0b0-ea9fe87eed8b",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "item_requisition_form_issue",
    //               name: "Issue",
    //               actions: [
    //                 {
    //                   key: "ISSUE",
    //                   name: "Issue",
    //                   id: "0b7865a9-862d-467d-ae26-1d2716a68ace",
    //                 },
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "6449383b-fa0c-409b-9cf7-c5b59f98c2f0",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "7d792067-53c2-4af5-9021-dc82deb2b85b",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "85a995eb-d5a3-401c-81a6-c7ef6499deec",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //         {
    //           key: "goods_receiving_notes",
    //           name: "Goods Receiving Notes",
    //           actions: [],
    //           children: [
    //             {
    //               key: "goods_receiving_notes_generate",
    //               name: "Generate",
    //               actions: [
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "d8163ed7-8afd-4c09-ba68-6133bb0c7036",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "eb162fef-7137-413d-b4da-d3591a7f8a20",
    //                 },
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "7ffc1648-0f27-4a92-b281-acdc2e99aeb4",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "abd16d32-d56e-45b6-96e4-8896a70703ec",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "1c3e38e6-1bd0-4cd0-9170-02197c66e7cb",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "goods_receiving_notes_review",
    //               name: "Review",
    //               actions: [
    //                 {
    //                   key: "REVIEW",
    //                   name: "Review",
    //                   id: "896915fd-e067-4c9a-8daf-46d303109015",
    //                 },
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "29fd7c66-4a48-47b1-b2cd-6c5812b80983",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "c469e9d6-217b-41ec-9e7a-8c8573c23ef2",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "33b598b6-173e-40df-b8eb-18d03772e603",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //         {
    //           key: "gate_pass",
    //           name: "Gate Pass",
    //           actions: [],
    //           children: [
    //             {
    //               key: "gate_pass_invard",
    //               name: "Invard",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "9a7708a6-9492-458c-8418-7314c8934ba1",
    //                 },
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "f3710f3a-ff67-41e4-9670-6f2bed06b558",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "3c5cb797-3990-4f8a-8ddf-0413ef84ae20",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "f52b24ef-31f0-4412-b517-81a726a89ae6",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "63cbd361-1406-44e1-b796-a050fc564a53",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "gate_pass_outward",
    //               name: "Outward",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "2999c478-666c-4ecd-b886-f8bfc08faa85",
    //                 },
    //                 {
    //                   key: "Add",
    //                   name: "Add",
    //                   id: "b7ccb588-5552-4c79-82ba-cfe02b6fbf61",
    //                 },
    //                 {
    //                   key: "Edit",
    //                   name: "Edit",
    //                   id: "9fec8790-db27-4e8e-80d2-12393f66e5b5",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "e32c3236-f104-4812-a30a-7be61f032b43",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "960b61c0-36fe-40b2-9487-23bdb4b72fac",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //         {
    //           key: "item_return_request",
    //           name: "Inventory Return Request",
    //           actions: [],
    //           children: [
    //             {
    //               key: "item_return_request_generate",
    //               name: "Generate",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "de7959c5-045e-46b3-aaf2-d4a92c6a645d",
    //                 },
    //                 {
    //                   key: "ADD",
    //                   name: "Add",
    //                   id: "f984a974-4a74-4f18-bb91-b041cec0d409",
    //                 },
    //                 {
    //                   key: "EDIT",
    //                   name: "Edit",
    //                   id: "f6b01ad4-947c-49e6-89dc-778e1eec961d",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "e500e5b7-0e60-4d5b-b8c7-679ad63df8ea",
    //                 },
    //                 {
    //                   key: "DELETE",
    //                   name: "Delete",
    //                   id: "76d4bfd1-1b2a-4488-b232-8d774c7ffe11",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "65dd908e-de34-4fec-a833-5d880e4f9a5f",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "item_return_request_review",
    //               name: "Review",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "612595ab-ab04-4b4e-89f0-29204dc299be",
    //                 },
    //                 {
    //                   key: "REVIEW",
    //                   name: "Review",
    //                   id: "66da221d-c824-4af3-8dbc-d93419767b92",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "4d401573-a17c-4bd4-bb4e-1a84533c3562",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "46af7a81-a8a6-47f0-9ead-896ee8476a0c",
    //                 },
    //               ],
    //               children: [],
    //             },
    //             {
    //               key: "item_return_request_issue",
    //               name: "Issue",
    //               actions: [
    //                 {
    //                   key: "LIST",
    //                   name: "List",
    //                   id: "ead8ac60-7180-4ba6-8bda-67bbb6db8267",
    //                 },
    //                 {
    //                   key: "ISSUE",
    //                   name: "Issue",
    //                   id: "44536be0-9ccf-4483-92c9-e3d745a85b74",
    //                 },
    //                 {
    //                   key: "VIEW",
    //                   name: "View",
    //                   id: "905e1979-9ecd-428c-bc13-4b9509963dec",
    //                 },
    //                 {
    //                   key: "TRACK",
    //                   name: "Track",
    //                   id: "e2a3c6d9-9b5e-4b57-be9a-db39a485ab3f",
    //                 },
    //               ],
    //               children: [],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ];
    // const [activeKeys, setActiveKeys] = useState([]);
    const toggleCollapse = (key) => {
      let newActiveKeys = [...activeKeys];
      if (newActiveKeys.includes(key)) {
        newActiveKeys = newActiveKeys.filter((item) => item !== key);
      } else {
        newActiveKeys.push(key);
      }
      setActiveKeys(newActiveKeys);
    };
    const ActionsMap = ({ action, depth = 1 }) => {
      return (
        <Row key={action.key}>
          <Col
            span={18}
            className="border border-t-0 p-2"
            style={{ paddingLeft: depth * 20 }}
          >
            {action.name}
          </Col>
          <Col span={6} className="border border-t-0 p-2 text-center">
            <Checkbox
              className="custom-checkbox"
              checked={checkedValues?.[action.id]}
              onChange={(e) => {
                onCheckedFunc(action.id, true, e.target.checked);
              }}
            />
          </Col>
        </Row>
      );
    };

    const ChildrenMap = ({ item, depth = 1 }) => {
      return (
        <>
          <Row key={item.key}>
            <Col
              span={18}
              className="border border-t-0 p-2 flex items-center cursor-pointer"
              onClick={() => toggleCollapse(item.key)}
              style={{ paddingLeft: depth * 16 }}
            >
              <span>
                {item.children && activeKeys?.includes(item?.key) ? (
                  <IoMdArrowDropdown />
                ) : (
                  <IoMdArrowDropright />
                )}
              </span>
              <span className="ml-2">{item.name}</span>
            </Col>
            <Col span={6} className="border border-t-0 p-2 text-center"></Col>
          </Row>
          {item.children &&
            activeKeys?.includes(item?.key) &&
            item?.children?.map((children) => {
              return (
                <ChildrenMap
                  item={children}
                  depth={depth + 1}
                  key={children?.key}
                />
              );
            })}
          {item.children &&
            activeKeys?.includes(item?.key) &&
            item?.actions?.map((action) => {
              return (
                <ActionsMap
                  action={action}
                  depth={depth + 1}
                  key={action.key}
                />
              );
            })}
        </>
      );
    };

    return (
      data && data?.map((item) => <ChildrenMap item={item} key={item.key} />)
    );
  }
);
