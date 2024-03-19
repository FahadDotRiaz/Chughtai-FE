import { Row, Col } from "antd";
import ExpiryItemsGraph from "./components/ExpiryItemsGraph";
import DemandForecasting from "./components/DemandForecasting";

const Rm = () => {
	return (
		<div>
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<ExpiryItemsGraph />
				</Col>
				<Col span={12}>
					<DemandForecasting />
				</Col>
			</Row>
		</div>
	);
};

export default Rm;
