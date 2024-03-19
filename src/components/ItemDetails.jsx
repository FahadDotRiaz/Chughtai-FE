/* eslint-disable react/prop-types */
import { Col, Divider, Modal, Row } from "antd";

export default function ItemDetails({ show, onHide, onOk, item }) {
 
  const itemDetails = [
    {
      label: "Item Code",
      value: item?.itemCode || "N/A",
    },
    {
      label: "Item Name",
      value: item?.name || "N/A",
    },
    {
      label: "Description",
      value:
        (
          <div className="wrap-description">
            {item?.description || item?.itemDesc}
          </div>
        ) || "N/A",
    },
    {
      label: "Category",
      value: item?.category?.name || "N/A",
    },

    // {
    // 	label: "Department",
    // 	value: "Department",
    // },
    {
      label: "Measuring Unit",
      value: item?.measuringUnit || "N/A",
    },
    {
      label: "Secondary Unit",
      value: item?.secondaryUnit || "N/A",
    },
    {
      label: "Rack No",
      value: item?.rack || "N/A",
    },
    // {
    // 	label: "Brand Name",
    // 	value: "Xeven Solutions",
    // },

    {
      label: "Packing Qty",
      value: item?.packingQty || "N/A",
    },
    {
      label: "Packing Size",
      value: item?.packingSize || "N/A",
    },
    {
      label: "Expirable",
      value: item?.expireDate ? "Yes" : "No" || "N/A",
    },
  ];
  // const finishGoods = [
  // 	{
  // 		label: "Batch",
  // 		value: "N/A",
  // 	},
  // 	{
  // 		label: "Exp. Date",
  // 		value: "Exp. Date",
  // 	},
  // 	{
  // 		label: "Machine",
  // 		value: "Machine",
  // 	},
  // 	{
  // 		label: "Is Serial",
  // 		value: "Is Serial",
  // 	},
  // 	{
  // 		label: "Inspection Bypass",
  // 		value: "Inspection Bypass",
  // 	},
  // 	{
  // 		label: "Regular items",
  // 		value: "Regular items",
  // 	},
  // ];
  return (
    <Modal
      open={show}
      title={null}
      onCancel={onHide}
      onOk={onOk}
      centered
      width={1000}
      footer={null}
    >
      <Row gutter={[16, 30]} className="p-6">
        <Col span={24}>
          <div className="table-lable">Item Details</div>
        </Col>
        {itemDetails.map((item, index) => {
          return (
            <Col span={6} key={index}>
              <div>
                <label>{item.label}</label>
                <div className="name mt-3">{item.value}</div>
              </div>
            </Col>
          );
        })}
        {/* <Divider />
				<Col span={24}>
					<div className="table-lable">Finish Good</div>
				</Col>
				{finishGoods.map((item, index) => {
					return (
						<Col span={6} key={index}>
							<div>
								<label>{item.label}</label>
								<div className="name mt-3">{item.value}</div>
							</div>
						</Col>
					);
				})} */}
      </Row>
    </Modal>
  );
}
