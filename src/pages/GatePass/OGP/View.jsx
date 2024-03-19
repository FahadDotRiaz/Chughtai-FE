import { PATH } from "../../../../config";
import GenericButton from "../../../components/GenericButton";
import GenericCard from "../../../components/GenericCard";
import TitleSearchButton from "../../../components/TitleSearchButton";
import { Row, Col, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGatePassByIDQuery } from "../../../redux/slices/gatePass";
import { getFormattedDate } from "../../../utils/helper";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: GpData, isLoading } = useGetGatePassByIDQuery({ id });

  const date = GpData?.date || GpData?.createDateTime;

  const fieldsConfig = [
    {
      value: GpData?.driverName,
      label: "Driver Name",
    },
    {
      value: GpData?.driverCell,
      label: "Driver Cell",
    },
    {
      value: GpData?.driverId,
      label: "Driver ID",
    },
    {
      value: GpData?.truckNumber,
      label: "Truck Number",
    },
    {
      value: GpData?.type,
      label: "Type",
    },
    {
      value: GpData?.transportMode,
      label: "Transport Mode",
    },
    {
      value: GpData?.itemUnit,
      label: "Item Unit",
    },
    {
      value: GpData?.po?.vendor?.name,
      label: "Vendor",
    },

    {
      value: GpData?.po?.poCode,
      label: "PO #",
    },
    {
      value: date ? getFormattedDate(date, "DD-MM-YYYY") : null,
      label: "Date",
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Skeleton.Input active />
      ) : (
        <TitleSearchButton
          title={`OutwardGate Pass (${GpData?.OgpCode})`}
          printBtn
        />
      )}
      <GenericCard>
        <Row gutter={[16, 30]}>
          {fieldsConfig.map((item, index) => {
            return (
              <Col span={8} key={index}>
                {isLoading ? (
                  <Skeleton.Input active block />
                ) : (
                  <div>
                    <label>{item.label}</label>
                    <div className="name mt-2">{item.value}</div>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      </GenericCard>
      <div className="mt-5">
        <GenericButton
          type="outline"
          lable="Back"
          onClick={() => navigate(PATH.OGP_LIST)}
        />
      </div>
    </div>
  );
};

export default View;
