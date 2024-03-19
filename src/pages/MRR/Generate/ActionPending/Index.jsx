/* eslint-disable react/prop-types */
import { PATH } from "../../../../../config";
import GenericButton from "../../../../components/GenericButton";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import { Tag, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetApprovedIrrListQuery } from "../../../../redux/slices/IRR";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../../../utils/helper";

const ActionPending = () => {
  const { user } = useSelector((state) => state.auth);
  const departmentId = user?.activeRole?.departmentId;
  const { data: approvedList = [], isLoading: approvedLoading } =
    useGetApprovedIrrListQuery(departmentId);
  const navigate = useNavigate();
  const columns = [
    {
      header: "MRR Code",
      accessorKey: "mrrCode",
    },
    {
      header: "Generated Date",
      accessorKey: "createDateTime",
      filterVariant: "date",
    },
    // {
    // 	header: "Store",
    // 	accessorKey: "store",
    // },
    {
      header: "Stage",
      accessorKey: "stage",
    },
    {
      header: "Status",
      accessorKey: "status",
      // eslint-disable-next-line no-unused-vars
      Cell: (_, record) => (
        <Tag className="approved-tag">{_.renderedCellValue}</Tag>
      ),
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
      Cell: ({ cell }) => <span>{cell?.getValue() || "N/A"}</span>,
    },
    {
      header: "Actions",
      accessorKey: "id",
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
      Cell: ({ cell }) => (
        <GenericButton
          lable="Add Proof"
          type="primary"
          onClick={() =>
            navigate(PATH.MRR_UPDATE.replace(":id", cell?.getValue()), {
              state: { proof: true },
            })
          }
        />
      ),
    },
  ];
  const data = approvedList?.list?.map((item) => {
    return {
      ...item,
      createDateTime: getFormattedDate(item?.createDateTime, "DD-MM-YYYY"),
    };
  });

  return approvedLoading ? (
    <div className="text-center">
      <Spin />
    </div>
  ) : (
    <div>
      <TitleSearchButton title="My Action Pending" />
      <GenericMuiTable columns={columns} data={data || []} simpleTable />
    </div>
  );
};

export default ActionPending;
