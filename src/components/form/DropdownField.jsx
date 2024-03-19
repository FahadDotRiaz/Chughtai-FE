import { Form, Select } from "antd";
import PropTypes from "prop-types";
import { IoSearchOutline } from "react-icons/io5";

const DropdownField = ({
  label,
  name,
  options,
  rules,
  onChange,
  defaultValue,
  mode,
  showSearch,
  placeholder,
  disabled,
  allowClear,
  value,
  className,
  prefix,
  onSearch,
  filterOption,
  onPopupScroll,
  onBlur,
}) => {
  const { Option } = Select;
  // const handleChange = (e) => {
  // 	onChange(e);
  // };
  return (
    <Form.Item
      label={label ? label : null}
      name={name}
      rules={rules}
      labelAlign="top"
      className={`drop-down ${className}`}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      colon={false}
      vertical
    >
      {/* <div className={prefix ? "relative select-custom-icon" : ""}>
				{prefix && (
					<div className="absolute z-[1] top-[0.875rem] left-[0.625rem]">
						{prefix}
					</div>
				)} */}
      <Select
        onChange={onChange}
        defaultValue={defaultValue}
        mode={mode}
        size="large"
        showSearch={showSearch ? showSearch : false}
        placeholder={placeholder ? placeholder : "Select"}
        disabled={disabled}
        suffixIcon={showSearch && <IoSearchOutline size={18} />}
        allowClear={allowClear}
        value={value}
        onSearch={onSearch}
        filterOption={filterOption}
        onPopupScroll={onPopupScroll}
        onBlur={onBlur}
      >
        {options?.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      {/* </div> */}
    </Form.Item>
  );
};

DropdownField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  rules: PropTypes.array, // Adjust the validation according to your needs
  mode: PropTypes.string,
  defaultValue: PropTypes.string,
  showSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  prefix: PropTypes.element,
  onSearch: PropTypes.node,
  filterOption: PropTypes.bool,
  onPopupScroll: PropTypes.func,
  onBlur: PropTypes.func,
};

export default DropdownField;
