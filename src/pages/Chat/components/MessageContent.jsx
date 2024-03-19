import { Avatar, Space } from "antd";
import { IoCheckmarkDone, IoCheckmarkOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const MessageContent = ({ data, selectedUser }) => {
	return (
		<>
			{data?.map((message) => (
				<div
					key={message.id}
					style={{
						display: "flex",
						justifyContent:
							message.senderId === selectedUser.id ? "flex-end" : "flex-start",
						marginBottom: "10px",
						marginTop: "10px",
					}}
				>
					<Avatar src={message.photo} style={{ marginRight: "10px" }} />
					<div
						className={`message-card ${
							message.senderId === selectedUser.id ? "sender" : "receiver"
						}`}
					>
						<div>{message.content}</div>
						<Space
							className="timestamp"
							// style={{ fontSize: "12px", color: "#FFFFFFBF" }}
						>
							{message.senderId === selectedUser.id && (
								<span>
									{message.status === "read" ? (
										<span style={{ color: "green" }}>
											<IoCheckmarkDone size={16} />
										</span>
									) : (
										<span style={{ color: "grey" }}>
											<IoCheckmarkOutline size={16} />
										</span>
									)}
								</span>
							)}
							<span>{message.timestamp}</span>
						</Space>
					</div>
				</div>
			))}
		</>
	);
};

export default MessageContent;

MessageContent.propTypes = {
	selectedUser: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
};
