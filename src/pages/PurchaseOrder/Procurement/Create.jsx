/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import GenericCard from "../../../components/GenericCard";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TableEditableField from "../../../components/TableEditableField";
import TableActionButton from "../../../components/TableActionButton";
import { AddItems } from "../../MIR/Shared/components/AddItems";
import GenericButton from "../../../components/GenericButton";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { PATH } from "../../../../config";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import CustomLabel from "../../../components/CustomLabel";
import IMAGES from "../../../assets/images";
import {
	useCreatePOMutation,
	useLazyGetPOItemsByIdQuery,
	useUpdatePOMutation,
} from "../../../redux/slices/purchaseOrder";
import useNotification from "../../../components/Notification";
import { useGetVendorsListQuery } from "../../../redux/slices/vendors";
import { useGetItemsQuery } from "../../../redux/slices/items";
import ItemDetails from "../../../components/ItemDetails";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function CreatePOProcurement() {
	const { id } = useParams();
	const { pathname } = useLocation();

	const [form] = Form.useForm();
	const [inputFields, setInputFields] = useState({});
	const [addItemModal, setAddItemModal] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [selectedRow, setSelectedRow] = useState([]);
	const [formReRender, setFormReRender] = useState(false);
	const [itemView, setItemView] = useState({
		item: null,
		show: false,
	});
	const { user } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;
	const { openNotification, contextHolder } = useNotification();
	const { data: itemsList = [] } = useGetItemsQuery();

	const [createPO, { isLoading: createLoading }] = useCreatePOMutation();
	const { data: vendorsList = [] } = useGetVendorsListQuery({
		tableOptions: {
			filters: {},
			pagination: {
				pageSize: 200,
				pageIndex: 0,
			},
		},
	});
	const [purchaseOrderByID, { data: purchaseOrderData, isLoading }] =
		useLazyGetPOItemsByIdQuery();
	const [updatePO, { isLoading: updateLoading }] = useUpdatePOMutation();

	const navigate = useNavigate();

	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Vendor Name",
			name: "vendor",
			rules: [{ required: true, message: "Please input this field!" }],
			options: vendorsList?.list?.map((vendor) => ({
				value: vendor?.id,
				label: vendor?.name,
			})),

			prefix: <img src={IMAGES.VENDORNAME} />,
			placeholder: "Select Vendor",
		},
		{
			type: "dropdown",
			label: "Currency",
			name: "currency",
			rules: [{ required: true, message: "Please input this field!" }],
			options: [
				{ value: "PKR", label: "PKR" },
				{ value: "USD", label: "USD" },
				{ value: "INR", label: "INR" },
			],
			prefix: <img src={IMAGES.CURRENCY} />,
			placeholder: "Select Currency",
		},

		{
			type: "input",
			label: "Payment Terms",
			//   defaultValue: "",
			name: "paymentTerms",
			//   rules: [{ required: true, message: "Please input this field!" }],
			prefix: <img src={IMAGES.PAYMENTTERMS} />,
			placeholder: "Enter Payment Terms",
		},
		{
			type: "input",
			label: "Delivery Terms",
			//   defaultValue: "",
			name: "deliveryTerms",
			//   rules: [{ required: true, message: "Please input this field!" }],
			prefix: <img src={IMAGES.DELIVERY} />,
			placeholder: "Enter Delivery Terms",
		},
		{
			type: "datetime",
			label: "Expected Delivery Date",
			name: "deliveryDate",
			// rules: [{ required: true, message: "Please input this field!" }],
			placeholder: "Select Delivery Date",
		},
		{
			type: "input",
			label: "Freight",
			name: "freight",
			//   rules: [{ required: true, message: "Please input this field!" }],
			prefix: <img src={IMAGES.FREIGHT} />,
			placeholder: "Enter Freight",
		},
		{
			type: "input",
			label: "Remarks",
			name: "remarks",
			rules: [{ required: true, message: "Please input this field!" }],
			prefix: <img src={IMAGES.REMAKRS} />,
			placeholder: "Enter Remarks",
		},
	];

	useEffect(() => {
		if (id) {
			purchaseOrderByID({ id });
		}
	}, [id]);

	useEffect(() => {
		debugger;
		if (!isLoading && purchaseOrderData) {
			form.setFieldValue("vendor", purchaseOrderData?.vendor?.id);
			form.setFieldValue("remarks", purchaseOrderData?.remarks);
			form.setFieldValue("freight", purchaseOrderData?.freight);
			form.setFieldValue("currency", purchaseOrderData?.currency);
			form.setFieldValue("paymentTerms", purchaseOrderData?.paymentTerms);
			form.setFieldValue("deliveryTerms", purchaseOrderData?.deliveryTerms);
			form.setFieldValue("deliveryDate", purchaseOrderData?.deliveryDate);

			const itemsValues = purchaseOrderData?.items?.map((item) => ({
				itemId: item.itemId,
				quantity: item.quantity,
				id: item.id,
				name: item.name,
				itemCode: item.itemCode,
				deliveryDate: dayjs(item?.deliveryDate?.split("T")[0], "YYYY-MM-DD"),
				federalTax: item?.federalTax,
				remarks: item?.remarks,
				salesTax: item?.salesTax,
				discount: item?.discount,
			}));

			form.setFieldValue("items", itemsValues);
			setFormReRender(!formReRender);
		}
	}, [purchaseOrderData, form, isLoading]);

	const generateFields = (fieldsConfig, handleInputChange) => {
		return (
			<FormFieldGroup
				fieldsConfig={fieldsConfig}
				handleInputChange={handleInputChange}
			/>
		);
	};

	const onFinish = async (values) => {
		debugger;
		const finalData = {
			remarks: values?.remarks,
			departmentId: departmentId,
			vendorId: values?.vendor,
			freight: values.freight,
			currency: values.currency,
			paymentTerms: values.paymentTerms,
			deliveryTerms: values.deliveryTerms,
			deliveryDate: values.deliveryDate,

			items: form.getFieldValue("items").map((item) => ({
				itemId: item?.id,
				quantity: item?.quantity,
				deliveryDate: item?.deliveryDate,
				federalTax: item?.federalTax,
				remarks: item?.remarks,
				salesTax: item?.salesTax,
				discount: item?.discount,
			})),
		};
		let response;
		if (id) {
			response = await updatePO({ id, finalData });
		} else {
			response = await createPO({ finalData });
		}

		if (!response.error) {
			setShowDialog(true);
		} else {
			openNotification("error", "Error performing action");
		}
	};

	const handleInputChange = (fieldName, value) => {
		setInputFields((prevInputFields) => ({
			...prevInputFields,
			[fieldName]: value,
		}));
	};

	const handleDeletItem = (id) => {
		debugger;
		const updatedItems = form
			.getFieldValue("items")
			?.filter((item) => item.id !== id);
		form.setFieldsValue({ items: updatedItems });
		setFormReRender(!formReRender);
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
		// {
		//   header: "UOM",
		//   accessorKey: "uom",
		// },
		{
			header: "PRICE",
			accessorKey: "price",
			Cell: () => <div className="">{(Math.random() * 100).toFixed(2)}</div>,
		},

		{
			header: "Qty",
			accessorKey: "quantity",
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					index={row.id}
					isArray={true}
					name="quantity"
					min={0}
				/>
			),
		},
		{
			header: "Sales Tax",
			accessorKey: "salesTax",
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					index={row.id}
					isArray={true}
					name="salesTax"
					defaultValue={0.0}
					min={0}
					prefix="%"
					rules={[{ required: false }]}
				/>
			),
		},
		{
			header: "Federal Tax",
			accessorKey: "federalTax",
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					index={row.id}
					isArray={true}
					name="federalTax"
					defaultValue={0.0}
					min={0}
					rules={[{ required: false }]}
				/>
			),
		},
		{
			header: "Discount",
			accessorKey: "discount",
			Cell: ({ row }) => (
				<TableEditableField
					field="number"
					index={row.id}
					isArray={true}
					name="discount"
					defaultValue={0.0}
					prefix="%"
					rules={[{ required: false }]}
				/>
			),
		},
		{
			header: "Total Price",
			accessorKey: "price",
			//   Cell: () => <TableEditableField field="number" defaultValue={0} />,
		},
		// {
		//   header: "Department",
		//   accessorKey: "department.name",
		// },
		{
			header: "DELIVERY DATE",
			accessorKey: "deliveryDate",
			Cell: ({ row }) => (
				<TableEditableField
					field="date"
					index={row.id}
					isArray={true}
					name="deliveryDate"
					// defaultValue={row?.original.deliveryDate}
				/>
			),
		},
		{
			header: "REMARKS",
			accessorKey: "remarks",
			Cell: ({ row }) => (
				<TableEditableField
					field="input"
					index={row.id}
					isArray={true}
					name="remarks"
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
					onView={() => {
						setItemView({
							item: row?.original,
							show: true,
						});
					}}
				/>
			),
		},
	];

	const data = itemsList?.list?.map((item) => {
		return {
			...item,
		};
	});

	return (
		<>
			{contextHolder}
			<Form
				form={form}
				key={formReRender}
				name="formPO"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<CustomLabel
					level={1}
					text={
						<>
							{pathname === PATH.PROCUREMENT_PURCHASE_ORDER_CREATE
								? "Create PO"
								: "Update PO"}
						</>
					}
					className={"mb-3"}
				/>
				<GenericCard className="mt-5">
					{generateFields(fieldsConfig, handleInputChange)}
				</GenericCard>
				<CardButtonFilterGroup
					topSpace
					title={{ text: "Items", level: 2 }}
					button={{
						label: "Add Item",
						icon: <PlusOutlined />,
						onClick: () => setAddItemModal(true),
					}}
					filterBtn={true}
				>
					{/* <div className="mt-5">
					<TitleSearchButton
						title="Items"
						btnLable="Add Item"
						secondaryTitle
						icon={<PlusOutlined />}
						filter
						onButtonChange={() => setAddItemModal(true)}
					/>
				</div> */}
					<GenericMuiTable
						columns={columns}
						data={form?.getFieldValue("items") || []}
						simpleTable
						enableColumnFilters={false}
					/>
				</CardButtonFilterGroup>

				<div className="footer-buttons">
					<GenericButton
						type="outline"
						lable="Back"
						onClick={() => navigate(PATH.PROCUREMENT_PURCHASE_ORDER_LIST)}
					/>

					<div className="flex gap-2">
						<GenericButton
							type="primary"
							lable={
								<div className="text-center">
									{pathname === PATH.PROCUREMENT_PURCHASE_ORDER_CREATE
										? "Generate PO"
										: "Update PO"}
								</div>
							}
							htmlType="submit"
						/>
					</div>
				</div>
				<AddItems
					form={form}
					show={addItemModal}
					data={data || []}
					setSelectedRow={setSelectedRow}
					selectedRow={selectedRow}
					onClose={() => setAddItemModal(false)}
				/>

				<AppConfirmDialog
					showModal={showDialog}
					description={
						<>
							{pathname === PATH.PROCUREMENT_PURCHASE_ORDER_CREATE
								? "Are you sure you want to Generate the request"
								: "Are you sure you want to Update the request"}
						</>
					}
					title={
						<div className="text-center">
							{pathname === PATH.PROCUREMENT_PURCHASE_ORDER_CREATE
								? "PO created successfully"
								: "PO updated successfully"}
						</div>
					}
					handleCancel={() => setShowDialog(false)}
					handleOk={() => {
						setShowDialog(false);
						navigate(PATH.PROCUREMENT_PURCHASE_ORDER_LIST);
					}}
				/>
				<ItemDetails
					show={itemView?.show}
					onHide={() => setItemView({ item: null, show: false })}
					onOk={() => setItemView({ item: null, show: false })}
					item={itemView?.item}
				/>
			</Form>
		</>
	);
}
