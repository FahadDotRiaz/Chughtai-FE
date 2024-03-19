import { useState } from "react";
import GenericButton from "./GenericButton";
import { Modal, Space } from "antd";
import PropTypes from "prop-types";

export const GenericModal = ({
	btnLable,
	btnType,
	content,
	title,
	handleOk,
	handleCancel,
	width,
	footer,
	closeIcon,
	cancelText,
	okText,
	className,
	iconBtn,
	icon,
}) => {
	const [open, setOpen] = useState(false);
	const onHandleOk = () => {
		setOpen(false);
		handleOk && handleOk();
	};
	const onHandleCancel = () => {
		setOpen(false);
		handleCancel && handleCancel();
	};
	return (
		<>
			{btnLable && (
				<GenericButton
					type={btnType}
					onClick={() => setOpen(true)}
					lable={btnLable}
					icon={icon}
				/>
			)}
			{iconBtn && (
				<Space className="cursor-pointer px-3" onClick={() => setOpen(true)}>
					{iconBtn}
				</Space>
			)}
			<Modal
				className={className}
				title={title ? title : null}
				centered
				open={open}
				onOk={onHandleOk}
				onCancel={onHandleCancel}
				width={width ? width : 800}
				footer={footer}
				closeIcon={closeIcon ? closeIcon : false}
				cancelText={cancelText ? cancelText : "Cancel"}
				okText={okText ? okText : "Add"}
			>
				{content}
			</Modal>
		</>
	);
};

GenericModal.propTypes = {
	btnLable: PropTypes.string,
	btnType: PropTypes.string,
	content: PropTypes.node.isRequired,
	title: PropTypes.string,
	handleOk: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	width: PropTypes.number,
	footer: PropTypes.node,
	closeIcon: PropTypes.bool,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	className: PropTypes.string,
	iconBtn: PropTypes.element,
	icon: PropTypes.element,
};
