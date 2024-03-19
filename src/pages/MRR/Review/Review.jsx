/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericButton from "../../../components/GenericButton";
import { useNavigate, useParams } from "react-router-dom";
import GenericMuiTable from "../../../components/GenericMuiTable";
import ReviewFieldsCard from "./ReviewFieldsCard";
import { Spin, Form } from "antd";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import TableEditableField from "../../../components/TableEditableField";
import TableActionButton from "../../../components/TableActionButton";
import GenericCard from "../../../components/GenericCard";
import {
	useApproveIrrMutation,
	useLazyGetIrrByIdQuery,
} from "../../../redux/slices/IRR";
import useNotification from "../../../components/Notification";
import { PATH } from "../../../../config";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import FullScreenLoader from "../../../components/FullScreenLoader";
import PreviewImage from "../Generate/components/PreviewImage";

export default function Review() {
	const [showDialog, setShowDialog] = useState(false);
	const { id } = useParams();
	const [form] = Form.useForm();
	Form.useWatch("items", form);
	const [formReRender, setFormReRender] = useState(false);
	const [
		getIrrByID,
		{ data: IRRdata = {}, isLoading: irrLoading, isFetching: irrFetching },
	] = useLazyGetIrrByIdQuery();
	const [approveIrr, { isLoading: approveLoading }] = useApproveIrrMutation();
	const { openNotification, contextHolder } = useNotification();
	const [isReqCreated, setIsReqCreated] = useState(false);
	console.log(IRRdata, "IRRdata");

	useEffect(() => {
		if (IRRdata) {
			const formattedData = IRRdata?.items?.map((i) => {
				return {
					estimatedPrice: i.estimatedPrice,
					images: i.images.map((image) => ({ file: image })),
					returnQuantity: i.returnQuantity,
					returnReason: i.returnReason,
					totalQuantity: i.totalQuantity,
					type: i.type,
					sinId: i?.sin?.id,
					sinNumber: i?.sin?.sinNumber,
					itemId: i?.item?.id,
					name: i?.item?.name,
					itemCode: i?.item?.itemCode,
					description: i?.item?.description,
				};
			});
			form.setFieldsValue({ items: formattedData });
			setFormReRender(!formReRender);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [IRRdata, form]);

	const handleApprove = async () => {
		console.log("APPROVE");
		// const formValues = form.getFieldValue("items");
		const formValues = form.getFieldValue("items")?.map((i) => {
			return {
				itemId: i.itemId,
				estimatedPrice: i.estimatedPrice,
				returnQty: i.returnQuantity,
			};
		});
		const finalData = {
			mrrlId: IRRdata?.id,
			items: formValues,
		};

		const response = await approveIrr(finalData);
		if (!response.error) {
			setIsReqCreated(true);
		} else {
			openNotification(
				"error",
				response.error?.message || "Error approving request"
			);
		}
	};
	console.log(form.getFieldValue("items"), 'form.getFieldValue("items")');

	const handleSubmit = (values) => {
		console.log(values);
	};

	useEffect(() => {
		if (id) {
			getIrrByID({ id });
		}
	}, []);

	const handleDelete = (id) => {
		const updatedItems = form
			.getFieldValue("items")
			?.filter((item) => item.itemId !== id);
		form.setFieldsValue({ items: updatedItems });
		setFormReRender(!formReRender);
	};

	const columns = [
		{
			header: "",
			accessorKey: "images",
			align: "center",
			Cell: ({ cell, row }) => (
				<PreviewImage
					imgList={form.getFieldValue("items")?.[row?.index]?.images || []}
				/>
			),
			enableColumnFilter: false,
		},
		{
			header: "Item Code",
			accessorKey: "itemCode",
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Item Desc",
			accessorKey: "description",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		{
			header: "SIR No.",
			accessorKey: "sinNumber",
		},
		{
			header: "Type",
			accessorKey: "type",
		},

		{
			header: "Reason",
			accessorKey: "returnReason",
		},
		{
			header: "Estimated Price",
			accessorKey: "estimatedPrice",
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="number"
					disabled={IRRdata?.items[row?.index]?.type === "Return"}
					name="estimatedPrice"
					index={row?.index}
					isArray
				/>
			),
		},
		{
			header: "Return",
			accessorKey: "returnQuantity",
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="number"
					name="returnQuantity"
					index={row?.index}
					isArray
				/>
			),
		},
		{
			header: "Actions",
			accessorKey: "itemId",
			enableColumnFilter: false,
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell }) => (
				<TableActionButton
					type="delete"
					onClick={() => handleDelete(cell?.getValue())}
				/>
			),
		},
	];

	const navigate = useNavigate();

	return irrLoading || irrFetching ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<>
			<Form
				form={form}
				key={formReRender}
				name="myForm"
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
			>
				{contextHolder}
				<GenericCard className="mb-5">
					<TitleSearchButton
						title="Review Inventory Return Request"
						id={IRRdata?.mrrCode}
						subTitle={`Generated by ${IRRdata?.fromDepartment?.name}`}
					/>
				</GenericCard>
				<CardButtonFilterGroup title={{ text: "Return Items", level: 2 }}>
					<GenericMuiTable
						columns={columns}
						data={form.getFieldValue("items") || []}
						simpleTable
						enableColumnFilters={false}
						isLoading={irrLoading}
					/>
				</CardButtonFilterGroup>
				<ReviewFieldsCard data={IRRdata} />
				<div className="flex items-center justify-between mt-5">
					<div>
						<GenericButton
							lable="Back"
							type="outline"
							onClick={() => navigate(-1)}
						/>
					</div>
					{IRRdata.status !== "APPROVED" && (
						<div className="flex items-center justify-between gap-3 mt-3">
							{/* <GenericButton
								lable="Reject Request"
								type="primary"
								isDanger
								onClick={() =>
									setShowDialog({ show: true, type: "reject the request" })
								}
							/> */}
							<GenericButton
								lable="Approve"
								type="primary"
								onClick={() =>
									setShowDialog({ show: true, type: "approve the request" })
								}
								// htmlType="submit"
								loading={approveLoading}
								disabled={approveLoading}
							/>
						</div>
					)}
				</div>

				<AppConfirmDialog
					showModal={showDialog?.show}
					description={`Are you sure you want to ${showDialog?.type} ?`}
					handleCancel={() => setShowDialog(false)}
					handleOk={handleApprove}
				/>
				<AppConfirmDialog
					showModal={isReqCreated}
					title={
						<div className="text-center">Request approved Successfully</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() => navigate(PATH.MRR_STORE_REVIEW_LIST)}
						/>
					}
				/>
				{approveLoading && <FullScreenLoader forRequest />}
			</Form>
		</>
	);
}
