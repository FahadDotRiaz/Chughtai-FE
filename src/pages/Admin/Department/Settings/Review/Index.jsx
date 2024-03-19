/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { Col, Form, Row, Switch } from "antd";
import TitleSearchButton from "../../../../../components/TitleSearchButton";
import GenericButton from "../../../../../components/GenericButton";
import { useSelector } from "react-redux";
import {
	useDepartmentApprovalMutation,
	useLazyGetDepartmentByIdQuery,
} from "../../../../../redux/slices/department";
import { useEffect, useState } from "react";
import useNotification from "antd/es/notification/useNotification";
import AppConfirmDialog from "../../../../../components/AppConfirmDialog";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../../../config";
import FullScreenLoader from "../../../../../components/FullScreenLoader";
import {
	ACTION_KEYS,
	DEPARTMENT_TYPE,
	MAKEYS,
} from "../../../../../utils/constant";

const Index = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const { user, permissions } = useSelector((state) => state.auth);
	const departmentId = user?.activeRole?.departmentId;

	const [getDepartmentByID, { data: deptData }] =
		useLazyGetDepartmentByIdQuery();
	const [departmentApprovalData, { isLoading }] =
		useDepartmentApprovalMutation();

	useEffect(() => {
		if (departmentId) {
			getDepartmentByID(departmentId);
		}
	}, []);

	useEffect(() => {
		if (deptData) {
			form.setFieldsValue({
				mirApproval: deptData?.mirApproval,
				mrrApproval: deptData?.mrrApproval,
				grnApproval: deptData?.grnApproval,
			});
		}
	}, [deptData]);

	const hasPermission = (action) => {
		if (
			user?.activeRole?.departmentType ===
			(DEPARTMENT_TYPE.STORE || DEPARTMENT_TYPE.SUBSTORE)
		) {
			return permissions?.[MAKEYS.STORE_SETTING_REVIEW]?.[action];
		} else if (user?.activeRole?.departmentType === DEPARTMENT_TYPE.OTHERS) {
			return permissions?.[MAKEYS.DEPARTMENT_SETTING_REVIEW]?.[action];
		}
	};

	const data = [
		{
			review: "Item Requisition Form Approval",
			name: "mirApproval",
			disabled: !hasPermission(ACTION_KEYS.IRF),
		},
		{
			review: "Item Return Request Approval",
			name: "mrrApproval",
			disabled: !hasPermission(ACTION_KEYS.IRR),
		},
		{
			review: "Goods Return Request Approval",
			name: "grnApproval",
			disabled: !hasPermission(ACTION_KEYS.GRN),
		},
	];

	const onFinish = async (finalData) => {
		let response = await departmentApprovalData({ departmentId, finalData });

		if (!response.error) {
			setIsReqCreated(true);
		} else {
			openNotification("error", "Error performing action");
		}
	};
	return (
		<div>
			{contextHolder}
			<Form form={form} name="myForm" onFinish={onFinish}>
				<TitleSearchButton title={"Manage Reviews"} />
				<div className="mt-5">
					<Row>
						<Col span={18} className="border p-4 font-semibold">
							Reviews
						</Col>
						<Col span={6} className="border p-4 font-semibold text-center">
							Status
						</Col>
					</Row>
					{data?.map((rev, index) => (
						<Row key={index}>
							<Col
								span={18}
								className="border border-t-0 p-2 flex items-center cursor-pointer"
								// onClick={() => toggleExpand(item.key)}
							>
								<span className="ml-2">{rev?.review}</span>
							</Col>
							<Col span={6} className="border border-t-0 p-2 text-center">
								<div className="schedule-switch">
									{deptData && (
										<Form.Item
											name={rev?.name}
											labelAlign="top"
											className="Input-Field"
											labelCol={{ span: 24 }}
											wrapperCol={{ span: 24 }}
											colon={false}
											vertical
										>
											<Switch
												defaultChecked={deptData?.[rev?.name]}
												disabled={rev?.disabled}
											/>
										</Form.Item>
									)}
								</div>
							</Col>
						</Row>
					))}
				</div>
				<Form.Item className="mt-5 flex justify-end">
					<div className="flex gap-3">
						<GenericButton
							type="secondary"
							lable="Cancel"
							onClick={() => navigate(-1)}
						/>
						<GenericButton
							type="primary"
							lable={"Save"}
							loading={isLoading}
							disabled={isLoading}
							htmlType={"submit"}
						/>
					</div>
				</Form.Item>

				<AppConfirmDialog
					showModal={isReqCreated}
					title={
						<div className="text-center">Reviews updated successfully</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() => setIsReqCreated(false)}
						/>
					}
				/>
				{isLoading && <FullScreenLoader forRequest />}
			</Form>
		</div>
	);
};

export default Index;
