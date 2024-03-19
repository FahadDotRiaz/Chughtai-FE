import Chart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const IncomeAndExpenses = () => {
	const income_expense_chart = {
		// colors:["red","black","yellow"],
		series: [
			{
				name: "Income Flow",
				color: "#009EFF",
				type: "bar",
				data: [5000, 4500, 4800, 4400, 5100, 6000],
			},
			{
				name: "Expenses Flow",
				color: "#00F38D",
				type: "bar",
				data: [-3000, -4000, -2000, -2500, -2900, -3000],
			},
			{
				name: "Net Profit",
				color: "#F0D15F",
				type: "line",
				data: [1000, -2000, 1400, 1800, -1000, 1000],
			},
		],
		options: {
			chart: {
				type: "line",
				height: 350,
				stacked: true,
				toolbar: {
					show: false,
				},
			},
			responsive: [
				{
					breakpoint: 400,
					options: {
						chart: {
							width: 220,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					// colors: {
					//     ranges: [{
					//         from: -100,
					//         to: -46,
					//         color: '#F15B46'
					//     }, {
					//         from: -45,
					//         to: 0,
					//         color: '#00E396'
					//     }]
					// },
					columnWidth: "40%",
				},
			},
			fill: {
				opacity: 1.0,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [1, 1, 3],
				curve: "straight",
			},
			yaxis: {
				labels: {
					formatter: function (y) {
						return y.toFixed(2);
					},
				},
			},

			xaxis: {
				// type: 'datetime',
				categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
		<ChartCardWithDropdown title="Income & Expenses" options={option}>
			<Chart
				series={income_expense_chart.series}
				options={income_expense_chart.options}
				type="line"
				height={350}
			/>
		</ChartCardWithDropdown>
	);
};

export default IncomeAndExpenses;
