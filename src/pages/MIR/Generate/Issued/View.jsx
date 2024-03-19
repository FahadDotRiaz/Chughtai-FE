/* eslint-disable react/prop-types */
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import CardButtonFilterGroup from "../../../../components/CardButtonFilterGroup";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import GenericButton from "../../../../components/GenericButton";
import GenericCard from "../../../../components/GenericCard";
import { useLazyGetSirByIdQuery } from "../../../../redux/slices/sir";

export default function View() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [getItemRequestByID, { data: sirData, isLoading, isFetching }] =
		useLazyGetSirByIdQuery();
	console.log(sirData, "sirData");
	useEffect(() => {
		if (id) {
			getItemRequestByID(id);
		}
	}, []);

	const getFormattedData = () => {
		if (sirData) {
			return sirData?.sinItems?.map((item) => {
				return {
					quantity: item?.quantity,
					totalRequested: item?.totalRequested,
					totalIssue: item?.totalIssue,
					balance: item?.balance,
					totalCancel: item?.totalCancel,
					pending: item?.pending,
					cancel: item?.cancel,
					name: item?.item?.name,
					itemCode: item?.item?.itemCode,
					itemDesc: item?.item?.description,
				};
			});
		}

		return null;
	};

	const columns = [
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
			size: 250,
			Cell: ({ cell }) => (
				<div className="wrap-description">{cell?.getValue() ?? "N/A"}</div>
			),
		},
		{
			header: "Total Requested",
			accessorKey: "totalRequested",
			size: 120,
			Cell: ({ cell }) => <div>{cell?.getValue() ?? "N/A"}</div>,
		},

		{
			header: "Total Issued",
			accessorKey: "totalIssue",
			size: 120,
			Cell: ({ cell }) => <div>{cell?.getValue() ?? "N/A"}</div>,
		},
		{
			header: "Total Cancelled",
			accessorKey: "totalCancel",
			size: 120,
			Cell: ({ cell }) => <div>{cell?.getValue() ?? "N/A"}</div>,
		},
		{
			header: "Issued",
			accessorKey: "quantity",
			size: 80,
		},
		{
			header: "Balance",
			accessorKey: "balance",
			size: 80,
		},
		{
			header: "Cancel",
			accessorKey: "cancel",
			size: 80,
		},
		{
			header: "Pending",
			accessorKey: "pending",
			size: 80,
		},
	];

	return isFetching || isLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<>
			<GenericCard>
				<TitleSearchButton
					title="View SIR"
					id={sirData?.sinNumber}
					subTitle={`Issued by ${sirData?.toDepartment}`}
				/>
			</GenericCard>
			<CardButtonFilterGroup topSpace title={{ text: "SIR Items", level: 2 }}>
				<GenericMuiTable
					columns={columns}
					data={getFormattedData() || []}
					className="cl-table"
					rowSelection={false}
					enableColumnFilters={false}
					simpleTable
					// isLoading={isLoading || isFetching}
				/>
			</CardButtonFilterGroup>

			<div className="mt-5">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(-1)}
				/>
			</div>
		</>
	);
}
