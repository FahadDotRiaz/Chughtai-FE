import { GenericModal } from "../../../../components/GenericModal";
import { PlusOutlined } from "@ant-design/icons";
import DropdownField from "../../../../components/form/DropdownField";

// eslint-disable-next-line react/prop-types
const AddRoleModal = ({ setRole, onAdd }) => {
	const handleInputChange = (fieldName, value) => {
		setRole((prevInputFields) => ({
			...prevInputFields,
			[fieldName]: value,
		}));
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
