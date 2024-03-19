import { Col, Input, List, Avatar, Space, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoCheckmarkDone, IoCheckmarkOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { DownOutlined, PushpinFilled } from "@ant-design/icons";

const UsersList = ({ userListData, setSelectedUser, selectedUser }) => {
	const items = [
		{
			label: <div>Oldest</div>,
			key: "0",
		},
		{
			label: <div>Newest</div>,
			key: "1",
		},
	];
	return (
		<Col span={6} className="user-list">
			<Space className="block px-5 mt-5">
				<p className="msg-lable">Messages</p>
				<div className="search">
					<Input
						placeholder="Search"
						prefix={<SearchOutlined style={{ fontSize: "1rem" }} />}
					/>
				</div>
				<Space className="mb-5">
					<p className="text-sm">Sort by</p>
					<Dropdown
						menu={{
							items,
						}}
						trigger={["click"]}
						placement="bottomRight"
						className="text-lg text-[#2D9CDB]"
					>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								{items[1].label}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</Space>
			</Space>

			<List
				itemLayout="horizontal"
				dataSource={userListData}
				renderItem={(user) => (
					<>
						<List.Item
							onClick={() => setSelectedUser(user)}
							className={`user-list-items ${
								user.id === selectedUser.id ? "active" : ""
							}`}
						>
							<List.Item.Meta
								avatar={<Avatar src={user.photo} size={50} />}
								title={
									<div className="flex justify-between items-center">
										<span>
											{user.id === 1 && <PushpinFilled className="mr-2" />}
											{user.name}
										</span>
										<span className="last-seen-lable">{user.lastSeen}</span>
									</div>
								}
								description={
									user.online ? (
										<Space className="flex justify-between">
											<span>{user.recentMsg}</span>
											{user.messageStatus === "double" && (
												<span style={{ color: "green" }}>
													<IoCheckmarkDone size={16} />
												</span>
											)}
											{user.messageStatus === "single" && (
												<span style={{ color: "grey" }}>
													<IoCheckmarkOutline size={16} />
												</span>
											)}
										</Space>
									) : (
										<Space className="flex justify-between">
											<span>{user.recentMsg}</span>
											{user.messageStatus === "double" && (
												<span style={{ color: "green" }}>
													<IoCheckmarkDone size={16} />
												</span>
											)}
											{user.messageStatus === "single" && (
												<span style={{ color: "grey" }}>
													<IoCheckmarkOutline size={16} />
												</span>
											)}
										</Space>
									)
								}
							/>
						</List.Item>
					</>
				)}
			/>
		</Col>
	);
};

export default UsersList;

UsersList.propTypes = {
	userListData: PropTypes.array.isRequired,
	selectedUser: PropTypes.object.isRequired,
	setSelectedUser: PropTypes.func.isRequired,
};
