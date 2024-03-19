import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import GenericButton from "../../../../components/GenericButton";
import GenericCard from "../../../../components/GenericCard";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import FormFieldGroup from "../../../../components/form/FormFieldGroup";
import AddRoleModal from "./component/AddMoreRole";
import { useState } from "react";

const CreateUpdate = () => {
	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Department Type",
			name: "type",
			rules: [{ required: true, message: "Type is required" }],
			options: [
				{ value: "cc", label: "Bio-Medical" },
				{ value: "sl", label: "Pathology" },
			],
		},
	];
	const [role, setRole] = useState([
		{ id: 0, name: "HOD" },
		{ id: 1, name: "Manager" },
		{ id: 2, name: "User" },
	]);
	const deleteRole = (id) => {
		const updatedRole = role.filter((item) => item.id !== id);
		setRole(updatedRole);
	};
	return (
		<div>
			<TitleSearchButton title="Department Template Creation" />
			<Form
				name="departmentForm"
				// onFinish={onFinish}
				autoComplete="off"
				// initialValues={initialValues}
			>
				<GenericCard>
					<FormFieldGroup fieldsConfig={fieldsConfig} />
					<div className={`text-[#3E3F42] font-semibold text-[1.25rem] mb-2`}>
						Designation Tree
					</div>
					{role?.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center bg-[#F9F9F9] py-2 px-4 border-b"
						>
							<span className="text-[#3E3F42] text-[1.25rem] mb-2">
								{item?.name}
							</span>
							<div
								className="cursor-pointer bg-[#2E3790] p-2 rounded"
								onClick={() => deleteRole(item?.id)}
							>
								<AiOutlineClose fill="white" />
							</div>
						</div>
					))}
					<div className="mt-5 flex justify-end">
						<AddRoleModal setNewRole={setRole} />
					</div>
				</GenericCard>

				<Form.Item className="mt-5 flex justify-end">
					<div className="flex gap-3">
						<GenericButton type="secondary" lable="Cancel" />
						<GenericButton type="primary" htmlType="submit" lable="Create" />
					</div>
				</Form.Item>
			</Form>
		</div>
	);
};
export default CreateUpdate;
