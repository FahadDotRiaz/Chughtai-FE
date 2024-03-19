/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UploadWithText from "../../../components/UploadWithText";
import { FaPlus } from "react-icons/fa";
import GenericButton from "../../../components/GenericButton";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { usePostFileMutation } from "../../../redux/slices/file";

const CustomItems = ({ form, addCustomItem, setAddCustomItem }) => {
	const [formReRender, setFormReRender] = useState(false);
	const [postFile] = usePostFileMutation();

	useEffect(() => {
		if (!form?.getFieldValue("customItems")) {
			const itemId = uuidv4();
			form?.setFieldValue(["customItems", itemId, "description"], "");
			form?.setFieldValue(["customItems", itemId, "images"], "");
			form?.setFieldValue(["customItems", itemId, "id"], itemId);
			setFormReRender(!formReRender);
		}
	}, []);

	const handleAddButtonClick = () => {
		const newId = uuidv4();
		form?.setFieldValue(["customItems", newId, "id"], newId);
		setFormReRender(!formReRender);
	};

	const handleDelete = (id) => {
		const customItemsArray = Object.values(
			form?.getFieldValue("customItems") || {}
		);
		const updated = customItemsArray?.filter((item) => item?.id !== id);
		const customObject = updated.reduce((acc, item) => {
			acc[item.id] = item;
			return acc;
		}, {});

		if (updated?.length === 0) {
			setAddCustomItem({ ...addCustomItem, custom: false });
		}
		form?.setFieldValue("customItems", customObject);
		setFormReRender(!formReRender);
	};

	const handleUpload = async (event, index) => {
		const files = event?.fileList;
		const formDataArray = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i]?.originFileObj;
			const formData = new FormData();
			formData.append("file", file);
			formDataArray.push(formData);
		}

		try {
			const responses = await Promise.all(
				formDataArray.map((formData) => postFile(formData))
			);

			const fileLocations = responses.map((response) => ({
				file: response?.data?.location,
			}));

			form?.setFieldValue(["customItems", index, "images"], fileLocations);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<div>
			{Object.values(form?.getFieldValue("customItems") || [])?.map(
				(upload) => (
					<div key={upload.id} className="mt-5">
						<div
							className="flex justify-end position-relative top-[11px] left-[11px] cursor-pointer"
							onClick={() => handleDelete(upload?.id)}
						>
							<span className="rounded-full p-1 bg-[#ED2626]">
								<AiOutlineClose fill="white" />
							</span>
						</div>
						<UploadWithText
							placeholder="Enter description"
							imagePreviewList={
								form?.getFieldValue("customItems")?.[upload?.id]?.images
							}
							multiple={true}
							onChange={(event) => handleUpload(event, upload?.id)}
							name={["customItems", upload?.id, "description"]}
						/>
					</div>
				)
			)}

			{Object?.values(form?.getFieldValue("customItems") || [])?.length > 0 && (
				<div className="flex justify-end mt-5">
					<GenericButton
						lable="Add more"
						icon={<FaPlus />}
						type="primary"
						onClick={handleAddButtonClick}
					/>
				</div>
			)}
		</div>
	);
};

export default CustomItems;
