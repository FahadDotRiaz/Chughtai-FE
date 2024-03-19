/* eslint-disable react/prop-types */
import { Col } from "antd";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

const StatCard = ({
	title,
	cost,
	up,
	down,
	percent,
	col,
	count,
	prevMonth,
	prevYearCount,
}) => {
	return (
		<Col span={col ?? 6}>
			<div
				className="border rounded p-4"
				style={{
					boxShadow:
						"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
				}}
			>
				<div className="text-lg text-[#2e3790] font-semibold">{title}</div>
				<div className="text-[2rem]">{cost}</div>
				<div className="flex gap-2 items-center my-1">
					{count && (
						<span className="text-black text-lg font-bold">{count}</span>
					)}
					{up && (
						<>
							<BiTrendingUp fill="#23bf4f" size={18} />
							<span className="text-[#23bf4f]">{percent}</span>
						</>
					)}
					{down && (
						<>
							<BiTrendingDown fill="#dc3545" size={18} />
							<span className="text-[#dc3545]">{percent}</span>
						</>
					)}
					{prevMonth && (
						<span className="text-gray-500">vs previous month</span>
					)}
				</div>
				{prevYearCount && (
					<div className="text-gray-500 text-xs">
						Last Year:{" "}
						<span className="text-black font-semibold">{prevYearCount}</span>
					</div>
				)}
			</div>
		</Col>
	);
};

export default StatCard;
