import { Row, Col } from "antd";
import StatCard from "./StatCard";
import Chart from "react-apexcharts";

export const Stats = () => {
	const statsData = [
		{ id: 0, title: "Total Income", cost: "$99 M", percent: "26%", up: true },
		{ id: 1, title: "Total Expenses", cost: "$99 M", percent: "26%", up: true },
		{ id: 2, title: "Net Profit", cost: "$99 M", percent: "26%", up: false },
		{
			id: 3,
			title: "Cash (End of month)",
			cost: "$99 M",
			percent: "67%",
			up: true,
		},
		{
			id: 4,
			title: "Accounts receivable",
			cost: "$99 M",
			percent: "67%",
			up: false,
		},
		{
			id: 5,
			title: "Accounts Payable",
			cost: "$34 M",
			percent: "67%",
			up: true,
		},
		{
			id: 6,
			title: "In-hand of Income Budget",
			cost: "$34 M",
			percent: "26%",
			up: false,
		},
		{
			id: 7,
			title: "In-hand of Income Budget",
			cost: "$34 M",
			percent: "26%",
			up: true,
		},
	];
	const dashboardTiles_NetProfit_Chart = {
		series: [40],
		options: {
			chart: {
				// height: 450,
				type: "radialBar",
				sparkline: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
			},
			responsive: [
				{
					breakpoint: 1700,
					options: {
						chart: {
							width: 230,
							height: 240,
						},
					},
				},
				{
					breakpoint: 1513,
					options: {
						chart: {
							width: 170,
							height: 150,
						},
					},
				},
				// {
				//   breakpoint: 1400,
				//   options: {
				//     chart: {
				//       width: 175,
				//       height: 190,
				//     },
				//   },
				// },
				// {
				//   breakpoint: 1200,
				//   options: {
				//     chart: {
				//       width: 200,
				//       height: 220,
				//     },
				//   },
				// },
				{
					breakpoint: 1050,
					options: {
						chart: {
							width: 150,
							height: 150,
						},
					},
				},
				{
					breakpoint: 992,
					options: {
						chart: {
							width: 200,
							height: 210,
						},
					},
				},
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 300,
							height: 200,
						},
					},
				},
			],
			colors: ["#009EFF"],
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						size: "60%",
						background: "white",
					},
					track: {
						background: "#035ECA",
						strokeWidth: "60%",
						margin: 2, // margin is in pixels
						dropShadow: {
							enabled: false,
							top: 2,
							left: 0,
							color: "#999",
							opacity: 1,
							blur: 2,
						},
					},
					dataLabels: {
						showOn: "always",
						name: {
							show: false,
							color: "black",
							fontSize: "12px",
						},
						value: {
							color: "#111",
							fontSize: "27px",
							show: true,
							offsetY: 10,
						},
					},
				},
			},
			labels: ["Net Profit Margin"],
		},
	};
	return (
		<div>
			<Row gutter={[16, 16]}>
				<Col span={17}>
					<Row className="justify-between" gutter={[16, 16]}>
						{statsData?.map(({ title, cost, percent, up }, index) => {
							return (
								<StatCard
									key={index}
									title={title}
									up={up}
									down={!up}
									percent={percent}
									cost={cost}
									prevMonth={true}
								/>
							);
						})}
					</Row>
				</Col>
				<Col span={7}>
					<div
						className="border rounded p-4 h-full "
						style={{
							boxShadow:
								"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
						}}
					>
						<div className="text-lg text-[#2e3790] font-semibold">
							{"Net Profit Margin"}
						</div>
						<div className="flex items-center">
							<div>
								<Chart
									options={dashboardTiles_NetProfit_Chart.options}
									series={dashboardTiles_NetProfit_Chart.series}
									type="radialBar"
									width={300}
									height={220}
								/>
							</div>
							<div className="flex items-center">
								<span className="bg-[#009eff] text-transparent mr-1">00</span>
								<span className="text-lg font-semibold">Net Profit Margin</span>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};
