import FormCheckbox from "./CheckBox";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

const CheckboxGroup = ({
	checkboxConfig,
	col,
	checkboxes,
	handleCheckboxChange,
}) => {
	return (
		<Row className="checkBoxRow" align="middle" gutter={[16, 32]}>
			{checkboxConfig?.map(
				({ label, name, disabled, defaultChecked }, index) => {
					return (
						<Col span={col} key={index}>
							<FormCheckbox
								label={label}
								checked={checkboxes[name]}
								onChange={(checked) => handleCheckboxChange(name, checked)}
								showLabel={false}
								name={name}
								disabled={disabled}
								defaultChecked={defaultChecked}
							/>
						</Col>
					);
				}
			)}
		</Row>
	);
};

export default CheckboxGroup;

CheckboxGroup.propTypes = {
	checkboxConfig: PropTypes.array.isRequired,
	col: PropTypes.number,
	checkboxes: PropTypes.object.isRequired,
	handleCheckboxChange: PropTypes.func.isRequired,
	defaultChecked: PropTypes.bool,
	disabled: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
	checkboxConfig: [],
	col: 4,
	checkboxes: {},
	defaultChecked: false,
	disabled: false,
	handleCheckboxChange: () => {},
};
