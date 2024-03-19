import { PlusOutlined } from "@ant-design/icons";
import { GenericModal } from "../../../../../components/GenericModal";
import DropdownField from "../../../../../components/form/DropdownField";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddRoleModal = ({ setNewRole }) => {
	const [role, setRole] = useState(null);
	const handleInputChange = (value) => {
		setRole(value);
	};
	const onAdd = () => {
		setNewRole((prev) => [
			...prev,
			{
				id: Math.random() * 100,
				name: role,
			},
		]);
	};
	return (
		<GenericModal
			btnLable="Add More"
			icon={<PlusOutlined />}
			btnType="outline"
			width={500}
			title={"Add Role"}
			handleOk={onAdd}
			okText={"Add"}
			content={
				<DropdownField
					options={[
						{ value: "hod", label: "HOD" },
						{ value: "manager", label: "Manager" },
					]}
					name="role"
					placeholder={"Designation"}
					onChange={handleInputChange}
				/>
			}
		/>
	);
};

export default AddRoleModal;
