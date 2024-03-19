import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const RatioOfDefectedItems = () => {
  const statement_chart = {
    series: [
      {
        name: "Perfect Items",
        data: [44, 55, 41, 67, 22, 43, 21, 49, 55, 34, 12, 33],
      },
      {
        name: "Defect Items",
        data: [13, 13, 10, 8, 13, 17, 13, 12, 14, 11, 12, 13],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
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
    },
  };

  const deptOpt = [
    { value: "Last Month", label: "Last Month" },
    { value: "This Month", label: "This Month" },
    { value: "Custom", label: "Custom" },
  ];
  const csOption = [
    { value: "CS Johar Town", label: "CS - Johar Town" },
    { value: "CS Iqbal Town", label: "CS - Iqbal Town" },
    { value: "CS Bahria Town", label: "CS - Bahria Town" },
  ];
  return (
    <ChartCardWithDropdown
      title="Ratio of Items Quality"
      deptOptions={deptOpt}
      options={csOption}
    >
      <ReactApexChart
        options={statement_chart.options}
        series={statement_chart.series}
        type="bar"
        height={520}
      />
    </ChartCardWithDropdown>
  );
};

export default RatioOfDefectedItems;
