/* eslint-disable react/prop-types */
import { Modal, Row, Col, Checkbox, Form, Spin } from "antd";
import FormFieldGroup from "../../../../../components/form/FormFieldGroup";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import {
  useGetRoleLevelsQuery,
  useLazyGetRoleByIdQuery,
  usePostRoleMutation,
  useUpdateRoleMutation,
} from "../../../../../redux/slices/role";
import useNotification from "../../../../../components/Notification";
import { PERMISSION_LEVELS } from "../../../../../utils/constant";
const AddRoleModal = ({ showModal, onClose, departmentId }) => {
  const [form] = Form.useForm();
  const [getRoleByID, { data: roleData = [], isLoading, isFetching }] =
    useLazyGetRoleByIdQuery();
  const uuidObject = roleData?.actions?.reduce((acc, uuid) => {
    acc[uuid] = true;
    return acc;
  }, {});
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

  useEffect(() => {
    if (showModal?.id) {
      getRoleByID(showModal?.id);
    }
  }, [showModal?.id]);

  useEffect(() => {
    if (showModal?.id) {
      form.setFieldsValue({
        name: roleData?.name,
        description: roleData?.description,
      });
      setCheckedValues(uuidObject);
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
      // footer={footer}
      // closeIcon={closeIcon ? closeIcon : false}
      // cancelText={cancelText ? cancelText : "Cancel"}
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
              <Col span={6} className="border p-4 font-semibold">
                Permissions
              </Col>
            </Row>
            {roleLevels && (
              <RoleAndPermissions
                data={roleLevels || []}
                checkedValues={checkedValues}
                setCheckedValues={setCheckedValues}
              />
            )}
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddRoleModal;

const RoleAndPermissions = ({ data, checkedValues, setCheckedValues }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const toggleExpand = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter((k) => k !== key));
    } else {
      setExpandedKeys([...expandedKeys, key]);
    }
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
    handleAllCheck(key, value);
  };

  const handleAllCheck = (key, value) => {
    data?.forEach((item) => {
      item?.modules?.forEach((module) => {
        if (item.key === key || module.key === key) {
          setCheckedValues((prevCheckedValues) => {
            const updatedCheckedValues = {
              ...prevCheckedValues,
              [module.key]: !value,
            };
            return updatedCheckedValues;
          });
          module?.childern?.forEach((child) => {
            setCheckedValues((prevCheckedValues) => {
              const updatedCheckedValues = {
                ...prevCheckedValues,
                [child.key]: !value,
              };
              return updatedCheckedValues;
            });
            child?.actions?.forEach((action) => {
              setCheckedValues((prevCheckedValues) => {
                const updatedCheckedValues = {
                  ...prevCheckedValues,
                  [action.id]: value,
                };
                return updatedCheckedValues;
              });
            });
            if (child?.key === key) {
              setCheckedValues((prevCheckedValues) => {
                const updatedCheckedValues = {
                  ...prevCheckedValues,
                  [child.key]: !value,
                };
                return updatedCheckedValues;
              });
              child?.actions?.forEach((action) => {
                setCheckedValues((prevCheckedValues) => {
                  const updatedCheckedValues = {
                    ...prevCheckedValues,
                    [action.id]: value,
                  };
                  return updatedCheckedValues;
                });
              });
            }
          });
        }
        module?.childern?.forEach((child) => {
          if (child.key === key) {
            setCheckedValues((prevCheckedValues) => {
              const updatedCheckedValues = {
                ...prevCheckedValues,
                [child.key]: !value,
              };
              return updatedCheckedValues;
            });
            child?.actions?.forEach((action) => {
              setCheckedValues((prevCheckedValues) => {
                const updatedCheckedValues = {
                  ...prevCheckedValues,
                  [action.id]: value,
                };
                return updatedCheckedValues;
              });
            });
          }
        });
      });
    });
  };

  const renderModules = (modules, depth = 1) => {
    return modules.map((module) => (
      <React.Fragment key={module.key}>
        <Row>
          <Col
            span={18}
            className="border border-t-0 p-2 flex items-center cursor-pointer"
            onClick={() => toggleExpand(module.key)}
            style={{ paddingLeft: depth * 16 }}
          >
            <span>
              {(module.childern || module.actions) &&
                (expandedKeys.includes(module.key) ? (
                  <IoMdArrowDropdown />
                ) : (
                  <IoMdArrowDropright />
                ))}
            </span>
            <span className="ml-2">{module.name}</span>
          </Col>
          <Col span={6} className="border border-t-0 p-2">
            <Checkbox
              className="custom-checkbox"
              checked={checkedValues?.[module.key] === false}
              onChange={(e) =>
                handleCheckboxChange(module.key, false, e.target.checked)
              }
            />
          </Col>
        </Row>
        {module.childern &&
          expandedKeys.includes(module.key) &&
          renderChildren(module.childern, depth + 1)}
        {module.actions &&
          expandedKeys.includes(module.key) &&
          renderActions(module.actions, depth + 1)}
      </React.Fragment>
    ));
  };

  const renderChildren = (children, depth = 0) => {
    return children.map((child) => (
      <React.Fragment key={child.key}>
        <Row>
          <Col
            span={18}
            className="border border-t-0 p-2 flex items-center cursor-pointer"
            onClick={() => toggleExpand(child.key)}
            style={{ paddingLeft: depth * 16 }}
          >
            <span>
              {child.actions &&
                (expandedKeys.includes(child.key) ? (
                  <IoMdArrowDropdown />
                ) : (
                  <IoMdArrowDropright />
                ))}
            </span>
            <span className="ml-2">{child.name}</span>
          </Col>
          <Col span={6} className="border border-t-0 p-2">
            <Checkbox
              className="custom-checkbox"
              checked={checkedValues?.[child.key] === false}
              onChange={(e) =>
                handleCheckboxChange(child.key, false, e.target.checked)
              }
            />
          </Col>
        </Row>
        {child.actions &&
          expandedKeys.includes(child.key) &&
          renderActions(child.actions, depth + 1)}
      </React.Fragment>
    ));
  };

  const renderActions = (actions, depth = 0) => {
    return actions.map((action) => (
      <Row key={action.key}>
        <Col
          span={18}
          className="border border-t-0 p-2"
          style={{ paddingLeft: depth * 16 }}
        >
          {action.name}
        </Col>
        <Col span={6} className="border border-t-0 p-2">
          <Checkbox
            className="custom-checkbox"
            checked={checkedValues?.[action.id]}
            onChange={(e) => {
              handleCheckboxChange(action.id, true, e.target.checked);
            }}
          />
        </Col>
      </Row>
    ));
  };

  return (
    <div>
      {data &&
        data?.map((item) => (
          <React.Fragment key={item.key}>
            <Row>
              <Col
                span={18}
                className="border border-t-0 p-2 flex items-center cursor-pointer"
                onClick={() => toggleExpand(item.key)}
              >
                <span>
                  {item.modules &&
                    (expandedKeys.includes(item.key) ? (
                      <IoMdArrowDropdown />
                    ) : (
                      <IoMdArrowDropright />
                    ))}
                </span>
                <span className="ml-2">{item.name}</span>
              </Col>
              <Col span={6} className="border border-t-0 p-2">
                <Checkbox
                  className="custom-checkbox"
                  checked={checkedValues?.[item?.key] === false}
                  onChange={(e) =>
                    handleCheckboxChange(item.key, false, e.target.checked)
                  }
                />
              </Col>
            </Row>
            {item.modules &&
              expandedKeys.includes(item.key) &&
              renderModules(item.modules)}
            {item.actions &&
              expandedKeys.includes(item.key) &&
              renderActions(item.actions)}
            {item.childern &&
              expandedKeys.includes(item.key) &&
              renderChildren(item.childern)}
          </React.Fragment>
        ))}
    </div>
  );
};
