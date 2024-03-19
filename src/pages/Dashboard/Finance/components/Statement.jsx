import Chart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const Statement = () => {
	let dangerColor = "#E54545";
	let primaryColor = "#00F38D";
	let darkblue = "#165BAA";

	let statement_data = [
		{
			x: ["Total Income"],
			y: [0, 4800],
		},
		{
			x: ["Cost of Goods"],
			y: [4800, 3400],
		},
		{
			x: ["Gross Profit"],
			y: [3000, 6000],
		},
		{
			x: ["Total Operating Expenses"],
			y: [6000, 4500],
		},
		{
			x: ["Operating Profit (EBIT)"],
			y: [4500, 6000],
		},
		{
			x: ["Taxes"],
			y: [6000, 5000],
		},
		{
			x: ["Net Profit"],
			y: [0, 6023],
		},
	];

	const statement_chart = {
		series: [
			{
				data: statement_data,
			},
		],
		options: {
			chart: {
				type: "rangeBar",
				height: 350,
				toolbar: {
					show: false,
				},
			},
			responsive: [
				{
					breakpoint: 550,
					options: {
						chart: {
							width: 320,
							height: 400,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					horizontal: false,
					dataLabels: {
						position: "top",
					},
				},
			},
			dataLabels: {
				enabled: true,
				offsetY: -30,
				style: {
					fontSize: "12px",
					fontWeight: "bold",
					colors: ["#304758"],
				},
			},
			colors: [
				function ({ dataPointIndex }) {
					if (
						dataPointIndex === 0 ||
						dataPointIndex === statement_data.length - 1
					)
						return "#009EFF";
					if (
						statement_data[dataPointIndex].y[0] >
						statement_data[dataPointIndex].y[1]
					) {
						return dangerColor;
					}
					if (
						statement_data[dataPointIndex].y[2] <
						statement_data[dataPointIndex].y[3]
					) {
						return darkblue;
					} else {
						return primaryColor;
					}
				},
			],
			fill: {
				opacity: 1,
			},
		},
		xaxis: {
			labels: {
				rotate: 0,
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
		<ChartCardWithDropdown title="Statement" options={option}>
			<Chart
				series={statement_chart.series}
				options={statement_chart.options}
				type="rangeBar"
				height={350}
			/>
		</ChartCardWithDropdown>
	);
};

export default Statement;
