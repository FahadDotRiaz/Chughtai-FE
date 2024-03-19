import { TreeSelect, Form } from "antd";
import PropTypes from "prop-types";

const { SHOW_PARENT } = TreeSelect;

const TreeSelectField = ({
	treeData,
	value,
	onChange,
	placeholder,
	expandAll,
	disabled,
	label,
	rules,
	name,
}) => {
	return (
		<Form.Item
			label={label}
			name={name}
			rules={rules}
			labelAlign="top"
			className="Input-Field"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			colon={false}
			vertical
		>
			<TreeSelect
				treeData={treeData}
				name={name}
				value={value}
				onChange={onChange}
				treeCheckable={true}
				showCheckedStrategy={SHOW_PARENT}
				placeholder={placeholder}
				style={{ width: "100%" }}
				size="large"
				treeDefaultExpandAll={expandAll}
				allowClear
				showSearch
				disabled={disabled}
			/>
		</Form.Item>
	);
};

export default TreeSelectField;

TreeSelectField.propTypes = {
	treeData: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	expandAll: PropTypes.bool,
	disabled: PropTypes.bool,
	rules: PropTypes.array,
};

TreeSelectField.defaultProps = {
	treeData: [],
	value: "0-0-0",
	onChange: () => {},
	placeholder: "Select...",
	expandAll: true,
	label: "Tree Select",
	rules: [],
	name: "",
};
