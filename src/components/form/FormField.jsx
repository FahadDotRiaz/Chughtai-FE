import { DatePicker, Form, Input, InputNumber } from "antd";
import PropTypes from "prop-types";
import GenericButton from "../GenericButton";
import { useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import dayjs from "dayjs";

const InputField = ({
	label,
	name,
	rules,
	onChange,
	type,
	rows,
	disabled,
	defaultValue,
	placeholder,
	value,
	min,
	max,
	prefix,
	maxLength,
}) => {
	const fileInputRef = useRef(null);

	const handleChange = (e) => {
		onChange(e, name);
	};
	const { TextArea } = Input;
	const now = dayjs();
	const currentDateTime = now?.format("YYYY-MM-DDTHH:mm");

	return (
		<Form.Item
			label={label ? label : <span className="hidden" />}
			name={name}
			rules={rules}
			labelAlign="top"
			className="Input-Field"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			colon={false}
			vertical
		>
			{type === "input" ? (
				<Input
					onChange={handleChange}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					prefix={prefix}
					maxLength={maxLength}
				/>
			) : type === "password" ? (
				<Input.Password
					onChange={handleChange}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					prefix={prefix}
				/>
			) : type === "date" ? (
				// <div className="relative select-custom-icon">
				// 	<div className="absolute z-[1] top-[0.875rem] left-[0.625rem]">
				// 		<img src={IMAGES.DATE} />
				// 	</div>
				<DatePicker
					className="w-full"
					onChange={(e) => {
						handleChange(name, e);
					}}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					suffixIcon={false}
				/>
			) : // </div>
			type === "textarea" ? (
				<TextArea
					onChange={handleChange}
					rows={rows}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					value={value}
					prefix={prefix}
				/>
			) : type === "time" ? (
				<Input
					onChange={handleChange}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					type="time"
					prefix={prefix}
				/>
			) : type === "datetime" ? (
				<Input
					onChange={handleChange}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					type="datetime-local"
					prefix={prefix}
					min={currentDateTime}
				/>
			) : type === "number" ? (
				<InputNumber
					defaultValue={defaultValue}
					onChange={handleChange}
					disabled={disabled}
					placeholder={placeholder}
					className="w-full"
					min={min || 0}
					max={max}
					prefix={prefix}
				/>
			) : type === "file" ? (
				<>
					<GenericButton
						type="outline"
						lable="Upload File"
						onClick={() => fileInputRef.current.click()}
						icon={<BiImageAdd />}
					/>
					<input
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg, image/webp, image/gif"
						onChange={handleChange}
						style={{ display: "none" }}
						// className={
						// 	isLoading ? "pointer-events-none" : "pointer-events-auto"
						// }
						ref={fileInputRef}
					/>
				</>
			) : null}
		</Form.Item>
	);
};
InputField.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	name: PropTypes.string.isRequired,
	rules: PropTypes.array,
	type: PropTypes.string,
	rows: PropTypes.number,
	disabled: PropTypes.bool,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	prefix: PropTypes.element,
	maxLength: PropTypes.number,
};
export default InputField;
