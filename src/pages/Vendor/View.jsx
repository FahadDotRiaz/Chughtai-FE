import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";

import TitleSearchButton from "../../components/TitleSearchButton";
import GeneralInformation from "./components/GeneralInformation";
import BankingInformation from "./components/BankingInformation";
import GenericButton from "../../components/GenericButton";
import { PATH } from "../../../config";
import GenericMuiTable from "../../components/GenericMuiTable";
import { useGetVendorsByIDQuery } from "../../redux/slices/vendors";

const View = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const { data: vendorsByID, isLoading } = useGetVendorsByIDQuery({ id });

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
			header: "Description",
			accessorKey: "description",
			size: 200,
		},
		{
			header: "Price",
			accessorKey: "price",
			size: 120,
		},
	];

	return (
		<div>
			<TitleSearchButton title="Vendor" />
			<div>
				<Collapse
					items={[
						{
							key: "1",
							label: "General Information",
							children: (
								<GeneralInformation
									isView={true}
									vendorsData={vendorsByID}
									updateLoading={isLoading}
								/>
							),
						},
					]}
					defaultActiveKey={["1"]}
				/>
				<Collapse
					items={[
						{
							key: "2",
							label: "Banking Information",
							children: (
								<BankingInformation
									isView={true}
									vendorsData={vendorsByID}
									updateLoading={isLoading}
								/>
							),
						},
					]}
					className="mt-5"
				/>
			</div>
			<GenericMuiTable
				columns={columns}
				data={vendorsByID?.items || []}
				simpleTable
			/>
			<div className="mt-5 flex justify-end">
				<GenericButton
					type="primary"
					lable="Close"
					onClick={() => navigate(PATH.VENDOR_LIST)}
				/>
			</div>
		</div>
	);
};

export default View;
