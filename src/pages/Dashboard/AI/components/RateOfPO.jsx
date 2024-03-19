import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const RateOfPO = () => {
	const state = {
		series: [
			{
				name: "BIO",
				data: [44, 55, 41, 67, 22, 43, 21, 49, 12, 23, 11, 9],
			},
			{
				name: "IT",
				data: [13, 23, 20, 8, 13, 27, 33, 12, 7, 22, 43, 21],
			},
			{
				name: "Stationary",
				data: [13, 23, 20, 8, 13, 27, 33, 12, 7, 22, 43, 21],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
				stacked: true,
				stackType: "100%",
			},
			colors: ["#7E30E1", "#E26EE5", "#525FE1", "#F86F03"],
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			xaxis: {
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
			},
			fill: {
				opacity: 1,
			},
			legend: {
				position: "right",
				offsetX: 0,
				offsetY: 50,
			},
		},
	};
	const deptOpt = [
		{ value: "This Year", label: "This Year" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Week", label: "This Week" },
	];
	const csOption = [
		{ value: "CS Johar Town", label: "CS - Johar Town" },
		{ value: "CS Iqbal Town", label: "CS - Iqbal Town" },
		{ value: "CS Bahria Town", label: "CS - Bahria Town" },
	];
	return (
		<ChartCardWithDropdown
			title="Rate of PO"
			options={csOption}
			deptOptions={deptOpt}
		>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
			/>
		</ChartCardWithDropdown>
	);
};

export default RateOfPO;
