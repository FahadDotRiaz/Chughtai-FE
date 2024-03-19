import { Col, Row } from "antd";
import PropTypes from "prop-types";

import FormFieldGroup from "../../../components/form/FormFieldGroup";

// eslint-disable-next-line react/prop-types
const BankingInformation = ({ isView, loading, vendorsData }) => {
	const fieldsConfig = [
		{
			type: "input",
			label: "NTN",
			name: "ntn",
			rules: [{ required: true, message: "NTN is required" }],
		},
		{
			type: "input",
			label: "Sub Account",
			name: "subAccount",
			rules: [{ required: true, message: "Sub Account is required" }],
		},
		{
			type: "dropdown",
			label: "Company Type",
			name: "companyType",
			rules: [{ required: false, message: "Company type is required" }],
			options: [
				{ value: "Company A", label: "Company A" },
				{ value: "Company B", label: "Company B" },
				{ value: "Company C", label: "Company C" },
			],
		},
		{
			type: "dropdown",
			label: "Bank Name",
			name: "bankName",
			rules: [{ required: true, message: "Bank name is required" }],
			options: [
				{ value: "Mezaan Bank", label: "Mezaan Bank" },
				{ value: "Alfalah Bank", label: "Alfalah Bank" },
				{ value: "Standard Chartered", label: "Standard Chartered" },
			],
		},
		{
			type: "input",
			label: "Branch Name",
			name: "branchName",
			rules: [{ required: true, message: "Branch name is required" }],
		},
		{
			type: "dropdown",
			label: "Tax Type",
			name: "taxType",
			rules: [{ required: true, message: "Tax type is required" }],
			options: [
				{ value: "Sales tax", label: "Sales tax" },
				{ value: "Federal tax", label: "Federal tax" },
			],
		},
		{
			type: "number",
			label: "IBAN",
			name: "iban",
			rules: [{ required: true, message: "IBAN is required" }],
		},
		{
			type: "number",
			label: "Branch Code",
			name: "branchCode",
			rules: [{ required: true, message: "Branch code is required" }],
		},
		{
			type: "input",
			label: "Account Title",
			name: "accountTitle",
			rules: [{ required: true, message: "Account Title is required" }],
		},
		{
			type: "number",
			label: "Account",
			name: "account",
			rules: [{ required: true, message: "Account is required" }],
		},
	];

	const viewFields = [
		{
			label: "NTN",
			value: vendorsData?.ntn ?? "N/A",
		},
		{
			label: "Sub Account",
			value: vendorsData?.subAccount ?? "N/A",
		},
		{
			label: "Company Type",
			value: vendorsData?.companyType ?? "N/A",
		},
		{
			label: "Bank Name",
			value: vendorsData?.bankName ?? "N/A",
		},
		{
			label: "Branch Name",
			value: vendorsData?.branchName ?? "N/A",
		},
		{
			label: "Tax Type",
			value: vendorsData?.taxType ?? "N/A",
		},

		{
			label: "IBAN",
			value: vendorsData?.iban ?? "N/A",
		},
		{
			label: "Branch Code",
			value: vendorsData?.branchCode ?? "N/A",
		},
		{
			label: "Account Title",
			value: vendorsData?.accountTitle ?? "N/A",
		},
		{
			label: "Account",
			value: vendorsData?.account ?? "N/A",
		},
	];
	return (
		<div>
			{isView ? (
				<Row gutter={[16, 30]} className="p-6">
					{viewFields.map((item, index) => {
						return (
							<Col span={8} key={index}>
								<div>
									<label>{item.label}</label>
									<div className="name mt-3">{item.value}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			) : (
				<FormFieldGroup fieldsConfig={fieldsConfig} isLoading={loading} />
			)}
		</div>
	);
};

export default BankingInformation;
BankingInformation.propTypes = {
	vendorsData: PropTypes.object.isRequired,
};
