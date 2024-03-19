import { DatePicker, Select, Input, InputNumber, Form } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "dayjs/locale/en";

export default function TableEditableField({
  field,
  defaultValue,
  placeholder,
  dropdownItems,
  prefix,
  min,
  onChange,
  max,
  disabled,
  name,
  value,
  className,
  index,
  isArray,
  readOnly,
  rules,
}) {
  const { Option } = Select;

  return (
    <div className="flex w-fit table-editable-field">
      <Form.Item
        // label={label ? label : <span className="hidden" />}
        name={isArray ? ["items", index, name] : name}
        rules={rules ? rules : [{ required: true, message: "Required" }]}
        labelAlign="top"
        className="table-editable-fields"
        // labelCol={{ span: 24 }}
        // wrapperCol={{ span: 24 }}
        colon={false}
        vertical
        validateFirst
      >
        {field === "number" ? (
          <InputNumber
            defaultValue={defaultValue}
            prefix={prefix}
            min={min}
            max={max}
            onChange={onChange}
            disabled={disabled}
            value={value}
            readOnly={readOnly}
          />
        ) : field === "input" ? (
          <Input
            placeholder={placeholder}
            defaultValue={defaultValue}
            prefix={prefix}
            onChange={onChange}
          />
        ) : field === "date" ? (
          <DatePicker
            className="w-full"
            defaultValue={defaultValue ? defaultValue : null}
            placeholder={placeholder}
          />
        ) : (
          field === "dropdown" && (
            <Select
              onChange={onChange}
              defaultValue={defaultValue}
              // mode={mode}
              size="large"
              // showSearch={showSearch ? showSearch : false}
              placeholder={placeholder ? placeholder : "Select"}
              disabled={disabled}
              // suffixIcon={showSearch && <IoSearchOutline size={18} />}
              // allowClear={allowClear}
              value={value}
              className={className ? className : "dropdown-editfield"}
            >
              {dropdownItems?.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )
        )}
      </Form.Item>
    </div>
  );
}

TableEditableField.propTypes = {
  field: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  dropdownItems: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number || PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

TableEditableField.defaultProps = {
  defaultValue: "",
  placeholder: "Enter",
  dropdownItems: [],
  prefix: "",
  min: 0,
  onChange: () => {},
  max: null,
  disabled: false,
};
