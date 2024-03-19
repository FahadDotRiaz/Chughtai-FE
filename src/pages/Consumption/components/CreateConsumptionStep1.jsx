import { Space } from "antd";
import GenericMuiTable from "../../../components/GenericMuiTable";
import GenericButton from "../../../components/GenericButton";
import PropTypes from "prop-types";
import { PATH } from "../../../../config";
import { useNavigate } from "react-router-dom";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";

const CreateConsumptionStep1 = ({
	handleStepChange,
	selectedFunction,
	isLoading,
	isFetching,
	list,
}) => {
	const navigate = useNavigate();
	const columns = [
		{
			header: "Item Code",
			accessorKey: "item.itemCode",
		},
		{
			header: "Name",
			accessorKey: "item.name",
		},
		{
			header: "Total",
			accessorKey: "quantity",
		},
		// {
		// 	header: "Consume QTY",
		// 	accessorKey: "consume",
		// 	Cell: () => <TableEditableField field="number" defaultValue={0} />,
		// },
		// {
		// 	header: "Balance",
		// 	accessorKey: "balance",
		// },
		// {
		// 	header: "Patients",
		// 	accessorKey: "patients",
		// },
	];
	return (
		<div className="mt-5">
			<CardButtonFilterGroup title={{ text: "Select Items", level: 1 }}>
				<GenericMuiTable
					columns={columns}
					data={list}
					simpleTable={true}
					rowSelection
					selectedRow={selectedFunction?.selected}
					setSelectedRow={selectedFunction?.selectedFunc}
					isLoading={isLoading || isFetching}
				/>
			</CardButtonFilterGroup>
			<Space className="flex justify-between items-center mt-6">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(PATH.CONSUMPTION_LIST)}
				/>
				<Space className="flex justify-end">
					<GenericButton
						type="secondary"
						lable="Cancel"
						onClick={() => navigate(PATH.CONSUMPTION_LIST)}
					/>
					<GenericButton
						disabled={
							selectedFunction?.selected === null ||
							Object.keys(selectedFunction?.selected || {})?.length === 0
						}
						type="primary"
						lable="Add Consumption"
						onClick={handleStepChange}
					/>
				</Space>
			</Space>
		</div>
	);
};

export default CreateConsumptionStep1;

CreateConsumptionStep1.propTypes = {
	setStep: PropTypes.func.isRequired,
	selectedFunction: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	list: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	handleStepChange: PropTypes.func.isRequired,
};
