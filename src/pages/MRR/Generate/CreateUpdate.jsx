/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Space, Carousel, Row, Col, Spin, Empty } from "antd";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FaTrash, FaUpload } from "react-icons/fa";
import GenericButton from "../../../components/GenericButton";
import AddItem from "./components/AddItem";
import GenericMuiTable from "../../../components/GenericMuiTable";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { PATH } from "../../../../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ImageWithPreview from "../../../components/ImageWithPreview";
import IMAGES from "../../../assets/images";
import TableEditableField from "../../../components/TableEditableField";
import ActionDropdown from "../../../components/ActionDropdown";
import TableActionButton from "../../../components/TableActionButton";
import {
	useCreateIrrMutation,
	// useGetIrrByIdQuery,
	useLazyGetIrrByIdQuery,
	useUpdateIrrHodReviewMutation,
	useUpdateIrrMutation,
} from "../../../redux/slices/IRR";
import { usePostFileMutation } from "../../../redux/slices/file";
import DropdownField from "../../../components/form/DropdownField";
import useNotification from "../../../components/Notification";
import { useSelector } from "react-redux";
import ItemDetails from "../../../components/ItemDetails";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { useGetSirListQuery } from "../../../redux/slices/sir";
import { Cell } from "recharts";
import PreviewImage from "./components/PreviewImage";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { MIR_STATUS } from "../../../utils/constant";

