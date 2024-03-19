import { Stats } from "../Shared/stats";
import IncomeAndExpenses from "./components/IncomeAndExpenses";
import { Row, Col } from "antd";
import Statement from "./components/Statement";
import OperatingProfit from "./components/OperatingProfit";
import NetProfitOverTime from "./components/NetProfitOverTime";
import G_andAexpenses from "./components/G_andAexpenses";

const FinanceDashboard = () => {
	return (
		<div>
			<Stats />
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<IncomeAndExpenses />
				</Col>
				<Col span={12}>
					<Statement />
				</Col>
				<Col span={12}>
					<OperatingProfit />
				</Col>
				<Col span={12}>
					<NetProfitOverTime />
				</Col>
				<Col span={12}>
					<G_andAexpenses />
				</Col>
			</Row>
		</div>
	);
};

export default FinanceDashboard;
