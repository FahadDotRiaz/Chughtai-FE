import { Modal } from "antd";
import PropTypes from "prop-types";
import { PATH } from "../../../../../config";
import { useNavigate } from "react-router-dom";
import DropdownField from "../../../../components/form/DropdownField";
import { useState } from "react";

export default function CreateGRN({ show, onClose, POList }) {
	const navigate = useNavigate();
	const [selectedPO, setSelectedPO] = useState(null);
	return (
		<Modal
			title="Enter PO Number"
			centered
			open={show}
			onCancel={onClose}
			width={700}
			className=""
			okText="Done"
			okButtonProps={{ disabled: !selectedPO }}
			onOk={() => navigate(PATH.GRN_GENERATE.replace(":id", selectedPO))}
		>
			<div className="mt-7">
				<DropdownField
					options={POList?.list?.map((item) => ({
						value: item.id,
						label: item.poCode,
					}))}
					onChange={(v) => setSelectedPO(v)}
				/>
			</div>
		</Modal>
	);
}

CreateGRN.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	POList: PropTypes.array.isRequired,
};
