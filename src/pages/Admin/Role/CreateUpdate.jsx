import { useState } from "react";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericButton from "../../../components/GenericButton";
import { Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from "../../../../config";
import { Checkbox } from "../User/AssignRole";

const CreateUpdate = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [inputFields, setInputFields] = useState({
		create: false,
		view: false,
		approve: false,
		edit: false,
		reject: false,
		delete: false,
		issue: false,
	});

	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Name",
			name: "name",
			rules: [{ required: true, message: "Name is required" }],
		},
		{
			type: "dropdown",
			label: "Report To",
			name: "report",
			rules: [{ required: true, message: "Designation is required" }],
			options: [
				{ value: "hod", label: "HOD" },
				{ value: "rm", label: "Regional manager" },
			],
		},
		{
			type: "dropdown",
			label: "Department Type",
			name: "departmentType",
			rules: [{ required: true, message: "Department is required" }],
			options: [
				{ value: "bio", label: "Bio medical" },
				{ value: "pathology", label: "Pathology" },
			],
		},
	];

	const checkboxesConfig = [
		{
			type: "checkbox",
			checked: inputFields.view,
			label: "View",
			name: "view",
		},
		{
			type: "checkbox",
			checked: inputFields.create,
			label: "Create",
			name: "create",
		},
		{
			type: "checkbox",
			checked: inputFields.approve,
			label: "Approve",
			name: "approve",
		},
		{
			type: "checkbox",
			checked: inputFields.reject,
			label: "Reject",
			name: "reject",
		},
		{
			type: "checkbox",
			checked: inputFields.edit,
			label: "Edit",
			name: "edit",
		},
		{
			type: "checkbox",
			checked: inputFields.delete,
			label: "Delete",
			name: "delete",
		},
		{
			type: "checkbox",
			checked: inputFields.issue,
			label: "Issue",
			name: "issue",
		},
	];

	const handleInputChange = (fieldName, value) => {
		setInputFields((prevInputFields) => ({
			...prevInputFields,
			[fieldName]: value,
		}));
	};

	const features = [
		"Inventory Requisition Form (IRF) ",
		"Inventory Return Request (IRR)",
	];

	return (
		<div>
			<TitleSearchButton
				title={
					PATH.ADMIN_ROLE_CREATE === pathname
						? "Role Creation"
						: "Role Updation"
				}
			/>
			<GenericCard>
				<FormFieldGroup fieldsConfig={fieldsConfig} />
				<div className={`text-[#3E3F42] font-semibold text-[1.25rem] mb-2`}>
					FeaturesFeatures
				</div>
				<GenericCard>
					{features.map((name, index) => {
						return (
							<Checkbox
								feature={{
									fname: name,
									fields: checkboxesConfig,
								}}
								key={index}
							/>
						);
					})}
				</GenericCard>
			</GenericCard>
			<Space className="flex justify-end mt-5">
				<GenericButton
					type="secondary"
					lable="Cancel"
					onClick={() => navigate(PATH.ADMIN_ROLE_LIST)}
				/>
				<GenericButton
					type="primary"
					lable={PATH.ADMIN_ROLE_CREATE === pathname ? "Create" : "Update"}
					onClick={() => navigate(PATH.ADMIN_ROLE_LIST)}
				/>
			</Space>
		</div>
	);
};

export default CreateUpdate;
