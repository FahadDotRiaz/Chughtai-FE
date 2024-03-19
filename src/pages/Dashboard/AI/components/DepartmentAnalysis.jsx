import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const DepartmentAnalysis = () => {
	const leadsPerMonth = {
		chart: {
			height: (9 / 16) * 113 + "%",
		},
		title: {
			text: "",
		},
		credits: {
			enabled: false,
		},
		subtitle: {
			text: "",
		},
		xAxis: {
			categories: ["HOD", "Accounts", "Store", "Stat lab", "Collection center"],
		},
		yAxis: {
			title: {
				text: null,
			},
		},
		exporting: { enabled: false },
		series: [
			{
				type: "column",
				name: "Unemployed",
				colorByPoint: true,
				data: [
					{
						x: 0,
						y: 10,
						color: "#00D179",
					},
					{
						x: 1,
						y: 6,
						color: "#035ECA",
					},
					{
						x: 3,
						y: 10,
						color: "#F0D15F",
					},
					{
						x: 2,
						y: 15,
						color: "#009EFF",
					},
					{
						x: 4,
						y: 20,
						color: "#666666",
					},
				],
				showInLegend: false,
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
		<ChartCardWithDropdown title="Department Analysis" options={option}>
			<HighchartsReact
				highcharts={Highcharts}
				options={leadsPerMonth}
				isPureConfig={true}
			/>
		</ChartCardWithDropdown>
	);
};

export default DepartmentAnalysis;
