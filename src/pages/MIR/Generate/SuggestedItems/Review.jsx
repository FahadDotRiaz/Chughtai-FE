import { Form, Space, Spin } from "antd";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import { useEffect, useState } from "react";
import SuggestedItemsCard from "../../Shared/components/SuggestedItemsCard";
import GenericButton from "../../../../components/GenericButton";
import { PATH } from "../../../../../config";
import { useNavigate, useParams } from "react-router-dom";
import AppConfirmDialog from "../../../../components/AppConfirmDialog";
import {
	useLazyGetItemRequestByIDQuery,
	useUpdateItemRequestMutation,
} from "../../../../redux/slices/IRF";
import useNotification from "../../../../components/Notification";
import { CUSTOM_ITEM_STATUS } from "../../../../utils/constant";

const Review = () => {
	const [form] = Form.useForm();
	const { id } = useParams();
	// Form.useWatch("customItems", form);
	const [formReRender, setFormReRender] = useState(false);
	const [btnDisable, setBtnDisable] = useState(true);
	const navigate = useNavigate();
	const [isReqCreated, setIsReqCreated] = useState({
		show: false,
		message: "",
	});
	const [showDialog, setShowDialog] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const [getItemRequestByID, { data: IRFdata, isLoading, isFetching }] =
		useLazyGetItemRequestByIDQuery();
	const [updateFunction, { isLoading: updateLoading }] =
		useUpdateItemRequestMutation();

	useEffect(() => {
		if (id) {
			getItemRequestByID({ id });
		}
	}, []);

	useEffect(() => {
		if (IRFdata) {
			IRFdata?.customItems?.map((item, index) => {
				form?.setFieldValue(
					["customItems", index, "description"],
					item?.description
				);
				form?.setFieldValue(
					["customItems", index, "images"],
					item?.images?.map((i) => ({ file: i }))
				);
				form?.setFieldValue(
					["customItems", index, "suggestedItems"],
					item?.suggestedItems
				);
			});

			setFormReRender(!formReRender);
		}
	}, [IRFdata]);

	const handleRequest = async (type) => {
		const customItems = Object.values(
			form?.getFieldValue("customItems") || []
		).map((item) => {
			const filteredItem = {
				description: item?.description,
				images: item?.images,
				status: type === "Generate" ? item?.status : CUSTOM_ITEM_STATUS.REJECT,
				remarks: item?.remarks,
				suggestedItems: item?.suggestedItems?.map((item) => {
					return item?.id;
				}),
			};

			if (item?.acceptedItemId !== undefined) {
				filteredItem.acceptedItemId = item.acceptedItemId;
			}

			return filteredItem;
		});

		const payload = {
			fromDepartment: IRFdata?.fromDepartment?.id,
			demandType: IRFdata?.demandType,
			items: IRFdata?.items?.map((item) => {
				return {
					quantity: item?.quantity,
					approvedQuantity: item?.approvedQuantity,
					itemId: item?.item?.id,
				};
			}),
			customItems: customItems,
			remarks: IRFdata?.remarks ? IRFdata?.remarks : "",
		};

		const schedule = {
			isScheduled: true,
			scheduledDate: IRFdata?.scheduledDate,
			scheduledTime: IRFdata?.scheduledTime,
		};
		const finalData = IRFdata?.scheduledDate
			? { ...payload, ...schedule }
			: payload;
		type === "reject" && setShowDialog(false);
		if (id) {
			const { error } = await updateFunction({ id, finalData });
			if (!error) {
				setIsReqCreated({
					show: true,
					message:
						type === "reject"
							? "Items Rejected Successfully"
							: "Items Accepted Successfully",
				});
			} else {
				openNotification("error", "Error updating request");
			}
		}
	};

	const removeDuplicatesByKey = (array, key) => {
		return array?.reduce((uniqueArray, currentItem) => {
			const existingItem = uniqueArray?.find(
				(item) => item[key] === currentItem[key]
			);
			if (!existingItem) {
				uniqueArray.push(currentItem);
			}
			return uniqueArray;
		}, []);
	};

	const handleOk = () => {
		const customItems = Object.values(form?.getFieldValue("customItems") || [])
			.filter((item) => item?.approvedItem)
			?.map((item) => {
				return item?.approvedItem;
			});

		const uniqueArray = removeDuplicatesByKey(customItems, "id");
		navigate(PATH.MIR_GENERATE, {
			state: { customItems: uniqueArray },
		});
	};

	return isFetching || isLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<>
			{contextHolder}
			<Form form={form} name="myForm" initialValues={{ remember: true }}>
				<TitleSearchButton title="Suggested Items" />

				<div className="mt-5">
					{IRFdata?.customItems?.map((item, index) => {
						return (
							<SuggestedItemsCard
								key={index}
								form={form}
								id={index}
								setBtnDisable={setBtnDisable}
							/>
						);
					})}
				</div>
				<div className="flex justify-between gap-3">
					<GenericButton
						type="outline"
						lable="Back"
						onClick={() => navigate(-1)}
					/>

					<Space>
						<GenericButton
							type="primary"
							lable="Reject All"
							isDanger={true}
							onClick={() => setShowDialog(true)}
						/>
						<GenericButton
							type="primary"
							lable="Generate Request"
							disabled={btnDisable || updateLoading}
							loading={updateLoading}
							onClick={() => handleRequest("Generate")}
						/>
					</Space>
				</div>
				<AppConfirmDialog
					showModal={showDialog}
					description={`Are you sure you want to reject all ?`}
					handleCancel={() => setShowDialog(false)}
					handleOk={() => handleRequest("reject")}
				/>
				<AppConfirmDialog
					showModal={isReqCreated?.show}
					title={<div className="text-center">{isReqCreated?.message}</div>}
					footer={
						<GenericButton type="primary" lable="OK" onClick={handleOk} />
					}
				/>
			</Form>
		</>
	);
};

export default Review;

export const fieldsConfig = [
	{
		type: "dropdown",
		label: "From Store",
		name: "fromStore",
		rules: [{ required: true, message: "Please select this field!" }],
		options: [
			{ value: "usa", label: "USA" },
			{ value: "canada", label: "Canada" },
			{ value: "uk", label: "UK" },
		],
	},
	{
		type: "input",
		label: "To Store",
		name: "toStore",
		rules: [{ required: true, message: "Please input this field!" }],
	},
	{
		type: "input",
		label: "Generated by",
		name: "reqEmpl",
		rules: [{ required: true, message: "Please input this field!" }],
	},
	{
		type: "input",
		label: "Date",
		name: "date",
		rules: [{ required: true, message: "Please input this field!" }],
	},
	{
		type: "input",
		label: "Remarks",
		name: "remarks",
		rules: [{ required: true, message: "Please input this field!" }],
	},
	{
		type: "dropdown",
		label: "Demand type",
		name: "demandtype",
		rules: [{ required: true, message: "Please input this field!" }],
	},
];
