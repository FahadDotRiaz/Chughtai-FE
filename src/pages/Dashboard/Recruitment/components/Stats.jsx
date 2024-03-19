import StatCard from "../../Shared/StatCard";
import { Row } from "antd";

const Stats = () => {
	const statsData = [
		{
			id: 0,
			title: "Head Count",
			percent: "26%",
			count: 115,
			prevYearCount: 90,
			up: true,
		},
		{
			id: 1,
			title: "Hiring",
			percent: "26%",
			count: 115,
			prevYearCount: 90,
			up: true,
		},
		{
			id: 2,
			title: "Leaving",
			percent: "26%",
			count: 115,
			prevYearCount: 90,
			up: false,
		},
		{
			id: 2,
			title: "Turn Over",
			percent: "26%",
			count: 115,
			prevYearCount: 90,
			up: false,
		},
	];
	return (
		<div>
			<Row className="justify-between" gutter={[16, 16]}>
				{statsData?.map(
					({ title, cost, percent, up, count, prevYearCount }, index) => {
						return (
							<StatCard
								key={index}
								title={title}
								up={up}
								down={!up}
								count={count}
								percent={percent}
								cost={cost}
								prevYearCount={prevYearCount}
							/>
						);
					}
				)}
			</Row>
		</div>
	);
};

export default Stats;
