import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, Form } from "antd";

import TitleSearchButton from "../../components/TitleSearchButton";
import GeneralInformation from "./components/GeneralInformation";
import BankingInformation from "./components/BankingInformation";
import GenericButton from "../../components/GenericButton";
import AddItems from "./components/AddItems";
import {
	useCreateVendorsMutation,
	useLazyGetVendorsByIDQuery,
	useUpdateVendorsMutation,
} from "../../redux/slices/vendors";
import useNotification from "../../components/Notification";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import { PATH } from "../../../config";
import FullScreenLoader from "../../components/FullScreenLoader";

const CreateUpdate = () => {
	const { id } = useParams();
	const { pathname } = useLocation();
	const [form] = Form.useForm();
	const [formReRender, setFormReRender] = useState(false);
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();

	const [createVendors, { isLoading: createLoading }] =
		useCreateVendorsMutation();
	const [updateVendors, { isLoading: updateLoading }] =
		useUpdateVendorsMutation();
	const [vendorsByID, { data: vendorsData, isLoading }] =
		useLazyGetVendorsByIDQuery();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			vendorsByID({ id });
		}
	}, []);

	useEffect(() => {
		if (vendorsData) {
			form.setFieldValue("name", vendorsData?.name);
			form.setFieldValue("companyType", vendorsData?.companyType);
			form.setFieldValue("email", vendorsData?.email);
			form.setFieldValue("mobile", vendorsData?.mobile);
			form.setFieldValue("creditDays", vendorsData?.creditDays);
			form.setFieldValue("deliveryDays", vendorsData?.deliveryDays);
			form.setFieldValue("vendorType", vendorsData?.vendorType);
			form.setFieldValue("country", vendorsData?.country?.id);
			form.setFieldValue("city", vendorsData?.city?.id);
			form.setFieldValue("province", vendorsData?.province?.id);

			form.setFieldValue("address", vendorsData?.address);
			form.setFieldValue("focalPerson", vendorsData?.focalPerson);
			form.setFieldValue("ntn", vendorsData?.ntn);
			form.setFieldValue("subAccount", vendorsData?.subAccount);
			form.setFieldValue("bankName", vendorsData?.bankName);

			form.setFieldValue("dealingCategory", vendorsData?.dealingCategory);
			form.setFieldValue("branchName", vendorsData?.branchName);
			form.setFieldValue("taxType", vendorsData?.taxType);
			form.setFieldValue("iban", vendorsData?.iban);
			form.setFieldValue("branchCode", vendorsData?.branchCode);
			form.setFieldValue("accountTitle", vendorsData?.accountTitle);

			form.setFieldValue("subAccount", vendorsData?.subAccount);
			form.setFieldValue("account", vendorsData?.account);
			form.setFieldValue("items", vendorsData?.items);
			setFormReRender(!formReRender);
		}
	}, [vendorsData, form]);

	const onFinish = async (values) => {
		const finalData = {
			...values,
			creditDays: values?.creditDays?.toString(),
			deliveryDays: values?.deliveryDays?.toString(),
			iban: values?.iban?.toString(),
			branchCode: values?.branchCode?.toString(),
			accountTitle: values?.accountTitle?.toString(),
			account: values?.account?.toString(),
			items: form.getFieldValue("items").map((item) => {
				return { itemId: item?.id || item?.itemId, price: item?.price };
			}),
		};
		let response;
		if (id) {
			response = await updateVendors({ id, finalData });
		} else {
			response = await createVendors({ finalData });
		}
		if (!response.error) {
			setIsReqCreated(true);
		} else {
			openNotification(
				"error",
				response?.error?.message || "Error performing action"
			);
		}
	};

	return (
		<>
			{contextHolder}
			<Form
				form={form}
				name="vendorsForm"
				onFinish={onFinish}
				key={formReRender}
			>
				<TitleSearchButton title="Vendor" />
				<div>
					<Collapse
						//   expandIcon={() => <FaChevronDown fill="#3E3F42" />}
						items={[
							{
								key: "1",
								label: "General Information",
								children: (
									<GeneralInformation
										vendorsData={vendorsData}
										loading={isLoading}
										form={form}
									/>
								),
							},
						]}
						defaultActiveKey={["1"]}
					/>
					<Collapse
						items={[
							{
								key: "2",
								label: "Banking Information",
								children: (
									<BankingInformation
										vendorsData={vendorsData}
										loading={isLoading}
									/>
								),
							},
						]}
						className="mt-5"
					/>
				</div>
				<AddItems form={form} />
				<div className="mt-5 flex justify-end">
					<GenericButton
						type="primary"
						lable={
							<div className="text-center">
								{pathname === PATH.VENDOR_CREATE
									? "Save Vendor"
									: "Update Vendor"}
							</div>
						}
						htmlType="submit"
						loading={createLoading || updateLoading}
						disabled={createLoading || updateLoading}
					/>
				</div>
				<AppConfirmDialog
					showModal={isReqCreated}
					title={
						<div className="text-center">
							{pathname === PATH.VENDOR_CREATE
								? "Vendor created successfully"
								: "Vendor updated successfully"}
						</div>
					}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() => navigate(PATH.VENDOR_LIST)}
						/>
					}
				/>
			</Form>
			{(createLoading || updateLoading) && <FullScreenLoader forRequest />}
		</>
	);
};

export default CreateUpdate;
