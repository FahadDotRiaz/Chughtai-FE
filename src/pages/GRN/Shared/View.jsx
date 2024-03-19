import { useParams } from "react-router-dom";
import GenericCard from "../../../components/GenericCard";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TitleSearchButton from "../../../components/TitleSearchButton";
import PropTypes from "prop-types";
import { Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../components/GenericButton";
import { useLazyGetGrnByIdQuery } from "../../../redux/slices/GRN";
import { useEffect } from "react";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import { GRN_STATUS } from "../../../utils/constant";

const View = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [getGrnByID, { data: grnData, isLoading, isFetching }] =
		useLazyGetGrnByIdQuery();

	useEffect(() => {
		if (id) {
			getGrnByID(id);
		}
	}, []);

	const columns = [
		{
			header: "Item Code",
			accessorKey: "item.itemCode",
			size: 120,
		},
		{
			header: "Description",
			accessorKey: "item.description",
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue()}</div>
			),
		},

		{
			header: "QTY Requested",
			accessorKey: "requestedQty",
			size: 120,
		},
		{
			header: "Total GRN QTY",
			accessorKey: "totalGrnQty",
			size: 120,
		},
		{
			header: "Total Cancelled",
			accessorKey: "totalCancelQty",
			size: 120,
		},
		{
			header: "GRN QTY",
			accessorKey: "grnQty",
			size: 120,
		},
		{
			header: "Balance",
			accessorKey: "balance",
			size: 120,
		},
		{
			header: "Cancel",
			accessorKey: "cancelQty",
			size: 120,
		},
		{
			header: "Remaining",
			accessorKey: "remainingQty",
			size: 120,
		},
	];

	const infoData = [
		{ label: "PO", value: grnData?.po?.poCode },
		{
			label: "IGP",
			value:
				grnData?.po?.gatePass
					?.map((i) => {
						return i?.IgpCode;
					})
					?.join(", ") || "N/A",
		},
		{ label: "Department", value: grnData?.po?.department?.name },
		// { label: "Store", value: "Head office:store warehouse" },
		// { label: "Vendor", value: "S.ejazudin & company" },
		{ label: "Remarks", value: grnData?.remarks },
	];

	const getStatus = (status) => {
		return (
			<small
				className={`${
					status === GRN_STATUS.COMPLETED
						? "text-[#34D858]"
						: status === GRN_STATUS.PENDING
						? "text-[#e5aa36]"
						: status === GRN_STATUS.REJECTED
						? "text-[#ed2626]"
						: status === GRN_STATUS.PARTIAL_COMPLETE
						? "text-[#e5661e]"
						: ""
				} text-sm ml-1`}
			>
				{status}
			</small>
		);
	};
	return isLoading || isFetching ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<div>
			<TitleSearchButton
				title={
					<>
						Goods Receiving Note (GRN: {grnData?.grnCode})
						{getStatus(grnData?.status)}
					</>
				}
				// btnLable="View Version History"
				// onButtonChange={() => navigate(PATH.GRN_VIEW_HISTORY)}
				// btnType="link"
			/>
			<CardButtonFilterGroup title={{ text: "Items Received", level: 2 }}>
				<GenericMuiTable
					columns={columns}
					data={grnData?.items || []}
					simpleTable
					isLoading={isLoading || isFetching}
				/>
			</CardButtonFilterGroup>

			<GenericCard className="my-10">
				<Row gutter={[16, 30]}>
					{infoData.map(({ label, value }, index) => {
						return (
							<Col span={label === "Remarks" ? 24 : 8} key={index}>
								<div>
									<label>{label}</label>
									<div className="name mt-2">{value}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</GenericCard>
			<div className="flex justify-between">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(-1)}
				/>
			</div>
		</div>
	);
};

export default View;

View.propTypes = {
	cell: PropTypes.number.isRequired,
};
