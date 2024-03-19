import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ChartCardWithDropdown from "../../Shared/ChartCardWithDropdown";

const DemandedItems = () => {
	const chartDataList = [
		{
			name: "Microscope",
			value: 40,
			color: "#00F38D",
			productivity: "Productive",
		},
		{
			name: "Centrifuge",
			value: 40,
			color: "#009EFF",
			productivity: "Unproductive",
			colorBackground: "#FFE5E4",
		},
		{
			name: "Biohazard Bags:",
			value: 100,
			color: "#00F38D",
			productivity: "Productive",
		},
		{
			name: "Tourniquet",
			value: 20,
			color: "#E4E4E4",
			productivity: "Productive",
		},
		{
			name: "Bandages",
			value: 80,
			color: "#00F38D",
			productivity: "Neutral",
		},
		{
			name: "Gauze ",
			value: 60,
			color: "#E4E4E4",
			productivity: "Neutral",
		},
		{
			name: "Needle Holders",
			value: 80,
			color: "#00F38D",
			productivity: "Neutral",
		},
		{
			name: "Syringes ",
			value: 60,
			color: "#E4E4E4",
			productivity: "Neutral",
		},
		{
			name: "Vacutainer Tubes",
			value: 80,
			color: "#00F38D",
			productivity: "Neutral",
		},
		{
			name: "Needles ",
			value: 60,
			color: "#E4E4E4",
			productivity: "Neutral",
		},
	];
	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#F875AA",
		"#5F0F40",
		"#49108B",
		"#7E30E1",
		"#E26EE5",
		"#525FE1",
		"#F86F03",
	];

	function getRandomColor() {
		const randomIndex = Math.floor(Math.random() * COLORS.length);
		return COLORS[randomIndex];
	}

	const [chartData, setChartData] = useState(chartDataList);
	const [active, setActive] = useState("A");

	let renderLabel = function (entry) {
		return entry.name;
	};

	function handleActive(value) {
		let tempList = [];
		setActive(value);
		for (let i = 0; i < chartData.length; i++) {
			if (chartData[i].productivity.toLowerCase() !== value.toLowerCase()) {
				tempList.push(chartData[i]);
			}
		}
		setChartData(tempList);
	}

	const customLegend = (
		<span className="absolute top-[9rem] right-[43rem] z-50 text-gray-500">
			<span
				className={`cursor-pointer text-lg flex items-center  ${
					active === "A" ? "font-semibold text-black" : ""
				}`}
				onClick={() => {
					handleActive("A");
				}}
			>
				<BsDot className="mr-2" size={20} style={{ color: "#2e3790" }} /> Bio
			</span>

			<span
				className={`cursor-pointer text-lg flex items-center  ${
					active === "B" ? "font-semibold text-black" : ""
				}`}
				onClick={() => {
					handleActive("B");
				}}
			>
				<BsDot className="mr-2" size={20} style={{ color: "#2e3790" }} />
				Stationary
			</span>

			<span
				className={`cursor-pointer text-lg flex items-center  ${
					active === "C" ? "font-semibold text-black" : ""
				}`}
				onClick={() => {
					handleActive("C");
				}}
			>
				<BsDot className="mr-2" size={20} style={{ color: "#2e3790" }} />
				IT
			</span>
		</span>
	);
	const deptOpt = [
		{ value: "Store A", label: "Store A" },
		{ value: "Store B", label: "Store B" },
		{ value: "Store C", label: "Store C" },
	];
	return (
		<ChartCardWithDropdown title="Top 10 Demanded Items" deptOptions={deptOpt}>
			<div className="top-custom-section">
				<div
					style={{
						width: "100%",
						height: 410,
						position: "relative",
						left: "4rem",
					}}
				>
					{customLegend}
					<ResponsiveContainer>
						<PieChart>
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								width="100%"
								outerRadius={130}
								label={renderLabel}
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={getRandomColor()}></Cell>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</ChartCardWithDropdown>
	);
};

export default DemandedItems;
