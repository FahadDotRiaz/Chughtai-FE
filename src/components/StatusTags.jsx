import { Tag } from "antd";
import PropTypes from "prop-types";

const StatusTags = ({ status }) => {
	switch (status) {
		case "Approved":
		case "APPROVED":
		case "Completed":
		case "COMPLETED":
		case "ISSUED":
			return <Tag className="approved-tag">{status}</Tag>;
		case "Pending":
		case "PENDING":
		case "Partial":
			return <Tag className="pending-tag">{status}</Tag>;
		case "PARTIAL_ISSUED":
		case "PARTIAL_COMPLETE":
			return (
				<Tag className="partial-tag">{status?.replace("_", " ") || status}</Tag>
			);
		case "Rejected":
		case "REJECTED":
		case "CANCELLED":
			return <Tag className="rejected-tag">{status}</Tag>;

		default:
			return "N/A";
	}
};

export default StatusTags;

StatusTags.propTypes = {
	status: PropTypes.array.isRequired,
};
