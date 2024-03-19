import ReactApexChart from "react-apexcharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

export default function TopItemDemandOnPast() {
  const option = [
    { value: "Last 12 Months", label: "Last 12 Months" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];
  const state = {
    series: [
      {
        name: "sales",
        data: [
          {
            x: "Syringe",
            y: 80,
          },
          {
            x: "Gloves",
            y: 30,
          },
          {
            x: "Sample Containers",
            y: 60,
          },
          {
            x: "Gloves",
            y: 70,
          },
          {
            x: "Syringe",
            y: 50,
          },
          {
            x: "Needles",
            y: 60,
          },
          {
            x: "Needles",
            y: 80,
          },
          {
            x: "Syringe",
            y: 60,
          },
          {
            x: "Sample Containers",
            y: 50,
          },
          {
            x: "Syringe",
            y: 60,
          },
          {
            x: "Gloves",
            y: 70,
          },
          {
            x: "Syringe",
            y: 60,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      xaxis: {
        type: "category",
        // labels: {
        //   formatter: function (val) {
        //     return "Q" + dayjs(val).quarter();
        //   },
        // },
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 700,
          },
          groups: [
            { title: "Past 6 Months", cols: 6 },
            { title: "Future 6 Months", cols: 6 },
          ],
        },
      },
      yaxis: {
        max: 10,
      },
      // title: {
      //   text: "Grouped Labels on the X-axis",
      // },
      // tooltip: {
      //   x: {
      //     formatter: function (val) {
      //       return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY");
      //     },
      //   },
      // },
    },
  };
  return (
    <ChartCardWithDropdown title="Top Predicted Demand Items" options={option}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={520}
      />
    </ChartCardWithDropdown>
  );
}
