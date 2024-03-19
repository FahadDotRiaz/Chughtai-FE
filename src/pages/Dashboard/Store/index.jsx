/* eslint-disable no-unused-vars */
import { Row, Col } from "antd";
import NetProfitOverTime from "./components/NetProfitOverTime";
import ProfitLossAnalysis from "./components/ProfitLossAnalysis";
import DisciplineAnalysis from "./components/DisciplineAnalysis";
import ResourceSatisfactionAnalysis from "./components/ResourceSatisfactionAnalysis";
import EmployeeRetentionAnalysis from "./components/EmployeeRetentionAnalysis";
import DepartmentAnalysis from "./components/DepartmentAnalysis";
import { Stats } from "../Shared/stats";
import SINgeneratedAnalysis from "./components/SINgeneratedAnalysis";
import MirGraph from "./components/MirGraph";
import MRRgraph from "./components/MRRgraph";
import MirTracking from "./components/MirTracking";
import ExpiredItems from "./components/ExpiredItems";
import RateOfConsumption from "./components/RateOfConsumption";
import DemandAnalogy from "./components/DemandAnalogy";
import TimeTakenToRequest from "./components/TimeTakenToRequest";
import RateOfPO from "./components/RateOfPO";

const Store = () => {
	return (
		<div>
			{/* <Stats /> */}
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<SINgeneratedAnalysis />
				</Col>
				<Col span={12}>
					<MirGraph />
				</Col>
				<Col span={12}>
					<MRRgraph />
				</Col>
				<Col span={12}>
					<TimeTakenToRequest />
				</Col>
				<Col span={12}>
					<RateOfPO />
				</Col>
				{/* <Col span={12}>
					<ProfitLossAnalysis />
				</Col>
				<Col span={12}>
					<NetProfitOverTime />
				</Col>
				<Col span={12}>
					<EmployeeRetentionAnalysis />
				</Col>
				<Col span={12}>
					<DepartmentAnalysis />
				</Col>
				<Col span={12}>
					<ResourceSatisfactionAnalysis />
				</Col>
				<Col span={12}>
					<DisciplineAnalysis />
				</Col> */}
				{/* <Col span={12}>
					<MirTracking />
				</Col> */}
				<Col span={12}>
					<ExpiredItems />
				</Col>
				{/* <Col span={12}>
					<RateOfConsumption />
				</Col> */}
				{/* <Col span={12}>
          <DemandAnalogy />
        </Col> */}
			</Row>
		</div>
	);
};

export default Store;
