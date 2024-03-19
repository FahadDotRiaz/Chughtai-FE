/* eslint-disable no-debugger */
/* eslint-disable no-mixed-spaces-and-tabs */
import TitleSearchButton from "../../../components/TitleSearchButton";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicDetails from "../Shared/components/BasicDetail";
import GenericButton from "../../../components/GenericButton";
import ViewAllItemsDescription from "../Shared/components/ViewAllItemsDescription";
import { PATH } from "../../../../config";
// import RequestItemDetail from "../Shared/components/RequestItemDetail";
import TableActionButton from "../../../components/TableActionButton";
import RequestItemView from "./components/RequestItemView";
// import ExpirableItemsModal from "./components/ExpirableItemsModal";
import TableEditableField from "../../../components/TableEditableField";
import AppConfirmDialog from "../../../components/AppConfirmDialog";
import PropTypes from "prop-types";
import GenericCard from "../../../components/GenericCard";
// import { Tooltip } from "react-tooltip";
import {
  useGetItemRequestByIDQuery,
  useIssueItemRequestMutation,
} from "../../../redux/slices/IRF";
import { Spin, Form } from "antd";
import useNotification from "../../../components/Notification";
import ItemDetails from "../../../components/ItemDetails";
import FullScreenLoader from "../../../components/FullScreenLoader";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";
import UploadWithText from "../../../components/UploadWithText";
export default function Issue() {
  const [form] = Form.useForm();
  Form.useWatch("items", form);
  const [formReRender, setFormReRender] = useState(false);
  const { openNotification, contextHolder } = useNotification();
  const [allItemsDesc, setAllItemsDesc] = useState(false);
  const [requestedItemView, setRequestedItemView] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isItemIssued, setIsItemIssued] = useState(false);
  const [itemView, setItemView] = useState({
    item: null,
    show: false,
  });

  const { id } = useParams();
  const [issueItemRequest, { isLoading: issueLoading }] =
    useIssueItemRequestMutation();
  const {
    data: ItemsList,
    isLoading,
    isFetching,
  } = useGetItemRequestByIDQuery({ id });

	const partial = ItemsList?.status === "PARTIAL_ISSUED";
	useEffect(() => {
		if (ItemsList) {
			const itemsForIssue = ItemsList.items.map((item) => ({
				itemId: item.item.id,
				issuedQty: item?.totalInventoryQty
					? partial
						? item.pending
						: item.quantity
					: 0,
				cancel: item?.cancel || 0,
				pending: item?.pending || 0,
				balance: item?.balance || 0,
				totalInventoryQty: item?.totalInventoryQty,
			}));
			form.setFieldValue("items", itemsForIssue);
			ItemsList?.customItems?.map((item, index) => {
				return form?.setFieldValue(
					["customItems", index, "description"],
					item?.description
				);
			});
			setFormReRender(!formReRender);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form]);

  const getFormattedData = () => {
    if (ItemsList) {
      return ItemsList?.items?.map((item) => {
        return {
          id: item?.item?.id,
          itemCode: item?.item?.itemCode,
          name: item?.item?.name,
          itemDesc: item?.item?.description,
          requisition: item?.quantity,
          approved: item?.quantity,
          issuedQuantity: item?.issuedQuantity,
          pending: item?.pending,
          cancel: item?.cancel,
          balance: item?.balance,
          totalInventoryQty: item?.totalInventoryQty,
        };
      });
    }

    return null;
  };

  const checkItemsSuggestion = (data) => {
    return data?.every((item) => {
      if (item?.itemId === null || item?.suggestedItems === undefined) {
        return false;
      }
      return true;
    });
  };

  const checkInHandQty = (data) => {
    return data?.every((item) => {
      if (item?.totalInventoryQty === 0 && item?.cancel === 0) {
        return true;
      }
      return false;
    });
  };

  const handleOK = async () => {
    const customItems = form.getFieldValue("customItems");
    const finalData = {
      mirlId: id,
      items: form.getFieldValue("items")?.map((item) => ({
        itemId: item?.itemId,
        issuedQty: item?.issuedQty,
        cancel: item?.cancel || 0,
        pending: item?.pending || 0,
        balance:
          !item?.totalInventoryQty && item?.cancel === 0
            ? item?.pending
            : item?.balance || 0,
      })),
      customItems:
        customItems?.map((item) => ({
          itemId: item?.itemId,
          suggestedItems: item?.suggestedItems,
        })) || [],
    };
    const { error } = await issueItemRequest({ finalData });
    if (!error) {
      setIsItemIssued(true);
    } else {
      openNotification("error", error?.message || "Error issuing request");
    }
    setShowDialog(false);
  };

	const handleIssue = () => {
		form?.validateFields().then(() => {
			const data = form?.getFieldValue("items");
			const customItems = form.getFieldValue("customItems");
			if (data?.length > 0 && checkInHandQty(data)) {
				openNotification("error", "You can't issue out of stock items");
			} else if (customItems && customItems.length > 0) {
				if (checkItemsSuggestion(customItems)) {
					setShowDialog(true);
				} else {
					openNotification("error", "One of the Item's suggestions is empty");
				}
			} else {
				setShowDialog(true);
			}
		});
	};

  const navigate = useNavigate();

  const getPendingAndBalance = (index) => {
    const formValues = form.getFieldValue("items")?.[index];
    const balance =
      (partial
        ? getFormattedData()[index]?.pending
        : getFormattedData()[index]?.approved) - formValues?.issuedQty || 0;
    const pending = Math.max(balance - (formValues?.cancel || 0), 0);

    const cancelMax = Math.max(balance, 0);
    return {
      balance: balance,
      cancelMax: cancelMax,
      pending: pending,
    };
  };

  const handleOtherValues = (row) => {
    form.setFieldValue(
      ["items", row.index, "balance"],
      getPendingAndBalance(row?.index)?.balance
    );
    form.setFieldValue(
      ["items", row.index, "pending"],
      getPendingAndBalance(row?.index)?.pending
    );
  };

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
      header: "Item Description",
      accessorKey: "itemDesc",
      size: 200,
      Cell: ({ cell }) => (
        <div className="wrap-description">{cell.getValue()}</div>
      ),
    },

    {
      header: "Requisition",
      accessorKey: "requisition",
      Cell: ({ cell }) => {
        return (
          <span>{cell.getValue()}</span>
          // <div>
          // 	<Tooltip
          // 		id={row.index === 0}
          // 		place="right"
          // 		content="Anomaly Found"
          // 		style={{ backgroundColor: "white", color: "red" }}
          // 		isOpen={row.index === 0}
          // 	/>
          // 	<span data-tooltip-id={row.index === 0}>{cell.getValue()}</span>
          // </div>
        );
      },
    },
    {
      header: "AI Suggested",
      accessorKey: "requisition",
      size: 150,
    },
    // {
    // 	header: "Approved",
    // 	accessorKey: "approved",
    // 	size: 120,
    // },
    {
      header: "Total Issued",
      accessorKey: "issuedQuantity",
      size: 120,
    },
    {
      header: "Total Cancelled",
      accessorKey: "cancel",
      size: 120,
      Cell: ({ cell }) => <span>{cell?.getValue() || 0}</span>,
    },
    {
      header: "In-Hand Qty",
      accessorKey: "totalInventoryQty",
      size: 120,
      Cell: ({ cell }) => <span>{cell?.getValue() || "N/A"}</span>,
    },
    {
      header: "Issue",
      accessorKey: "issuedQty",
      size: 120,
      Cell: ({ cell, row }) => (
        <TableEditableField
          field="number"
          defaultValue={cell?.getValue()}
          max={
            (partial ? row?.original?.pending : row?.original?.requisition) ||
            row?.original?.totalInventoryQty
          }
          name="issuedQty"
          disabled={!row?.original?.totalInventoryQty}
          isArray={true}
          index={row?.index}
          onChange={() => handleOtherValues(row, cell)}
          rules={[
            {
              type: "number",
              max: row?.original?.totalInventoryQty,
              min: 0,
              message: "Qty Exceed",
            },
            { required: true, message: "Required" },
          ]}
        />
      ),
    },
    {
      header: "Balance",
      accessorKey: "balance",
      size: 120,
      Cell: ({ row }) => getPendingAndBalance(row?.index)?.balance,
    },

    {
      header: "Cancel",
      accessorKey: "cancelQty",
      size: 120,
      Cell: ({ cell, row }) => (
        <TableEditableField
          field="number"
          defaultValue={row?.original?.cancel}
          max={getPendingAndBalance(row?.index)?.cancelMax}
          min={0}
          name="cancel"
          isArray={true}
          index={row?.index}
          onChange={() => handleOtherValues(row, cell)}
          rules={[
            {
              type: "number",
              max: getPendingAndBalance(row?.index)?.cancelMax,
              min: 0,
              message: "Qty Exceed",
            },
            { required: true, message: "Required" },
          ]}
        />
      ),
    },
    {
      header: "Pending",
      accessorKey: "pending",
      size: 120,
      Cell: ({ row }) => getPendingAndBalance(row?.index)?.pending,
    },

    // {
    // 	header: "Item Suggestions",
    // 	accessorKey: "suggestions",
    // 	size: 120,
    // 	Cell: () => (
    // 		<TableEditableField field="dropdown" dropdownItems={suggestions} />
    // 	),
    // },
    {
      header: "actions",
      accessorKey: "actions",
      enableColumnFilter: false,
      size: 30,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ row }) => (
        <TableActionButton
          //   type="view"
          //   onClick={() => setRequestedItemView(true)}
          onView={() =>
            setItemView({
              item: row?.original,
              show: true,
            })
          }
        />
      ),
    },
  ];

  return isLoading ? (
    <div className="text-center">
      <Spin />
    </div>
  ) : (
    <>
      <Form
        form={form}
        key={formReRender}
        name="myForm"
        initialValues={{ remember: true }}
        // onFinish={handleIssue}
      >
        {contextHolder}
        <GenericCard>
          <TitleSearchButton
            title="Issue Inventory Requisition Form"
            subTitle={`Created by ${ItemsList?.fromDepartment?.name}`}
            id={ItemsList?.mirNumber}
          />
        </GenericCard>

        <CardButtonFilterGroup
          topSpace
          title={{ text: "Requested Items", level: 2 }}
        >
          <GenericMuiTable
            columns={columns}
            simpleTable
            data={getFormattedData()}
            isLoading={isLoading || isFetching}
            // wrapperClassName="first-row-red"
            maxHeight={"68vh"}
            enablePagination={false}
            enableColumnFilters={false}
            columnVisibility={{
              issuedQuantity: partial ? true : false,
              cancel: partial ? true : false,
            }}
          />
        </CardButtonFilterGroup>

        {ItemsList?.customItems?.length > 0 && (
          <>
            <div className="mt-5">
              {ItemsList?.customItems?.map((item, index) => {
                return (
                  index === 0 && (
                    <div key={item?.id} className="mt-5">
                      <UploadWithText
                        imagePreviewList={item?.images?.map((i) => {
                          return {
                            file: i,
                          };
                        })}
                        name={["customItems", index, "description"]}
                        readOnly={true}
                      />
                    </div>
                  )
                );
              })}
            </div>
            <div className="flex justify-end mt-3">
              <GenericButton
                className="p-0"
                type="link"
                lable="View all items description for suggestion"
                onClick={() => setAllItemsDesc(true)}
              />
            </div>
          </>
        )}

        {/* <div className="mt-10">
					<RequestItemDetail />
				</div> */}
        <div className="mt-5">
          <BasicDetails />
        </div>
        <div className="footer-buttons">
          <GenericButton
            type="outline"
            lable="Back"
            onClick={() => navigate(PATH.MIR_ISSUE_LIST)}
          />
          <GenericButton
            type="primary"
            lable="Issue"
            onClick={handleIssue}
            // htmlType="submit"
            disabled={issueLoading}
          />

          {/* <div className="flex gap-2">
					<ExpirableItemsModal />
				</div> */}
				</div>
				<ViewAllItemsDescription
					show={allItemsDesc}
					onClose={() => setAllItemsDesc(false)}
					showSuggested={true}
					data={ItemsList?.customItems}
					title={"Asked Items"}
					showAccepted={false}
					form={form}
				/>
				<RequestItemView
					show={requestedItemView}
					onClose={() => setRequestedItemView(false)}
				/>
				{showDialog && (
					<AppConfirmDialog
						showModal={showDialog}
						description="Are you sure you want to issue?"
						handleCancel={() => setShowDialog(false)}
						handleOk={handleOK}
					/>
				)}
				<AppConfirmDialog
					showModal={isItemIssued}
					title={<div className="text-center">Items Issued Successfully</div>}
					footer={
						<GenericButton
							type="primary"
							lable="OK"
							onClick={() => navigate(PATH.MIR_ISSUE_LIST)}
						/>
					}
				/>
				<ItemDetails
					show={itemView?.show}
					onHide={() => setItemView({ item: null, show: false })}
					onOk={() => setItemView({ item: null, show: false })}
					item={itemView?.item}
				/>
			</Form>
			{issueLoading && <FullScreenLoader forRequest />}
		</>
	);
}

Issue.propTypes = {
  cell: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  tooltipText: PropTypes.string,
};
