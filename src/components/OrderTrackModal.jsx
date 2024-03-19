import { Checkbox, Modal, Space, Steps } from "antd";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import GenericButton from "./GenericButton";

function OrderTrackModal() {
	const [open, setOpen] = useState(false);
	const plainOptions = ["HOD1", "HOD2", "HOD3"];
	const onChange = (checkedValues) => {
		console.log("checked = ", checkedValues);
	};
	const description = (
		<>
			<span>Complete</span>
			<div className="hods-checkbox">
				<Checkbox.Group
					options={plainOptions}
					defaultValue={["HOD1"]}
					onChange={onChange}
				/>
			</div>
		</>
	);
	return (
		<>
			<Space onClick={() => setOpen(true)}>
				<FaLocationArrow fill="#1677ff" /> Track Your Order
			</Space>
			<Modal
				centered
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				width={800}
				footer={null}
			>
				<div className="py-14">
					<Steps
						labelPlacement="vertical"
						current={1}
						className="order-track-steps"
						items={[
							{
								header: "User",
								description: "Complete",
								status: "finish",
							},
							{
								header: "HOD",
								description: description,
								status: "finish",
							},
							{
								header: "Audit",
								description: "In Process",
								status: "process",
							},
							{
								header: "Store",
								description: "Pending",
								status: "wait",
							},
							{
								header: "Issuance",
								description: "Pending",
								status: "wait",
							},
						]}
					/>
				</div>
				<div className="text-right">
					<GenericButton type="link" lable="View Logs" />
				</div>
			</Modal>
		</>
	);
}

export default OrderTrackModal;

// AddItemsPopup.propTypes = {
// 	btnLable: PropTypes.string.isRequired,
// 	icon: PropTypes.element,
// 	onButtonChange: PropTypes.func,
// };
