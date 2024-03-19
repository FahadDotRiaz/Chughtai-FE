import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const AnomalousItems = () => {
	const state = {
		series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		options: {
			chart: {
				width: 380,
				type: "pie",
			},

			colors: [
				"#0088FE",
				"#00C49F",
				"#F875AA",
				"#5F0F40",
				"#49108B",
				"#7E30E1",
				"#FFBB28",
				"#E26EE5",
				"#525FE1",
				"#F86F03",
			],
			labels: [
				"Needles",
				"Vacutainer Tubes",
				"Syringes",
				"Needle Holders",
				"Gauze",
				"Bandages",
				"Tourniquet",
				"Biohazard Bags",
				"Centrifuge",
				"Microscope",
			],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
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
	const csOption = [
		{ value: "CS Johar Town", label: "CS - Johar Town" },
		{ value: "CS Iqbal Town", label: "CS - Iqbal Town" },
		{ value: "CS Bahria Town", label: "CS - Bahria Town" },
	];
	return (
		<div>
			<ChartCardWithDropdown
				title="Top 10 Anomalous Items"
				options={option}
				deptOptions={csOption}
			>
				<ReactApexChart
					options={state.options}
					series={state.series}
					type="pie"
					height={530}
				/>
			</ChartCardWithDropdown>
		</div>
	);
};

export default AnomalousItems;
