/* eslint-disable no-unused-vars */
import { Row, Col } from "antd";
import InventoryTurnOverRate from "./components/InventoryTurnOverRate";
import StockoutAndOverstockRatio from "./components/StockoutAndOverstockRatio";
import RatioOfDefectedItems from "./components/RatioOfDefectedItems";
import TopItemDemandOnPast from "../CEO/components/TopItemDemandOnPast";
import TimeTakenToRequest from "../CEO/components/TimeTakenToRequest";

const AI_DASHBOARD = () => {
  return (
    <div>
      {/* <Stats /> */}
      <Row className="my-10" gutter={[16, 16]}>
        <Col span={12}>
          <InventoryTurnOverRate />
        </Col>

        <Col span={12}>
          <StockoutAndOverstockRatio />
        </Col>
        <Col span={12}>
          <RatioOfDefectedItems />
        </Col>
        <Col span={12}>
          <TopItemDemandOnPast />
        </Col>
        <Col span={24}>
          <TimeTakenToRequest />
        </Col>
      </Row>
    </div>
  );
};

export default AI_DASHBOARD;
