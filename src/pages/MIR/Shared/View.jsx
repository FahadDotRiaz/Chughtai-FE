/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Spin, Form } from "antd";
import BasicDetails from "./components/BasicDetail";
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericButton from "../../../components/GenericButton";
import { useNavigate, useParams } from "react-router-dom";
import GenericMuiTable from "../../../components/GenericMuiTable";
import GenericCard from "../../../components/GenericCard";
import { useLazyGetItemRequestByIDQuery } from "../../../redux/slices/IRF";
import { useEffect, useState } from "react";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import UploadWithText from "../../../components/UploadWithText";
import ViewAllItemsDescription from "./components/ViewAllItemsDescription";

export default function View() {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [allItemsDesc, setAllItemsDesc] = useState(false);

	const [formReRender, setFormReRender] = useState(false);
	const { id } = useParams();
	const [getItemRequestByID, { data: IRFdata, isLoading, isFetching }] =
		useLazyGetItemRequestByIDQuery();

	useEffect(() => {
		if (id) {
			getItemRequestByID({ id });
		}
	}, []);

	useEffect(() => {
		if (IRFdata) {
			IRFdata?.customItems?.map((item, index) => {
				return form?.setFieldValue(
					["customItems", index, "description"],
					item?.description
				);
			});
			setFormReRender(!formReRender);
		}
	}, [IRFdata]);

	const getFormattedData = () => {
		if (IRFdata) {
			return IRFdata?.items?.map((item) => {
				return {
					itemCode: item?.item?.itemCode,
					name: item?.item?.name,
					itemDesc: item?.item?.description,
					requisition: item?.quantity,
					approved: item?.quantity,
					issued: item?.issuedQuantity,
					cancelled: item?.cancel,
				};
			});
		}

		return null;
	};

	const MY_IRF_VIEW_COLUMN = [
		{
			header: "Item code",
			accessorKey: "itemCode",
			size: 120,
		},
		{
			header: "Name",
			accessorKey: "name",
			size: 120,
		},
		{
			header: "Item Description",
			accessorKey: "itemDesc",
			size: 200,
		},
		{
			header: "Requisition",
			accessorKey: "requisition",
			size: 120,
		},
		// {
		// 	header: "Approved",
		// 	accessorKey: "approved",
		// 	size: 120,
		// },
		{
			header: "Issued",
			accessorKey: "issued",
			size: 120,
		},
		{
			header: "Cancelled",
			accessorKey: "cancelled",
			size: 120,
			Cell: ({ cell }) => <span>{cell?.getValue() || 0}</span>,
		},
	];

	return isLoading || isFetching ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<>
			<Form
				form={form}
				key={formReRender}
				name="myForm"
				initialValues={{ remember: true }}
				// onFinish={onFinish}
			>
				<GenericCard>
					<TitleSearchButton
						title="View Inventory Requisition Form"
						id={IRFdata?.mirNumber}
						subTitle={`Generated by ${IRFdata?.fromDepartment?.name}`}
					/>
				</GenericCard>
				<CardButtonFilterGroup
					topSpace
					title={{ text: "Requested Items", level: 2 }}
				>
					<GenericMuiTable
						columns={MY_IRF_VIEW_COLUMN}
						data={getFormattedData() || []}
						className="cl-table"
						rowSelection={false}
						enableColumnFilters={false}
						simpleTable
						isLoading={isLoading || isFetching}
					/>
				</CardButtonFilterGroup>
				{IRFdata?.customItems?.length > 0 && (
					<>
						<div className="mt-5">
							{IRFdata?.customItems?.map((item, index) => {
								return (
									index === 0 && (
										<div key={item?.id} className="mt-5">
											<UploadWithText
												imagePreviewList={item?.images?.map((i) => {
													return {
														file: i,
													};
												})}
												name={["customItems", index, "description"]}
												readOnly={true}
											/>
										</div>
									)
								);
							})}
						</div>
						<div className="flex justify-end mt-3">
							<GenericButton
								className="p-0"
								type="link"
								lable="View all items description for suggestion"
								onClick={() => setAllItemsDesc(true)}
							/>
						</div>
					</>
				)}

				<div className="mt-5">
					<BasicDetails data={IRFdata} />
				</div>
				<div className="mt-5">
					<GenericButton
						type="outline"
						lable="Back"
						onClick={() => navigate(-1)}
					/>
				</div>
				<ViewAllItemsDescription
					show={allItemsDesc}
					onClose={() => setAllItemsDesc(false)}
					showSuggested={false}
					data={IRFdata?.customItems}
					title={"Asked Items"}
				/>
			</Form>
		</>
	);
}
