import { useState } from "react";
import { Row } from "antd";
import IMAGES from "../../assets/images";
import UsersList from "./components/UsersList";
import ChatSection from "./components/ChatSection";

const Chats = () => {
	const messagesData = [
		{
			id: 1,
			senderId: 1,
			content: "Hello!",
			timestamp: "10:00 AM",
			status: "read",
			photo: IMAGES.DUMMY_USER1,
		},
		{
			id: 2,
			senderId: 2,
			content: "Hi there!",
			timestamp: "10:05 AM",
			status: "sent",
			photo: IMAGES.DUMMY_USER2,
		},

		// Messages sent by the selected user
		{
			id: 3,
			senderId: 1,
			content: "How are you?",
			timestamp: "10:10 AM",
			status: "sent",
			photo: IMAGES.DUMMY_USER3,
		},
		// Add more messages as needed
	];
	const userListData = [
		{
			id: 1,
			name: "User 1",
			lastSeen: "Just now",
			recentMsg: "Hello",
			online: true,
			messageStatus: "double",
			photo: IMAGES.DUMMY_USER1,
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

	const [selectedUser, setSelectedUser] = useState(userListData[0]);

	return (
		<div className="chatbox flex flex-col h-[calc(100vh-6rem)]">
			<Row style={{ flex: 1 }}>
				<UsersList
					setSelectedUser={setSelectedUser}
					selectedUser={selectedUser}
					userListData={userListData}
				/>
				<ChatSection selectedUser={selectedUser} messagesData={messagesData} />
			</Row>
		</div>
	);
};

export default Chats;
