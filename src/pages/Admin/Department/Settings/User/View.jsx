import { PATH } from "../../../../../../config";
import GenericButton from "../../../../../components/GenericButton";
import GenericCard from "../../../../../components/GenericCard";
import TitleSearchButton from "../../../../../components/TitleSearchButton";
import { Row, Col, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetUserByIdQuery } from "../../../../../redux/slices/users";
import { useEffect } from "react";

const View = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [getUserByID, { data: userData, isLoading: getByIdLoading }] =
		useLazyGetUserByIdQuery();

	useEffect(() => {
		if (id) {
			getUserByID(id);
		}
	}, []);
	const fieldsConfig = [
		{
			label: "Username",
			name: userData?.username,
		},
		{
			label: "Email",
			name: userData?.email,
		},
		{
			label: "Contact",
			name: userData?.contact,
		},
		{
			label: "CNIC",
			name: userData?.cnic,
		},
		{
			label: "Currently Assigned Department",
			name: userData?.roles?.map((role, index) => (
				<span key={role.department?.id}>
					{`${role.department?.name}${
						index !== userData.roles.length - 1 ? ", " : ""
					}`}
				</span>
			)),
		},
		{
			label: "Currently Assigned Role",
			name: userData?.roles?.map((role, index) => (
				<span key={role?.id}>
					{`${role?.name}${index !== userData.roles.length - 1 ? ", " : ""}`}
				</span>
			)),
		},
	];

	return getByIdLoading ? (
		<div className="text-center">
			<Spin />
		</div>
	) : (
		<div>
			<TitleSearchButton title="User" printBtn />
			<GenericCard>
				<Row gutter={[16, 30]}>
					{fieldsConfig.map((item, index) => {
						return (
							<Col span={8} key={index}>
								<div>
									<label>{item.label}</label>
									<div className="name mt-3">{item.name}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</GenericCard>
			<div className="mt-5 flex justify-end">
				<GenericButton
					type="outline"
					lable="Back"
					onClick={() => navigate(PATH.ADMIN_USER_LIST)}
				/>
			</div>
		</div>
	);
};

export default View;
