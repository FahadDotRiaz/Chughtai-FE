import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const DisciplineAnalysis = () => {
	const Initial_state = {
		// height: (4 / 10 * 40) + '%',
		colors: ["#009EFF", "#035ECA"],
		chart: {
			height: (9 / 16) * 60 + "%",
			type: "column",
		},
		title: {
			text: null,
		},

		xAxis: {
			categories: [
				"Permanent",
				"Probation",
				"Paid Internee",
				"Unpaid Internee",
				"Contract",
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
				name: "Male",
				data: [40, 70, 50, 40, 20],
			},
			{
				name: "Female",
				data: [70, 20, 50, 40, 50],
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
		{ value: "HOD", label: "HOD" },
		{ value: "Accounts", label: "Accounts" },
		{ value: "IT", label: "IT" },
	];

	return (
		<ChartCardWithDropdown
			title="Discipline Analysis"
			options={option}
			deptOptions={deptOptions}
		>
			<HighchartsReact
				highcharts={Highcharts}
				options={Initial_state}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default DisciplineAnalysis;
