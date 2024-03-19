import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { PATH } from "../../../../config";
import {
	useGetProvincesQuery,
	useLazyGetAreasByCityQuery,
	useLazyGetCitiesByProvinceQuery,
	useLazyGetLocationByIdQuery,
	usePostLocationMutation,
	useUpdateLocationMutation,
} from "../../../redux/slices/location";
import useNotification from "../../../components/Notification";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { useEffect, useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import LOOKUPS from "../../../utils/lookups";

const CreateUpdate = () => {
	const { id } = useParams();

	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	Form.useWatch("province", form);
	const [isReqCreated, setIsReqCreated] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const { data: provinces = [] } = useGetProvincesQuery({ id: null });
	const [getCityByProvince, { data: cities, isLoading: citiesLoading }] =
		useLazyGetCitiesByProvinceQuery();
	const [getAreaByCity, { data: areas, isLoading: areasLoading }] =
		useLazyGetAreasByCityQuery();
	const [postLocation, { isLoading: postloading }] = usePostLocationMutation();
	const [updateLocation, { isLoading: updateloading }] =
		useUpdateLocationMutation();
	const [getLocationByID, { data: locData, isLoading: locLoading }] =
		useLazyGetLocationByIdQuery();

	useEffect(() => {
		if (id) {
			getLocationByID(id);
		}
	}, []);

	useEffect(() => {
		if (locData) {
			form.setFieldsValue({
				name: locData?.name,
				service: locData?.service,
				province: locData?.province?.id,
				city: locData?.city?.id,
				area: locData?.area?.id,
				address: locData?.address,
			});
			getCityByProvince({ id: locData?.province?.id });
			getAreaByCity({ id: locData?.city?.id });
		}
	}, [form, locData]);

	const handleProvince = async (value) => {
		form.setFieldsValue({
			city: null,
			area: null,
		});
		if (value !== null) {
			getCityByProvince({ id: value });
		}
	};
	const handleCity = async (value) => {
		form.setFieldsValue({
			area: null,
		});
		if (value !== null) {
			getAreaByCity({ id: value });
		}
	};
	const fieldsConfig = [
		{
			type: "input",
			label: "Name",
			placeholder: "Enter Name",
			name: "name",
			rules: [
				{ required: true, message: "Name is required", whitespace: true },
				{
					max: 100,
					message: "Your name must be 100 characters or less",
					whitespace: true,
				},
			],
			cols: 6,
		},
		{
			type: "dropdown",
			label: "Type",
			name: "service",
			rules: [{ required: true, message: "Type is required" }],
			options: LOOKUPS.SERVICE_TYPE,
			cols: 6,
		},
		{
			type: "dropdown",
			label: "Province",
			name: "province",
			rules: [{ required: true, message: "Province is required" }],
			options:
				provinces?.map((prov) => {
					return { value: prov?.id, label: prov?.name };
				}) || [],
			cols: 6,
			onChange: (value) => handleProvince(value),
		},
		{
			type: "dropdown",
			label: "City",
			name: "city",
			rules: [{ required: true, message: "City is required" }],
			options:
				cities?.map((city) => {
					return { value: city?.id, label: city?.name };
				}) || [],
			cols: 6,
			onChange: (value) => handleCity(value),
			disabled: citiesLoading,
		},
		{
			type: "dropdown",
			label: "Area",
			name: "area",
			rules: [{ required: true, message: "Area is required" }],
			options:
				(form?.getFieldValue("province") &&
					form?.getFieldValue("city") &&
					areas?.map((city) => {
						return { value: city?.id, label: city?.name };
					})) ||
				[],
			cols: 6,
			disabled: areasLoading,
		},
		{
			type: "input",
			label: "Address",
			placeholder: "Enter Address",
			name: "address",
			rules: [
				{ required: true, message: "Address is required", whitespace: true },
			],
			cols: 6,
		},
		// {
		// 	type: "input",
		// 	label: "Area",
		// 	name: "area",
		// 	placeholder: "Enter Area",
		// 	rules: [{ required: true, message: "Area is required" }],
		// 	cols: 6,
		// },
	];

	const onFinish = async (values) => {
		if (id) {
			const { error } = await updateLocation({ id, finalData: values });
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message || "Error updating location");
			}
		} else {
			const { error } = await postLocation(values);
			if (!error) {
				setIsReqCreated(true);
			} else {
				openNotification("error", error?.message || "Error creating location");
			}
		}
	};

	return (
		<div>
			{contextHolder}
			<TitleSearchButton
				title={
					PATH.ADMIN_LOCATION_CREATE === pathname
						? "Location Creation"
						: "Location Updation"
				}
			/>
			<Form
				name="locationForm"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
			>
				<GenericCard>
					<FormFieldGroup fieldsConfig={fieldsConfig} isLoading={locLoading} />
				</GenericCard>

				<Form.Item className="mt-5 flex justify-end">
					<div className="flex gap-3">
						<GenericButton
							type="secondary"
							lable="Cancel"
							onClick={() => navigate(PATH.ADMIN_LOCATION_LIST)}
						/>
						<GenericButton
							type="primary"
							htmlType="submit"
							lable={
								PATH.ADMIN_LOCATION_CREATE === pathname ? "Create" : "Update"
							}
							loading={postloading || updateloading}
							disabled={postloading || updateloading}
						/>
					</div>
				</Form.Item>
			</Form>
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">
						{id
							? "Location Updated Successfully"
							: "Location Created Successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.ADMIN_LOCATION_LIST)}
					/>
				}
			/>
			{(postloading || updateloading) && <FullScreenLoader forRequest />}
		</div>
	);
};
export default CreateUpdate;
