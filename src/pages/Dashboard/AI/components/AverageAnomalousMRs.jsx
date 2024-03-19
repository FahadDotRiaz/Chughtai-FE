import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const AverageAnomalousMRs = () => {
	const state = {
		series: [
			{
				name: "MRs",
				data: [5, 9, 2, 10, 13, 14, 11, 9, 15, 6, 9, 2],
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
					"Oct",
					"Nov",
					"Dec",
				],
			},
		},
	};
	const option = [
		{ value: "Last 12 Months", label: "Last 12 Months" },
		{ value: "2022", label: "2022" },
		{ value: "2021", label: "2021" },
		{ value: "2020", label: "2020" },
		{ value: "2019", label: "2019" },
	];

	return (
		<div>
			<ChartCardWithDropdown
				title="Average Anomalous MRs Per Unit"
				options={option}
			>
				<ReactApexChart
					options={state.options}
					series={state.series}
					type="line"
					height={520}
				/>
			</ChartCardWithDropdown>
		</div>
	);
};

export default AverageAnomalousMRs;
