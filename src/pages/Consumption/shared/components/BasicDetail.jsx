import { Col, Row } from "antd";
import PropTypes from "prop-types";

import { getFormattedDate } from "../../../../utils/helper";
import GenericCard from "../../../../components/GenericCard";

export default function BasicDetails({ data }) {
  if (!data) return null;
  const { createDateTime, remarks, sin } = data;

  const fieldsConfig = [
    {
      label: "SIN No#",
      value: sin.sinNumber,
    },
    {
      label: "Date",
      value: getFormattedDate(createDateTime),
    },
    {
      label: "Remarks",
      value: remarks || "N/A",
    },
  ];

  return (
    <GenericCard>
      <Row gutter={[16, 30]}>
        {fieldsConfig.map((item, index) => {
          return (
            <Col span={6} key={index}>
              <div>
                <label>{item?.label}</label>
                <div className="name mt-2">{item?.value}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </GenericCard>
  );
}

BasicDetails.propTypes = {
  data: PropTypes.shape({
    createDateTime: PropTypes.string,
    remarks: PropTypes.string,
    sin: PropTypes.object,
  }).isRequired,
};
