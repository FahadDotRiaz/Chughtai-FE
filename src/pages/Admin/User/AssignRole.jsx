import { useEffect, useState } from "react";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericCard from "../../../components/GenericCard";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericButton from "../../../components/GenericButton";
import { PATH } from "../../../../config";

const AssignRole = () => {
	const navigate = useNavigate();

	const fieldsConfig = [
		{
			type: "dropdown",
			label: "User",
			name: "user",
			showSearch: true,
			defaultValue: "umer",
			rules: [{ required: true, message: "user is required" }],
			options: [
				{ value: "umer", label: "Umer" },
				{ value: "muneeb", label: "Muneeb" },
			],
		},
		{
			type: "dropdown",
			label: "Department",
			name: "department",
			defaultValue: "bio",
			showSearch: true,
			rules: [{ required: true, message: "Department is required" }],
			options: [
				{ value: "bio", label: "Bio medical" },
				{ value: "pathology", label: "Pathology" },
			],
		},
		{
			type: "dropdown",
			label: "Role",
			name: "role",
			showSearch: true,
			mode: "multiple",
			defaultValue: ["hod", "rm"],
			rules: [{ required: true, message: "role is required" }],
			options: [
				{ value: "hod", label: "HOD" },
				{ value: "rm", label: "Regional manager" },
			],
		},
	];

	const checkboxesConfig = [
		{
			type: "checkbox",
			//   checked: inputFields.view,
			label: "View",
			name: "view",
		},
		{
			type: "checkbox",
			//   checked: inputFields.create,
			label: "Create",
			name: "create",
		},
		{
			type: "checkbox",
			//   checked: inputFields.approve,
			label: "Approve",
			name: "approve",
		},
		{
			type: "checkbox",
			//   checked: inputFields.reject,
			label: "Reject",
			name: "reject",
		},
		{
			type: "checkbox",
			//   checked: inputFields.edit,
			label: "Edit",
			name: "edit",
		},
		{
			type: "checkbox",
			//   checked: inputFields.delete,
			label: "Delete",
			name: "delete",
		},
		{
			type: "checkbox",
			//   checked: inputFields.issue,
			label: "Issue",
			name: "issue",
		},
	];

	const ROLES = [
		{
			role: "HOD",
			feature: [
				{ fname: "Inventory Return Request (IRR)", fields: checkboxesConfig },
				{ fname: "Inventory Requisition Form (IRF)", fields: checkboxesConfig },
			],
		},
		{
			role: "Regional Manager",
			feature: [
				{ fname: "Inventory Return Request (IRR)", fields: checkboxesConfig },
				{ fname: "Inventory Requisition Form (IRF)", fields: checkboxesConfig },
			],
		},
	];

	return (
		<div>
			<TitleSearchButton title="Assign Role" />
			<GenericCard>
				<FormFieldGroup fieldsConfig={fieldsConfig} />
				{ROLES.map((name, index) => {
					return (
						<>
							<div className="">
								<TitleSearchButton title={name?.role} secondaryTitle />
							</div>
							<GenericCard key={index} className="mb-5">
								{name?.feature?.map((feature, index) => {
									return <Checkbox feature={feature} key={index} />;
								})}
							</GenericCard>
						</>
					);
				})}
			</GenericCard>
			<Space className="flex justify-end mt-5">
				<GenericButton
					type="secondary"
					lable="Cancel"
					onClick={() => navigate(PATH.ADMIN_USER_LIST)}
				/>
				<GenericButton
					type="primary"
					lable="Assign Role"
					onClick={() => navigate(PATH.ADMIN_USER_LIST)}
				/>
			</Space>
		</div>
	);
};

export default AssignRole;

export const Checkbox = ({ feature }) => {
	const [inputFields, setInputFields] = useState({
		create: false,
		view: false,
		approve: false,
		edit: false,
		reject: false,
		delete: false,
		issue: false,
	});

	const customFields =
		feature?.fields?.map((field) => {
			return { ...field, checked: inputFields[field.name] };
		}) || [];

	const handleInputChange = (fieldName, value) => {
		setInputFields((prevInputFields) => ({
			...prevInputFields,
			[fieldName]: value,
		}));
	};
	return (
		<div className="mb-5">
			<TitleSearchButton title={feature?.fname} secondaryTitle />
			<FormFieldGroup
				fieldsConfig={customFields}
				handleInputChange={handleInputChange}
				col={4}
				gutter={[16, 16]}
			/>
		</div>
	);
};
