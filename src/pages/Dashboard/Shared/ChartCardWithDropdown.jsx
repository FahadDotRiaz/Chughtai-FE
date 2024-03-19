/* eslint-disable react/prop-types */
import { Select } from "antd";

const ChartCardWithDropdown = ({ title, children, options, deptOptions }) => {
  const { Option } = Select;

  return (
    <div className="chart-card">
      <h3>
        <div className="flex justify-between items-center">
          {title}
          <div className="flex gap-2">
            {deptOptions && (
              <Select
                // onChange={handleChange}
                defaultValue={deptOptions[0]?.value}
                // mode={mode}
                size="large"
                // showSearch={showSearch ? showSearch : false}
                // placeholder={placeholder ? placeholder : "Select"}
                // disabled={disabled}
                className="w-52 "
              >
                {deptOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
            {options && (
              <Select
                // onChange={handleChange}
                defaultValue={options[0]?.value}
                // mode={mode}
                size="large"
                // showSearch={showSearch ? showSearch : false}
                // placeholder={placeholder ? placeholder : "Select"}
                // disabled={disabled}
                className="w-52"
              >
                {options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default ChartCardWithDropdown;
