import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const TimeAnalysis = () => {
	const timeAnalysis = {
		series: [
			{
				name: "15 Min",
				data: [40, 80, 50, 40, 50, 50, 30],
			},
			{
				name: "30 Min",
				data: [30, 30, 70, 40, 60, 30, 50],
			},
			{
				name: "1+ Hour",
				data: [30, 70, 50, 20, 60, 30, 40],
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
			colors: ["#009EFF", "#F0D15F", "#E54545"],
			legend: {
				symbol: "square",
			},

			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [1, 1, 1],
				curve: "straight",
			},
			markers: {
				size: 0,
				hover: {
					sizeOffset: 6,
				},
			},
			xaxis: {
				categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			},
			tooltip: {
				y: [
					{
						title: {
							formatter: function (val) {
								return val + " (mins)";
							},
						},
					},
					{
						title: {
							formatter: function (val) {
								return val + " per session";
							},
						},
					},
					{
						title: {
							formatter: function (val) {
								return val;
							},
						},
					},
				],
			},
			grid: {
				borderColor: "#f1f1f1",
			},
		},
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
			title="Time Analysis"
			options={option}
			deptOptions={deptOptions}
		>
			<ReactApexChart
				options={timeAnalysis.options}
				series={timeAnalysis.series}
				type="line"
				height={350}
			/>
		</ChartCardWithDropdown>
	);
};

export default TimeAnalysis;
