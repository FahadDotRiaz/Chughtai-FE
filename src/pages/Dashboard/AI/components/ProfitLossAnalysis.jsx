import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
const ProfitLossAnalysis = () => {
	const expenseAnalysis = {
		colors: ["#00D179", "#009EFF "],
		// chart: {
		//   zoomType: "xy",
		// },
		chart: {
			zoomType: "xy",
			height: (9 / 16) * 90 + "%",
		},
		title: {
			text: null,
			align: "left",
		},
		credits: {
			enabled: false,
		},
		subtitle: {
			text: null,
		},
		xAxis: [
			{
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
		],
		yAxis: [
			{
				// Primary yAxis
				labels: {
					format: "{value}",
					style: {
						color: Highcharts.getOptions().colors[1],
					},
				},
				title: {
					text: false,
					style: {
						color: Highcharts.getOptions().colors[1],
					},
				},
			},
			{
				// Secondary yAxis
				title: {
					text: false,
				},
				labels: {
					enabled: false,
					// format: "{value} ",
					// style: {
					//   color: Highcharts.getOptions().colors[0],
					// },
				},
				opposite: false,
			},
		],
		tooltip: {
			shared: true,
		},
		exporting: {
			enabled: false,
		},
		// legend: {
		//   align: "bottom",
		//   verticalAlign: "center",
		//   floating: true,
		//   backgroundColor:
		//     Highcharts.defaultOptions.legend.backgroundColor ||
		//     "rgba(255,255,255,0.25)",
		// },
		series: [
			{
				name: "Net Profit%",
				type: "spline",
				yAxis: 1,
				data: [80, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, -39.0],
				tooltip: {
					valueSuffix: " ",
				},
			},
			{
				name: "Net Profit",
				type: "column",
				data: [40, -50, 35, -55, 45, 60, 45.6, -51.7, 49.0],
				tooltip: {
					valueSuffix: "$",
				},
			},
		],
	};
	const option = [
		{ value: "Last 12 Months", label: "Last 12 Months" },
		{ value: "2022", label: "2022" },
		{ value: "2021", label: "2021" },
		{ value: "2020", label: "2020" },
		{ value: "2019", label: "2019" },
	];

	return (
		<ChartCardWithDropdown title="Profit Loss Analysis" options={option}>
			<HighchartsReact highcharts={Highcharts} options={expenseAnalysis} />
		</ChartCardWithDropdown>
	);
};

export default ProfitLossAnalysis;
