import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const StockoutAndOverstockRatio = () => {
  let dangerColor = "#E54545";
  let primaryColor = "#00F38D";
  let darkblue = "#165BAA";
  let statement_data = [
    {
      x: ["Syringe"],
      y: [0, 4800],
    },
    {
      x: ["Gloves"],
      y: [4800, 3400],
    },
    {
      x: ["Sample Container"],
      y: [3000, 2000],
    },
    {
      x: ["Needles"],
      y: [4000, 4500],
    },
    {
      x: ["Papers"],
      y: [3500, 5000],
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

  const deptOpt = [
    { value: "Next Month", label: "Next Month" },
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
      title="Stockout and Overstock Ratio"
      deptOptions={deptOpt}
      options={csOption}
    >
      <ReactApexChart
        options={statement_chart.options}
        series={statement_chart.series}
        type="rangeBar"
        height={520}
      />
    </ChartCardWithDropdown>
  );
};

export default StockoutAndOverstockRatio;
