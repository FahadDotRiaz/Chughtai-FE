import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";

const DepartmentWiseHiring = () => {
	const DepartmentWiseHiring = {
		// height: (4 / 10 * 40) + '%',
		colors: ["#009EFF"],
		chart: {
			height: (9 / 16) * 50 + "%",
			type: "column",
		},
		title: {
			text: null,
		},

		xAxis: {
			categories: [
				"Jan",
				"Fab",
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
				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			footerFormat: "</table>",
			shared: true,
			useHTML: true,
		},
		legend: false,
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},

		series: [
			{
				name: "fff",
				data: [40, 70, 50, 40, 20, 50, 10, 30, 60, 20, 50, 60],
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
		{ value: "IT", label: "IT" },
		{ value: "Accounts", label: "Accounts" },
		{ value: "HOD", label: "HOD" },
	];

	return (
		<ChartCardWithDropdown
			title={"Department Wise Hiring"}
			options={option}
			deptOptions={deptOptions}
		>
			<HighchartsReact
				highcharts={Highcharts}
				options={DepartmentWiseHiring}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default DepartmentWiseHiring;
