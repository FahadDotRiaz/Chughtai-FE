/* eslint-disable react/prop-types */
import { useState } from "react";
import { TiZoomInOutline } from "react-icons/ti";
import { Modal, Space } from "antd";
import IMAGES from "../assets/images";

const ImageWithPreview = ({ imgList }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [imgForPreview, setImgForPreview] = useState(imgList[0]);

	return (
		<>
			<div className="relative">
				<img
					src={imgList[0]?.img || imgList[0] || IMAGES.NOIMG}
					alt="avatar"
					className="aspect-square object-cover rounded h-14 w-14"
				/>
				{imgList[0] && (
					<span
						className="h-[22px] w-[22px] absolute top-[-0.75rem] left-[2.7rem] bg-[#2e3790] rounded-full flex items-center justify-center cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							setPreviewOpen(true);
						}}
					>
						<TiZoomInOutline fill="white" size={19} />
					</span>
				)}
			</div>
			<Modal
				open={previewOpen}
				title={"Image Preview"}
				footer={null}
				onCancel={() => setPreviewOpen(false)}
			>
				<img
					alt="No Image"
					className="aspect-square object-cover rounded w-full"
					src={imgList[0] || imgForPreview?.img || imgForPreview}
				/>
				{imgList?.length > 1 && (
					<Space className="mt-4">
						{imgList?.map((i, index) => {
							return (
								<div key={index} onClick={() => setImgForPreview(i)}>
									<img
										alt="No Image"
										className={`cursor-pointer w-24 h-24 aspect-square object-cover rounded ${
											imgForPreview === i ? "selectedImg" : ""
										}`}
										src={i.img || i || i[0]}
									/>
								</div>
							);
						})}
					</Space>
				)}
			</Modal>
		</>
	);
};

export default ImageWithPreview;
