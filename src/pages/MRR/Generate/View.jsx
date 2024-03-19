/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Space, Row, Col, Spin } from "antd";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import { useEffect, useState } from "react";
import GenericButton from "../../../components/GenericButton";
import GenericMuiTable from "../../../components/GenericMuiTable";
import { PATH } from "../../../../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useLazyGetIrrByIdQuery } from "../../../redux/slices/IRR";
import PreviewImage from "./components/PreviewImage";
import CardButtonFilterGroup from "../../../components/CardButtonFilterGroup";

export default function CreateUpdate() {
  const { id } = useParams();
  const [showDialog, setShowDialog] = useState(false);

  const [getIrrByID, { data: IRRdata, isLoading: irrLoading, isFetching }] =
    useLazyGetIrrByIdQuery();

  useEffect(() => {
    if (id) {
      getIrrByID({ id });
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const addProof = location?.state;

  const getFormattedData = () => {
    if (IRRdata) {
      return IRRdata?.items?.map((i) => {
        return {
          estimatedPrice: i.estimatedPrice,
          images: i.images.map((image) => ({ file: image })),
          returnQuantity: i.returnQuantity,
          returnReason: i.returnReason,
          totalQuantity: i.totalQuantity,
          type: i.type,
          sinId: i?.sin?.id,
          sinNumber: i?.sin?.sinNumber,
          id: i?.item?.id,
          name: i?.item?.name,
          itemCode: i?.item?.itemCode,
          description: i?.item?.description,
        };
      });
    }

    return null;
  };
  const columns = [
    {
      header: "",
      accessorKey: "images",
      align: "center",
      Cell: ({ cell, row }) => (
        <Space className="flex justify-center">
          <PreviewImage
            imgList={getFormattedData()?.[row?.index]?.images || []}
          />
        </Space>
      ),
      enableColumnFilter: false,
      size: 100,
    },
    {
      header: "Item Code",
      accessorKey: "itemCode",
      size: 100,
    },
    {
      header: "Name",
      accessorKey: "name",
      size: 100,
    },
    {
      header: "Item Desc",
      accessorKey: "description",
      size: 200,
      Cell: ({ cell }) => (
        // eslint-disable-next-line react/prop-types
        <div className="wrap-description">{cell?.getValue()}</div>
      ),
    },
    {
      header: "Total QTY",
      accessorKey: "totalQuantity",
      size: 100,
      Cell: ({ row, cell }) => (
        <span>{row?.original?.totalQuantity || cell?.getValue()}</span>
      ),
    },
    {
      header: "Return Qty",
      accessorKey: "returnQuantity",
      size: 150,
    },
    {
      header: "Return type",
      accessorKey: "type",
      size: 150,
    },
    {
      header: "Estimated Price",
      accessorKey: "estimatedPrice",
      size: 150,
    },
    {
      header: "Return Reason",
      accessorKey: "returnReason",
      size: 150,
    },
  ];

  useEffect(() => {
    if (addProof) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [addProof]);

  return irrLoading || isFetching ? (
    <div className="text-center">
      <Spin />
    </div>
  ) : (
    <>
      <TitleSearchButton title="View Inventory Return Request" />

      <CardButtonFilterGroup title={{ text: "Return Items", level: 2 }}>
        <GenericMuiTable
          columns={columns}
          data={getFormattedData() || []}
          simpleTable
          enableColumnFilters={false}
          maxHeight={"65vh"}
        />
      </CardButtonFilterGroup>
      {IRRdata?.proofOfDisposal?.length > 0 &&
        IRRdata?.status === "APPROVED" && (
          <GenericCard className={"mt-5"}>
            <TitleSearchButton title="Proof of Disposal" secondaryTitle />
            <Row className="gap-2">
              {IRRdata.proofOfDisposal.map((imageUrl, index) => (
                <Col
                  key={index}
                  span={4}
                  className="inline-block p-8 bg-[#f1f1f1]"
                >
                  <img
                    src={imageUrl}
                    alt="images-gird"
                    className="images-grid"
                  />
                </Col>
              ))}
            </Row>
          </GenericCard>
        )}
      <div className="flex justify-between items-center mt-6">
        <GenericButton
          lable="Back"
          type="outline"
          onClick={() => navigate(-1)}
        />
      </div>
    </>
  );
}
