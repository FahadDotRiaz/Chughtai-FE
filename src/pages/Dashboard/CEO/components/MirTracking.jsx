import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

export default function MirTracking() {
  const option = [
    { value: "Last 12 Months", label: "Last 12 Months" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];
  return (
    <ChartCardWithDropdown
      title="Discipline Analysis"
      options={option}
    ></ChartCardWithDropdown>
  );
}
