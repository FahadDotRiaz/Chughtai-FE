import { Dropdown, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GenericDropdown = ({ items }) => {
	return (
		<div>
			<Dropdown menu={{ items }} trigger={["click"]}>
				<Button className="flex items-center">
					{items[0]?.label}
					<CaretDownOutlined />
				</Button>
			</Dropdown>
		</div>
	);
};

export default GenericDropdown;

GenericDropdown.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape([
			{
				label: PropTypes.string.isRequired,
				key: PropTypes.string.isRequired,
			},
		])
	).isRequired,
};

GenericDropdown.defaultProps = {
	items: [],
};
