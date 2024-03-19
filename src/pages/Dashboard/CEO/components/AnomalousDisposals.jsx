import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const AnomalousDisposals = () => {
	const state = {
		series: [
			{
				data: [8, 9, 11, 6, 13, 4, 8, 2, 4, 5, 9, 15],
			},
		],
		options: {
			chart: {
				type: "line",
				height: 350,
			},
			stroke: {
				curve: "stepline",
			},
			dataLabels: {
				enabled: false,
			},
			markers: {
				hover: {
					sizeOffset: 4,
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
		},
	};
	const option = [
		{ value: "Last 12 Months", label: "Last 12 Months" },
		{ value: "2022", label: "2022" },
		{ value: "2021", label: "2021" },
		{ value: "2020", label: "2020" },
		{ value: "2019", label: "2019" },
	];
	const csOption = [
		{ value: "CS Johar Town", label: "CS - Johar Town" },
		{ value: "CS Iqbal Town", label: "CS - Iqbal Town" },
		{ value: "CS Bahria Town", label: "CS - Bahria Town" },
	];
	return (
		<div>
			<ChartCardWithDropdown
				title="Number of Anomalous Disposals"
				options={option}
				deptOptions={csOption}
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

export default AnomalousDisposals;
