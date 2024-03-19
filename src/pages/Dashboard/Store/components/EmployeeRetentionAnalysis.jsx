import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const EmployeeRetentionAnalysis = () => {
	const funnel_Chart = {
		colors: ["#009EFF", "#F0D15F", "#00F38D", "#E54545"],
		chart: {
			height: (9 / 16) * 86 + "%",
			type: "column",
		},
		title: {
			text: null,
		},
		credits: { enabled: false },
		xAxis: {
			categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			crosshair: true,
		},
		toolbar: false,
		// toolbar: {
		//   show: false,
		// },
		exporting: { enabled: false },
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
				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
				name: "New Joiners",
				data: [40, 70, 50, 40, 20, 50, 10],
			},
			{
				name: "Leavers",
				data: [70, 20, 50, 40, 50, 80, 30],
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
		<ChartCardWithDropdown title="Employee Retention Analysis" options={option}>
			<HighchartsReact
				highcharts={Highcharts}
				options={funnel_Chart}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default EmployeeRetentionAnalysis;
