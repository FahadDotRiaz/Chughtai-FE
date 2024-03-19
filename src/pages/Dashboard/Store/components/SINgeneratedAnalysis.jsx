import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const SINgeneratedAnalysis = () => {
	const funnel_Chart = {
		// colors: ["#009EFF", "#F0D15F", "#00F38D", "#E54545"],
		chart: {
			height: (9 / 16) * 113 + "%",
			type: "column",
		},
		title: {
			text: null,
		},
		credits: { enabled: false },
		exporting: { enabled: false },
		xAxis: {
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
		yAxis: {
			min: 0,
			title: {
				text: "",
			},
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
			footerFormat: "</table>",
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: "SIN",
				data: [4, 7, 5, 4, 2, 5, 1, 4, 5, 8, 3, 7],
			},
			// {
			// 	name: "Late",
			// 	data: [70, 20, 50, 40, 50, 80, 30],
			// },
			// {
			// 	name: "Present",
			// 	data: [40, 30, 70, 40, 60, 90, 50],
			// },
			// {
			// 	name: "Absent",
			// 	data: [10, 70, 50, 20, 60, 20, 40],
			// },
		],
	};

	const deptOpt = [
		{ value: "This Year", label: "This Year" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Week", label: "This Week" },
	];

	return (
		<ChartCardWithDropdown title="SIN Generated Analysis" deptOptions={deptOpt}>
			<HighchartsReact
				highcharts={Highcharts}
				options={funnel_Chart}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default SINgeneratedAnalysis;
