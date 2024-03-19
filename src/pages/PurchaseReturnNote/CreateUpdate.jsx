import { useState } from "react";
import FormFieldGroup from "../../components/form/FormFieldGroup";
import GenericCard from "../../components/GenericCard";
import TitleSearchButton from "../../components/TitleSearchButton";
import { Form } from "antd";
import GenericButton from "../../components/GenericButton";
import { ImAttachment } from "react-icons/im";
import GenericMuiTable from "../../components/GenericMuiTable";
import AppConfirmDialog from "../../components/AppConfirmDialog";

export default function CreateUpdate() {
	const [form] = Form.useForm();
	// eslint-disable-next-line no-unused-vars
	const [inputFields, setInputFields] = useState({});
	const [showDialog, setShowDialog] = useState(false);

	const onFinish = (values) => {
		console.log("Received values:", values);
		// console.log(inputFields);
	};

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
	const treeData = [
		{
			title: "Tissues",
			value: "tissues",
			key: "tissues",
			children: [
				{
					title: "Rose petal",
					value: "rosePetal",
					key: "rosePetal",
				},
				{
					title: "Tux",
					value: "tux",
					key: "tux",
				},
			],
		},
		{
			title: "Pen",
			value: "pen",
			key: "pen",
			children: [
				{
					title: "Dollar",
					value: "dollar",
					key: "dollar",
				},
			],
		},
	];
	const fieldsConfig = [
		{
			type: "input",
			label: "PR #",
			name: "pr",
			rules: [{ required: true, message: "Please input this field!" }],
		},
		{
			type: "date",
			label: "PR Date",
			name: "date",
			rules: [{ required: true, message: "Please input this field!" }],
		},
		{
			type: "dropdown",
			label: "Vendor Name",
			name: "vendor",
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "usa", label: "USA" },
				{ value: "canada", label: "Canada" },
				{ value: "uk", label: "UK" },
			],
		},
		{
			type: "treeselect",
			label: "Vendor Item List",
			name: "vendorItemList",
			rules: [{ required: true, message: "Please select this field!" }],
			treeData: treeData,
			onChange: handleInputChange,
		},
		{
			type: "dropdown",
			label: "Return From Store",
			name: "returnFrom",
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "usa", label: "USA" },
				{ value: "canada", label: "Canada" },
				{ value: "uk", label: "UK" },
			],
		},
		{
			type: "textarea",
			label: "Remarks",
			name: "remarks",
			rows: 3,
			cols: 24,
			rules: [{ required: true, message: "Please input this field!" }],
		},
	];

	const columns = [
		{
			header: "Item Code",
			accessorKey: "code",
		},
		{
			header: "Item Description",
			accessorKey: "description",
		},
		{
			header: "UOM",
			accessorKey: "um",
		},
		{
			header: "GRN",
			accessorKey: "grn",
		},
		{
			header: "PO",
			accessorKey: "po",
		},
		{
			header: "Batch No",
			accessorKey: "batch",
		},
		{
			header: "Stock Company",
			accessorKey: "stockCompany",
		},
		{
			header: "Stock Store",
			accessorKey: "stockStore",
		},
		{
			header: "Stock Batch",
			accessorKey: "stockBatch",
		},
		{
			header: "Quantity",
			accessorKey: "quantity",
		},
		{
			header: "Rate",
			accessorKey: "rate",
		},
		{
			header: "Amount",
			accessorKey: "amount",
		},

		// {
		//   header: "Action",
		//   accessorKey: "actions",enableColumnFilter: false,
		// size: 30,
		// muiTableHeadCellProps: {
		//         align: "center",
		//       },
		//       muiTableBodyCellProps: {
		//         align: "center",
		//       },
		//   align: "center",
		//   // eslint-disable-next-line no-unused-vars
		//   Cell: () => (
		//     <ActionDropdown
		//       editOnClick={() => navigate(PATH.PRN_UPDATE.replace(":id", 0))}
		//       deleteOnClick={() => console.log("delete")}
		//     />
		//   ),
		// },
	];
	const data = [
		{
			code: "123454",
			description: "test",
			um: "test",
			grn: "243434",
			po: "234234",
			batch: "234234",
			stockCompany: "02",
			stockStore: "50",
			stockBatch: "50",
			quantity: "50",
			rate: "10000",
			amount: "10000",
		},
		{
			code: "123454",
			description: "test",
			um: "test",
			grn: "243434",
			po: "234234",
			batch: "234234",
			stockCompany: "02",
			stockStore: "50",
			stockBatch: "50",
			quantity: "50",
			rate: "10000",
			amount: "10000",
		},
		{
			code: "123454",
			description: "test",
			um: "test",
			grn: "243434",
			po: "234234",
			batch: "234234",
			stockCompany: "02",
			stockStore: "50",
			stockBatch: "50",
			quantity: "50",
			rate: "10000",
			amount: "10000",
		},
	];
	return (
		<>
			<TitleSearchButton title="PRR Create" isPrint={true} isDropdown={true} />

			<GenericMuiTable
				columns={columns}
				data={data}
				simpleTable
				wrapperClassName="mt-10"
			/>
			<GenericCard className="mt-7">
				<Form
					form={form}
					name="myForm"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					{generateFields(fieldsConfig, handleInputChange)}
					<GenericButton
						lable="Add Attachment"
						type="primary"
						className="ml-auto mt-5"
						icon={<ImAttachment />}
					/>
				</Form>
			</GenericCard>

			<GenericButton
				type="primary"
				lable="Generate Request"
				className="ml-auto mt-5"
				onClick={() => setShowDialog(true)}
			/>
			<AppConfirmDialog
				showModal={showDialog}
				description={`Are you sure you want to generate the request ?`}
				handleCancel={() => setShowDialog(false)}
				handleOk={() => setShowDialog(false)}
			/>
		</>
	);
}
