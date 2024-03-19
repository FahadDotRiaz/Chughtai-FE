/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Form } from "antd";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { PATH } from "../../../../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useGetLocationListQuery } from "../../../redux/slices/location";
import {
	useGetDepartmentListQuery,
	useLazyGetDepartmentByIdQuery,
	usePostDepartmentMutation,
	useUpdateDepartmentMutation,
} from "../../../redux/slices/department";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import { useEffect, useState } from "react";
import useNotification from "../../../components/Notification";
import FullScreenLoader from "../../../components/FullScreenLoader";

const CreateUpdate = () => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const type = Form.useWatch("type", form);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const { data: departments } = useGetDepartmentListQuery({
		tableOptions: {
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
	});
	const [postDepartment, { isLoading: postloading }] =
		usePostDepartmentMutation();
	const [updateDepartment, { isLoading: updateloading }] =
		useUpdateDepartmentMutation();
	const [
		getDepartmentByID,
		{ data: deptData, isLoading: deptLoading, isFetching: deptFetching },
	] = useLazyGetDepartmentByIdQuery();
	const { data: locations } = useGetLocationListQuery({
		tableOptions: {
			filters: {
				service: ["Store", "SubStore"],
			},
			pagination: {
				pageSize: 100,
				pageIndex: 0,
			},
		},
	});

	useEffect(() => {
		if (id) {
			getDepartmentByID(id);
		}
	}, []);

	useEffect(() => {
		if (id && deptData) {
			form.setFieldsValue({
				name: deptData?.name,
				location: deptData?.location?.id,
				managedBy: deptData?.managedBy?.id,
				type: deptData?.type,
			});
		}
	}, [deptData, form, id]);

	const handleTypeChange = (value) => {
		form.setFieldsValue({
			type: value,
			location: null,
		});
	};

	const fieldsConfig = [
		{
			type: "input",
			label: "Name",
			name: "name",
			rules: [{ required: true, message: "Name is required" }],
			cols: 6,
		},
		{
			type: "dropdown",
			label: "Type",
			cols: 6,
			name: "type",
			options: [
				{ label: "Store", value: "Store" },
				{ label: "SubStore", value: "SubStore" },
			],
			onChange: (value) => handleTypeChange(value),
		},
		{
			type: "dropdown",
			label: "Location",
			cols: 6,
			name: "location",
			// rules: [{ required: true, message: "Location is required" }],
			options:
				locations?.list
					?.filter((item) => item.service === type)
					?.map((loc) => {
						return {
							value: loc?.id,
							label: `${
								loc?.address
									? `${
											loc?.address?.length > 50
												? loc?.address?.substring(0, 35) + "..."
												: loc?.address
									  } - `
									: ""
							} ${loc?.area?.name} - ${loc?.city?.name} - ${
								loc?.province?.name
							}`,
						};
					}) || [],
		},
		type === "SubStore" && {
			type: "dropdown",
			label: "Managed by",
			cols: 6,
			name: "managedBy",
			rules: [{ required: true, message: "Location is required" }],
			options:
				departments?.list
					?.filter((item) => ["Store"].includes(item.type) && id !== item.id)
					?.map((loc) => {
						return { value: loc?.id, label: loc?.name };
					}) || [],
		},
	];

	const onFinish = async (values) => {
		if (id) {
			const { error } = await updateDepartment({ id, finalData: values });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message);
			}
		} else {
			const { error } = await postDepartment(values);
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
					pathname === PATH.ADMIN_STORE_CREATE
						? "Store Creation"
						: "Store Updation"
				}
			/>
			<Form
				name="departmentForm"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
				initialValues={{ type: "Store" }}
			>
				<GenericCard>
					<FormFieldGroup
						fieldsConfig={fieldsConfig}
						isLoading={deptLoading || deptFetching}
					/>
				</GenericCard>

				<Form.Item className="mt-5 flex justify-end">
					<div className="flex gap-3">
						<GenericButton
							type="secondary"
							lable="Cancel"
							onClick={() => navigate(PATH.ADMIN_STORE_LIST)}
						/>
						<GenericButton
							type="primary"
							lable={pathname === PATH.ADMIN_STORE_CREATE ? "Create" : "Update"}
							loading={postloading || updateloading}
							disabled={postloading || updateloading}
							htmlType={"submit"}
						/>
					</div>
				</Form.Item>
			</Form>
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">
						{id ? "Store Updated Successfully" : "Store Created Successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.ADMIN_STORE_LIST)}
					/>
				}
			/>
			{(postloading || updateloading) && <FullScreenLoader forRequest />}
		</div>
	);
};
export default CreateUpdate;
