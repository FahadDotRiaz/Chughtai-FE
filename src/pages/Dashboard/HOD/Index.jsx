import { Row, Col } from "antd";
import NearToExpiryItems from "./components/NearToExpiryItems";
import DemandedItems from "./components/DemandingItems";
import TimeTakenToReview from "./components/TimetakenToReview";
import MirHistory from "./components/MirHistory";
import MRRhistory from "./components/MrrHistory";

const Hod = () => {
	return (
		<div>
			<Row className="my-10" gutter={[16, 16]}>
				<Col span={12}>
					<NearToExpiryItems />
				</Col>
				<Col span={12}>
					<DemandedItems />
				</Col>
				<Col span={12}>
					<TimeTakenToReview />
				</Col>
				<Col span={12}>
					<MirHistory />
				</Col>
				<Col span={12}>
					<MRRhistory />
				</Col>
			</Row>
		</div>
	);
};

export default Hod;
