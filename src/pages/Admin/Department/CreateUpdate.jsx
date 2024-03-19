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
				service: ["StateLab", "CollectionCenter"],
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

	const fieldsConfig = [
		{
			type: "input",
			label: "Name",
			name: "name",
			rules: [
				{ required: true, message: "Name is required", whitespace: true },
			],
		},
		{
			type: "dropdown",
			label: "Location",
			name: "location",
			// rules: [{ required: true, message: "Location is required" }],
			options:
				locations?.list?.map((loc) => {
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
						} ${loc?.area?.name} - ${loc?.city?.name} - ${loc?.province?.name}`,
					};
				}) || [],
		},
		{
			type: "dropdown",
			label: "Managed by store",
			name: "managedBy",
			rules: [{ required: true, message: "Location is required" }],
			options:
				departments?.list
					?.filter((item) => ["Store", "SubStore"].includes(item.type))
					?.map((loc) => {
						return { value: loc?.id, label: loc?.name };
					}) || [],
		},
	];

	const onFinish = async (values) => {
		const finalData = { ...values, type: "Others" };

		if (id) {
			const { error } = await updateDepartment({ id, finalData });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message || "Error updating request");
			}
		} else {
			const { error } = await postDepartment(finalData);
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message || "Error creating request");
			}
		}
	};

	return (
		<div>
			{contextHolder}
			<TitleSearchButton
				title={
					pathname === PATH.ADMIN_DEPARTMENT_CREATE
						? "Department Creation"
						: "Department Updation"
				}
			/>
			<Form
				name="departmentForm"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
				// initialValues={initialValues}
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
							onClick={() => navigate(PATH.ADMIN_DEPARTMENT_LIST)}
						/>
						<GenericButton
							type="primary"
							lable={
								pathname === PATH.ADMIN_DEPARTMENT_CREATE ? "Create" : "Update"
							}
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
						{id
							? "Department Updated Successfully"
							: "Department Created Successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.ADMIN_DEPARTMENT_LIST)}
					/>
				}
			/>
			{(postloading || updateloading) && <FullScreenLoader forRequest />}
		</div>
	);
};
export default CreateUpdate;
