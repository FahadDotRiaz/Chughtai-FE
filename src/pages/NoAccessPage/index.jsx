import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function UnAuthorized() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center h-[100vh] text-[30px]">
			<Result
				status="403"
				title="403"
				subTitle="Sorry, you are not authorized to access this page."
				extra={
					<div className="!flex !justify-center">
						<Button type="primary" onClick={() => navigate(-1)}>
							Go Back
						</Button>
					</div>
				}
			/>
		</div>
	);
}
