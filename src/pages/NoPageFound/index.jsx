import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function NoPage() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center h-[100vh] text-[30px]">
			<Result
				status="404"
				title="No page Found"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<div className="flex justify-center">
						<Button type="primary" onClick={() => navigate(-1)}>
							Go Back
						</Button>
					</div>
				}
			/>
		</div>
	);
}
