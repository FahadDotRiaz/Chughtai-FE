import { Row, Col } from "antd";
import DisciplineAnalysis from "./components/DisciplineAnalysis";
import TimeAnalysis from "./components/TimeAnalysis";
import DepartmentPerformance from "./components/DepartmentPerformance";

const Hr = () => {
	return (
		<div>
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<DisciplineAnalysis />
				</Col>
				<Col span={12}>
					<TimeAnalysis />
				</Col>
				<Col span={12}>
					<DepartmentPerformance />
				</Col>
			</Row>
		</div>
	);
};

export default Hr;
