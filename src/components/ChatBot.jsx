import { useState, useEffect, useRef } from "react";
import { Input, List, Avatar } from "antd";
import IMAGES from "../assets/images";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import ChatBotSlider from "./ChatBotCarasoul";
import { usePostQueryMutation } from "../redux/slices/chatBot";
const botIcon = <img src={IMAGES.CHAT_BOT} alt="" />;

const ChatBot = ({ handleCancel }) => {
	const fileInputRef = useRef(null);
	const [base64Image, setBase64Image] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [imgPreview, setImagePreview] = useState(false);
	const [messages, setMessages] = useState([
		{ content: "Hi, This is Bot. Ask me anything !", type: "bot" },
	]);
	const [inputValue, setInputValue] = useState("");
	const [postQuery, { data = null, error, isLoading }] = usePostQueryMutation();

	useEffect(() => {
		if (selectedFile) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setBase64Image(reader.result);
			};

			reader.readAsDataURL(selectedFile);
		}
	}, [selectedFile]);

	useEffect(() => {
		if (isLoading) {
			setMessages([...messages, { content: "Loading...", type: "bot" }]);
		} else if (data?.answer || error?.data) {
			const filteredMessages = messages.filter(
				(message) => message.content !== "Loading..."
			);

			setMessages([
				...filteredMessages,
				{
					content: data?.answer ? data?.answer : error?.data,
					sources: data?.sources,
					type: "bot",
				},
			]);
		}
	}, [isLoading, data, error]);

	const sendMessage = async () => {
		if (inputValue.trim() === "") return;
		setImagePreview(false);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBase64Image(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		}
		// Add the user's message to the chat
		setMessages([
			...messages,
			{ content: inputValue, type: "user", image: base64Image ?? null },
		]);
		setInputValue("");
		const formData = new FormData();
		formData.append("file", selectedFile ? selectedFile : "");

		await postQuery({
			query: inputValue,
			file: formData,
		});
		setSelectedFile(null);
		setBase64Image(null);
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		setImagePreview(true);
		const reader = new FileReader();

		reader.onloadend = () => {
			setBase64Image(reader.result);
		};

		reader.readAsDataURL(file);
	};
	return (
		<div className="chat-bot-container">
			<div className="header">
				<img src={IMAGES.CHAT_BOT} alt="#" />
				<div className="header-text">
					<p className="header-title">Hello</p> <p>Bot is here to help you</p>
				</div>
				<div className="crossButton cursor-pointer">
					<FaTimes onClick={handleCancel} />
				</div>
			</div>
			<div className="inner-div">
				<List
					itemLayout="horizontal"
					dataSource={messages}
					className="px-8 py-4"
					renderItem={(message) => (
						<>
							{message.type === "bot" && (
								<>
									<List.Item noBorder>
										<List.Item.Meta
											noBorder
											avatar={<Avatar icon={botIcon} />}
											description={
												<div className="chatBot-content">{message.content}</div>
											}
										/>
									</List.Item>
									{message.sources && message.sources.length > 0 && (
										<List.Item>
											<List.Item.Meta
												description={
													<>
														<ChatBotSlider
															items={message?.sources}
															number={2}
															isChatBot={true}
														/>
													</>
												}
											/>
										</List.Item>
									)}
								</>
							)}
							{message.type === "user" && (
								<List.Item noBorder>
									<List.Item.Meta
										noBorder
										description={
											<div className="">
												<div className="user-content">
													<div className="user-msg">{message.content}</div>
													<img src={IMAGES.USER_AVATAR} alt="" />
												</div>
												{message?.image && (
													<div className="user-content mt-3">
														<img
															src={message?.image}
															alt="Uploaded"
															style={{ maxWidth: "10rem" }}
															className="bg-[#f1f1f1] p-4"
														/>
														<img src={IMAGES.USER_AVATAR} alt="" />
													</div>
												)}
											</div>
										}
									/>
								</List.Item>
							)}
						</>
					)}
				/>
				<div className="input-text">
					<img
						src={IMAGES.FILE}
						alt=""
						onClick={() => fileInputRef.current.click()}
						className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
					/>
					<input
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg, image/webp, image/gif"
						onChange={handleFileChange}
						style={{ display: "none" }}
						className={
							isLoading ? "pointer-events-none" : "pointer-events-auto"
						}
						ref={fileInputRef}
						disabled={isLoading}
					/>
					{base64Image && imgPreview && (
						<img
							src={base64Image}
							alt="Uploaded"
							style={{ maxWidth: "4rem", maxHeight: "5rem" }}
							className="border p-1 rounded mr-2"
						/>
					)}
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onPressEnter={sendMessage}
						placeholder="Ask us a question"
						disabled={isLoading}
						suffix={
							<img
								src={IMAGES.FLY}
								alt=""
								onClick={sendMessage}
								className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
							/>
						}
						style={{ borderRadius: "20px" }}
					/>
				</div>
			</div>
		</div>
	);
};

ChatBot.propTypes = {
	handleCancel: PropTypes.func,
};

export default ChatBot;