export default function CreateUpdate() {
	const [isReject, setIsReject] = useState(false);
	const { id } = useParams();
	const [form] = Form.useForm();
	Form.useWatch("items", form);
	const [formReRender, setFormReRender] = useState(false);
	const fileInputRef = useRef(null);
	const [addItemsModal, setAddItemsModal] = useState(false);
	const [showDialog, setShowDialog] = useState({ show: false, type: "" });

	const { openNotification, contextHolder } = useNotification();
	const [selectedRow, setSelectedRow] = useState([]);
	const [isReqCreated, setIsReqCreated] = useState(false);
	const [uploadResponses, setUploadResponses] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [itemView, setItemView] = useState({
		item: null,
		show: false,
	});
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const { data: sirList = [] } = useGetSirListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
		departmentId,
	});
	const [createIrr, { isLoading: createLoading }] = useCreateIrrMutation();
	const [postFile, { isLoading }] = usePostFileMutation();
	const [getIrrByID, { data: IRRdata = {}, isLoading: irrLoading }] =
		useLazyGetIrrByIdQuery();
	const [updateIrr, { isLoading: updateLoading }] = useUpdateIrrMutation();
	const [updateIrrHodReview, { isLoading: updateHodReviewLoading }] =
		useUpdateIrrHodReviewMutation();

	useEffect(() => {
		if (id) {
			getIrrByID({ id });
		}
	}, []);

	useEffect(() => {
		if (IRRdata && id) {
			const formattedData = IRRdata?.items?.map((i) => {
				return {
					estimatedPrice: i.estimatedPrice,
					images: i.images.map((image) => ({ file: image })),
					returnQuantity: i.returnQuantity,
					returnReason: i.returnReason,
					quantity: i.totalQuantity,
					consumptionQty: i.consumptionQty,
					type: i.type,
					sinId: i?.sin?.id,
					sinNumber: i?.sin?.sinNumber,
					id: i?.item?.id,
					name: i?.item?.name,
					itemCode: i?.item?.itemCode,
					description: i?.item?.description,
				};
			});
			form.setFieldsValue({ items: formattedData });
			setFormReRender(!formReRender);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [IRRdata, form, id]);

	const navigate = useNavigate();
	const location = useLocation();
	const addProof = location?.state?.proof;
	const { pathname } = useLocation();

	const proofUpload = async (event) => {
		const files = event.target.files;
		const previews = [...imagePreviews];
		const responses = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = async (e) => {
				previews.push(e.target.result);
				setImagePreviews(previews);

				const formData = new FormData();
				formData.append("file", file);

				try {
					const { data } = await postFile(formData);
					responses.push({ file: data?.location });
				} catch (error) {
					console.error("Error uploading file:", error);
					responses.push({ file: null });
				}

				setUploadResponses(responses);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleChange = async (row, value) => {
		const files = value;
		const responses = form.getFieldValue(["items", row.index, "images"]) || [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = async (e) => {
				const formData = new FormData();
				formData.append("file", file);

				try {
					const { data } = await postFile(formData);
					responses.push({ file: data?.location });
				} catch (error) {
					console.error("Error uploading file:", error);
					responses.push({ file: null });
				}
				form.setFieldValue(["items", row.index, "images"], responses);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleDelete = (id) => {
		const updatedItems = form
			.getFieldValue("items")
			?.filter((item) => item.id !== id);
		form.setFieldsValue({ items: updatedItems });
		setFormReRender(!formReRender);
	};

	const columns = [
		{
			header: "",
			accessorKey: "images",
			align: "center",
			Cell: ({ cell, row }) => (
				<Space className="flex justify-center">
					<PreviewImage
						imgList={form.getFieldValue("items")?.[row.index]?.images || []}
						// imgList={imgList[row?.index]?.image || cell?.getValue() || []}
					/>
				</Space>
			),
			enableColumnFilter: false,
			size: 100,
		},
		{
			header: "Item Code",
			accessorKey: "itemCode",
			size: 100,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 100,
		},
		{
			header: "Item Desc",
			accessorKey: "description",
			size: 200,
			Cell: ({ cell }) => (
				// eslint-disable-next-line react/prop-types
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		{
			header: "SIR No.",
			accessorKey: "sinId",
			size: 100,
			Cell: ({ cell }) => (
				<span>
					{sirList?.list?.find((sir) => sir.id === cell?.getValue())?.sinNumber}
				</span>
			),
		},
		{
			header: "Total QTY",
			accessorKey: "quantity",

			size: 100,
		},
		{
			header: "Consumed QTY",
			accessorKey: "consumptionQty",
			size: 100,
		},
		{
			header: "Return Qty",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) =>
				addProof ? (
					<span>{row?.original.returnQuantity}</span>
				) : (
					<TableEditableField
						field="number"
						defaultValue={row?.original.returnQuantity}
						max={row?.original?.quantity - row?.original?.consumptionQty}
						name={`returnQuantity`}
						index={row?.index}
						isArray
						rules={[
							{
								type: "number",
								max: row?.original?.quantity - row?.original?.consumptionQty,
								message: "Qty Exceed",
							},
							{
								type: "number",
								min: 1,
								message: "Should be greater than 0",
							},
							{ required: true, message: "Required" },
						]}
					/>
				),
		},
		{
			header: "Return type",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) =>
				addProof ? (
					<span>{row?.original.type}</span>
				) : (
					<TableEditableField
						dropdownItems={[
							{ value: "Disposal", label: "Disposal" },
							{ value: "Return", label: "Return" },
						]}
						defaultValue={{
							value: row?.original.type,
							label: row?.original.type,
						}}
						name={`type`}
						index={row?.index}
						isArray
						field="dropdown"
					/>
				),
		},
		{
			header: "Estimated Price",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) =>
				addProof ? (
					<span>{row?.original.estimatedPrice}</span>
				) : (
					<TableEditableField
						field="number"
						defaultValue={row?.original.estimatedPrice}
						name={`estimatedPrice`}
						index={row?.index}
						isArray
						disabled={
							form.getFieldValue("items")[row?.index]?.type === "Return"
						}
						rules={[
							{
								required:
									form.getFieldValue("items")[row?.index]?.type === "Return"
										? false
										: true,
								message: "Required",
							},
						]}
					/>
				),
		},
		{
			header: "Return Reason",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) =>
				addProof ? (
					<span>{row?.original.returnReason}</span>
				) : (
					<TableEditableField
						field="input"
						placeholder="Enter Reason"
						defaultValue={row?.original.returnReason}
						name={`returnReason`}
						index={row?.index}
						isArray
					/>
				),
		},

		{
			header: "actions",
			accessorKey: "id",
			size: 5,
			enableColumnFilter: false,
			align: "center",
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell, row }) =>
				addProof ? (
					<TableActionButton
						onView={() =>
							setItemView({
								item: row?.original,
								show: true,
							})
						}
					/>
				) : (
					<TableActionButton
						onDelete={() => handleDelete(cell?.getValue())}
						onUpload={(e) =>
							// handleChange(cell?.getValue(), e.target.files, "images")
							handleChange(row, e.target.files)
						}
					/>
				),
		},
	];

	useEffect(() => {
		if (addProof) {
			window.scrollTo(0, document.body.scrollHeight);
		}
	}, [addProof]);
	console.log("testing", form.getFieldValue("items"));
	const handleSubmit = async (value) => {
		const formValues = form.getFieldValue("items");
		const finalItems = formValues?.map((i) => {
			const {
				description,
				itemCode,
				name,
				id,
				consumptionQty,
				quantity,
				...rest
			} = i;
			return {
				...rest,
				itemId: i.id,
				estimatedPrice: i.type === "Return" ? 0 : i.estimatedPrice,
				totalQuantity: i.quantity,
			};
		});
		console.log(finalItems, "finalItems");

		if (finalItems) {
			const payload = {
				fromDepartment: departmentId,
				items: finalItems,
				proofOfDisposal: uploadResponses,
			};
			const finalData = pathname?.includes("hod-review")
				? {
						...payload,
						status: isReject ? MIR_STATUS.REJECTED : MIR_STATUS.APPROVED,
				  }
				: payload;

			let response;

			if (id && pathname?.includes("hod-review")) {
				response = await updateIrrHodReview({ id, finalData });
			} else if (id) {
				response = await updateIrr({ id, finalData });
			} else {
				response = await createIrr({ finalData });
			}

			if (!response.error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", "Error creating/updating request");
			}
		}
	};
	// const onFinish = (values) => {
	// 	handleSubmit();
	// };

	const isQtyAvailableToReturn = (data) => {
		return data?.every((item) => {
			if (item?.returnQuantity === 0 && item?.cancel === 0) {
				return true;
			}
			return false;
		});
	};

	const handleOk = () => {
		form.validateFields().then(() => {
			setShowDialog({
				show: true,
				type: pathname?.includes("generate")
					? "Generate"
					: pathname?.includes("update")
					? "Update"
					: isReject
					? "Reject"
					: "Approve",
			});
		});
	};
	return irrLoading ? (
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
				onFinish={handleOk}
			>
				{contextHolder}
				{pathname?.includes("generate") && (
					<TitleSearchButton title="Create Inventory Return Request" />
				)}
				{pathname?.includes("hod-review") && (
					<GenericCard className="mb-5">
						<TitleSearchButton
							title="Review Inventory Return Request (HOD)"
							subTitle={`Generated by ${IRRdata?.fromDepartment?.name}`}
							id={IRRdata?.mrrCode}
						/>
					</GenericCard>
				)}

				{pathname?.includes("update") && !addProof && (
					<GenericCard className="mb-5">
						<TitleSearchButton
							title="Update Inventory Return Request"
							subTitle={`Generated by ${IRRdata?.fromDepartment?.name}`}
							id={IRRdata?.mrrCode}
						/>
					</GenericCard>
				)}

				{addProof && pathname?.includes("update") && (
					<GenericCard className="mb-5">
						<TitleSearchButton
							title="Add Disposal Proof"
							subTitle={`Generated by ${IRRdata?.fromDepartment?.name}`}
							id={IRRdata?.mrrCode}
						/>
					</GenericCard>
				)}

				<CardButtonFilterGroup
					title={{ text: "Return Items", level: 2 }}
					button={
						!addProof
							? {
									label: "Add Item",
									icon: <PlusOutlined />,
									onClick: () => setAddItemsModal(true),
							  }
							: undefined
					}
				>
					<GenericMuiTable
						columns={columns}
						data={form.getFieldValue("items") || []}
						simpleTable
						enableColumnFilters={false}
						maxHeight={"65vh"}
						// isLoading={irrLoading}
					/>
				</CardButtonFilterGroup>

				{/* <GenericCard className="my-10">
				<Form
					form={form}
					name="myForm"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					{generateFields(fieldsConfig, handleInputChange)}
				</Form>
			</GenericCard> */}
				{addProof && (
					<div className="mt-5">
						<TitleSearchButton
							title="Proof of Disposal"
							secondaryTitle
							btnLable="Upload Images"
							icon={<FaUpload />}
							onButtonChange={() => fileInputRef.current.click()}
						/>
						<input
							type="file"
							id="avatar"
							name="avatar"
							accept="image/png, image/jpeg, image/webp, image/gif"
							onChange={proofUpload}
							style={{ display: "none" }}
							className={"pointer-events-auto"}
							ref={fileInputRef}
							multiple
							// disabled={isLoading}
						/>
						<GenericCard>
							{imagePreviews?.length > 0 ? (
								<Row className="gap-2">
									{imagePreviews?.map((imageUrl, index) => (
										<Col
											key={index}
											span={4}
											className="inline-block p-8 bg-[#f1f1f1]"
										>
											<img
												src={imageUrl}
												alt="images-gird"
												className="images-grid"
											/>
										</Col>
									))}
								</Row>
							) : (
								<Empty />
							)}
						</GenericCard>
					</div>
				)}
				<div className="flex justify-between items-center mt-6">
					<GenericButton
						lable="Back"
						type="outline"
						onClick={() => navigate(-1)}
					/>

					{pathname?.includes("hod-review") ? (
						<div className="flex gap-2">
							<GenericButton
								type="primary"
								lable="Reject"
								isDanger={true}
								disabled={updateHodReviewLoading && isReject}
								loading={updateHodReviewLoading && isReject}
								htmlType="submit"
								onClick={() => setIsReject(true)}
							/>
							<GenericButton
								type="primary"
								lable="Approve"
								disabled={updateHodReviewLoading && !isReject}
								loading={updateHodReviewLoading && !isReject}
								htmlType="submit"
								onClick={() => setIsReject(false)}
							/>
						</div>
					) : (
						<GenericButton
							lable={
								PATH.MRR_GENERATE === pathname
									? "Generate Request"
									: "Update Request"
							}
							type="primary"
							// onClick={handleSubmit}
							htmlType="submit"
							disabled={
								createLoading ||
								updateLoading ||
								!form.getFieldValue("items") ||
								form.getFieldValue("items")?.length === 0
							}
							loading={createLoading || updateLoading}
						/>
					)}
				</div>
				<AddItem
					show={addItemsModal}
					closeModal={() => setAddItemsModal(false)}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					form={form}
					sirList={sirList}
				/>
				<AppConfirmDialog
					showModal={showDialog?.show}
					description={`Are you sure you want to ${showDialog?.type} this request?`}
					handleCancel={() => setShowDialog({ show: false, type: "" })}
					handleOk={handleSubmit}
				/>
				<AppConfirmDialog
					showModal={isReqCreated}
					title={
						<div className="text-center">
							{id
								? "Request Updated Successfully"
								: "Request Generated Successfully"}
						</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() =>
								pathname?.includes("hod-review")
									? navigate(PATH.MRR_HOD_REVIEW_LIST)
									: navigate(PATH.MRR_GENERATE_LIST)
							}
						/>
					}
				/>
				<ItemDetails
					show={itemView?.show}
					onHide={() => setItemView({ item: null, show: false })}
					onOk={() => setItemView({ item: null, show: false })}
					item={itemView?.item}
				/>
			</Form>
			{(createLoading || updateLoading) && <FullScreenLoader forRequest />}
		</>
	);
}
