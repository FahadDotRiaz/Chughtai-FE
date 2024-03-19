import { Form, Radio } from "antd";
import PropTypes from "prop-types";

const RadioButtonGroup = ({
	label,
	name,
	options,
	rules,
	onChange,
	defaultValue,
	value,
}) => {
	// const handleChange = (e) => {
	// 	onChange(e, name);
	// };
	return (
		<Form.Item
			label={label ? label : <span className="hidden" />}
			name={name}
			rules={rules}
			labelAlign="top"
			className="drop-down"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			colon={false}
			vertical
		>
			<div>
				<Radio.Group
					onChange={onChange}
					size="large"
					defaultValue={defaultValue}
					className="w-full radio-custom"
					value={value}
					options={options}
					optionType="button"
				/>
				{/* {options?.map((opt, index) => {
						return (
							<Radio.Button
								className="w-[50%] text-center"
								key={index}
								// onChange={handleChange}
								style={{ paddingInline: 106 }}
							>
								{opt.label}
							</Radio.Button>
						);
					})} */}
				{/* </Radio.Group> */}
			</div>
		</Form.Item>
	);
};

RadioButtonGroup.propTypes = {
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
	value: PropTypes.string,
	disabled: PropTypes.bool,
};

export default RadioButtonGroup;
