import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const ExpiredItems = () => {
	const state = {
		series: [
			{
				data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 1121, 503],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
			},
			colors: ["#ff4d4f"],
			plotOptions: {
				bar: {
					borderRadius: 4,
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
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

	const deptOpt = [
		{ value: "This Year", label: "This Year" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Week", label: "This Week" },
	];

	return (
		<ChartCardWithDropdown title="Rate of Expired Items" deptOptions={deptOpt}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
				height={520}
			/>
		</ChartCardWithDropdown>
	);
};

export default ExpiredItems;
