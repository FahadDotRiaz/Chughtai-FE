/* eslint-disable no-mixed-spaces-and-tabs */
import { Modal, Steps, Collapse, Spin } from "antd";
import PropTypes from "prop-types";
import { FaFileAlt } from "react-icons/fa";
import GenericButton from "../../../../components/GenericButton";
import { PATH } from "../../../../../config";
import { useNavigate } from "react-router-dom";
import { useLazyGetTrackingListByIdQuery } from "../../../../redux/slices/tracker";
import { useEffect, useState } from "react";
import { TRACKING_ACTION_TYPE } from "../../../../utils/constant";
function OrderTrackModal({ show, onClose, isTrackId, trackType }) {
  
  const navigate = useNavigate();
  const [isSteps, setIsSteps] = useState([]);
  const [getTrackingList, { data: trackingList = [], isLoading, isFetching }] =
    useLazyGetTrackingListByIdQuery();
 
  useEffect(() => {
    const fetchData = async () => {
      if (isTrackId) {
        const trackingListResponse = await getTrackingList(isTrackId);
        if (trackingListResponse) {
          const status =
            trackType === "grn"
              ? ["user", "hod"].map((type) =>
                  getUserInfo(type, trackingListResponse)
                )
              : ["user", "hod", "store"].map((type) =>
                  getUserInfo(type, trackingListResponse)
                );
          
          setIsSteps(status);
        }
      }
    };
    fetchData();
  }, [getTrackingList, isTrackId]);

	const getUserInfo = (type, list) => {
		if (type === "user") {
			const filteredActions = list?.data?.list
				?.filter((item) =>
					[TRACKING_ACTION_TYPE.USER_CREATED].includes(item.action)
				)
				.map((item) => item.action);
			const hasUserCreated = filteredActions.includes(
				TRACKING_ACTION_TYPE.USER_CREATED
			);
			let status;
			let description;
			if (hasUserCreated) {
				status = "finish";
				description = "Complete";
			} else {
				status = "wait";
				description = "Pending";
			}

			return {
				header: "User",
				title: "User",
				status,
				description,
			};
		} else if (type === "hod") {
			const filteredActions = list?.data?.list
				?.filter((item) =>
					[
						TRACKING_ACTION_TYPE.USER_CREATED,
						TRACKING_ACTION_TYPE.HOD_APPROVED,
						TRACKING_ACTION_TYPE.HOD_REJECTED,
					].includes(item.action)
				)
				.map((item) => item.action);

			const hasUserCreated = filteredActions.includes(
				TRACKING_ACTION_TYPE.USER_CREATED
			);
			const hasHodApproved = filteredActions.includes(
				TRACKING_ACTION_TYPE.HOD_APPROVED
			);
			const hasHodRejected = filteredActions.includes(
				TRACKING_ACTION_TYPE.HOD_REJECTED
			);

			let status;
			let description;

			if (hasHodRejected) {
				status = "error";
				description = "Reject";
			} else if (hasUserCreated && hasHodApproved) {
				status = "finish";
				description = "Complete";
			} else if (hasUserCreated && !hasHodApproved) {
				status = "process";
				description = "In Progress";
			} else {
				status = "wait";
				description = "Pending";
			}

			return (
				list?.data?.isReview && {
					header: "Hod",
					title: "Hod",
					status,
					description,
				}
			);
		} else if (type === "store") {
			const filteredActions = list?.data?.list
				?.filter((item) =>
					[
						TRACKING_ACTION_TYPE.USER_CREATED,
						TRACKING_ACTION_TYPE.HOD_APPROVED,
						TRACKING_ACTION_TYPE.HOD_REJECTED,
						TRACKING_ACTION_TYPE.STORE_ISSUED,
						TRACKING_ACTION_TYPE.STORE_ACCEPT,
					].includes(item.action)
				)
				.map((item) => item.action);

			const hasUserCreated = filteredActions.includes(
				TRACKING_ACTION_TYPE.USER_CREATED
			);
			const hasHodApproved = filteredActions.includes(
				TRACKING_ACTION_TYPE.HOD_APPROVED
			);
			const hasStoreIssued = filteredActions.includes(
				TRACKING_ACTION_TYPE.STORE_ISSUED
			);
			const hasStoreAccept = filteredActions.includes(
				TRACKING_ACTION_TYPE.STORE_ACCEPT
			);
			const hasStoreRejected = filteredActions.includes("STORE_REJECTED");
			let status;
			let description;
			if (hasStoreRejected) {
				status = "error";
				description = "Reject";
			} else if (
				(hasUserCreated &&
					hasHodApproved &&
					(hasStoreIssued || hasStoreAccept)) ||
				(hasUserCreated && !hasHodApproved && hasStoreAccept) ||
				(hasUserCreated &&
					!hasHodApproved &&
					hasStoreIssued &&
					!list?.data?.isReview)
			) {
				status = "finish";
				description = "Complete";
			} else if (
				(hasUserCreated && hasHodApproved && !hasStoreIssued) ||
				(hasUserCreated && hasHodApproved && !hasStoreAccept) ||
				(hasUserCreated &&
					!hasHodApproved &&
					!hasStoreIssued &&
					!list?.data?.isReview)
			) {
				status = "process";
				description = "In Progress";
			} else {
				status = "wait";
				description = "Pending";
			}
			return {
				header: "Store",
				title: "Store",
				status,
				description,
			};
		}
	};

	const items = [
		{
			key: "1",
			label: "View Logs",
			children: (
				<>
					{trackingList?.list?.map((item, index) => {
						let message = "";
						switch (item?.action) {
							case TRACKING_ACTION_TYPE.USER_CREATED:
								message = trackingList?.isReview
									? `Request created and moved to the HOD for approval on ${
											item?.timestamp?.split("T")?.[0]
									  }.`
									: `Request created and moved to the Store for approval on ${
											item?.timestamp?.split("T")?.[0]
									  }.`;
								break;
							case TRACKING_ACTION_TYPE.HOD_APPROVED:
								message = `HOD approved the request on ${
									item?.timestamp?.split("T")?.[0]
								}.`;
								break;
							case TRACKING_ACTION_TYPE.HOD_REJECTED:
								message = `HOD rejected the request on ${
									item?.timestamp?.split("T")?.[0]
								}.`;
								break;
							case TRACKING_ACTION_TYPE.STORE_ISSUED:
								message = `Store issued on ${
									item?.timestamp?.split("T")?.[0]
								}.`;
								break;
							case TRACKING_ACTION_TYPE.STORE_ACCEPT:
								message = `Store accept on ${
									item?.timestamp?.split("T")?.[0]
								}.`;
								break;
							case "STORE_REJECTED":
								message = `Store rejected the request on ${
									item?.timestamp?.split("T")?.[0]
								}.`;
								break;
							default:
								break;
						}
						return (
							<div
								key={index}
								size={9}
								className="mb-2 flex gap-2 items-center"
							>
								<FaFileAlt />
								<div>{message}</div>
							</div>
						);
					})}
				</>
			),
		},
	];

	return (
		<Modal
			centered
			open={show}
			onOk={onClose}
			onCancel={onClose}
			width={800}
			footer={null}
		>
			{isFetching || isLoading ? (
				<div className="text-center">
					<Spin />
				</div>
			) : (
				<div className="pt-14 pb-2">
					<Steps
						labelPlacement="vertical"
						current={1}
						className="order-track-steps"
						// items={[
						//   getStepInfo("user"),

						//   // {
						//   //   header: "HOD",
						//   //   title: "HOD",
						//   //   description: description,
						//   //   status: getHODStatus(),
						//   // },
						//   // {
						//   //   header: "Audit",
						//   //   title: "Audit",
						//   //   description: "Complete",
						//   //   status: getStatus("ISSUED"),
						//   // },
						//   // {
						//   //   header: "Store",
						//   //   title: "Store",
						//   //   description: getDescription(),
						//   //   status: getStoreStatus(),
						//   //   // description: "reject",
						//   //   // status: "error",
						//   // },
						//   // {
						//   //   header: "Issuance",
						//   //   title: "Issuance",
						//   //   description: "Pending",
						//   //   status: "wait",
						//   // },
						// ]}
						items={isSteps}
					/>
				</div>
			)}
			<div className="flex justify-end mb-3">
				<GenericButton
					type="link"
					lable="View Version History"
					onClick={() =>
						navigate(PATH.MIR_VIEW_VERSION_HISTORY.replace(":id", isTrackId))
					}
				/>
			</div>
			<Collapse accordion items={items} bordered={false} />
		</Modal>
	);
}

export default OrderTrackModal;

OrderTrackModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.bool.isRequired,
	isTrackId: PropTypes.node.isRequired,
	trackType: PropTypes.node.isRequired,
};
