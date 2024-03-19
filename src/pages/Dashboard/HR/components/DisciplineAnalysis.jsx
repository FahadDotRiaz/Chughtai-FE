import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const DisciplineAnalysis = () => {
	const funnel_Chart = {
		colors: ["#009EFF", "#F0D15F", "#00F38D", "#E54545"],
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
			categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
				name: "Undertime",
				data: [40, 70, 50, 40, 20, 50, 10],
			},
			{
				name: "Late",
				data: [70, 20, 50, 40, 50, 80, 30],
			},
			{
				name: "Present",
				data: [40, 30, 70, 40, 60, 90, 50],
			},
			{
				name: "Absent",
				data: [10, 70, 50, 20, 60, 20, 40],
			},
		],
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
			title="Discipline Analysis"
			options={option}
			deptOptions={deptOptions}
		>
			<HighchartsReact
				highcharts={Highcharts}
				options={funnel_Chart}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default DisciplineAnalysis;
