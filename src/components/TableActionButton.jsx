import { FaEye, FaPencilAlt, FaTrash, FaUpload } from "react-icons/fa";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function TableActionButton({
	type,
	onClick,
	onView,
	onDelete,
	onUpload,
	onEdit,
}) {
	const fileInputRef = useRef(null);

	return (
		<div className="flex items-center gap-2 justify-center">
			{(onView || type === "view") && (
				<div className="cursor-pointer" onClick={onView || onClick}>
					<FaEye fill="#2e3790" />
				</div>
			)}
			{(onUpload || type === "upload") && (
				<>
					<input
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg, image/webp, image/gif"
						onChange={onUpload}
						style={{ display: "none" }}
						className={"pointer-events-auto"}
						ref={fileInputRef}
						multiple
						// disabled={isLoading}
					/>
					<div
						className="cursor-pointer"
						onClick={() => fileInputRef.current.click()}
					>
						<FaUpload fill="#7D89FF" />
					</div>
				</>
			)}
			{(onEdit || type === "edit") && (
				<div className="cursor-pointer" onClick={onDelete || onClick}>
					<FaPencilAlt fill="#2e3790" />
				</div>
			)}
			{(onDelete || type === "delete") && (
				<div className="cursor-pointer" onClick={onDelete || onClick}>
					<FaTrash fill="#ED2626" />
				</div>
			)}
		</div>
	);
}

TableActionButton.propTypes = {
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onView: PropTypes.func.isRequired,
	onUpload: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};
