import DisciplineAnalysis from "./components/DisciplineAnalysis";
import RecruitmentFunnel from "./components/RecruitmentFunnel";
import Stats from "./components/Stats";
import { Row, Col } from "antd";
import OnBoardNewReleased from "./components/OnBoardNewReleased";
import { MdBusinessCenter, MdGroups } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import DepartmentWiseHiring from "./components/DepartmentWiseHiring";

const Recruitment = () => {
	const data = {
		applicationPipeline: [
			{
				icon: <MdBusinessCenter fill="#2e3790" size={45} />,
				lable: "Open Positions",
				count: 48,
			},
			{
				icon: <MdGroups fill="#2e3790" size={45} />,
				lable: "Applicants",
				count: 48,
			},
			{
				icon: <FaHandshake fill="#2e3790" size={45} />,
				lable: "Candidates Hired",
				count: 48,
			},
		],
		Onboarding: [
			{
				icon: <MdBusinessCenter fill="#2e3790" size={45} />,
				lable: "Outstanding Offers",
				count: 48,
			},
			{
				icon: <MdGroups fill="#2e3790" size={45} />,
				lable: "Currently Onboarded",
				count: 48,
			},
		],
	};
	return (
		<div>
			<Stats />
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<DisciplineAnalysis />
				</Col>
				<Col span={12}>
					<RecruitmentFunnel />
				</Col>
				<Col span={17}>
					<OnBoardNewReleased />
				</Col>
				<Col span={7}>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<div className="chart-card">
								<h3>Application Pipeline</h3>
								{data?.applicationPipeline?.map(
									({ icon, lable, count }, index) => {
										return (
											<StatInfoCard
												key={index}
												icon={icon}
												lable={lable}
												count={count}
											/>
										);
									}
								)}
							</div>
						</Col>
						<Col span={24}>
							<div className="chart-card">
								<h3>Onboarding</h3>
								{data?.Onboarding?.map(({ icon, lable, count }, index) => {
									return (
										<StatInfoCard
											key={index}
											icon={icon}
											lable={lable}
											count={count}
										/>
									);
								})}
							</div>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<DepartmentWiseHiring />
				</Col>
			</Row>
		</div>
	);
};

export default Recruitment;

// eslint-disable-next-line react/prop-types
const StatInfoCard = ({ icon, lable, count }) => {
	return (
		<div className="flex justify-between items-center py-3 border-b">
			<div className="flex items-center gap-2">
				{icon}
				<span className="text-lg mt-2">{lable}</span>
			</div>
			<div className="text-2xl font-medium">{count}</div>
		</div>
	);
};
