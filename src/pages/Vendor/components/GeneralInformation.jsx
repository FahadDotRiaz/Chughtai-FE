/* eslint-disable react/prop-types */
import { Row, Col, Form } from "antd";
import PropTypes from "prop-types";

import FormFieldGroup from "../../../components/form/FormFieldGroup";
import LOOKUPS from "../../../utils/lookups";
import {
	useGetCountriesQuery,
	useLazyGetCitiesByProvinceQuery,
	useLazyGetProvincesQuery,
} from "../../../redux/slices/location";
import { useEffect } from "react";
import { VENDOR_TYPE } from "../../../utils/constant";

// eslint-disable-next-line react/prop-types
const GeneralInformation = ({ isView, vendorsData, form, loading }) => {
	const vendorType = Form.useWatch("vendorType", form);
	const { data: countries } = useGetCountriesQuery();
	const [getProvincesByCountry, { data: provinces = [] }] =
		useLazyGetProvincesQuery();
	const [getCityByProvince, { data: cities }] =
		useLazyGetCitiesByProvinceQuery();

	const handleCountry = async (value) => {
		form.setFieldsValue({
			city: null,
			province: null,
		});
		if (value !== null) {
			getProvincesByCountry({ id: value });
		}
	};
	const handleProvince = async (value) => {
		form.setFieldsValue({
			city: null,
		});
		if (value !== null) {
			getCityByProvince({ id: value });
		}
	};
	useEffect(() => {
		if (vendorsData) {
			getProvincesByCountry({ id: vendorsData?.country?.id });
			getCityByProvince({ id: vendorsData?.province?.id });
		}
	}, [vendorsData]);

	const fieldsConfig = [
		{
			type: "input",
			label: "Vendor Name",
			name: "name",
			rules: [{ required: true, message: "Name is required" }],
		},
		{
			type: "radio",
			label: "Vendor Type",
			name: "vendorType",
			options: LOOKUPS?.VENDOR_TYPE,
			value: vendorType,
			rules: [{ required: true, message: "Type is required" }],
			onChange: (e) => form.setFieldValue({ vendorType: e.target.value }),
		},
		{
			type: "input",
			label: "Email",
			name: "email",
			rules: [{ required: true, message: "Email is required", type: "email" }],
		},
		{
			type: "contact",
			label: "Mobile No.",
			name: "mobile",
			prefix: "+92",
			maxLength: 10,
			rules: [
				{
					required: true,
					message: "mobile no. is required",
				},
				{
					pattern: /^\d{10}$/,
					message: "add correct contact",
				},
			],
		},
		{
			type: "number",
			label: "Credit Days",
			name: "creditDays",
			rules: [{ required: true, message: "Credit Days are required" }],
			cols: 4,
		},
		{
			type: "number",
			label: "Delivery Days",
			name: "deliveryDays",
			rules: [{ required: true, message: "Delivery Days are required" }],
			cols: 4,
		},
		{
			type: "dropdown",
			label: "Country",
			name: "country",
			rules: [{ required: true, message: "country is required" }],
			options:
				countries?.map((country) => {
					return { value: country?.id, label: country?.name };
				}) || [],
			onChange: (value) => handleCountry(value),
		},
		{
			type: "dropdown",
			label: "Province",
			name: "province",
			rules: [{ required: true, message: "province is required" }],
			options:
				provinces?.map((prov) => {
					return { value: prov?.id, label: prov?.name };
				}) || [],
			onChange: (value) => handleProvince(value),
		},
		{
			type: "dropdown",
			label: "City",
			name: "city",
			rules: [{ required: true, message: "city is required" }],
			options:
				cities?.map((prov) => {
					return { value: prov?.id, label: prov?.name };
				}) || [],
		},
		{
			type: "input",
			label: "Address",
			name: "address",
			rules: [{ required: true, message: "address is required" }],
		},
		{
			type: "input",
			label: "Focal Person",
			name: "focalPerson",
			rules: [{ required: false, message: "FocalPerson is required" }],
		},
		{
			type: "dropdown",
			label: "Dealing Category",
			name: "category",
			rules: [{ required: false, message: "dealing category is required" }],
			options: [
				{ value: "Category A", label: "Category A" },
				{ value: "Category B", label: "Category B" },
			],
		},
	];

	const viewFields = [
		{
			label: "Vendor Name",
			value: vendorsData?.name ?? "N/A",
		},
		{
			label: "Vendor Type",
			value:
				vendorsData?.vendorType === VENDOR_TYPE.STORE
					? "Goods"
					: "Service" ?? "N/A",
		},
		{
			label: "Email",
			value: vendorsData?.email ?? "N/A",
		},
		{
			label: "Mobile",
			value: vendorsData?.mobile ?? "N/A",
		},
		{
			label: "Credit Days",
			value: vendorsData?.creditDays ?? "N/A",
		},
		{
			label: "Delivery Days",
			value: vendorsData?.deliveryDays ?? "N/A",
		},

		{
			label: "Country",
			value: vendorsData?.country?.name ?? "N/A",
		},
		{
			label: "City",
			value: vendorsData?.city?.name ?? "N/A",
		},
		{
			label: "Address",
			value: vendorsData?.address ?? "N/A",
		},
		{
			label: "Focal Person",
			value: vendorsData?.focalPerson ?? "N/A",
		},
		{
			label: "Dealing Category",
			value: vendorsData?.dealingCategory ?? "N/A",
		},
	];
	return (
		<div>
			{isView ? (
				<Row gutter={[16, 30]} className="p-6">
					{viewFields.map((item, index) => {
						return (
							<Col span={8} key={index}>
								<div>
									<label>{item.label}</label>
									<div className="name mt-3">{item.value}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			) : (
				<FormFieldGroup fieldsConfig={fieldsConfig} isLoading={loading} />
			)}
		</div>
	);
};

export default GeneralInformation;
GeneralInformation.propTypes = {
	vendorsData: PropTypes.object.isRequired,
};
