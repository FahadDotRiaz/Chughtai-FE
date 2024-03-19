import { Space } from "antd";
import GenericMuiTable from "../../../components/GenericMuiTable";
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericButton from "../../../components/GenericButton";
import PropTypes from "prop-types";
import { PATH } from "../../../../config";
import { useNavigate } from "react-router-dom";
import TableEditableField from "../../../components/TableEditableField";

const CreateConsumptionStep1 = ({ setStep }) => {
	const navigate = useNavigate();
	const columns = [
		{
			header: "Item Code",
			accessorKey: "code",
		},
		{
			header: "Date",
			accessorKey: "date",
		},
		{
			header: "UOM",
			accessorKey: "uom",
		},
		{
			header: "Total",
			accessorKey: "total",
		},
		{
			header: "Consume QTY",
			accessorKey: "consume",
			Cell: () => <TableEditableField field="number" defaultValue={0} />,
		},
		{
			header: "Balance",
			accessorKey: "balance",
		},
		{
			header: "Patients",
			accessorKey: "patients",
		},
	];
	const data = [
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
		{
			code: "01022344",
			key: "1",
			date: `11/13/2023`,
			uom: "Nos",
			total: "124",
			consume: "13",
			balance: "07",
			patients: "03",
		},
	];
	return (
		<>
			<TitleSearchButton title="Select Items" isPrint={true} />
			<GenericMuiTable
				columns={columns}
				data={data}
				simpleTable={true}
				rowSelection
			/>
			<Space className="flex justify-end mt-6">
				<GenericButton
					type="secondary"
					lable="Cancel"
					onClick={() => navigate(PATH.CONSUMPTION_LIST)}
				/>
				<GenericButton
					type="primary"
					lable="Add Consumption"
					onClick={() => setStep(2)}
				/>
			</Space>
		</>
	);
};

export default CreateConsumptionStep1;

CreateConsumptionStep1.propTypes = {
	setStep: PropTypes.func.isRequired,
};
