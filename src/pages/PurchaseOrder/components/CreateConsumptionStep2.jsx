import { Button, Form, Input, Space } from "antd";
import GenericMuiTable from "../../../components/GenericMuiTable";
import GenericButton from "../../../components/GenericButton";
import PropTypes from "prop-types";
import TitleSearchButton from "../../../components/TitleSearchButton";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { useState } from "react";
import { PATH } from "../../../../config";
import { useNavigate } from "react-router-dom";
import TableEditableField from "../../../components/TableEditableField";

const CreateConsumptionStep2 = ({ updateMode }) => {
	const [showDialog, setShowDialog] = useState(false);
	const navigate = useNavigate();
	const filterMenu = [
		{
			label: <Input placeholder="Code" />,
			key: "0",
		},
		{
			label: <Input placeholder="Name" />,
			key: "1",
		},
		{
			label: (
				<Button className="w-full justify-center" type="primary">
					Search
				</Button>
			),
			key: "2",
		},
	];
	const columns = [
		{
			header: "Item Code",
			accessorKey: "code",
		},
		{
			header: "Date",
			accessorKey: "date",
		},
		{
			header: "UOM",
			accessorKey: "uom",
		},
		{
			header: "Total",
			accessorKey: "total",
		},
		{
			header: "Consume QTY",
			accessorKey: "consume",
			Cell: () => <TableEditableField field="number" defaultValue={0} />,
		},
		{
			header: "Balance",
			accessorKey: "balance",
		},
		{
			header: "Patients",
			accessorKey: "patients",
		},
	];
	const data = [
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
	];
	const { TextArea } = Input;

	return (
		<div>
			<TitleSearchButton
				title="Consumption"
				filter={true}
				filterMenu={filterMenu}
				selectedFilters={[]}
				isPrint={true}
			/>
			<GenericMuiTable columns={columns} data={data} simpleTable={true} />
			<Form.Item
				label={"Remarks"}
				name={name}
				rules={null}
				labelAlign="top"
				className="drop-down mt-4"
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				colon={false}
				vertical
			>
				<TextArea
					rows={4}
					placeholder="type here......"
					maxLength={6}
					className="w-full border"
				/>
			</Form.Item>
			<Space className="flex justify-between items-center">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(-1)}
				/>
				<Space className="flex justify-end">
					<GenericButton
						type="secondary"
						lable="Cancel"
						onClick={() => navigate(PATH.CONSUMPTION_LIST)}
					/>
					<GenericButton
						type="primary"
						lable={updateMode ? "Update" : "Save"}
						onClick={() =>
							setShowDialog({
								show: true,
								type: updateMode ? "Update" : "Save",
							})
						}
					/>
				</Space>
			</Space>

			<AppConfirmDialog
				showModal={showDialog?.show}
				description={`Are you sure you want to ${showDialog?.type} ?`}
				handleCancel={() => setShowDialog(false)}
				handleOk={() => navigate(PATH.CONSUMPTION_LIST)}
			/>
		</div>
	);
};

export default CreateConsumptionStep2;

CreateConsumptionStep2.propTypes = {
	updateMode: PropTypes.bool,
};
