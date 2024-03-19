/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Space, Carousel, Row, Col, Spin } from "antd";
import GenericCard from "../../../../components/GenericCard";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import FormFieldGroup from "../../../../components/form/FormFieldGroup";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import AppConfirmDialog from "../../../../components/AppConfirmDialog";
import { PATH } from "../../../../../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ImageWithPreview from "../../../../components/ImageWithPreview";
import IMAGES from "../../../../assets/images";
import TableEditableField from "../../../../components/TableEditableField";
import TableActionButton from "../../../../components/TableActionButton";
import {
	useCreateIrrMutation,
	useLazyGetIrrByIdQuery,
	useUpdateIrrMutation,
} from "../../../../redux/slices/IRR";
import { usePostFileMutation } from "../../../../redux/slices/file";
import useNotification from "../../../../components/Notification";
import { useSelector } from "react-redux";
import GenericButton from "../../../../components/GenericButton";

export default function AddProof() {
	const { id } = useParams();
	const [form] = Form.useForm();
	const fileInputRef = useRef(null);
	// const [showDialog, setShowDialog] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	const [isReqCreated, setIsReqCreated] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [imgList, setImageList] = useState([]);
	const [proofImages, setProofImages] = useState([]);
	const [returnData, setReturnData] = useState({});
	const [createIrr, { isLoading: createLoading }] = useCreateIrrMutation();
	const [postFile, { isLoading }] = usePostFileMutation();
	const [getIrrByID, { data: IRRdata = {}, isLoading: irrLoading }] =
		useLazyGetIrrByIdQuery();
	const [updateIrr, { isLoading: updateLoading }] = useUpdateIrrMutation();
	const navigate = useNavigate();
	const location = useLocation();
	const addProof = location?.state;
	const { pathname } = useLocation();

	const proofUpload = (e) => {
		console.log(e.target.files, "FILES");
	};

	const columns = [
		{
			header: "",
			accessorKey: "images",
			align: "center",
			Cell: ({ cell, row }) => (
				<Space className="flex justify-center">
					<ImageWithPreview
						imgList={imgList[row?.index]?.image || cell?.getValue() || []}
					/>
				</Space>
			),
			enableColumnFilter: false,
			size: 100,
		},
		{
			header: "Item Code",
			accessorKey: "item.itemCode",
			size: 100,
		},
		{
			header: "Name",
			accessorKey: "item.name",
			size: 100,
		},
		{
			header: "Item Desc",
			accessorKey: "item.description",
			size: 200,
			Cell: ({ cell }) => (
				// eslint-disable-next-line react/prop-types
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},
		{
			header: "Total QTY",
			accessorKey: "quantity",
			size: 100,
			Cell: ({ row, cell }) => (
				<span>{row?.original?.totalQuantity || cell?.getValue()}</span>
			),
		},
		{
			header: "Return type",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) => (
				<TableEditableField
					dropdownItems={[
						{ value: "Disposal", label: "Disposal" },
						{ value: "Return", label: "Return" },
					]}
					defaultValue={{
						value: row?.original.type,
						label: row?.original.type,
					}}
					rules={[{ required: true, message: "Required" }]}
					// name={`type${row?.index}`}
					className="dropdown-editfield"
					field="dropdown"
					// onChange={(value) => handleChange(cell?.getValue(), value, "type")}
				/>
			),
		},
		{
			header: "Estimated Price",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="number"
					defaultValue={row?.original.estimatedPrice}
					// name={`estimatedPrice${row?.index}`}
					disabled={returnData && returnData[row?.index]?.type === "Return"}
					// onChange={(value) =>
					// 	handleChange(cell?.getValue(), value, "estimatedPrice")
					// }
				/>
			),
		},
		{
			header: "Return Reason",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="input"
					placeholder="Enter Reason"
					defaultValue={row?.original.returnReason}
					// name={`returnReason${row?.index}`}
					// onChange={(e) =>
					// 	handleChange(cell?.getValue(), e.target.value, "returnReason")
					// }
				/>
			),
		},
		{
			header: "Return Qty",
			accessorKey: "item.id",
			size: 150,
			Cell: ({ cell, row }) => (
				<TableEditableField
					field="number"
					defaultValue={row?.original.returnQuantity}
					max={row?.original?.quantity || row?.original?.totalQuantity}
					// name={`returnQuantity${row?.index}`}
					// onChange={(value) =>
					// 	handleChange(cell?.getValue(), value, "returnQuantity")
					// }
				/>
			),
		},

		// {
		// 	header: "actions",
		// 	accessorKey: "item.id",
		// 	size: 5,
		// 	enableColumnFilter: false,
		// 	align: "center",
		// 	muiTableHeadCellProps: {
		// 		align: "center",
		// 	},
		// 	muiTableBodyCellProps: {
		// 		align: "center",
		// 	},
		// 	Cell: ({ cell }) => (
		// 		<TableActionButton
		// 			// onDelete={() => handleDelete(cell?.getValue())}
		// 			// onUpload={(e) =>
		// 			// 	handleChange(cell?.getValue(), e.target.files, "images")
		// 			// }
		// 		/>
		// 	),
		// },
	];

	const images = [
		IMAGES.SIGN_IN_BG,
		IMAGES.SIGN_IN_BG,
		IMAGES.SIGN_IN_BG,
		IMAGES.SIGN_IN_BG,
		IMAGES.SIGN_IN_BG,
	];

	const { user } = useSelector((state) => state.auth);

	const handleSubmit = () => {
		console.log("SUBMIT");
	};

	return (
		<>
			{contextHolder}

			<GenericCard className="mb-5">
				<TitleSearchButton
					title="Add Disposal Proof"
					subTitle={`Generated by `}
					id={"000000"}
				/>
			</GenericCard>
			<TitleSearchButton title="Return Items" secondaryTitle />
			<GenericMuiTable
				columns={columns}
				data={selectedItems || []}
				simpleTable
				enableColumnFilters={false}
				maxHeight={"65vh"}
				// isLoading={irrLoading}
			/>

			{addProof && (
				<div className="mt-5">
					<TitleSearchButton title="Proof of Disposal" secondaryTitle />
					<GenericCard>
						<input
							type="file"
							id="avatar"
							name="avatar"
							accept="image/png, image/jpeg, image/webp, image/gif"
							onChange={proofUpload}
							style={{ display: "none" }}
							className={"pointer-events-auto"}
							ref={fileInputRef}
							multiple
							// disabled={isLoading}
						/>
						<TitleSearchButton
							btnLable="Upload Images"
							icon={<FaUpload />}
							onButtonChange={() => fileInputRef.current.click()}
						/>
						<Row className="justify-between">
							{images.map((imageUrl, index) => (
								<Col
									key={index}
									span={4}
									className="inline-block p-8 bg-[#f1f1f1]"
								>
									<img
										src={imageUrl}
										alt="images-gird"
										className="images-grid"
									/>
								</Col>
							))}
						</Row>
					</GenericCard>
				</div>
			)}
			<div className="flex justify-between items-center mt-6">
				<GenericButton
					lable="Back"
					type="outline"
					onClick={() => navigate(PATH.MRR_GENERATE_LIST)}
				/>
				<GenericButton
					lable={
						PATH.MRR_GENERATE === pathname
							? "Generate Request"
							: "Update Request"
					}
					type="primary"
					// onClick={handleSubmit}
					htmlType="submit"
					disabled={
						createLoading || updateLoading || selectedItems?.length === 0
					}
					loading={createLoading || updateLoading}
				/>
			</div>

			{/* <AppConfirmDialog
					showModal={showDialog?.show}
					description={`Are you sure you want to ${showDialog?.type} ?`}
					handleCancel={() => setShowDialog(false)}
					handleOk={() => setShowDialog(false)}
				/> */}
			<AppConfirmDialog
				showModal={isReqCreated}
				title={
					<div className="text-center">
						{id
							? "Request Updated Successfully"
							: "Request Generated Successfully"}
					</div>
				}
				footer={
					<GenericButton
						type="primary"
						lable="OK"
						onClick={() => navigate(PATH.MRR_GENERATE_LIST)}
					/>
				}
			/>
		</>
	);
}
