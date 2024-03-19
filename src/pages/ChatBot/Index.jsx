/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import IMAGES from "../../assets/images";
import MessageContent from "../Chat/components/MessageContent";
import GenericButton from "../../components/GenericButton";
import { Col, Avatar, Space, Input, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const ChughtaiChatBot = () => {
	// const messagesData = [
	// 	// {
	// 	// 	id: 1,
	// 	// 	senderId: 1,
	// 	// 	content: "Hello!",
	// 	// 	timestamp: "10:00 AM",
	// 	// 	status: "read",
	// 	// 	photo: IMAGES.DUMMY_USER1,
	// 	// },
	// 	// {
	// 	// 	id: 2,
	// 	// 	senderId: 2,
	// 	// 	content: "Hi there!",
	// 	// 	timestamp: "10:05 AM",
	// 	// 	status: "sent",
	// 	// 	photo: IMAGES.DUMMY_USER2,
	// 	// },
	// 	// // Messages sent by the selected user
	// 	// {
	// 	// 	id: 3,
	// 	// 	senderId: 1,
	// 	// 	content: "How are you?",
	// 	// 	timestamp: "10:10 AM",
	// 	// 	status: "sent",
	// 	// 	photo: IMAGES.DUMMY_USER3,
	// 	// },
	// 	// Add more messages as needed
	// ];
	// console.log(messagesData);
	const userListData = [
		{
			id: 1,
			name: "Chughtai Bot",
			lastSeen: "Just now",
			recentMsg: "Hello",
			online: true,
			messageStatus: "double",
			photo: IMAGES.CHAT_BOT,
		},
		{
			id: 2,
			name: "User 2",
			lastSeen: "5 minutes ago",
			recentMsg: "Hello",
			online: false,
			messageStatus: "single",
			photo: IMAGES.DUMMY_USER2,
		},
		{
			id: 3,
			name: "User 3",
			lastSeen: "16:45",
			recentMsg: "Hello",
			online: true,
			messageStatus: "none",
			photo: IMAGES.DUMMY_USER3,
		},
		// Add more users as needed
	];
	function getCurrentTime() {
		const currentDate = new Date();
		let hours = currentDate.getHours();
		let minutes = currentDate.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";

		// Convert hours to 12-hour format
		hours = hours % 12;
		hours = hours ? hours : 12; // 0 should be displayed as 12

		// Pad single-digit minutes with a leading zero
		minutes = minutes < 10 ? "0" + minutes : minutes;

		const formattedTime = `${hours}:${minutes} ${ampm}`;
		return formattedTime;
	}

	const currentTime = getCurrentTime();
	const [messagesData, setMessageData] = useState([]);
	const [initialMessageAdded, setInitialMessageAdded] = useState(false);
	useEffect(() => {
		// Add the default bot message only if it hasn't been added yet
		if (!initialMessageAdded) {
			const defaultBotMessage = {
				id: messagesData.length + 1,
				senderId: 2,
				content: "Hi, This is Chughtai AI Bot. Ask me anything !",
				timestamp: currentTime,
				status: "read",
				photo: IMAGES.CHAT_BOT,
			};

			// Filter out any existing messages with the same ID
			const filteredMessages = messagesData.filter(
				(message) => message.id !== defaultBotMessage.id
			);

			setMessageData([...filteredMessages, defaultBotMessage]);
			setInitialMessageAdded(true); // Set the flag to true to indicate the message has been added
		}
	}, [initialMessageAdded, setMessageData, messagesData]);
	const handleSendMessage = async (value) => {
		setMsg(null);
		const newSenderMessage = {
			id: messagesData.length + 1,
			senderId: 1,
			content: value,
			timestamp: currentTime,
			status: "read",
			photo: IMAGES.DUMMY_USER1,
		};

		setMessageData((prevMessages) => [...prevMessages, newSenderMessage]);


		const apiUrl = `https://pbbihgpt.xeventechnologies.com/semantic_search/qa_with_document?query=${value}`;

		try {
			const response = await axios.get(apiUrl);
			setMsg(null);

			const newResponseMessage = {
				id: messagesData.length + 2,
				senderId: 2,
				content: response.data.Response,
				timestamp: currentTime,
				status: "read",
				photo: IMAGES.CHAT_BOT,
			};
			setMessageData((prevMessages) => [...prevMessages, newResponseMessage]);
		} catch (error) {
			// Handle error
			console.error("Error:", error);
		}
	};

	// eslint-disable-next-line no-unused-vars
	const [selectedUser, setSelectedUser] = useState(userListData[0]);
	const [msg, setMsg] = useState(null);

	return (
		<div className="chatbox flex justify-center h-[calc(100vh-12rem)]">
			<ChatSection
				selectedUser={selectedUser}
				messagesData={messagesData}
				handleSendMessage={handleSendMessage}
				msg={msg}
				setMsg={setMsg}
			/>
		</div>
	);
};

export default ChughtaiChatBot;

const ChatSection = ({
	selectedUser,
	messagesData,
	handleSendMessage,
	msg,
	setMsg,
}) => {
	// const DividerLine = (
	// 	<div className="flex items-center mb-3">
	// 		<div className="flex-1  border-b"></div>
	// 		<div className="mx-4 text-[#7e7e7e]">Today</div>
	// 		<div className="flex-1 border-l border-b"></div>
	// 	</div>
	// );
	const user = useSelector((state) => state.auth);
	return (
		<Col
			span={16}
			className="message-box h-full justify-between border"
			style={{
				boxShadow:
					"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
			}}
		>
			<div className="p-2 ">
				{/* Header */}
				<div className="user-header">
					<Space>
						<Avatar src={selectedUser.photo} size={50} />
						<div className="ml-4 block">
							<span className="user-name">{selectedUser.name}</span>
							<div>
								{selectedUser.online ? (
									<span style={{ color: "#27AE60" }}>Online</span>
								) : (
									`Last seen: ${selectedUser.lastSeen}`
								)}
							</div>
						</div>
					</Space>
				</div>

				{/* Messages Section */}

				<div className="bg-white rounded p-5 h-[25rem] message-section">
					{/* {DividerLine} */}
					<MessageContent data={messagesData} selectedUser={selectedUser} />
				</div>

				{/* Footer */}
				<div className="message-footer">
					<div className="flex items-center gap-4">
						<Button icon={<PaperClipOutlined />} />
						<TextArea
							placeholder="Type your message here..."
							autoSize
							onChange={(e) => setMsg(e.target.value)}
							value={msg}
						/>
						<GenericButton
							type="primary"
							lable="Send Message"
							onClick={() => handleSendMessage(msg)}
							disabled={!msg}
						/>
					</div>
				</div>
			</div>
		</Col>
	);
};
