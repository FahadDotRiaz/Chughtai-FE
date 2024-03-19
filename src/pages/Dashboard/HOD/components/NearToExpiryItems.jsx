import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const NearToExpiryItems = () => {
	const state = {
		series: [70, 5, 8],
		options: {
			chart: {
				// width: 380,
				type: "pie",
			},
			colors: ["#00F38D", "#009EFF", "#ff4d4f"],
			labels: ["Valid", "Near To Expiry", "Expired"],

			dataLabels: {
				enabled: false,
			},
		},
	};
	const deptOpt = [
		{ value: "Store A", label: "Store A" },
		{ value: "Store B", label: "Store B" },
		{ value: "Store C", label: "Store C" },
	];
	return (
		<ChartCardWithDropdown title="Near To Expiry Items" deptOptions={deptOpt}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="pie"
				height={350}
			/>
		</ChartCardWithDropdown>
	);
};

export default NearToExpiryItems;
