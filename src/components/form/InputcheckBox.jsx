/* eslint-disable no-debugger */
import { Form, Checkbox, Input } from "antd";
import PropTypes from "prop-types";
const InputFormCheckbox = ({
  label,
  onChange,
  name,
  checked,
  checkBoxname,
  rules,
  suffix,
}) => {
  const handleChange = (e) => {
    onChange(e, checkBoxname);
  };

  return (
    <>
      <Form.Item name={checkBoxname} valuePropName="checked">
        <Checkbox
          checked={checked}
          onChange={handleChange}
          className="custom-InputCheckbox"
        ></Checkbox>
      </Form.Item>

      <div>
        <Form.Item
          label={label}
          name={name}
          labelAlign="top"
          className="Input-Field" // Align the label to the top
          labelCol={{ span: 24 }} // Full width for the label
          wrapperCol={{ span: 24 }} // Full width for the input field
          colon={false} // Remove colon after label
          vertical // Display label and control vertically
          rules={rules}
          dependencies={["tempcheck"]}
        >
          <Input disabled={!checked} suffix={suffix} />
        </Form.Item>
      </div>
    </>
  );
};

InputFormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func, // Add this line for onChange prop
  checked: PropTypes.bool,
  name: PropTypes.string,
  checkBoxname: PropTypes.bool,
  rules: PropTypes.node,

  suffix: PropTypes.string,
  // You may adjust the validation based on your needs
};

export default InputFormCheckbox;
