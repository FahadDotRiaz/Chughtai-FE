import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";
import ReactApexChart from "react-apexcharts";

const DepartmentPerformance = () => {
	var leadsConversionGraphCircle = {
		series: [44, 55, 41, 17],
		options: {
			plotOptions: {
				pie: {
					donut: {
						size: "50%",
					},
				},
				legend: {
					position: "right",
					offsetY: 50,
					height: 230,
				},
			},
			chart: {
				type: "donut",
			},
			dataLabels: {
				enabled: true,
				style: {
					fontSize: "12px",
					fontWeight: "500",
					fontFamily: "Inter",
				},
			},
			responsive: [
				{
					breakpoint: 744,
					options: {
						chart: {
							width: 400,
						},
					},
				},
				{
					breakpoint: 610,
					options: {
						chart: {
							width: 350,
						},
					},
				},
				{
					breakpoint: 467,
					options: {
						chart: {
							width: 320,
						},
					},
				},
			],
			colors: ["#30EB65", "#F0D15F", "#5E81F4", "#FB4D4D"],
			labels: ["Business", "Mob Dev", "Web Dev", "Accounts"],
		},
	};
	const option = [
		{ value: "Last 7 days", label: "Last 7 days" },
		{ value: "Jan", label: "Jan" },
		{ value: "Feb", label: "Feb" },
		{ value: "Mar", label: "Mar" },
		{ value: "Apr", label: "Apr" },
	];

	const deptOptions = [
		{ value: "HOD", label: "HOD" },
		{ value: "Accounts", label: "Accounts" },
		{ value: "IT", label: "IT" },
	];
	return (
		<ChartCardWithDropdown
			title="Department Performance"
			options={option}
			deptOptions={deptOptions}
		>
			<ReactApexChart
				options={leadsConversionGraphCircle.options}
				series={leadsConversionGraphCircle.series}
				type="donut"
				width={430}
			/>
		</ChartCardWithDropdown>
	);
};

export default DepartmentPerformance;
