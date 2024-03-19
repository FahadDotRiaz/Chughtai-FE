const CustomLabel = ({ text, level, className }) => {
	return (
		<div>
			<div
				className={`${className || ""} ${
					level === 2 && "secondary"
				} table-lable`}
			>
				{text}
			</div>
		</div>
	);
};

export default CustomLabel;
