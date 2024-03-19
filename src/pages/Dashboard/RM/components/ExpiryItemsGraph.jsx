import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const ExpiryItemsGraph = () => {
	const state = {
		series: [
			{
				name: "Items",
				data: [12, 5, 15, 6, 9, 7, 2, 11, 5, 8, 3, 9],
			},
		],
		options: {
			chart: {
				height: 350,
				type: "bar",
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					dataLabels: {
						position: "top", // top, center, bottom
					},
				},
			},
			dataLabels: {
				enabled: true,
				// formatter: function (val) {
				// 	return val + "%";
				// },
				offsetY: -20,
				style: {
					fontSize: "12px",
					colors: ["#304758"],
				},
			},

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
				position: "top",
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				crosshairs: {
					fill: {
						type: "gradient",
						gradient: {
							colorFrom: "#D8E3F0",
							colorTo: "#BED1E6",
							stops: [0, 100],
							opacityFrom: 0.4,
							opacityTo: 0.5,
						},
					},
				},
				tooltip: {
					enabled: true,
				},
			},
			yaxis: {
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				labels: {
					show: false,
					formatter: function (val) {
						return val;
					},
				},
			},
			title: {
				text: "Number of Expiry Items",
				floating: true,
				offsetY: 330,
				align: "center",
				style: {
					color: "#444",
				},
			},
		},
	};

	const deptOpt = [
		{ value: "Region A", label: "Region A" },
		{ value: "Region B", label: "Region B" },
		{ value: "Region C", label: "Region C" },
	];
	return (
		<ChartCardWithDropdown title="Expiry Items" deptOptions={deptOpt}>
			<ReactApexChart
				options={state.options}
				series={state.series}
				type="bar"
				height={350}
			/>
		</ChartCardWithDropdown>
	);
};

export default ExpiryItemsGraph;
