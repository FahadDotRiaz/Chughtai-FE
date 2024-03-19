import { Col, Row } from "antd";
import GenericCard from "../../../../components/GenericCard";
import PropTypes from "prop-types";
import { getFormattedDate } from "../../../../utils/helper";

export default function BasicDetails({ data }) {
	if (!data) return null;
	const { demandType, createDateTime, remarks } = data;

	const fieldsConfig = [
		{
			label: "Demand type",
			value: demandType,
		},
		{
			label: "Date",
			value: getFormattedDate(createDateTime),
		},
		{
			label: "Remarks",
			value: remarks || "N/A",
		},
	];

	return (
		<GenericCard>
			<Row gutter={[16, 30]}>
				{fieldsConfig.map((item, index) => {
					return (
						<Col span={6} key={index}>
							<div>
								<label>{item?.label}</label>
								<div className="name mt-2">{item?.value}</div>
							</div>
						</Col>
					);
				})}
			</Row>
		</GenericCard>
	);
}

BasicDetails.propTypes = {
	data: PropTypes.shape({
		demandType: PropTypes.string,
		from: PropTypes.string,
		createDateTime: PropTypes.string,
		remarks: PropTypes.string,
	}).isRequired,
};
