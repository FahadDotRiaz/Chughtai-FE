/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TitleSearchButton from "../../../components/TitleSearchButton";
import FormFieldGroup from "../../../components/form/FormFieldGroup";
import { Tag, Popover, Row, Col, Tooltip } from "antd";
import { Dropdown, Space } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PATH } from "../../../../config";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";

const SmartExpiry = () => {
	const fieldsConfig = [
		{
			type: "dropdown",
			label: "Province",
			name: "province",
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "Punjab", label: "Punjab" },
				{ value: "Sindh", label: "Sindh" },
				{ value: "KPK", label: "KPK" },
			],
		},
		{
			type: "dropdown",
			label: "City",
			name: "City",
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "Lahore", label: "Lahore" },
				{ value: "Islamabad", label: "Canada" },
				{ value: "Karachi", label: "Karachi" },
			],
		},
		{
			type: "dropdown",
			label: "Collection Center",
			name: "Collection Center",
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "usa", label: "USA" },
				{ value: "canada", label: "Canada" },
				{ value: "uk", label: "UK" },
			],
		},
		{
			type: "dropdown",
			label: "Items",
			name: "Items",
			placeholder: "Search by Name/Code",
			showSearch: true,
			rules: [{ required: true, message: "Please select this field!" }],
			options: [
				{ value: "usa", label: "USA" },
				{ value: "canada", label: "Canada" },
				{ value: "uk", label: "UK" },
			],
		},
	];

	const content = (
		<Row className="w-80 p-6">
			<Col className="font-bold flex w-full justify-between items-center pb-2">
				<span>Batches</span>
				<span>Items Quantity</span>
				<span>Expiry</span>
			</Col>
			<div className="w-full">
				{Array.from({ length: 3 }, (_, index) => {
					return (
						<Col
							className="flex w-full justify-between items-center border-b py-3"
							key={index}
						>
							<span>Batch {index + 1}</span>
							<span>200</span>
							<span>11/12/2023</span>
						</Col>
					);
				})}
			</div>
		</Row>
	);

	const items = [
		{
			label: <Link to={PATH.MIR_GENERATE}>Create IRF</Link>,
			key: "0",
		},
		{
			label: <Link to={PATH.MRR_GENERATE}>Create Store MRR</Link>,
			key: "1",
		},
	];
	const columns = [
		{
			header: "SIN",
			accessorKey: "sin",
		},
		{
			header: "Colection center",
			accessorKey: "center",
		},
		{
			header: "Item Code",
			accessorKey: "code",
		},
		{
			header: "Item Name",
			accessorKey: "name",
		},
		{
			header: "Item Description",
			accessorKey: "desc",
		},
		{
			header: "Batch#",
			accessorKey: "batch",
			// eslint-disable-next-line react/prop-types
			Cell: ({ cell }) => (
				// eslint-disable-next-line react/prop-types
				<span>
					{cell.getValue() > 1 ? (
						<div>
							Batch 1<br />
							<Popover content={content} trigger="click" placement="topLeft">
								<span className="text-[#2e3790] underline font-semibold cursor-pointer">
									+2 More
								</span>
							</Popover>
						</div>
					) : (
						cell.getValue()
					)}
				</span>
			),
		},
		{
			header: "Total QTY",
			accessorKey: "total",
		},
		{
			header: "Extra QTY",
			accessorKey: "extra",
			Cell: ({ cell }) => (
				<div>
					<Tooltip
						placement="top"
						title={
							<span className="text-[#F42424]">
								200 items are extra usage for this Collection Center for this
								month{" "}
							</span>
						}
						arrow={true}
						color="white"
					>
						<Tag className="rejected-tag">{cell?.getValue()}</Tag>
					</Tooltip>
				</div>
			),
		},
		{
			header: "Expected Demand",
			accessorKey: "demand",
		},
		{
			header: "UOM",
			accessorKey: "uom",
		},
		{
			header: "Action",
			accessorKey: "actions",
			enableColumnFilter: false,
			align: "center",
			size: 30,
			muiTableHeadCellProps: {
				align: "center",
			},
			muiTableBodyCellProps: {
				align: "center",
			},
			// eslint-disable-next-line no-unused-vars
			Cell: () => (
				<Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
					<Space className="px-4 cursor-pointer">
						<BsThreeDotsVertical size={20} />
					</Space>
				</Dropdown>
			),
		},
	];

	const data = [
		{
			sin: "0100210345",
			center: "jail road",
			code: "0201013113",
			name: "amoxicillin",
			desc: "25 OH Vitamin D 100T Ref#31",
			batch: 3,
			total: 600,
			extra: 200,
			demand: 400,
			uom: "pcs",
		},
		{
			sin: "0100210345",
			center: "jail road",
			code: "0201013113",
			name: "amoxicillin",
			desc: "25 OH Vitamin D 100T Ref#31",
			batch: 3,
			total: 600,
			extra: 200,
			demand: 400,
			uom: "pcs",
		},
		{
			sin: "0100210345",
			center: "jail road",
			code: "0201013113",
			name: "amoxicillin",
			desc: "25 OH Vitamin D 100T Ref#31",
			batch: 3,
			total: 600,
			extra: 200,
			demand: 400,
			uom: "pcs",
		},
	];
	return (
		<div>
			<TitleSearchButton title="AI Usage Detection" />
			<GenericCard>
				<FormFieldGroup
					fieldsConfig={fieldsConfig}
					// handleInputChange={handleInputChange}
				/>
				<div className="flex justify-end">
					<GenericButton type="primary" lable="Search" />
				</div>
			</GenericCard>
			<div className="my-10">
				<CardButtonFilterGroup>
					<GenericMuiTable columns={columns} data={data} />
				</CardButtonFilterGroup>
			</div>
		</div>
	);
};

export default SmartExpiry;
