import { Col, Row } from "antd";
import PropTypes from "prop-types";

function GenericCard({ children, className }) {
	return (
		<Row justify="center" align="middle" className={className}>
			<Col span={24}>
				<div className="card">{children}</div>
			</Col>
		</Row>
	);
}

export default GenericCard;

GenericCard.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
