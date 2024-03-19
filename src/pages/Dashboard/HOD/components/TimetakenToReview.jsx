import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const TimeTakenToReview = () => {
	const state = {
		series: [
			{
				name: "On Time",
				data: [44, 55, 41, 67, 22, 43, 21, 49, 12, 23, 11, 9],
			},
			{
				name: "Delay",
				data: [13, 23, 20, 8, 13, 27, 33, 12, 7, 22, 43, 21],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
				stacked: true,
				stackType: "100%",
			},
			colors: ["#00F38D", "#ff4d4f"],
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
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
			fill: {
				opacity: 1,
			},
			legend: {
				position: "right",
				offsetX: 0,
				offsetY: 50,
			},
		},
	};
	const option = [
		{ value: "Monthly", label: "Monthly" },
		{ value: "Weekly", label: "Weekly" },
		{ value: "daily", label: "daily" },
	];
	return (
		<ChartCardWithDropdown title="Time Taken To Review MIR" options={option}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
			/>
		</ChartCardWithDropdown>
	);
};

export default TimeTakenToReview;
