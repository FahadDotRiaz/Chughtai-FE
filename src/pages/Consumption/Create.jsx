import { Col, Row, Steps, Form } from "antd";
import { useEffect, useState } from "react";
import CreateConsumptionStep1 from "./components/CreateConsumptionStep1";
import CreateConsumptionStep2 from "./components/CreateConsumptionStep2";
import { useLocation } from "react-router-dom";
import { useLazyGetSirQuery } from "../../redux/slices/sir";

const Step1SelectItem = () => {
	const { state } = useLocation();
	const [selectedRows, setSelectedRows] = useState(null);
	const [form] = Form.useForm();
	Form.useWatch("items", form);
	const [step, setStep] = useState(1);
	// const { data: sin = {}, isLoading } = useGetSirQuery(state?.sinId);
	const [getSirQuery, { data: sin = {}, isLoading, isFetching }] =
		useLazyGetSirQuery();

	useEffect(() => {
		if (state) {
			getSirQuery(state?.sinId);
		}
	}, [getSirQuery, state]);

	const handleStepChange = () => {
		const selectedItem =
			selectedRows &&
			Object?.keys(selectedRows).map((key) => {
				return sin.sinItems[key];
			});
		form.setFieldsValue({ items: selectedItem });
		setStep(2);
	};

	return (
		<div>
			<Form form={form} name="myForm" initialValues={{ remember: true }}>
				<Row className="justify-center">
					<Col span={8}>
						<div className="flex justify-center align-middle">
							<Steps
								current={1}
								onChange={(a, b) => console.log("abcd", a, b)}
								items={[
									{
										title: "Select Items",
										status: step === 1 ? "process" : "wait",
									},
									{
										title: "Consumptions",
										status: step === 1 ? "wait" : "process",
									},
								]}
							/>
						</div>
					</Col>
				</Row>

				{step === 1 && (
					<CreateConsumptionStep1
						handleStepChange={handleStepChange}
						selectedFunction={{
							selected: selectedRows,
							selectedFunc: setSelectedRows,
						}}
						isLoading={isLoading}
						isFetching={isFetching}
						list={sin?.sinItems || []}
					/>
				)}
				{step === 2 && <CreateConsumptionStep2 setStep={setStep} form={form} />}
			</Form>
		</div>
	);
};

export default Step1SelectItem;
