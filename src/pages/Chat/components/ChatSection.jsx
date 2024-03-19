import {
	Col,
	Avatar,
	Space,
	Input,
	Button,
	Select,
	Dropdown,
	Typography,
} from "antd";
import PropTypes from "prop-types";
import GenericButton from "../../../components/GenericButton";
import { PaperClipOutlined, DownOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import GenericTabs from "../../../components/Tabs";
import MessageContent from "./MessageContent";
import { useEffect } from "react";

const { TextArea } = Input;
const { Link } = Typography;

const ChatSection = ({ selectedUser, messagesData }) => {
	const [currentMir, setCurrentMir] = useState(null);
	const [pastMir, setPastMir] = useState(null);
	const [tabData, setTabData] = useState([]);
	const [showDialog, setShowDialog] = useState(false);
	const [activeKey, setActiveKey] = useState("0");

	const items = [
		{ value: "16874343", label: "16874343" },
		{ value: "16874344", label: "16874344" },
	];

	const onChange = (value) => {
		setCurrentMir(value);
	};

	const handleEndSession = () => {
		setShowDialog(false);
		setCurrentMir(null);
		setPastMir(null);
		setTabData(null);
	};

	const onClick = ({ key }) => {
		setPastMir(key);
		setTabData([
			{
				label: "Current",
				children: (
					<MessageContent data={messagesData} selectedUser={selectedUser} />
				),
				key: "0",
				closable: false,
			},
			{
				label: <>16874343 </>,
				children: (
					<MessageContent data={messagesData} selectedUser={selectedUser} />
				),
				key: "1",
				closable: true,
			},
			{
				label: <>16874344 </>,
				children: <>Loading...</>,
				key: "2",
				closable: true,
			},
		]);
	};

	const ontabChange = (newActiveKey) => {
		setActiveKey(newActiveKey);
	};
	const remove = (targetKey) => {
		const newPanes = tabData.filter((i) => i.key !== targetKey);
		setTabData(newPanes);
		setActiveKey(newPanes[0].key);
	};

	const onEdit = (targetKey) => {
		remove(targetKey);
	};

	useEffect(() => {
		if (tabData?.length === 1) {
			setPastMir(null);
		}
	}, [tabData?.length]);

	const DividerLine = (
		<div className="flex items-center mb-3">
			<div className="flex-1  border-b"></div>
			<div className="mx-4 text-[#7e7e7e]">Today</div>
			<div className="flex-1 border-l border-b"></div>
		</div>
	);

	return (
		<Col span={18} className="message-box h-full justify-between">
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
				<div className="flex items-center gap-4 ">
					<div className="p-4 border-r">
						<Dropdown
							menu={{
								items,
								onClick,
							}}
							trigger={["click"]}
							placement="bottomRight"
							className="text-[#2e3790] hover:text-[#2e3790]"
						>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									<u>Past IRF chat</u>
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</div>
					{!currentMir ? (
						<Select
							showSearch
							placeholder="Link IRF with chat"
							options={[
								{ value: "16874343", label: "16874343" },
								{ value: "16874344", label: "16874344" },
							]}
							suffixIcon={<SearchOutlined />}
							onChange={onChange}
							className="w-[15rem]"
						/>
					) : (
						<Space>
							IRF Number:
							<Link style={{ color: "#2e3790", textDecoration: "underline" }}>
								16874343
							</Link>
						</Space>
					)}
				</div>
			</div>

			{/* Messages Section */}
			{pastMir ? (
				<div className="message-section">
					<GenericTabs
						tabData={tabData}
						onEdit={onEdit}
						activeKey={activeKey}
						defaultActiveKey={"0"}
						isEdit
						onChange={ontabChange}
					/>
				</div>
			) : (
				<div className="message-section">
					{currentMir && (
						<Space className="text-xs gap-5 text-[#8C8C8C]">
							<span>IRF Number:16874343 </span>
							<span>Date:12/11/2023</span>
						</Space>
					)}
					<div className={`${currentMir ? "bg-white rounded p-5" : ""}`}>
						{DividerLine}
						<MessageContent data={messagesData} selectedUser={selectedUser} />
					</div>
				</div>
			)}

			{/* Footer */}
			<div className="message-footer">
				<div className="flex items-center gap-4">
					<Button icon={<PaperClipOutlined />} />
					<TextArea placeholder="Type your message here..." autoSize />
					<GenericButton
						type="primary"
						lable="End Current Session"
						isDanger
						onClick={() => setShowDialog(true)}
						disabled={!currentMir}
					/>
					<GenericButton type="primary" lable="Send Message" />
				</div>
			</div>
			<AppConfirmDialog
				showModal={showDialog}
				description="Are you sure you want to end this session?"
				handleCancel={() => setShowDialog(false)}
				handleOk={handleEndSession}
			/>
		</Col>
	);
};

export default ChatSection;

ChatSection.propTypes = {
	selectedUser: PropTypes.object.isRequired,
	messagesData: PropTypes.array.isRequired,
};
