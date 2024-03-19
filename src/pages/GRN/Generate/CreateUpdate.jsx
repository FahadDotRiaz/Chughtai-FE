/* eslint-disable no-mixed-spaces-and-tabs */
import GenericCard from "../../../components/GenericCard";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TableEditableField from "../../../components/TableEditableField";
import TitleSearchButton from "../../../components/TitleSearchButton";
import PropTypes from "prop-types";
import { Col, Row, Spin, Form, Space } from "antd";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericButton from "../../../components/GenericButton";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { PATH } from "../../../../config";
import { useLazyGetPOItemsByIdQuery } from "../../../redux/slices/purchaseOrder";
import { useSelector } from "react-redux";
import {
	useLazyGetGrnByIdQuery,
	usePostGrnMutation,
	useUpdateGrnMutation,
} from "../../../redux/slices/GRN";
import useNotification from "../../../components/Notification";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { GRN_STATUS } from "../../../utils/constant";

const CreateUpdate = () => {
	const [form] = Form.useForm();
	Form.useWatch("items", form);
	const [formReRender, setFormReRender] = useState(false);
	const [isRejected, setIsRejected] = useState(false);
	const { id } = useParams();
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const [showDialog, setShowDialog] = useState({ show: false, type: "" });
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [createGrn, { isLoading: createLoading }] = usePostGrnMutation();
	const [updateGrn, { isLoading: updateLoading }] = useUpdateGrnMutation();
	const [getGrnByID, { data: grn, isLoading: grnLoading }] =
		useLazyGetGrnByIdQuery(id);

	const [getPoItems, { data: PoItems, isLoading: poItemLoading }] =
		useLazyGetPOItemsByIdQuery();

	useEffect(() => {
		if (pathname.includes("generate") && id) {
			getPoItems({ id });
		} else {
			getGrnByID(id);
		}
	}, []);

	useEffect(() => {
		if (grn) {
			const formattedItems = grn.items?.map((i) => {
				// eslint-disable-next-line no-unused-vars
				const { item, ...rest } = i;
				return {
					...rest,
					itemId: i.item.id,
					description: i.item.description,
					itemCode: i.item.itemCode,
					grnQty: i.grnQty,
					prevgrnQty: i.grnQty,
					balance: 0,
					remainingQty: 0,
					cancelQty: 0,
					quantity: i?.requestedQty,
				};
			});
			form.setFieldsValue({ items: formattedItems });
			form.setFieldsValue({ remarks: grn?.remarks });
			setFormReRender(!formReRender);
		}
	}, [form, grn]);

	useEffect(() => {
		if (PoItems) {
			const items = PoItems?.items?.map((item) => {
				return {
					itemId: item?.itemId,
					itemCode: item?.itemCode,
					description: item?.description,
					requestedQty: item?.quantity,
					grnQty: item?.totalPendingQty
						? item?.totalPendingQty
						: item?.grnQty || 0,
					cancelQty: 0,
					totalPendingQty: item?.totalPendingQty,
					totalCancelQty: item?.totalCancelQty,
					totalGrnQty: item?.totalGrnQty,
					quantity: item?.quantity,
					balance: 0,
					remainingQty: 0,
				};
			});
			form.setFieldsValue({ items: items });
			setFormReRender(!formReRender);
		}
	}, [PoItems]);

	const checkGrnQty = (data) => {
		return (
			data &&
			data?.some((item) => {
				if (item?.grnQty !== 0) {
					return true;
				}
				return false;
			})
		);
	};

	const handleSubmit = async () => {
		const formValues = form.getFieldValue("items");
		if ((PoItems || grn) && checkGrnQty(formValues)) {
			const payload = {
				po: PoItems?.id || grn?.po?.id,
				remarks: form?.getFieldValue("remarks"),
				department: departmentId,
				items: formValues?.map((i) => {
					const calculatedBalance = pathname?.includes("generate")
						? i.totalPendingQty !== 0
							? i.totalPendingQty - i.grnQty
							: i.requestedQty - i.grnQty
						: i.totalPendingQty + i.prevgrnQty - i.grnQty;

					return {
						itemId: i.itemId,
						cancelQty: i.cancelQty,
						grnQty: i.grnQty,
						requestedQty: i.requestedQty,
						balance: calculatedBalance || 0,
						remainingQty: calculatedBalance - i.cancelQty || 0,
					};
				}),
			};
			const finalData = pathname?.includes("review")
				? {
						...payload,
						status: isRejected ? GRN_STATUS.REJECTED : GRN_STATUS.HOD_APPROVED,
				  }
				: payload;
			if (id && grn) {
				const { error } = await updateGrn({ id, finalData });
				if (!error) {
					setIsReqCreated(true);
				} else {
					openNotification(
						"error",
						error?.message || "Error performing action"
					);
				}
			} else {
				const { error } = await createGrn(finalData);
				if (!error) {
					setIsReqCreated(true);
				} else {
					openNotification(
						"error",
						error?.message || "Error performing action"
					);
				}
			}
			setShowDialog({ show: false, type: "" });
		} else {
			openNotification("error", "GRN Quantity can't be 0");
		}
	};

	const getBalanceAndRemaining = (index) => {
		const formValues = form.getFieldValue("items")?.[index];
		const requested = pathname.includes("generate")
			? formValues?.totalPendingQty !== 0
				? formValues?.totalPendingQty
				: formValues?.quantity
			: formValues?.totalPendingQty !== 0
			? formValues?.totalPendingQty
			: 0;
		const balance = pathname?.includes("generate")
			? requested - (formValues?.grnQty || 0)
			: formValues?.prevgrnQty - formValues.grnQty + requested;

		const cancelMax = pathname?.includes("generate")
			? Math.max(requested - (formValues?.grnQty || 0), 0)
			: balance;
		const cancelMin = Math.max(balance, 0);
		const remaining = Math.max(balance - (formValues?.cancelQty || 0), 0);

		return {
			remaining: remaining,
			balance: balance,
			cancelMax: cancelMax,
			cancelMin: cancelMin,
			requested: requested,
		};
	};

	const handleOtherValues = (row, cell) => {
		form.setFieldValue(["items", row.index, "itemId"], cell.getValue());
		form.setFieldValue(
			["items", row.index, "requestedQty"],
			row?.original?.quantity
		);
	};

	const getMax = (row) => {
		if (pathname.includes("generate")) {
			return (
				row?.original?.quantity -
				(row?.original?.totalGrnQty + row?.original?.totalCancelQty)
			);
		} else {
			return row?.original?.totalPendingQty === 0
				? row?.original?.totalPendingQty + grn?.items[row?.index]?.grnQty
				: row?.original?.totalPendingQty + row?.original?.prevgrnQty;
		}
	};

	const columns = [
		{
			header: "Item Code",
			accessorKey: "itemCode",
			size: 120,
		},
		{
			header: "Description",
			accessorKey: "description",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		{
			header: "QTY Requested",
			accessorKey: "quantity",
			size: 120,
		},
		{
			header: "Total GRN QTY",
			accessorKey: "totalGrnQty",
			size: 120,
		},
		{
			header: "Total Cancelled",
			accessorKey: "totalCancelQty",
			size: 120,
		},
		{
			header: "Total Pending",
			accessorKey: "totalPendingQty",
			size: 120,
		},
		{
			header: "GRN QTY",
			accessorKey: "itemId",
			enableColumnFilter: false,
			Cell: ({ row, cell }) => (
				<TableEditableField
					field="number"
					max={getMax(row)}
					name={`grnQty`}
					index={row?.index}
					isArray
					onChange={() => handleOtherValues(row, cell)}
				/>
			),
		},
		{
			header: "Balance",
			enableColumnFilter: false,
			accessorKey: "balance",
			size: 120,
			Cell: ({ row }) => getBalanceAndRemaining(row?.index)?.balance,
		},
		{
			header: "Cancel",
			accessorKey: "itemId",
			enableColumnFilter: false,
			Cell: ({ row, cell }) => (
				<TableEditableField
					field="number"
					name={`cancelQty`}
					index={row?.index}
					isArray
					min={0}
					max={getBalanceAndRemaining(row?.index)?.cancelMax}
					onChange={() => handleOtherValues(row, cell)}
					rules={[
						{
							type: "number",
							max: getBalanceAndRemaining(row?.index)?.cancelMax,
							min: 0,
							message: "Qty Exceed",
						},
						{ required: true, message: "Required" },
					]}
				/>
			),
		},
		{
			header: "Remaining",
			accessorKey: "remaining",
			enableColumnFilter: false,
			size: 120,
			Cell: ({ row }) => getBalanceAndRemaining(row?.index)?.remaining,
		},
	];

	const infoData = [
		{ label: "PO", value: PoItems?.poCode || grn?.po?.poCode },
		{
			label: "IGP",
			value:
				PoItems?.gatePass
					?.map((item) => {
						return item.IgpCode;
					})
					?.join(",") ||
				grn?.po?.gatePass[0]?.IgpCode ||
				"N/A",
		},
		{
			label: "Department",
			value: PoItems?.department?.name || grn?.po?.department?.name || "N/A",
		},
	];

	const fieldsConfig = [
		{
			type: "textarea",
			label: "Remarks",
			name: "remarks",
			cols: 24,
			rows: 4,
			// defaultValue: grn?.remarks || "",
		},
	];

	const buttons = (
		<div className="flex justify-between">
			<GenericButton type="outline" lable="Back" onClick={() => navigate(-1)} />
			{pathname?.includes("review") ? (
				<Space>
					<GenericButton
						type="primary"
						isDanger
						lable="Reject"
						htmlType={"submit"}
						onClick={() => {
							setIsRejected(true);
						}}
						loading={updateLoading}
					/>
					<GenericButton
						type="primary"
						lable="Approve"
						htmlType={"submit"}
						onClick={() => {
							setIsRejected(false);
						}}
						loading={updateLoading}
					/>
				</Space>
			) : (
				<GenericButton
					type="primary"
					lable={PoItems && id ? "Generate GRN" : "Update GRN"}
					disabled={createLoading || updateLoading}
					loading={createLoading || updateLoading}
					htmlType="submit"
				/>
			)}
		</div>
	);

	const handleOk = () => {
		form.validateFields().then(() => {
			setShowDialog({
				show: true,
				type: pathname?.includes("generate")
					? "Generate"
					: pathname?.includes("update")
					? "Update"
					: isRejected
					? "Reject"
					: "Approve",
			});
		});
	};

	return grnLoading || poItemLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<div>
			<Form
				form={form}
				name="myForm"
				initialValues={{ remember: true }}
				onFinish={handleOk}
				key={formReRender}
			>
				{contextHolder}
				<TitleSearchButton
					title={
						<>
							<div className="flex">
								{`Goods Receiving Note ${
									!pathname?.includes("generate")
										? `(GRN: ${grn?.grnCode})`
										: ""
								}`}
								{pathname?.includes("review") && (
									<GenericButton
										type="link"
										lable="View All GRNs"
										onClick={() => {
											const url = PATH.GRN_VIEW_ALL.replace(
												":id",
												grn?.po?.poCode
											);
											window.open(url, "_blank");
										}}
									/>
								)}
							</div>
						</>
					}
				/>
				<CardButtonFilterGroup title={{ text: "Items Received", level: 2 }}>
					<GenericMuiTable
						columns={columns}
						data={form.getFieldValue("items") || []}
						isLoading={poItemLoading || grnLoading}
						simpleTable
					/>
				</CardButtonFilterGroup>
				<div className="mt-5">
					<FormFieldGroup fieldsConfig={fieldsConfig} />
				</div>
				<GenericCard className="my-5">
					<Row gutter={[16, 30]}>
						{infoData.map(({ label, value }, index) => {
							return (
								<Col span={8} key={index}>
									<div>
										<label>{label}</label>
										<div className="name mt-2">
											{value !== "N/A" &&
											(label === "PO" || label === "IGP") ? (
												<Link className="underline text-[#2E3790]">
													{value}
												</Link>
											) : (
												value
											)}
										</div>
									</div>
								</Col>
							);
						})}
					</Row>
				</GenericCard>
				{buttons}
				<AppConfirmDialog
					showModal={showDialog?.show}
					description={`Are you sure you want to ${showDialog?.type} this GRN request?`}
					handleCancel={() => setShowDialog({ show: false, type: "" })}
					handleOk={handleSubmit}
				/>

				<AppConfirmDialog
					showModal={isReqCreated}
					title={
						<div className="text-center">
							{PoItems && id
								? "GRN created successfully"
								: "GRN updated successfully"}
						</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={
								pathname?.includes("review")
									? () => navigate(PATH.GRN_REVIEW_LIST)
									: () => navigate(PATH.GRN_GENERATE_LIST)
							}
						/>
					}
				/>
			</Form>
			{(createLoading || updateLoading) && <FullScreenLoader forRequest />}
		</div>
	);
};

export default CreateUpdate;

CreateUpdate.propTypes = {
	cell: PropTypes.object,
	row: PropTypes.object,
};
