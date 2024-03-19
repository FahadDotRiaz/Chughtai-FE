import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const G_andAexpenses = () => {
	const state = {
		series: [70, 5, 8, 8, 14, 10, 10, 5, 6, 9, 10],
		options: {
			chart: {
				// width: 380,
				type: "pie",
			},
			colors: [
				"#00F38D",
				"#009EFF",
				"#F0D15F",
				"#B25EF4",
				"#FEE1BF",
				"#F45EC1",
				"#975EF4",
				"#F4945E",
				"#8A7732",
				"#5EE2F4",
				"#37C1B1",
			],
			labels: [
				"Salaries & Benefits",
				"Other Expenses",
				"Financial Cost",
				"Trade License",
				"Communication",
				"Utilities",
				"Vehicle Cost",
				"Repair & Maintenance",
				"Insurance Expense",
				"Advertising",
				"Rent Expenses",
			],

			// responsive: [
			//   {
			//     breakpoint: 1920,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 340 + "%",
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 1640,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 320 + "%",
			//       },
			//     },
			//   },

			//   {
			//     breakpoint: 1281,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 320 + "%",
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 1024,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 320 + "%",
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 768,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 220 + "%",
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 500,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 420 + "%",
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 425,
			//     options: {
			//       chart: {
			//         width: (9 / 16) * 520 + "%",
			//       },
			//     },
			//   },
			// ],

			dataLabels: {
				enabled: false,
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
		<ChartCardWithDropdown title="G & A Expenses" options={option}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="pie"
				width={(9 / 16) * 145 + "%"}
			/>
		</ChartCardWithDropdown>
	);
};

export default G_andAexpenses;
