import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import GenericButton from "../../../components/GenericButton";
import { Space, Row, Col, Form } from "antd";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PATH } from "../../../../config";
import DropdownField from "../../../components/form/DropdownField";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGetDepartmentListQuery } from "../../../redux/slices/department";
import { useLazyGetRolesByDepartmentQuery } from "../../../redux/slices/role";
import {
	useLazyGetUserByIdQuery,
	usePostUserMutation,
	useUpdateUserMutation,
} from "../../../redux/slices/users";
import useNotification from "../../../components/Notification";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { useEffect } from "react";

const CreateUpdate = () => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [selectedItem, setSelectedItem] = useState({});
	const [selectedValues, setSelectedValues] = useState([]);
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
	const [getRoleList, { data: roles }] = useLazyGetRolesByDepartmentQuery();
	const [postUser, { isLoading: postLoading }] = usePostUserMutation();
	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
	const [
		getUserByID,
		{ data: userData, isLoading: getByIdLoading, isFetching: getByIdFetching },
	] = useLazyGetUserByIdQuery();

	useEffect(() => {
		if (id) {
			getUserByID(id);
		}
	}, []);
	useEffect(() => {
		if (userData) {
			form.setFieldsValue({
				username: userData?.username,
				email: userData?.email,
				// password: userData?.password,
				contact: userData?.contact?.split("+92")?.[1],
				cnic: userData?.cnic,
			});
			const roleDept = userData?.roles?.map((item) => {
				return {
					id: item?.id,
					dept: {
						children: item?.department?.name,
						value: item?.department?.id,
					},
					role: { children: item?.name, value: item?.id },
				};
			});
			setSelectedValues(roleDept);
		}
	}, [form, userData]);

	const handleDropdownChange = (name, option) => {
		if (name === "dept" && option) {
			getRoleList({
				tableOptions: {
					pagination: {
						pageSize: 100,
						pageIndex: 0,
					},
				},
				departmentId: option?.value,
			});
		}
		setSelectedItem((prevState) => ({
			...prevState,
			[name]: option,
		}));
	};
	const handleAddButtonClick = () => {
		const exists = selectedValues?.some(
			(value) => value?.role?.key === selectedItem?.role?.key
		);

		if (!exists) {
			const newSelectedValues = [
				...selectedValues,
				{ id: selectedValues.length + 1, ...selectedItem },
			];
			setSelectedValues(newSelectedValues);
			setSelectedItem({});
		} else {
			openNotification("error", "Role already added");
		}
	};

	const handleDelete = (id) => {
		const updatedValues = selectedValues.filter((item) => item.id !== id);
		setSelectedValues(updatedValues);
	};

	const fieldsConfig = [
		{
			type: "input",
			label: "Name",
			name: "username",
			rules: [{ required: true, message: "Name is required" }],
		},
		{
			type: "input",
			label: "Email",
			name: "email",
			disabled: id ? true : false,
			rules: [
				{ required: true, message: "Email is required" },
				{ message: "Email is not valid", type: "email" },
			],
		},
		{
			type: "password",
			label: "Password",
			name: "password",
			rules: [{ required: id ? false : true, message: "Password is required" }],
			defaultValue: id ? "***********" : "",
			disabled: id ? true : false,
		},
		{
			type: "contact",
			label: "Contact",
			name: "contact",
			prefix: "+92",
			maxLength: 10,
			rules: [
				{
					required: true,
					message: "Contact is required",
					whitespace: true,
				},
				{
					pattern: /^\d{10}$/,
					message: "Enter valid contact",
				},
			],
		},
		{
			type: "input",
			label: "CNIC",
			name: "cnic",
			maxLength: 13,
			rules: [
				{ required: true, message: "Cnic is required", whitespace: true },
				{
					pattern: /^\d{13}$/,
					message: "Enter valid cnic",
					whitespace: true,
				},
			],
		},
		// {
		// 	type: "file",
		// 	label: "Upload File",
		// 	name: "file",
		// },
	];

	const onFinish = async (values) => {
		let finalData = {
			...values,
			roles: selectedValues?.map((item) => item?.role?.value),
			contact: `+92${values.contact}`,
		};
		// eslint-disable-next-line no-unused-vars
		const { password, ...rest } = finalData;

		if (id) {
			const { error } = await updateUser({ id, finalData: rest });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", "Error updating user");
			}
		} else {
			const { error } = await postUser(finalData);
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message || "Error creating user");
			}
		}
	};
	return (
		<>
			{contextHolder}
			<Form
				name="departmentForm"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
			>
				<TitleSearchButton
					title={
						PATH.ADMIN_USER_CREATE === pathname
							? "User Creation"
							: "User Updation"
					}
				/>
				<GenericCard>
					<FormFieldGroup
						fieldsConfig={fieldsConfig}
						isLoading={getByIdLoading || getByIdFetching}
					/>
					<div
						className={`text-[#3E3F42] font-semibold text-[1.25rem] mt-5 mb-3`}
					>
						Assign Department
					</div>
					<Row className="gap-8">
						<Col span={6}>
							<DropdownField
								options={departments?.list?.map((dep) => {
									return {
										value: dep?.id,
										label: dep?.name,
									};
								})}
								// name="Department"
								placeholder={"Department"}
								rules={[{ required: true, message: "Name is required" }]}
								value={selectedItem?.dept?.value}
								onChange={(_, options) => handleDropdownChange("dept", options)}
							/>
						</Col>
						<Col span={6}>
							<DropdownField
								options={roles?.list?.map((role) => {
									return {
										value: role?.id,
										label: role?.name,
									};
								})}
								// name="role"
								disabled={!selectedItem?.dept?.value}
								value={selectedItem?.role?.value}
								rules={[{ required: true, message: "Name is required" }]}
								placeholder={"Role"}
								onChange={(_, options) => handleDropdownChange("role", options)}
							/>
						</Col>
						<Col span={6}>
							<GenericButton
								lable="Add"
								type="primary"
								onClick={handleAddButtonClick}
								className="mt-[3px]"
								disabled={!selectedItem.dept || !selectedItem.role}
							/>
						</Col>
					</Row>
					{selectedValues?.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center bg-[#F9F9F9] py-2 px-4 mb-2"
						>
							<span className="text-[#3E3F42] text-[1.25rem] mb-2">
								{item?.dept?.children} - {item?.role?.children}
							</span>
							<div
								className="cursor-pointer bg-[#2E3790] p-2 rounded"
								onClick={() => handleDelete(item?.id)}
							>
								<AiOutlineClose fill="white" />
							</div>
						</div>
					))}
				</GenericCard>
				<Space className="flex justify-end mt-5">
					<GenericButton
						type="secondary"
						lable="Cancel"
						onClick={() => navigate(PATH.ADMIN_USER_LIST)}
					/>
					<GenericButton
						type="primary"
						lable={PATH.ADMIN_USER_CREATE === pathname ? "Create" : "Update"}
						// onClick={() => navigate(PATH.ADMIN_USER_LIST)}
						htmlType={"submit"}
						loading={postLoading || updateLoading}
						disabled={postLoading || updateLoading}
					/>
				</Space>
			</Form>
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">
						{id ? "User Updated Successfully" : "User Created Successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.ADMIN_USER_LIST)}
					/>
				}
			/>
			{(postLoading || updateLoading) && <FullScreenLoader forRequest />}
		</>
	);
};

export default CreateUpdate;
