import { Dropdown, Space } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
	FaCheck,
	FaEye,
	FaRegEdit,
	FaRegTrashAlt,
	FaUpload,
} from "react-icons/fa";
import PropTypes from "prop-types";
import IMAGES from "../assets/images";
import { AiOutlineIssuesClose } from "react-icons/ai";

export default function ActionDropdown({
	editOnClick,
	deleteOnClick,
	viewOnClick,
	reViewOnClick,
	trackOnClick,
	uploadOnClick,
	issueOnClick,
	cancelOnClick,
	assignOnClick,
	duplicateOnClick,
	manageOnClick,
	disable,
}) {
	const items = [
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						viewOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaEye /> View
				</a>
			),
			key: "0",
			show: viewOnClick !== undefined ? true : false,
			disabled: disable?.includes("viewOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						reViewOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaCheck /> Review
				</a>
			),
			key: "1",
			show: reViewOnClick !== undefined ? true : false,
			disabled: disable?.includes("reViewOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						issueOnClick();
					}}
					className="flex items-center gap-2"
				>
					<AiOutlineIssuesClose /> Issue
				</a>
			),
			key: "6",
			show: issueOnClick !== undefined ? true : false,
			disabled: disable?.includes("issueOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						editOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaRegEdit /> Edit
				</a>
			),
			key: "2",
			show: editOnClick !== undefined ? true : false,
			disabled: disable?.includes("editOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						trackOnClick();
					}}
					className="flex items-center gap-2"
				>
					<img src={IMAGES.TRACK_SVG} className="w-[14px]" /> Track
				</a>
			),
			key: "3",
			show: trackOnClick !== undefined ? true : false,
			disabled: disable?.includes("trackOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						deleteOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaRegTrashAlt /> Delete
				</a>
			),
			key: "4",
			show: deleteOnClick !== undefined ? true : false,
			disabled: disable?.includes("deleteOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						uploadOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaUpload /> Upload Image
				</a>
			),
			key: "5",
			show: uploadOnClick !== undefined ? true : false,
			disabled: disable?.includes("uploadOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						cancelOnClick();
					}}
					className="flex items-center gap-2"
				>
					<img src={IMAGES.CANCEL_SVG} className="w-[14px]" /> Cancel
				</a>
			),
			key: "6",
			show: cancelOnClick !== undefined ? true : false,
			disabled: disable?.includes("cancelOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						duplicateOnClick();
					}}
					className="flex items-center gap-2"
				>
					<img src={IMAGES.DUPLICATE_SVG} className="w-[14px]" /> Duplicate
				</a>
			),
			key: "7",
			show: duplicateOnClick !== undefined ? true : false,
			disabled: disable?.includes("duplicateOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						assignOnClick();
					}}
					className="flex items-center gap-2"
				>
					<img src={IMAGES.DUPLICATE_SVG} className="w-[14px]" /> Assign Role
				</a>
			),
			key: "8",
			show: assignOnClick !== undefined ? true : false,
			disabled: disable?.includes("assignOnClick"),
		},
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						manageOnClick();
					}}
					className="flex items-center gap-2"
				>
					<img src={IMAGES.DUPLICATE_SVG} className="w-[14px]" /> Manage Roles
				</a>
			),
			key: "9",
			show: manageOnClick !== undefined ? true : false,
			disabled: disable?.includes("manageOnClick"),
		},
	];
	const showItems = items?.filter((item) => item.show === true);
	return (
		<Dropdown
			menu={{ items: showItems }}
			trigger={["click"]}
			placement="bottomRight"
		>
			<Space className="cursor-pointer">
				<BsThreeDotsVertical size={20} />
			</Space>
		</Dropdown>
	);
}

ActionDropdown.propTypes = {
	editOnClick: PropTypes.func,
	viewOnClick: PropTypes.func,
	deleteOnClick: PropTypes.func,
	reViewOnClick: PropTypes.func,
	trackOnClick: PropTypes.func,
	uploadOnClick: PropTypes.func,
	issueOnClick: PropTypes.func,
	cancelOnClick: PropTypes.func,
	duplicateOnClick: PropTypes.func,
	assignOnClick: PropTypes.func,
	manageOnClick: PropTypes.func,
	disable: PropTypes.array,
};
