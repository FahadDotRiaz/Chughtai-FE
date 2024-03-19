/* eslint-disable react/prop-types */
import { Row, Col } from "antd";
import GenericCard from "../../../components/GenericCard";
import { getFormattedDate } from "../../../utils/helper";

const ReviewFieldsCard = ({ data }) => {
	const fieldsConfig = [
		{
			label: "From",
			name: data?.fromDepartment?.name,
		},
		{
			label: "Date",
			name: getFormattedDate(data?.createDateTime),
		},
	];

	return (
		<GenericCard className="my-5">
			<Row gutter={[16, 30]}>
				{fieldsConfig.map((item, index) => {
					return (
						<Col span={6} key={index}>
							<div>
								<label>{item.label}</label>
								<div className="name mt-2">{item.name}</div>
							</div>
						</Col>
					);
				})}
			</Row>
		</GenericCard>
	);
};

export default ReviewFieldsCard;
