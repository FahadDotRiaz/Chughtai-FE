import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const ResourceSatisfactionAnalysis = () => {
	const testCaseReportGraph = {
		series: [54, 45, 20],
		options: {
			chart: {
				// width: 300,
				width: (9 / 16) * 76 + "%",
				type: "pie",
				align: "right",
			},
			dataLabels: {
				enabled: false,
				style: {
					fontSize: "22px",
					fontWeight: "600",
				},
			},
			plotOptions: {
				pie: {
					dataLabels: {
						offset: -25,
					},
				},
			},

			colors: ["#00F38D", "#5E81F4", "#FB4D4D"],
			labels: ["Satisfy   ", "Failed", "Non Satisfy"],
			yaxis: {
				labels: {
					formatter: function (value) {
						// console.log("valuse graphs", value);
						return value + "$";
					},
				},
			},
			legend: {
				show: true,
				showForSingleSeries: false,
				showForNullSeries: true,
				showForZeroSeries: true,
				// position: "bottom",
				// horizontalAlign: "left",
				// floating: false,
				// fontSize: "14px",
				// fontFamily: "Helvetica, Arial",
				fontWeight: 400,
				inverseOrder: false,
				width: undefined,
				height: undefined,
				tooltipHoverFormatter: undefined,
				customLegendItems: [],
				offsetX: 15,
				offsetY: 0,
				formatter: function (val, opts) {
					return val + " " + opts.w.globals.series[opts.seriesIndex] + "" + "%";
				},
				labels: {
					colors: undefined,
					useSeriesColors: true,
				},
				markers: {
					width: 12,
					height: 12,
					strokeWidth: 0,
					strokeColor: "#fff",
					fillColors: undefined,
					radius: 12,
					customHTML: undefined,
					onClick: undefined,
					offsetX: -5,
					offsetY: 0,
				},
				itemMargin: {
					horizontal: 5,
					vertical: 0,
				},
				onItemClick: {
					toggleDataSeries: true,
				},
			},
			// responsive: [
			//   {
			//     breakpoint: 744,
			//     options: {
			//       chart: {
			//         width: 300,
			//       },
			//       dataLabels: {
			//         enabled: true,
			//         style: {
			//           fontSize: "14px",
			//           fontWeight: "600",
			//         },
			//       },
			//       plotOptions: {
			//         pie: {
			//           dataLabels: {
			//             offset: -15,
			//           },
			//         },
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 610,
			//     options: {
			//       chart: {
			//         width: 300,
			//       },
			//       dataLabels: {
			//         enabled: true,
			//         style: {
			//           fontSize: "14px",
			//           fontWeight: "600",
			//         },
			//       },
			//       plotOptions: {
			//         pie: {
			//           dataLabels: {
			//             offset: -15,
			//           },
			//         },
			//       },
			//     },
			//   },
			//   {
			//     breakpoint: 400,
			//     options: {
			//       chart: {
			//         width: 250,
			//       },
			//       dataLabels: {
			//         enabled: true,
			//         style: {
			//           fontSize: "12px",
			//           fontWeight: "600",
			//         },
			//       },
			//       plotOptions: {
			//         pie: {
			//           dataLabels: {
			//             offset: -10,
			//           },
			//         },
			//       },
			//     },
			//   },
			// ],
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
		<ChartCardWithDropdown
			title="Resource Satisfaction Analysis"
			options={option}
		>
			<ReactApexChart
				options={testCaseReportGraph.options}
				series={testCaseReportGraph.series}
				type="pie"
				// height={(9 / 16) * 300 + "%"}
				width={(9 / 16) * 120 + "%"}
				className="flex justify-center items-center"
			/>
		</ChartCardWithDropdown>
	);
};

export default ResourceSatisfactionAnalysis;
