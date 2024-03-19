/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { Space } from "antd";
import { FaCheck } from "react-icons/fa";
import GenericCard from "../../../../components/GenericCard";
import UploadWithText from "../../../../components/UploadWithText";
import InputField from "../../../../components/form/FormField";
import { AiOutlineClose } from "react-icons/ai";
import GenericTable from "../../../../components/GenericTable";
import { useState } from "react";
import { CUSTOM_ITEM_STATUS } from "../../../../utils/constant";

const SuggestedItemsCard = ({ id, form, setBtnDisable }) => {
	const [selectedItems, setSelectedItems] = useState({
		select: null,
		isAccept: false,
	});

	const hanldeAccept = (record, index) => {
		setSelectedItems({
			select: index,
			isAccept: true,
		});

		form?.setFieldValue(["customItems", id, "approvedItem"], record),
			form?.setFieldValue(["customItems", id, "acceptedItemId"], record?.id),
			form?.setFieldValue(
				["customItems", id, "status"],
				CUSTOM_ITEM_STATUS.APPROVED
			);
	};

	const hanldeReject = (record, index) => {
		setSelectedItems({
			select: index,
			isAccept: false,
		});
		form?.setFieldValue(["customItems", id, "approvedItem"], undefined),
			form?.setFieldValue(["customItems", id, "acceptedItemId"], undefined),
			form?.setFieldValue(
				["customItems", id, "status"],
				CUSTOM_ITEM_STATUS.REJECT
			);
	};

	const data = form?.getFieldValue("customItems");
	console.log(data, "DATA");
	let missingStatus = false;
	if (data) {
		for (let obj of data) {
			if (!obj?.status) {
				missingStatus = true;
				break;
			}
		}
	}
	setBtnDisable(missingStatus);

	const columns = [
		{
			title: "Item code",
			dataIndex: "itemCode",
		},
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Accept / Reject",
			dataIndex: "actions",
			// eslint-disable-next-line no-unused-vars
			render: (_, record, index) => (
				<Space className="flex justify-start ml-5 gap-6">
					{selectedItems?.select === index &&
					selectedItems?.isAccept === true ? (
						<h6 className="text-[#2FD353] font-medium">Accepted</h6>
					) : (
						<FaCheck
							fill={
								selectedItems?.select === index || selectedItems.select === null
									? "#2FD353"
									: "grey"
							}
							onClick={() => hanldeAccept(record, index)}
							className="cursor-pointer"
						/>
					)}

					{selectedItems?.select === index &&
					selectedItems?.isAccept === false ? (
						<h6 className="text-[#ED2626] font-medium">Rejected</h6>
					) : (
						<AiOutlineClose
							fill={
								selectedItems?.select === index || selectedItems.select === null
									? "#ED2626"
									: "grey"
							}
							onClick={() => hanldeReject(record, index)}
							className="cursor-pointer"
						/>
					)}
				</Space>
			),
		},
	];

	return (
		<GenericCard className="mb-5">
			<UploadWithText
				placeholder="Enter description"
				imagePreviewList={form?.getFieldValue("customItems")?.[id]?.images}
				multiple={true}
				// onChange={(event) => handleUpload(event, id)}
				name={["customItems", id, "description"]}
				readOnly={true}
			/>
			<GenericTable
				columns={columns}
				data={form?.getFieldValue("customItems")?.[id]?.suggestedItems || []}
				className="transparent mt-5"
				pagination={false}
			/>
			<InputField
				label="Remarks"
				type="textarea"
				rows={4}
				name={["customItems", id, "remarks"]}
			/>
		</GenericCard>
	);
};

export default SuggestedItemsCard;
