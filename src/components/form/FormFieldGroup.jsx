/* eslint-disable no-debugger */
import { useState } from "react";
import InputField from "./FormField";
import DropdownField from "./DropdownField";
import { Row, Col, Switch, Skeleton } from "antd";
import PropTypes from "prop-types";
import TreeSelectField from "./TreeSelect";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FormCheckbox from "./CheckBox";
import RadioButtonGroup from "./RadioButtonGroup";

const FormFieldGroup = ({
  fieldsConfig,
  col,
  gutter,
  handleInputChange,
  isLoading,
  onPopupScroll,
}) => {
  // console.log("fieldsConfig", fieldsConfig);
  return (
    <Row gutter={gutter ? gutter : [32]}>
      {fieldsConfig?.map(
        (
          {
            name,
            type,
            rules,
            label,
            rows,
            disabled,
            placeholder,
            defaultValue,
            value,
            expandAll,
            treeData,
            onChange,
            cols,
            childrenItems,
            options,
            showSearch,
            defaultChecked,
            checked,
            mode,
            className,
            min,
            max,
            defaultOpen,
            prefix,
            maxLength,
            allowClear,
          },
          index
        ) => {
          const updatedRules = rules?.map((obj) => ({
            ...obj,
            whitespace: true,
          }));
          return (
            <Col
              span={cols || col}
              key={index}
              className={isLoading ? "mb-10" : ""}
            >
              {isLoading ? (
                <Skeleton.Input active block />
              ) : (
                <>
                  {type === "input" || type === "contact" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      rules={updatedRules}
                      disabled={disabled}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="input"
                      prefix={prefix}
                      maxLength={maxLength}
                    />
                  ) : type === "password" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      rules={updatedRules}
                      disabled={disabled}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="password"
                      prefix={prefix}
                    />
                  ) : type === "dropdown" ? (
                    <DropdownField
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={updatedRules}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      showSearch={showSearch || false}
                      onSearch={(input) => handleInputChange(name, input)}
                      // {...(handleInputChange && {
                      // 	onChange: (e) => {
                      // 		handleInputChange(name, e.target.value);
                      // 	},
                      // })}
                      allowClear={allowClear}
                      onChange={onChange}
                      options={options}
                      mode={mode}
                      prefix={prefix}
                      filterOption={false}
                      onPopupScroll={onPopupScroll}
                    />
                  ) : type === "date" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={rules}
                      value={value}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="date"
                      prefix={prefix}
                    />
                  ) : type === "textarea" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      disabled={disabled}
                      value={value}
                      rules={updatedRules}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="textarea"
                      rows={rows}
                      prefix={prefix}
                    />
                  ) : type === "treeselect" ? (
                    <TreeSelectField
                      onChange={(e) => onChange(e)}
                      value={value}
                      placeholder={placeholder}
                      disabled={disabled}
                      expandAll={expandAll}
                      treeData={treeData}
                      label={label}
                    />
                  ) : type === "collapse" ? (
                    <CollapseField
                      label={label}
                      childrenItems={childrenItems}
                      handleInputChange={handleInputChange}
                    />
                  ) : type === "datetime" ? (
                    <div className="flex gap-2">
                      <InputField
                        key={name}
                        label={label}
                        name={name}
                        disabled={disabled}
                        rules={updatedRules}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...(handleInputChange && {
                          onChange: (e) => {
                            handleInputChange(name, e.target.value);
                          },
                        })}
                        type="datetime"
                        prefix={prefix}
                      />
                    </div>
                  ) : type === "checkbox" ? (
                    <FormCheckbox
                      label={label}
                      checked={checked}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e);
                        },
                      })}
                      showLabel={false}
                      name={name}
                      disabled={disabled}
                      defaultChecked={defaultChecked}
                    />
                  ) : type === "switch" ? (
                    <SwitchWithLabel
                      label={label}
                      childrenItems={childrenItems}
                      handleInputChange={handleInputChange}
                      defaultOpen={defaultOpen}
                    />
                  ) : type === "text" ? (
                    <div
                      className={`text-[#3E3F42] font-semibold text-[18px] ${className}`}
                    >
                      {label}
                    </div>
                  ) : type === "number" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={rules}
                      value={value}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      // {...(handleInputChange && {
                      //   onChange: (e) => {
                      //     handleInputChange(name, e.target.value);
                      //     onChange();
                      //   },
                      // })}
                      onChange={(e) => {
                        onChange();
                        handleInputChange &&
                          handleInputChange(name, e || e.target.value);
                      }}
                      min={min}
                      max={max}
                      type="number"
                      prefix={prefix}
                    />
                  ) : type === "radio" ? (
                    <RadioButtonGroup
                      options={options}
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={updatedRules}
                      value={value}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                    />
                  ) : type === "file" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={updatedRules}
                      value={value}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="file"
                    />
                  ) : type === "time" ? (
                    <InputField
                      key={name}
                      label={label}
                      name={name}
                      disabled={disabled}
                      rules={updatedRules}
                      value={value}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      {...(handleInputChange && {
                        onChange: (e) => {
                          handleInputChange(name, e.target.value);
                        },
                      })}
                      type="time"
                      prefix={prefix}
                    />
                  ) : null}
                </>
              )}
            </Col>
          );
        }
      )}
    </Row>
  );
};

export default FormFieldGroup;

FormFieldGroup.propTypes = {
  fieldsConfig: PropTypes.array.isRequired,
  col: PropTypes.number,
  gutter: PropTypes.any,
  handleInputChange: PropTypes.func.isRequired,
  onPopupScroll: PropTypes.func.isRequired,

  isLoading: PropTypes.bool,
};

FormFieldGroup.defaultProps = {
  fieldsConfig: [],
  col: 8,
  handleInputChange: undefined,
};

function CollapseField({ label, childrenItems, handleInputChange }) {
  const [collapse, setCollapse] = useState(true);
  return (
    <>
      <div
        className="flex items-center justify-end gap-2 text-[#2E3790] font-medium cursor-pointer"
        onClick={() => setCollapse(!collapse)}
      >
        {label} {collapse ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {!collapse && (
        <FormFieldGroup
          handleInputChange={handleInputChange}
          fieldsConfig={childrenItems}
        />
      )}
    </>
  );
}
function SwitchWithLabel({
  label,
  childrenItems,
  handleInputChange,
  defaultOpen,
}) {
  const [toggle, setToggle] = useState(defaultOpen);
  return (
    <>
      <div className="schedule-switch mb-4 flex items-center justify-start gap-2 text-[#2E3790] font-medium ">
        {label}{" "}
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={(e) => setToggle(e)}
          defaultChecked={defaultOpen}
        />
      </div>
      {toggle && (
        <FormFieldGroup
          handleInputChange={handleInputChange}
          fieldsConfig={childrenItems}
        />
      )}
    </>
  );
}

CollapseField.propTypes = {
  label: PropTypes.array.isRequired,
  childrenItems: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
SwitchWithLabel.propTypes = {
  label: PropTypes.array.isRequired,
  childrenItems: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  defaultOpen: PropTypes.func.bool,
};
