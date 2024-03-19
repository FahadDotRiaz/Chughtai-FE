import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const DemandAnalogy = () => {
	const state = {
		series: [
			{
				name: "Desktops",
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
			},
		],
		options: {
			chart: {
				height: 350,
				type: "line",
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "straight",
			},
			grid: {
				row: {
					colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
					opacity: 0.5,
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
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
			title="Demand Analogy"
			deptOptions={deptOpt}
			options={csOption}
		>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="line"
				height={520}
			/>
		</ChartCardWithDropdown>
	);
};

export default DemandAnalogy;
