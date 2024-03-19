/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Form, Spin } from "antd";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TableActionButton from "../../../components/TableActionButton";
import GenericButton from "../../../components/GenericButton";
import { PATH } from "../../../../config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UploadWithText from "../../../components/UploadWithText";
import { AddItems } from "../Shared/components/AddItems";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import TableEditableField from "../../../components/TableEditableField";
import ChatBotSlider from "../../../components/ChatBotCarasoul";
import { useGetItemsQuery } from "../../../redux/slices/items";
import {
	useCreateItemRequestMutation,
	useGetPostedImageDescriptionMutation,
	useGetRelatedItemsMutation,
	useLazyGetItemRequestByIDQuery,
	useUpdateHodReviewRequestMutation,
	useUpdateItemRequestMutation,
} from "../../../redux/slices/IRF";
import useNotification from "../../../components/Notification";
import { useSelector } from "react-redux";
import ItemDetails from "../../../components/ItemDetails";
import FullScreenLoader from "../../../components/FullScreenLoader";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import CustomItems from "./CustomItems";
import { v4 as uuidv4 } from "uuid";
import { MIR_STATUS } from "../../../utils/constant";

export default function CreateUpdate() {
	const { id } = useParams();
	const [selectedRow, setSelectedRow] = useState([]);
	const [formReRender, setFormReRender] = useState(false);
	const [addCustomItem, setAddCustomItem] = useState({
		ai: false,
		custom: false,
	});
	const [aiItems, setAiItems] = useState(null);
	const [addItemModal, setAddItemModal] = useState(false);
	const [imgForDesc, setImgForDesc] = useState(null);
	const [showDialog, setShowDialog] = useState({ show: false, type: "" });
	const [isReqCreated, setIsReqCreated] = useState({ show: false, type: "" });
	const navigate = useNavigate();
	const location = useLocation();
	const customItems = location?.state?.customItems;
	const [form] = Form.useForm();
	Form.useWatch("customItems", form);
	const [itemView, setItemView] = useState({
		item: null,
		show: false,
	});
	const { openNotification, contextHolder } = useNotification();
	const { data: itemsList = {}, isLoading } = useGetItemsQuery();
	const [createFunction, { isLoading: createLoading }] =
		useCreateItemRequestMutation();
	const [updateFunction, { isLoading: updateLoading }] =
		useUpdateItemRequestMutation();
	const [updateHodFunction, { isLoading: updateHodLoading }] =
		useUpdateHodReviewRequestMutation();
	const [getItemRequestByID, { data: itemReqData, isLoading: itemReqLoading }] =
		useLazyGetItemRequestByIDQuery();
	const [
		postImageForDescription,
		{ data: imgDescription = null, isLoading: descLoading },
	] = useGetPostedImageDescriptionMutation();

	const [postDescription, { data: relatedItems, isLoading: itemLoading }] =
		useGetRelatedItemsMutation();

	useEffect(() => {
		if (imgDescription) {
			form.setFieldsValue({
				aiItems: imgDescription,
			});
		}
	}, [imgDescription]);
	const handleAskToAI = () => {
		if (imgDescription) {
			const finalData = {
				description: imgDescription,
			};
			postDescription(finalData);
		}
	};
	const handleAddAIitems = (id) => {
		const isItemAlreadySelected = form
			.getFieldValue("items")
			?.some((item) => item.id === id);
		if (!isItemAlreadySelected) {
			const clickedItem = relatedItems?.sources?.find((item) => item.id === id);
			const currentItems = form.getFieldValue("items");
			const updatedItems = [...currentItems, clickedItem];
			form && form?.setFieldsValue({ items: updatedItems });
			setFormReRender(!formReRender);
		}
		return;
	};

	useEffect(() => {
		if (customItems) {
			form?.setFieldsValue({ items: customItems });
			setFormReRender(!formReRender);
		}
	}, [customItems]);

	useEffect(() => {
		if (relatedItems) {
			const slideritems = relatedItems?.sources?.map((item) => {
				return {
					id: item?.id,
					code: item?.itemCode,
					desc: item?.description,
					name: item?.name,
				};
			});
			setAiItems(slideritems);
		}
	}, [relatedItems]);

	useEffect(() => {
		if (id) {
			getItemRequestByID({ id });
		}
	}, []);

	useEffect(() => {
		if (imgForDesc) {
			const getImageDescription = async () => {
				const formData = new FormData();
				formData.append("file", imgForDesc ? imgForDesc : "");

				await postImageForDescription({
					file: formData,
				});
			};
			getImageDescription();
		}
	}, [imgForDesc, postImageForDescription]);

	useEffect(() => {
		if (itemReqData && form) {
			const data = itemReqData?.items?.map((item) => {
				return {
					itemCode: item?.item?.itemCode,
					name: item?.item?.name,
					department: item?.item?.department,
					description: item?.item?.description,
					quantity: item?.quantity,
					id: item?.item?.id,
				};
			});
			form.setFieldValue("items", data);
			form.setFieldValue("demand", itemReqData?.demandType);
			form.setFieldValue("remarks", itemReqData?.remarks);
			form.setFieldValue(
				"date",
				`${itemReqData?.scheduledDate}T${itemReqData?.scheduledTime}`
			);
			itemReqData?.customItems?.forEach((item) => {
				const itemId = uuidv4();
				form?.setFieldValue(
					["customItems", itemId, "description"],
					item?.description
				);
				form?.setFieldValue(
					["customItems", itemId, "images"],
					item?.images?.map((i) => ({ file: i }))
				);
				form?.setFieldValue(["customItems", itemId, "id"], itemId);
			});

			itemReqData?.customItems?.length &&
				setAddCustomItem({ ...addCustomItem, custom: true });
			setFormReRender(!formReRender);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, itemReqData]);

	const handleDeletItem = (id) => {
		const updatedItems = form
			.getFieldValue("items")
			?.filter((item) => item.id !== id);
		form.setFieldsValue({ items: updatedItems });
		setFormReRender(!formReRender);
	};

	const generateFields = (fieldsConfig) => {
		return <FormFieldGroup fieldsConfig={fieldsConfig} />;
	};

	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const checkItemsSuggestion = (data) => {
		return (
			data &&
			Object?.values(data)?.every((item) => {
				if (!(item?.images && item?.description)) {
					return false;
				}
				return true;
			})
		);
	};

	const handleRequest = (value) => {
		setShowDialog({
			...showDialog,
			type: value,
		});
		form?.validateFields().then(() => {
			if (form.getFieldValue("items")?.length > 0) {
				setShowDialog({
					show: true,
					type: value,
				});
			} else if (
				Object?.values(form.getFieldValue("customItems"))?.length > 0
			) {
				if (
					checkItemsSuggestion(form && form.getFieldValue("customItems")) &&
					addCustomItem?.custom
				) {
					setShowDialog({
						show: true,
						type: value,
					});
				} else {
					openNotification("error", "One of the Item's suggestions is empty");
				}
			} else {
				openNotification("error", "No Item selected");
			}
		});
	};

	const onFinish = async () => {
		const { demand, remarks, date } = form?.getFieldsValue() || {};
		const finalItems = form?.getFieldValue("items")?.map((item) => {
			return {
				itemId: item?.id,
				quantity: item?.quantity,
			};
		});
		const payload = {
			fromDepartment: departmentId,
			demandType: demand,
			items: finalItems || [],
			remarks: remarks,
			isScheduled: date ? true : false,
			customItems: Object.values(form?.getFieldValue("customItems") || [])?.map(
				(item) => {
					return {
						description: item?.description,
						images: item?.images,
					};
				}
			),
		};
		const schedule = {
			scheduledDate: date,
			scheduledTime: date?.split("T")[1],
		};
		const final = date ? { ...payload, ...schedule } : payload;
		const finalData = isReview
			? {
					...final,
					status:
						showDialog?.type === "reject"
							? MIR_STATUS.REJECTED
							: MIR_STATUS.APPROVED,
			  }
			: final;
		if (id && isEdit) {
			const { error } = await updateFunction({ id, finalData });
			if (!error) {
				setIsReqCreated({ show: true, type: "Updated" });
			} else {
				openNotification("error", error?.message || "Error updating request");
			}
		} else if (id && isReview) {
			const { error } = await updateHodFunction({ id, finalData });
			if (!error) {
				setIsReqCreated({
					show: true,
					type:
						showDialog?.type === "reject"
							? "Rejected"
							: showDialog?.type === "approve"
							? "Approved"
							: "",
				});
			} else {
				openNotification(
					"error",
					error?.message || "Error approving/rejecting request"
				);
			}
		} else {
			const { error } = await createFunction({ finalData });
			if (!error) {
				setIsReqCreated({ show: true, type: "Created" });
			} else {
				openNotification("error", error?.message || "Error creating request");
			}
		}
		setShowDialog(false);
	};

	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Demand Type",
			name: "demand",
			rules: [{ required: true, message: "Demand Type is required!" }],
			options: [
				{ value: "Adhoc", label: "Adhoc" },
				{ value: "Recurrent", label: "Recurrent" },
			],
		},
		{
			type: "textarea",
			label: "Remarks",
			name: "remarks",
			rows: 3,
			// rules: [{ required: true, message: "Remarks are required!" }],
		},
		{
			type: "switch",
			label: "Do you want to schedule this request?",
			cols: 24,
			defaultOpen: itemReqData?.isScheduled,
			name: "schedule",
			childrenItems: [
				{
					type: "datetime",
					label: "Date & Time",
					name: "date",
					rules: [{ required: true, message: "Date & Time is required!" }],
				},
			],
		},
	];

	const columns = [
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 150,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 150,
		},
		{
			header: "Item Description",
			accessorKey: "description",
			size: 250,
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		// {
		// 	header: "Department",
		// 	accessorKey: "department.name",
		// 	size: 150,
		// 	Cell: ({ cell }) => <div>{cell?.getValue() || "BIO"}</div>,
		// },
		{
			header: "Requisition",
			accessorKey: "quantity",
			size: 150,
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="number"
					defaultValue={cell?.getValue()}
					index={row?.index}
					name="quantity"
					isArray={true}
				/>
			),
		},
		{
			header: "actions",
			accessorKey: "id",
			enableColumnFilter: false,
			align: "center",
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			Cell: ({ cell, row }) => (
				<TableActionButton
					onDelete={() => handleDeletItem(cell?.getValue())}
					onView={() =>
						setItemView({
							item: row?.original,
							show: true,
						})
					}
				/>
			),
		},
	];
	const isEdit = location?.pathname?.includes("update");
	const isReview = location?.pathname?.includes("review");

	return isLoading || itemReqLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<>
			{contextHolder}
			<Form
				form={form}
				key={formReRender}
				name="myForm"
				initialValues={{ remember: true }}
			>
				<TitleSearchButton
					title={`${
						isReview ? "Review" : isEdit ? "Update" : "Generate"
					} Inventory Requisition Form`}
				/>
				<CardButtonFilterGroup
					title={{ text: "Requested Items", level: 2 }}
					button={{
						label: "Add Item",
						icon: <PlusOutlined />,
						onClick: () => setAddItemModal(true),
					}}
				>
					<GenericMuiTable
						columns={columns}
						data={form.getFieldValue("items") ?? []}
						simpleTable
						enableColumnFilters={false}
						isLoading={isLoading || itemReqLoading}
					/>
				</CardButtonFilterGroup>

				{addCustomItem?.ai && (
					<div className="mt-5">
						<TitleSearchButton
							title="Ask AI for related items"
							secondaryTitle
						/>
						<UploadWithText
							isAI={true}
							setImgForDesc={setImgForDesc}
							isLoading={descLoading}
							placeholder={"Upload Image for AI Generated Description"}
							name={"aiItems"}
						/>
						<div className="items-slider">
							<div className="flex justify-end">
								<GenericButton
									type="primary"
									lable="Ask AI to Search"
									onClick={handleAskToAI}
									disabled={descLoading || itemLoading}
									loading={descLoading || itemLoading}
								/>
							</div>
							{aiItems && (
								<ChatBotSlider
									items={aiItems || []}
									number={5}
									onBtnClick={handleAddAIitems}
									isLoading={itemLoading}
								/>
							)}
						</div>
					</div>
				)}
				{!addCustomItem?.ai && (
					<div className="text-center mt-5">
						<GenericButton
							className="p-0"
							type="link"
							lable="Is there any item you are looking for that is not in the item list? Ask AI !"
							onClick={() => setAddCustomItem({ ...addCustomItem, ai: true })}
						/>
					</div>
				)}
				{!addCustomItem?.custom && (
					<div className="text-center mt-5">
						<GenericButton
							className="p-0"
							type="link"
							lable="Still not found your required Item? Ask Store !"
							onClick={() => {
								setAddCustomItem({ ...addCustomItem, custom: true });
								const newId = uuidv4();
								form?.setFieldValue(["customItems", newId, "id"], newId);
							}}
						/>
					</div>
				)}
				{addCustomItem?.custom && (
					<CustomItems
						form={form}
						setAddCustomItem={setAddCustomItem}
						addCustomItem={addCustomItem}
					/>
				)}

				<GenericCard className="mt-5">
					{generateFields(fieldsConfig)}
				</GenericCard>
				<div className="footer-buttons">
					<GenericButton
						type="outline"
						lable="Back"
						onClick={() => navigate(PATH.MIR_GENERATE_LIST)}
					/>

					<div className="flex gap-2">
						{isReview ? (
							<>
								<GenericButton
									type="primary"
									lable="Reject"
									isDanger={true}
									disabled={updateHodLoading}
									loading={updateHodLoading}
									onClick={() => handleRequest("reject")}
								/>
								<GenericButton
									type="primary"
									lable="Approve"
									disabled={updateHodLoading}
									loading={updateHodLoading}
									onClick={() => handleRequest("approve")}
								/>
							</>
						) : (
							<GenericButton
								type="primary"
								lable={isEdit ? "Update" : "Generate Request"}
								disabled={
									createLoading ||
									updateLoading ||
									(!form.getFieldValue("items") &&
										!form?.getFieldValue("customItems")) ||
									form.getFieldValue("items")?.length === 0
								}
								loading={createLoading || updateLoading}
								onClick={() => handleRequest(isEdit ? "update" : "generate")}
							/>
						)}
					</div>
				</div>
				<AppConfirmDialog
					showModal={showDialog?.show}
					description={`Are you sure you want to ${showDialog?.type} request?`}
					handleCancel={() => setShowDialog(false)}
					handleOk={onFinish}
				/>

				<AppConfirmDialog
					showModal={isReqCreated?.show}
					title={
						<div className="text-center">
							{`Request ${isReqCreated?.type} Successfuly`}
						</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() =>
								isReview
									? navigate(PATH.MIR_REVIEW_LIST)
									: navigate(PATH.MIR_GENERATE_LIST)
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
			<AddItems
				show={addItemModal}
				onClose={() => setAddItemModal(false)}
				data={itemsList?.list}
				setSelectedRow={setSelectedRow}
				selectedRow={selectedRow}
				form={form}
			/>
			{(createLoading || updateLoading || updateHodLoading) && (
				<FullScreenLoader forRequest />
			)}
		</>
	);
}
