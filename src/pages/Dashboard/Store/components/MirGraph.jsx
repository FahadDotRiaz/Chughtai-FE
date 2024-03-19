import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const MirGraph = () => {
	const state = {
		series: [
			{
				name: "Issued",
				data: [4, 6, 3, 8, 9, 1, 4, 6, 3, 8, 9, 1],
			},
			{
				name: "Pending",
				data: [3, 4, 6, 4, 6, 3, 8, 9, 1, 8, 3, 9],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: (9 / 16) * 113 + "%",
				stacked: true,
				toolbar: {
					show: true,
				},
				zoom: {
					enabled: true,
				},
			},
			colors: ["#00E396", "#FEB019", "#ff4d4f"],
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
			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 2,
					dataLabels: {
						total: {
							enabled: true,
							style: {
								fontSize: "13px",
								fontWeight: 900,
							},
						},
					},
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
				crosshair: true,
			},
			// legend: {
			// 	position: "bottom",
			// 	offsetY: 40,
			// },
			fill: {
				opacity: 1,
			},
		},
	};

	const deptOpt = [
		{ value: "This Year", label: "This Year" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Week", label: "This Week" },
	];

	return (
		<ChartCardWithDropdown title="MIR History" deptOptions={deptOpt}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
				height={520}
			/>
		</ChartCardWithDropdown>
	);
};

export default MirGraph;
