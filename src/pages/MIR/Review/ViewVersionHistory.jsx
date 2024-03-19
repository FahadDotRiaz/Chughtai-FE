import { Row, Col, Button, Flex } from "antd";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { useParams } from "react-router-dom";
import { useLazyGetItemRequestVersionHistoryByIdQuery } from "../../../redux/slices/IRF";
import { getFormattedDate } from "../../../utils/helper";
import { useEffect, useState } from "react";

const ViewVersionHistory = () => {
	const { id } = useParams();
	const [selectedSin, setSelectedSin] = useState(null);
	const [
		getVersionHistory,
		{ data: versionHistoryData = [], isLoading, isFetching },
	] = useLazyGetItemRequestVersionHistoryByIdQuery();

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const trackingListResponse = await getVersionHistory({ mirId: id });
				if (trackingListResponse) {
					setSelectedSin(trackingListResponse?.data?.sin[0]);
				}
			}
		};
		fetchData();
	}, [getVersionHistory, id]);

	const columns = [
		{
			header: "Item Code",
			accessorKey: "itemCode",
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Requisition",
			accessorKey: "quantity",
		},
	];

	const sinItems = [
		{
			header: "Item Code",
			accessorKey: "itemCode",
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Isused quantity",
			accessorKey: "quantity",
		},
	];

	const handleSinButtonClick = (sinId) => {
		const filteredData = versionHistoryData?.sin?.filter(
			(item) => item?.id === sinId
		);
		setSelectedSin(filteredData[0]);
	};

	const data = versionHistoryData?.items?.map((item) => {
		return {
			...item,
		};
	});

	const infoData = [
		{ label: "Demad Type", value: versionHistoryData?.demandType },
		{
			label: "Date",
			value: getFormattedDate(versionHistoryData?.createDateTime, "DD-MM-YYYY"),
		},
		{ label: "Remarks", value: versionHistoryData?.remarks || "N/A" },
	];

	return (
		<div>
			<GenericCard>
				{["User"].map((role, index) => {
					return (
						<div className="border-b pb-10 mb-10" key={index}>
							<TitleSearchButton title={`${role} History`} />
							<TitleSearchButton
								title="Items Requested"
								secondaryTitle
								printBtn
								scanBtn
							/>
							<GenericMuiTable
								columns={columns}
								data={data ? data : {}}
								isLoading={isLoading || isFetching}
								simpleTable
							/>
							<Row gutter={[16, 30]} className="mt-10 ">
								{infoData.map(({ label, value }, index) => {
									return (
										<Col span={8} key={index}>
											<div>
												<label>{label}</label>
												<div className="name mt-2">{value}</div>
											</div>
										</Col>
									);
								})}
							</Row>
						</div>
					);
				})}

				{versionHistoryData?.sin?.length > 0 && (
					<>
						<TitleSearchButton title="Store History" />
						<Flex className="items-baseline">
							<TitleSearchButton title="SIN Numbers:" secondaryTitle />
							{versionHistoryData?.sin?.map((item, index) => {
								return (
									<Button
										type={selectedSin?.id === item?.id ? "primary" : "link"}
										key={index}
										onClick={() => handleSinButtonClick(item?.id)}
									>
										#{item?.sinNumber}
									</Button>
								);
							})}
						</Flex>
						<GenericMuiTable
							columns={sinItems}
							data={selectedSin?.sinItems ? selectedSin?.sinItems : []}
							isLoading={isLoading || isFetching}
							simpleTable
						/>
					</>
				)}
			</GenericCard>
		</div>
	);
};

export default ViewVersionHistory;
