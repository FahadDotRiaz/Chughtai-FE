/* eslint-disable react/prop-types */
import { Form, Input, Space } from "antd";
import GenericMuiTable from "../../../components/GenericMuiTable";
import GenericButton from "../../../components/GenericButton";
import PropTypes from "prop-types";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { useState } from "react";
import { PATH } from "../../../../config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableEditableField from "../../../components/TableEditableField";
import useNotification from "antd/es/notification/useNotification";
import {
	usePostConsumptionMutation,
	useUpdateConsumptionMutation,
} from "../../../redux/slices/consumption";
import { useSelector } from "react-redux";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import FullScreenLoader from "../../../components/FullScreenLoader";

const CreateConsumptionStep2 = ({
	updateMode,
	setStep,
	isListLoading,
	form,
}) => {
	const [showDialog, setShowDialog] = useState(false);
	const { state } = useLocation();
	const { id } = useParams();
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const navigate = useNavigate();
	const { TextArea } = Input;
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [createConsumption, { isLoading }] = usePostConsumptionMutation();
	const [updateConsumption, { isLoading: updateLoading }] =
		useUpdateConsumptionMutation();

	const columns = [
		{
			header: "Item Code",
			accessorKey: "item.itemCode",
		},
		{
			header: "Name",
			accessorKey: "item.name",
		},
		{
			header: "UOM",
			accessorKey: "uom",
			// eslint-disable-next-line no-unused-vars
			Cell: ({ cell }) => "Nos",
		},
		{
			header: "Total Issued",
			accessorKey: "quantity",
		},
		{
			header: "Total Consumed",
			accessorKey: "consumptionQty",
		},
		{
			header: "Sir Total",
			accessorKey: "sinTotal",
		},
		{
			header: "Consume QTY",
			accessorKey: "consume",
			enableColumnFilter: false,
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					max={row?.original?.quantity - row?.original?.consumptionQty}
					name="consumeQty"
					index={row?.index}
					isArray
					rules={[
						{
							type: "number",
							min: 1,
							message: "Can't be 0",
						},
						{ required: true, message: "Required" },
					]}
					// max={id ? row?.original?.sinTotal : row?.original?.quantity}
				/>
			),
		},

		{
			header: "Patients",
			accessorKey: "patients",
			enableColumnFilter: false,
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					name="patients"
					index={row?.index}
					isArray
					max={row?.original?.quantity - row?.original?.consumptionQty}
					rules={[
						{
							type: "number",
							min: 1,
							message: "Can't be 0",
						},
						{ required: true, message: "Required" },
					]}
				/>
			),
		},
	];

	const saveConsumption = async () => {
		const formValues = form.getFieldValue("items")?.map((i) => {
			return {
				consumeQty: i.consumeQty,
				itemId: i.item.id,
				sinTotal: i?.quantity,
				patients: i?.patients,
			};
		});
		const finalData = {
			sin: state?.sinId,
			remarks: form.getFieldValue("remarks"),
			departmentId: departmentId,
			items: formValues,
		};
		if (id) {
			const { error } = await updateConsumption({ id: id, finalData });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", "Error updating consumption");
			}
		} else {
			const { error } = await createConsumption(finalData);
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", "Error creating consumption");
			}
		}
		setShowDialog(false);
	};

	const handleSave = async () => {
		await form.validateFields();
		setShowDialog({
			show: true,
			type: updateMode ? "Update" : "Save",
		});
	};

	return (
		<div className="mt-5">
			{contextHolder}

			<CardButtonFilterGroup title={{ text: "Consumption", level: 1 }}>
				<GenericMuiTable
					columns={columns}
					data={form.getFieldValue("items") || []}
					simpleTable={true}
					isLoading={isListLoading}
					columnVisibility={{
						quantity: id ? false : true,
						sinTotal: id ? true : false,
					}}
				/>
			</CardButtonFilterGroup>
			{/* {id && payload?.remarks === "" && payload?.items === null ? (
				<Skeleton active className="mt-5" />
			) : ( */}
			<>
				<Form.Item
					label={"Remarks"}
					name={"remarks"}
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
						//   maxLength={6}
						className="w-full border"
						// defaultValue={payload?.remarks}
						onChange={(e) => form.setFieldValue("remarks", e.target.value)}
					/>
				</Form.Item>
				<Space className="flex justify-between items-center">
					<GenericButton
						type="outline"
						lable="Back"
						onClick={() => setStep(1)}
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
							onClick={handleSave}
							loading={isLoading || updateLoading}
							disabled={isLoading || updateLoading}
						/>
					</Space>
				</Space>
			</>
			{/* )} */}

			<AppConfirmDialog
				showModal={showDialog?.show}
				description={`Are you sure you want to ${showDialog?.type} ?`}
				handleCancel={() => setShowDialog(false)}
				handleOk={saveConsumption}
			/>
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">{`Consumption ${
						id ? "Updated" : "Generated"
					} Successfully`}</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.CONSUMPTION_LIST)}
					/>
				}
			/>
			{(updateLoading || isLoading) && <FullScreenLoader forRequest />}
		</div>
	);
};

export default CreateConsumptionStep2;

CreateConsumptionStep2.propTypes = {
	updateMode: PropTypes.bool,
	isListLoading: PropTypes.bool,
	remarks: PropTypes.string,
};

CreateConsumptionStep2.defaultProps = {
	updateMode: false,
	isListLoading: false,
	remarks: "",
};
