import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const AnomalousCenters = () => {
	const state = {
		series: [
			{
				data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
			},

			plotOptions: {
				bar: {
					borderRadius: 4,
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: [
					"Lhr-Johar town",
					"Lhr-jail road",
					"Lhr-wapda town",
					"Lhr-DHA",
					"Kar-Johr",
					"Kar-Korangi",
					"Isl-F10",
					"Isl-F11",
					"Mul-Chongi",
					"Mul-V chowk",
				],
				max: 10,
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
		<div>
			<ChartCardWithDropdown
				title="Top 10 Anomalous Collection Centers"
				options={option}
			>
				<ReactApexChart
					options={state.options}
					series={state.series}
					type="bar"
					height={520}
				/>
			</ChartCardWithDropdown>
		</div>
	);
};

export default AnomalousCenters;
