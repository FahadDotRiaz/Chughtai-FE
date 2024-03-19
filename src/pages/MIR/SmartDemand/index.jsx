import { Form } from "antd";
import { useState } from "react";
import GenericCard from "../../../components/GenericCard";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericButton from "../../../components/GenericButton";
import TitleSearchButton from "../../../components/TitleSearchButton";
import { PlusOutlined } from "@ant-design/icons";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TableEditableField from "../../../components/TableEditableField";
import TableActionButton from "../../../components/TableActionButton";
import { useNavigate } from "react-router";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { AddItems } from "../Shared/components/AddItems";

export default function Index() {
	const [form] = Form.useForm();
	const [inputFields, setInputFields] = useState({});
	const navigate = useNavigate();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [addItemModal, setAddItemModal] = useState(false);
	const [showItems, setShowItems] = useState(false);

	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Province",
			name: "province",
			rules: [{ required: true, message: "Please input this field!" }],
			dropdownOptions: [
				{ value: "Punjab", label: "Punjab" },
				{ value: "Sindh", label: "Sindh" },
			],
			defaultValue: "Punjab",
		},
		{
			type: "dropdown",
			label: "City",
			name: "city",
			rules: [{ required: true, message: "Please input this field!" }],
			dropdownOptions: [
				{ value: "Lahore", label: "Lahore" },
				{ value: "Karachi", label: "Karachi" },
			],
			defaultValue: "Lahore",
		},
		{
			type: "dropdown",
			label: "Collection Center",
			name: "center",
			rules: [{ required: true, message: "Please input this field!" }],
			dropdownOptions: [
				{ value: "Jail Road", label: "Jail Road" },
				{ value: "Johar", label: "Johar" },
			],
			defaultValue: "Jail Road",
		},
		{
			type: "dropdown",
			label: "Demand Type",
			name: "demand",
			rules: [{ required: true, message: "Please input this field!" }],
			dropdownOptions: [
				{ value: "Adhoc", label: "Adhoc" },
				{ value: "Recurrent", label: "Recurrent" },
			],
			defaultValue: "Recurrent",
		},
		{
			type: "datetime",
			label: "Date",
			name: "date",
			rules: [{ required: true, message: "Please input this field!" }],
		},
	];
	const handleInputChange = (fieldName, value) => {
		setInputFields((prevInputFields) => ({
			...prevInputFields,
			[fieldName]: value,
		}));
	};
	const generateFields = (fieldsConfig, handleInputChange) => {
		return (
			<FormFieldGroup
				fieldsConfig={fieldsConfig}
				handleInputChange={handleInputChange}
			/>
		);
	};

	const onFinish = (values) => {
		console.log("Received values:", values);
		console.log(inputFields);
	};

	const columns = [
		{
			header: "Item code",
			accessorKey: "itemCode",
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Item Description",
			accessorKey: "itemDesc",
		},
		{
			header: "AI Suggested",
			accessorKey: "suggested",
			size: 20,
			Cell: () => <TableEditableField field="number" defaultValue={10} />,
		},
		{
			header: "actions",
			accessorKey: "actions",
			enableColumnFilter: false,
			align: "center",
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: () => (
				<TableActionButton
					type="delete"
					//   onClick={() => setShowDeleteDialog(true)}
				/>
			),
		},
	];

	const items = [
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
		{
			mir: "01022344",
			key: "1",
			itemCode: `1023`,
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#310600 (Liason)",
			requisition: 23,
			approved: 14,
			uom: "unit",
			department: "1245",
			username: "zain",
			genrated_date: `11/01/2023`,
			stage: `HOD Approval`,
			actions: `HOD Approval`,
			status: "Approved",
			from: "Karachi",
			to: "Lahore",
			branch: "Lahore,Johar town",
			stnStatus: "process",
			pending: 100,
			issue: 70,
			store: 112,
			assigned: 70,
			vendor: "Rose patel",
			expiry: "N/A",
			parentItem: "tissue",
			qty: "20",
			batchNo: "N/A",
		},
	];
	return (
		<>
			<GenericCard className="mt-5">
				<Form
					form={form}
					name="myForm"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					{generateFields(fieldsConfig, handleInputChange)}
				</Form>
				{!showItems && (
					<div className="flex justify-end">
						<GenericButton
							type="primary"
							lable="Request Items"
							onClick={() => setShowItems(true)}
						/>
					</div>
				)}
			</GenericCard>

			{showItems && (
				<>
					<div className="mt-10">
						<TitleSearchButton
							title="Requested Items"
							btnLable="Add Item"
							secondaryTitle
							icon={<PlusOutlined />}
							onButtonChange={() => setAddItemModal(true)}
						/>
					</div>
					<GenericMuiTable
						columns={columns}
						data={items}
						simpleTable
						enableColumnFilters={false}
					/>
					<div className="footer-buttons">
						<GenericButton
							type="outline"
							lable="Back"
							onClick={() => navigate(-1)}
						/>

						<div className="flex gap-2">
							<GenericButton
								type="primary"
								lable="Generate Request"
								onClick={() =>
									setShowDeleteDialog({ show: true, type: "generate" })
								}
							/>
						</div>
					</div>
				</>
			)}
			<AppConfirmDialog
				showModal={showDeleteDialog?.show}
				description={`Are you sure you want to ${showDeleteDialog?.type} the request ?`}
				handleCancel={() => setShowDeleteDialog(false)}
				handleOk={() => setShowDeleteDialog(false)}
			/>
			<AddItems show={addItemModal} onClose={() => setAddItemModal(false)} />
		</>
	);
}
