import { Space } from "antd";
import GenericCard from "../../../../components/GenericCard";
import UploadWithText from "../../../../components/UploadWithText";
import GenericTable from "../../../../components/GenericTable";
import GenericButton from "../../../../components/GenericButton";
import { useState } from "react";
import ViewAllItemsDescription from "./ViewAllItemsDescription";

const SuggestedItemsCardStore = () => {
	const [requestedItemView, setRequestedItemView] = useState(false);

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
			dataIndex: "itemDesc",
		},
		{
			title: "Accept / Reject",
			dataIndex: "status",
			// eslint-disable-next-line no-unused-vars
			render: (_, record) => (
				<Space className="flex justify-start ml-5 gap-6">
					{record.status === "Approved" ? (
						<span style={{ color: "#2FD353" }}>Accepted</span>
					) : (
						<span style={{ color: "#ED2626" }}>Rejected</span>
					)}
				</Space>
			),
		},
	];
	const data = [
		{
			itemCode: "01222320",
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#31",
			status: "Approved",
		},
		{
			itemCode: "01222320",
			name: "Amoxicillin",
			itemDesc: "25 OH Vitamin D 100T Ref#31",
			status: "Rejected",
		},
	];
	return (
		<>
			<GenericCard className="mb-5">
				<UploadWithText isView={true} />
				<GenericTable
					columns={columns}
					data={data}
					className="transparent mt-5"
					pagination={false}
				/>
				<div className="flex justify-end mt-4">
					<GenericButton
						type="primary"
						lable="Suggest Item"
						onClick={() => setRequestedItemView(true)}
					/>
				</div>
			</GenericCard>
			<ViewAllItemsDescription
				show={requestedItemView}
				isSingle={true}
				onClose={() => setRequestedItemView(false)}
			/>
		</>
	);
};

export default SuggestedItemsCardStore;
