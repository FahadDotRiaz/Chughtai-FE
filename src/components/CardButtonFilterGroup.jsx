import { FaFilter } from "react-icons/fa";
import GenericButton from "./GenericButton";
import { Button } from "antd";
import PropTypes from "prop-types";
import CustomLabel from "./CustomLabel";

const CardButtonFilterGroup = ({
	title,
	button,
	children,
	filterBtn,
	topSpace,
}) => {
	const { text, level } = title || {};
	const { label, icon, onClick, type } = button || {};
	return (
		<div className={`cardButtonFilterGroup ${topSpace ? "mt-5" : ""}`}>
			<div
				className={`flex justify-between items-center px-6 ${
					title || button ? "pt-5" : ""
				}`}
			>
				{title && <CustomLabel level={level} text={text} />}
				<div className="flex gap-2">
					{filterBtn && (
						<Button className="filter-btn">
							<FaFilter />
						</Button>
					)}
					{button && (
						<GenericButton
							lable={label}
							onClick={onClick}
							icon={icon}
							type={type || "primary"}
						/>
					)}
				</div>
			</div>
			{children && children}
		</div>
	);
};

export default CardButtonFilterGroup;

CardButtonFilterGroup.propTypes = {
	title: PropTypes.shape({
		text: PropTypes.string.isRequired,
		level: PropTypes.string,
	}).isRequired,

	button: PropTypes.shape({
		label: PropTypes.string.isRequired,
		icon: PropTypes.element,
		onClick: PropTypes.func.isRequired,
		type: PropTypes.string,
	}).isRequired,

	children: PropTypes.node.isRequired,
	filterBtn: PropTypes.any,
	topSpace: PropTypes.bool.isRequired,
};
