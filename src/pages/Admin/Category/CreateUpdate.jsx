/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Form } from "antd";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { PATH } from "../../../../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useNotification from "../../../components/Notification";
import { useEffect, useState } from "react";
import {
	useLazyGetCategoryByIdQuery,
	usePostCategoryItemMutation,
	useUpdateCategoryItemMutation,
} from "../../../redux/slices/category";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import FullScreenLoader from "../../../components/FullScreenLoader";

const CreateUpdate = () => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const [createCategoryItem, { isLoading: postloading }] =
		usePostCategoryItemMutation();
	const [updateCategoryItem, { isLoading: updateloading }] =
		useUpdateCategoryItemMutation();
	const [
		getCategoryByID,
		{ data: categoryData, isLoading: declLoading, isFetching: declFetching },
	] = useLazyGetCategoryByIdQuery();
	const fieldsConfig = [
		{
			type: "input",
			label: "Name",
			name: "name",
			rules: [{ required: true, message: "Name is required" }],
			cols: 6,
		},
		{
			type: "input",
			label: "Description",
			name: "description",

			cols: 6,
			rules: [
				{ required: true, message: "Description is required" },
				{
					max: 100,
					message: "Value should be less than 100 character",
				},
			],
		},
	];

	useEffect(() => {
		if (id) {
			getCategoryByID(id);
		}
	}, []);
	useEffect(() => {
		if (id && categoryData) {
			form.setFieldsValue({
				name: categoryData?.name,
				description: categoryData?.description,
			});
		}
	}, [categoryData, form, id]);
	const onFinish = async (values) => {
		console.log("Received values:", values);
		const finalData = {
			description: values.description,
			name: values.name,
		};
		if (id) {
			const { error } = await updateCategoryItem({ id, finalData });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message);
			}
		} else {
			const { error } = await createCategoryItem(finalData);
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message);
			}
		}
	};

	return (
		<div>
			{contextHolder}
			<TitleSearchButton
				title={
					pathname === PATH.ADMIN_CATEGORY_CREATE
						? "Category Creation"
						: "Category Updation"
				}
			/>
			<Form
				name="categoryForm"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
				initialValues={{ remember: true }}
			>
				<GenericCard>
					<FormFieldGroup fieldsConfig={fieldsConfig} />
				</GenericCard>

				<Form.Item className="mt-5 flex justify-end">
					<div className="flex gap-3">
						<GenericButton
							type="secondary"
							lable="Cancel"
							onClick={() => navigate(PATH.ADMIN_CATEGORY_LIST)}
						/>
						<GenericButton
							type="primary"
							lable={
								pathname === PATH.ADMIN_CATEGORY_CREATE ? "Create" : "Update"
							}
							htmlType={"submit"}
						/>
					</div>
				</Form.Item>
			</Form>
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">
						{pathname === PATH.ADMIN_CATEGORY_CREATE
							? "Category created successfully"
							: "Category updated successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.ADMIN_CATEGORY_LIST)}
					/>
				}
			/>
			{(postloading || updateloading) && <FullScreenLoader forRequest />}
		</div>
	);
};
export default CreateUpdate;
