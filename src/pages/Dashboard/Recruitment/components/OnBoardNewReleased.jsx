import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import Chart from "react-apexcharts";

const OnBoardNewReleased = () => {
	const LastYearAcitivty_Graph = {
		series: [
			{
				name: "Onboarded",
				type: "column",
				data: [2, 1, 5, 7, 2, 1],
			},
			{
				name: "New Hiring",
				type: "column",
				data: [3, 5, 3, 4, 3, 1],
			},
			{
				name: "Released",
				type: "column",
				data: [1, 1, 2, 3, 1, 0],
			},
		],
		options: {
			series: {
				pointWidth: 10,
			},
			chart: {
				height: 353,
				type: "line",
				// stacked: false
				toolbar: {
					show: false,
				},
				events: {
					mounted: (chart) => {
						chart.windowResizeHandler();
					},
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [1, 1, 1],
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
					"Sept",
					"Oct",
					"Nov",
					"Dec",
				],
			},
			yaxis: [
				{
					seriesName: "Active",

					axisTicks: {
						show: true,
					},
					axisBorder: {
						show: true,
						color: "#008FFB",
					},
					labels: {
						style: {
							colors: "#008FFB",
						},
					},
					title: {
						text: "Active Employee",
						style: {
							color: "#008FFB",
						},
					},
				},
				{
					seriesName: "Hire",
					opposite: true,
					axisTicks: {
						show: true,
					},
					axisBorder: {
						show: true,
						color: "#66DA26",
					},
					labels: {
						style: {
							colors: "#66DA26",
						},
					},
					title: {
						text: "Hired Employee",
						style: {
							color: "#66DA26",
						},
					},
					tooltip: {
						enabled: true,
					},
				},
				{
					seriesName: "Leave",
					opposite: true,
					axisTicks: {
						show: true,
					},
					axisBorder: {
						show: true,
						color: "#546E7A",
					},
					labels: {
						style: {
							colors: "#546E7A",
						},
					},
					title: {
						text: "Leave Employee",
						style: {
							color: "#546E7A",
						},
					},
				},
			],
			colors: ["#009EFF", "#F0D15F", "#00F38D"],
			markers: {
				size: 4,
				colors: undefined,
				strokeColors: "#fff",
				strokeWidth: 2,
				strokeOpacity: 0.9,
				strokeDashArray: 0,
				fillOpacity: 1,
				shape: "circle",
				radius: 2,
				offsetX: 0,
				offsetY: 0,
				show: true,
				showNullDataPoints: true,
				hover: {
					size: undefined,
					sizeOffset: 3,
				},
			},
			tooltip: {
				fixed: {
					enabled: true,
					position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
					offsetY: 30,
					offsetX: 60,
				},
			},
			legend: {
				horizontalAlign: "center",
				// offsetX: 40
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
		{ value: "Accounts", label: "Accounts" },
		{ value: "IT", label: "IT" },
		{ value: "HOD", label: "HOD" },
	];

	return (
		<ChartCardWithDropdown
			title={"Onboarded/New Hiring/Released"}
			options={option}
			deptOptions={deptOptions}
		>
			<Chart
				options={LastYearAcitivty_Graph.options}
				series={LastYearAcitivty_Graph.series}
				type="line"
				height={353}
			/>
		</ChartCardWithDropdown>
	);
};

export default OnBoardNewReleased;
