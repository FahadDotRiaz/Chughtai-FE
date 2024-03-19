import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import { PATH } from "../../../../../config";
import { useNavigate } from "react-router-dom";
import DropdownField from "../../../../components/form/DropdownField";
import InputField from "../../../../components/form/FormField";

export default function PartialItemsApproval({ show, onClose }) {
	const navigate = useNavigate();
	const option = [
		{ value: "Yes", label: "Yes" },
		{ value: "No", label: "No" },
	];
	return (
		<Modal
			title="Partial Item Approval"
			centered
			open={show}
			onCancel={onClose}
			width={600}
			className=""
			okText="Done"
			onOk={() => navigate(PATH.GRN_REVIEW_LIST)}
		>
			<Row className="items-center my-10" gutter={[8, 32]}>
				<Col span={12}>
					You have some partially received items would you like to set a
					reminder
				</Col>
				<Col span={12}>
					<DropdownField options={option} defaultValue={"Yes"} />
				</Col>
				<Col span={12}>
					<InputField label="Date" name="Date" type="date" />
				</Col>
				<Col span={12}>
					<InputField label="Date" name="Date" type="time" />
				</Col>
			</Row>
		</Modal>
	);
}

PartialItemsApproval.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};
