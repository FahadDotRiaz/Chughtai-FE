import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const MRRhistory = () => {
	const funnel_Chart = {
		colors: ["#009EFF", "#23bf4f", "#ff4d4f"],
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
				name: "Requests",
				data: [14, 17, 15, 14, 12, 15, 11, 14, 15, 18, 13, 17],
			},
			{
				name: "Approved",
				data: [4, 5, 8, 4, 7, 5, 4, 2, 5, 1, 3, 7],
			},
			{
				name: "Rejected",
				data: [4, 2, 5, 1, 4, 5, 1, 4, 5, 8, 3, 7],
			},
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
		<ChartCardWithDropdown title="MRR History" deptOptions={deptOpt}>
			<HighchartsReact
				highcharts={Highcharts}
				options={funnel_Chart}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default MRRhistory;
