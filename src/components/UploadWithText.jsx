/* eslint-disable react/prop-types */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload, message, Skeleton, Form, Space } from "antd";
import { useEffect, useState } from "react";
import { TiZoomInOutline } from "react-icons/ti";
import IMAGES from "../assets/images";
import PropTypes from "prop-types";

export default function UploadWithText({
	isView,
	isAI,
	placeholder,
	setImgForDesc,
	isLoading,
	name,
	onChange,
	imagePreviewList,
	multiple,
	readOnly,
}) {
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);

	const [previewOpen, setPreviewOpen] = useState(false);
	const [imgForPreview, setImgForPreview] = useState([]);
	useEffect(() => {
		if (imagePreviewList) {
			setImgForPreview(imagePreviewList[0]?.file);
		}
	}, [imagePreviewList]);

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};
	const handleChange = (info) => {
		setImgForDesc(info.file.originFileObj);
		var src = URL.createObjectURL(info.file.originFileObj);
		setImageUrl(src);
	};
	useEffect(() => {
		if (isView) {
			setImageUrl(IMAGES.SIGN_IN_BG);
		}
	}, [isView]);

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	const { TextArea } = Input;
	return (
		<>
			<div className="flex items-center gap-3 border-[1px] border-#E2E5ED rounded-lg p-5 pt-6">
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader !w-fit"
					showUploadList={false}
					// action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
					beforeUpload={beforeUpload}
					multiple={multiple}
					onChange={onChange ? onChange : handleChange}
				>
					{imageUrl || imagePreviewList?.length > 0 ? (
						<div className="relative w-full">
							<img
								src={imageUrl || imagePreviewList[0]?.file}
								alt="avatar"
								className="aspect-square object-cover w-full rounded"
							/>
							{imgForPreview && (
								<span
									className="h-[25px] w-[25px] absolute top-[-11px] right-[-7px] bg-[#2e3790] rounded-full flex items-center justify-center"
									onClick={(e) => {
										e.stopPropagation();
										setPreviewOpen(true);
									}}
								>
									<TiZoomInOutline fill="white" size={19} />
								</span>
							)}
						</div>
					) : (
						uploadButton
					)}
				</Upload>
				{isLoading ? (
					<Skeleton active />
				) : (
					<Form.Item
						label={<span className="hidden" />}
						name={name ? name : "description"}
						// rules={[{required:true,message:'Required'}]}
						labelAlign="top"
						className="Input-Field"
						colon={false}
					>
						<TextArea
							rows={4}
							placeholder={placeholder}
							value={
								isView &&
								"Amoxicillin is a widely prescribed antibiotic belonging to the penicillin class, effective against a broad spectrum of bacteria. This medication is commonly used to treat various infections, such as respiratory, urinary tract, and skin infections"
							}
							className={`w-full border-y-0 border-e-0 !rounded-none ${
								isAI ? "ask-ai" : ""
							}`}
							readOnly={readOnly}
						/>
					</Form.Item>
				)}
			</div>

			{/* <Modal
				open={previewOpen}
				title={"Image Preview"}
				footer={null}
				onCancel={() => setPreviewOpen(false)}
			>
				<img
					alt="example"
					className="aspect-square object-cover rounded w-full"
					src={imageUrl}
				/>
			</Modal> */}
			<Modal
				open={previewOpen}
				title={"Image Preview"}
				footer={null}
				onCancel={() => setPreviewOpen(false)}
			>
				<img
					alt="No Image"
					className="aspect-square object-cover rounded w-full"
					src={imageUrl || imgForPreview}
				/>
				{imagePreviewList?.length > 1 && (
					<Space className="mt-4">
						{imagePreviewList?.map((i, index) => {
							return (
								<div key={index} onClick={() => setImgForPreview(i?.file)}>
									<img
										alt="No Image"
										className={`cursor-pointer w-24 h-24 aspect-square object-cover rounded ${
											imgForPreview === i.file ? "selectedImg" : ""
										}`}
										src={i?.file}
									/>
								</div>
							);
						})}
					</Space>
				)}
			</Modal>
		</>
	);
}

UploadWithText.propTypes = {
	isView: PropTypes.bool,
	isAI: PropTypes.bool,
	setImgForDesc: PropTypes.func,
	imgDescription: PropTypes.string,
	isLoading: PropTypes.bool,
	placeholder: PropTypes.bool,
};
