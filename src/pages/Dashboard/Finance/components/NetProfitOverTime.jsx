import Chart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const NetProfitOverTime = () => {
	const netProfit_overTime_chart = {
		series: [
			{
				name: "Net Profit",
				type: "bar",
				data: [10, -13, 14, -12, 18, -16],
			},
			{
				name: "Net Profit %",
				type: "line",
				data: [
					-6.38, -23.86, -22.86, -40.67, 15.8, -5.86,
					// 16.9,
					// 10.12,
					// -5.07,
					// 2.89,
					// 5.45,
					// -4.34,
				],
			},
		],
		options: {
			chart: {
				type: "line",
				height: 350,
				stacked: false,
				toolbar: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					colors: {
						ranges: [
							{
								from: 0,
								to: 100000,
								color: "#009EFF",
							},
							{
								from: -10000,
								to: 0,
								color: "#F0D15F",
							},
						],
					},
					columnWidth: "80%",
				},
			},
			dataLabels: {
				enabled: false,
				enabledOnSeries: [1],
				// eslint-disable-next-line no-unused-vars
				formatter: function (val, opts) {
					return val / 2 + "%";
				},
			},
			stroke: {
				width: [0, 2],
				curve: "straight",
				// dashArray: [0, 2],
			},
			colors: ["#009EFF", "#00D179"],
			markers: {
				size: 0,
			},
			yaxis:
				// {
				//     // title: {
				//     //     text: 'Growth',
				//     // },
				//     labels: {
				//         formatter: function (y) {
				//             return y.toFixed(0) + "m";
				//         }
				//     }
				// },
				[
					{
						seriesName: "Net Profit",
						axisTicks: {
							show: true,
						},
						// axisBorder: {
						//     show: true,
						//     color: '#008FFB'
						// },
						// labels: {
						//     style: {
						//         colors: '#008FFB',
						//     },
						// },
						// title: {
						//     text: "Active Employee",
						//     style: {
						//         color: '#008FFB',
						//     }
						// }
					},
					{
						seriesName: "Net Profit %",
						opposite: true,
						enabled: false,
						show: false,
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
				],
			xaxis: {
				// type: 'datetime',
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					// "Jul",
					// "Aug",
					// "Sep",
					// "Oct",
					// "Nov",
					// "Dec",
				],
				labels: {
					rotate: -90,
				},
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
		<ChartCardWithDropdown title="Net Profit Over Time" options={option}>
			<Chart
				series={netProfit_overTime_chart.series}
				options={netProfit_overTime_chart.options}
				height={350}
				// type="line"
				// width={(9 / 16) * 148 + "%"}
			/>
		</ChartCardWithDropdown>
	);
};

export default NetProfitOverTime;
