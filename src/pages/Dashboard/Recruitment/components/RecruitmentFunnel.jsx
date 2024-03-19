import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import { Row, Col } from "antd";
import Funnel from "highcharts/modules/funnel.js";
Funnel(Highcharts);

const RecruitmentFunnel = () => {
	const funnel_Chart = {
		colors: ["#5E81F4", "#E54545", "#F0D15F", "#00D179"],
		chart: {
			type: "funnel",
			height: "200",
		},
		title: {
			text: null,
		},
		// legend: false,
		plotOptions: {
			series: {
				dataLabels: {
					enabled: false,
					format: "<b>{point.name}</b> ({point.y:,.0f})",
					softConnector: true,
				},
				center: ["50%", "50%"],
				neckWidth: "10%",
				neckHeight: "5%",
				width: "90%",
				height: (9 / 16) * 180 + "%",
			},
		},

		legend: {
			enabled: false,
		},
		series: [
			{
				name: "Undertime",
				data: [40, 70, 80, 20],
			},
			{
				name: "Late",
				data: [70, 20, 40, 10],
			},
			{
				name: "Present",
				data: [40, 70, 60, 40],
			},
			// {
			//   name: "Presents",
			//   data: [10, 30,60,40 ],
			// },
		],
		// series: [
		//   {
		//     name: "Recruitment",
		//     data: [
		//       [5],
		//       [4],
		//       [ 3],
		//       ["Hired", 2],
		//     ],
		//   },
		// ],
	};

	const option = [
		{ value: "Last 7 days", label: "Last 7 days" },
		{ value: "Jan", label: "Jan" },
		{ value: "Feb", label: "Feb" },
		{ value: "Mar", label: "Mar" },
		{ value: "Apr", label: "Apr" },
	];

	const deptOptions = [
		{ value: "IT", label: "IT" },
		{ value: "Accounts", label: "Accounts" },
		{ value: "HOD", label: "HOD" },
	];

	return (
		<ChartCardWithDropdown
			title="Discipline Analysis"
			options={option}
			deptOptions={deptOptions}
		>
			<Row>
				<Col span={16}>
					<HighchartsReact
						highcharts={Highcharts}
						options={funnel_Chart}
						isPureConfig={true}
					/>
				</Col>
				<Col span={8} className="flex justify-center items-center">
					<div>
						<div className="flex items-center ">
							<div className="h-5 w-5 bg-[#5e81f4]"></div>
							<span className="ml-2">Applied</span>
						</div>
						<div className="flex items-center mt-3">
							<div className="h-5 w-5 bg-[#e54545]"></div>
							<span className="ml-2">Screened </span>
						</div>
						<div className="flex items-center mt-3">
							<div className="h-5 w-5 bg-[#f0d15f]"></div>
							<span className="ml-2">Interviewed</span>
						</div>
						<div className="flex items-center mt-3">
							<div className="h-5 w-5 bg-[#00d179] "></div>
							<span className="ml-2">Hired</span>
						</div>
					</div>
				</Col>
			</Row>
		</ChartCardWithDropdown>
	);
};

export default RecruitmentFunnel;
