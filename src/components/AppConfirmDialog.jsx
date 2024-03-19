import { Modal } from "antd";
import PropTypes from "prop-types";

const AppConfirmDialog = ({
	title,
	handleCancel,
	handleOk,
	showModal,
	description,
	footer,
}) => {
	return (
		<Modal
			className="confirm-dialog"
			title={title}
			centered
			open={showModal}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose={true}
			cancelButtonProps={{ type: "secondary" }}
			okButtonProps={{ htmlType: "submit" }}
			okText="Yes"
			cancelText="Cancel"
			closeIcon={false}
			footer={footer}
		>
			<p>{description}</p>
		</Modal>
	);
};

export default AppConfirmDialog;

AppConfirmDialog.propTypes = {
	title: PropTypes.string.isRequired,
	showModal: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	handleCancel: PropTypes.func,
	handleOk: PropTypes.func,
	footer: PropTypes.element,
};
