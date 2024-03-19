/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import GenericMuiTable from "../../components/GenericMuiTable";
import ActionDropdown from "../../components/ActionDropdown";
import { PATH } from "../../../config";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import CardButtonFilterGroup from "../../components/CardButtonFilterGroup";
import {
  useDeleteDeclarationItemMutation,
  useLazyGetDeclarationItemListQuery,
} from "../../redux/slices/declaration";
import { getFormattedDate } from "../../utils/helper";
import useNotification from "../../components/Notification";
import useDebounce from "../../hooks/useDebounce";

const Declaration = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
  });
  const navigate = useNavigate();
  const { openNotification, contextHolder } = useNotification();

  const [
    getDeclaration,
    { data: declarationItemList = [], isLoading: isListLoading },
  ] = useLazyGetDeclarationItemListQuery();
  const [deleteDeclaration, { isLoading: deleteLoading }] =
    useDeleteDeclarationItemMutation();
  const BooleanOptions = [
    {
      id: "0",
      item: "No",
    },
    {
      id: "1",
      item: "Yes",
    },
  ];

  const columns = [
    {
      header: "Item Code",
      accessorKey: "itemCode",
    },
    // {
    //   header: "Description",
    //   accessorKey: "description",
    //   Cell: ({ cell }) => (
    //     <div className="wrap-description">{cell?.getValue() || "N/A"}</div>
    //   ),
    //   enableColumnFilter: false,
    // },

    // {
    //   header: "Rack No",
    //   accessorKey: "rackNo",
    // },
    {
      header: "Item name",
      accessorKey: "name",
      Cell: ({ cell }) => (
        <div className="wrap-description">{cell?.getValue() || "N/A"}</div>
      ),
    },
    {
      header: "Batch",
      accessorKey: "isBatch",
      Cell: ({ cell }) => (
        <span>{cell?.getValue() === true ? "Yes" : "No"}</span>
      ),
      filterSelectOptions: BooleanOptions?.map((batch) => {
        return {
          label: batch.item,
          value: batch.id,
        };
      }),

      filterVariant: "select",
    },
    {
      header: "Expirable",
      accessorKey: "expireDate",
      Cell: ({ cell }) => (
        <span>{cell?.getValue() === true ? "Yes" : "No"}</span>
      ),
      filterSelectOptions: BooleanOptions?.map((expire) => {
        return {
          label: expire.item,
          value: expire.id,
        };
      }),

      filterVariant: "select",
    },
    // {
    //   header: "Item Type",
    //   accessorKey: "itemType",
    // },
    // {
    //   header: "Department",
    //   accessorKey: "department.name",
    // },
    {
      header: "MFG Date",
      accessorKey: "manufacturingDate",
      Cell: ({ cell }) => (
        <span>{cell?.getValue() === true ? "Yes" : "No"}</span>
      ),
      filterSelectOptions: BooleanOptions?.map((mfg) => {
        return {
          label: mfg.item,
          value: mfg.id,
        };
      }),

      filterVariant: "select",
    },
    {
      header: "Action",
      accessorKey: "actions",
      enableColumnFilter: false,
      align: "center",
      size: 30,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      // eslint-disable-next-line no-unused-vars
      Cell: ({ row }) => (
        <ActionDropdown
          editOnClick={() => {
            console.log("row....", row);
            navigate(PATH.DECLARATION_UPDATE.replace(":id", row?.original?.id));
          }}
          deleteOnClick={() =>
            setShowDialog({ show: true, id: row?.original?.id })
          }
        />
      ),
    },
  ];

  const data = declarationItemList?.list?.map((item) => {
    return {
      ...item,
      createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
    };
  });
  const handleDelete = async () => {
    const { error } = await deleteDeclaration(showDialog?.id);
    if (!error) {
      openNotification("success", "Declaration deleted successfully");
    } else {
      openNotification("error", "Error deleting declaration");
    }
    setShowDialog({ show: false, id: null });
  };
  const debouncedTableOptions = useDebounce(tableOptions, 1000, [
    "name",
    "search",
    "isBatch",
    "expireDate",
    "manufacturingDate",
  ]);
  useEffect(() => {
    getDeclaration({ tableOptions: debouncedTableOptions });
  }, [debouncedTableOptions, getDeclaration, tableOptions.filters]);
  return (
    <>
      {contextHolder}
      <CardButtonFilterGroup
        title={{ text: "Items", level: 1 }}
        button={{
          label: "Add Items",
          icon: <PlusOutlined />,
          onClick: () => navigate(PATH.DECLARATION_CREATE),
        }}
      >
        <GenericMuiTable
          columns={columns}
          data={data || []}
          isLoading={isListLoading || deleteLoading}
          totalRecords={declarationItemList?.totalRows || 0}
          manualPagination={true}
          updatePaginationFunc={(data) =>
            setTableOptions({ ...tableOptions, pagination: data })
          }
          updateColumnFilters={setTableOptions}
          manualFiltering={true}
          enableGlobalFilter={false}
        />
      </CardButtonFilterGroup>
      <AppConfirmDialog
        // showModal={showDialog}
        description="Are you sure you want to delete this Item?"
        handleCancel={() => setShowDialog({ show: false, id: null })}
        // handleOk={() => setShowDialog(false)}
        showModal={showDialog?.show}
        handleOk={handleDelete}
      />
    </>
  );
};
export default Declaration;
