import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const InventoryTurnOverRate = () => {
  const state = {
    series: [
      {
        name: "Expected",
        group: "budget",
        data: [4400, 5500, 4100],
      },
      {
        name: "Demand",
        group: "actual",
        data: [4800, 5000, 4000],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      dataLabels: {
        formatter: (val) => {
          return val / 100 + "K";
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: ["Bio", "Stationary", "IT"],
      },
      fill: {
        opacity: 1,
      },
      colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
      yaxis: {
        labels: {
          formatter: (val) => {
            return val / 100 + "K";
          },
        },
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
      title="Inventory Turnover Rate"
      deptOptions={deptOpt}
      options={csOption}
    >
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={520}
      />
    </ChartCardWithDropdown>
  );
};

export default InventoryTurnOverRate;
