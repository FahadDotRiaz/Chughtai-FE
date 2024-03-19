import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const RateOfConsumption = () => {
	const state = {
		series: [
			{
				name: "Consumed",
				data: [
					{
						x: "Jan",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 80,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Feb",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 90,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Mar",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 78,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Apr",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 65,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "May",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 70,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Jun",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 68,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Jul",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 75,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
					{
						x: "Aug",
						y: 100,
						goals: [
							{
								name: "Consumed",
								value: 60,
								strokeHeight: 5,
								strokeColor: "#775DD0",
							},
						],
					},
				],
			},
		],
		options: {
			chart: {
				height: 350,
				type: "bar",
			},
			plotOptions: {
				bar: {
					columnWidth: "60%",
				},
			},
			colors: ["#00E396"],
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: true,
				showForSingleSeries: true,
				customLegendItems: ["Stock", "Consumed"],
				markers: {
					fillColors: ["#00E396", "#775DD0"],
				},
			},
			yaxis: {
				max: 100,
			},
		},
	};

	const deptOpt = [
		{ value: "This Year", label: "This Year" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Week", label: "This Week" },
	];
	const csOption = [
		{ value: "CS Johar Town", label: "CS - Johar Town" },
		{ value: "CS Iqbal Town", label: "CS - Iqbal Town" },
		{ value: "CS Bahria Town", label: "CS - Bahria Town" },
	];
	return (
		<ChartCardWithDropdown
			title="Rate of Consumption"
			deptOptions={deptOpt}
			options={csOption}
		>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
				height={520}
			/>
		</ChartCardWithDropdown>
	);
};

export default RateOfConsumption;
