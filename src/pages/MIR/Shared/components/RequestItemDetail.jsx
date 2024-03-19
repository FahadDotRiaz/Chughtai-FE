import { Col, Row } from "antd";
import ItemSinDetail from "./ItemSinDetail";
import ItemConsumptionDetail from "./ItemConsumptionDetail";
import ItemMirDetail from "./ItemMirDetail";
import ItemPoPrDetail from "./ItemPoPrDetail";
import StockEstimationDetail from "./StockEstimationDetail";
import TitleSearchButton from "../../../../components/TitleSearchButton";
import CardButtonFilterGroup from "../../../../components/CardButtonFilterGroup";

export default function RequestItemDetail() {
	return (
		<Row gutter={[24, 24]}>
			<Col span={12}>
				<CardButtonFilterGroup title={{ text: "Item's SIR", level: 2 }}>
					<ItemSinDetail />
				</CardButtonFilterGroup>
			</Col>
			<Col span={12}>
				<CardButtonFilterGroup title={{ text: "Item's Consumption", level: 2 }}>
					<ItemConsumptionDetail />
				</CardButtonFilterGroup>
			</Col>
			<Col span={12}>
				<CardButtonFilterGroup title={{ text: "Item's IRF", level: 2 }}>
					<ItemMirDetail />
				</CardButtonFilterGroup>
			</Col>
			<Col span={12}>
				<CardButtonFilterGroup title={{ text: "Item's PO/PR", level: 2 }}>
					<ItemPoPrDetail />
				</CardButtonFilterGroup>
			</Col>
			<Col span={24}>
				<CardButtonFilterGroup title={{ text: "Items in Stock", level: 2 }}>
					<StockEstimationDetail />
				</CardButtonFilterGroup>
			</Col>
		</Row>
	);
}
