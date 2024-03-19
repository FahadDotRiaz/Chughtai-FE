/* eslint-disable no-debugger */
import { Checkbox, Form } from "antd";
import PropTypes from "prop-types";
const FormCheckbox = ({
  label,
  onChange,
  name,
  checked,
  defaultChecked,
  disabled,
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked, name);
  };

  return (
    <>
      <Form.Item name={name} valuePropName="checked">
        <Checkbox
          onChange={handleChange}
          checked={checked}
          className={"custom-checkbox"}
          defaultChecked={defaultChecked}
          disabled={disabled}
          // className={!showLabel ? "custom-checkbox" : "input-checkbox"}
        >
          <span>{label}</span>
        </Checkbox>
      </Form.Item>
    </>
  );
};

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func, // Add this line for onChange prop
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  // showLabel: PropTypes.bool,
  name: PropTypes.string.isRequired,
  // You may adjust the validation based on your needs
};

export default FormCheckbox;
