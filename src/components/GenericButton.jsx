import { Button } from "antd";
import PropTypes from "prop-types";

// types : primary,secondary,draft
const GenericButton = ({
	lable,
	type,
	disabled,
	htmlType,
	icon,
	loading,
	size,
	onClick,
	isDanger,
	className,
}) => {
	return (
		<div>
			<Button
				className={className}
				type={type}
				disabled={disabled}
				htmlType={htmlType}
				icon={icon}
				loading={loading}
				size={size}
				onClick={onClick}
				danger={isDanger}
			>
				{lable}
			</Button>
		</div>
	);
};

export default GenericButton;

GenericButton.propTypes = {
	lable: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	htmlType: PropTypes.string,
	size: PropTypes.string,
	icon: PropTypes.element,
	loading: PropTypes.bool,
	isDanger: PropTypes.bool,
	className: PropTypes.string,
};

GenericButton.defaultProps = {
	disabled: false,
	htmlType: "button",
	size: "middle",
	icon: null,
	loading: false,
	isDanger: false,
};
