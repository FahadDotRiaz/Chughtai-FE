/* eslint-disable no-debugger */
import { useEffect, useState } from "react";
import { Select, Checkbox, Form } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const DropdownWithCheckbox = ({
  label,
  options,
  onChange,
  showSubItems,
  defaultValue,
  showSearch,
  setIsDecChild,
}) => {
  const [selectedValues, setSelectedValues] = useState(defaultValue || []);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setSelectedValues(
        defaultValue?.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
  }, [defaultValue]);
  const handleSelectChange = (values) => {
    setSelectedValues(values);
    onChange(values);
  };
  console.log("selectedValues", selectedValues);
  const handleBlur = () => {
    debugger;
    if (!(selectedValues === "")) {
      setIsDecChild("");
    }
  };
  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    onChange(updatedValues); // Notify parent component about the change
  };
  // const handleSearch = (inputValue) => {};
  const onPopupScroll = (e) => {
    e.persist();
    let target = e.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      console.log("test");
    }
  };
  return (
    <div>
      <Form.Item>
        <label>{label}</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder={`Select Child Items`}
          onChange={handleSelectChange}
          value={showSubItems && selectedValues ? selectedValues : []}
          disabled={!showSubItems}
          showSearch={showSearch || false}
          onSearch={(input) => setIsDecChild(input)}
          filterOption={false}
          onBlur={handleBlur}
          onPopupScroll={onPopupScroll}
        >
          {options?.map(({ value, label }) => (
            <Option key={value} value={value}>
              <Checkbox
                onChange={() => handleCheckboxChange(value)}
                checked={selectedValues.includes(value)}
                className="dropDownCheckbox"
              />
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

DropdownWithCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  showSubItems: PropTypes.bool.isRequired,
  defaultValue: PropTypes.node.isRequired,
  showSearch: PropTypes.bool,
  setIsDecChild: PropTypes.node,
};

export default DropdownWithCheckbox;
