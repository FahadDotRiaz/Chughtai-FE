import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Skeleton } from "antd";
import PropTypes from "prop-types";
import { FaChevronRight, FaChevronLeft, FaPlus } from "react-icons/fa";
import { useState } from "react";
import GenericButton from "./GenericButton";

const ChatBotSlider = ({ items, number, onBtnClick, isChatBot, isLoading }) => {
	const [activeCard, setActiveCard] = useState(null);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: items?.length > 1 ? number : 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: <FaChevronLeft color="#2e3790" />,
		nextArrow: <FaChevronRight color="#2e3790" />,
	};
	return isLoading ? (
		<div className="flex justify-around my-10">
			{Array.from({ length: number }, (_, index) => (
				<Skeleton.Avatar key={index} active size={150} shape={"square"} />
			))}
		</div>
	) : (
		<Slider {...settings}>
			{items.map((item, index) => (
				<div key={index} className="slider-container">
					<Card
						bordered={false}
						style={{ width: 250, height: isChatBot ? 110 : 150 }}
						className={`slider-card-container ${
							activeCard === index ? "activem" : ""
						}`}
						onClick={() => setActiveCard(index)}
					>
						<div className="flex justify-center">
							<div className="card-body">
								<p className="text-black text-[12px]">{item.itemCode}</p>
								<p className="product-name py-2">{item.name}</p>

								{!isChatBot ? (
									<>
										<p className="text-[#767676] text-[.625rem] mb-5 h-8">
											{item.desc?.substring(0, 90) + "..." ||
												item?.description?.substring(0, 90) + "..."}
										</p>
										<div className="flex justify-center">
											<GenericButton
												type="primary"
												lable="Add to the IRF"
												size="small"
												className="add-to-irf"
												icon={<FaPlus />}
												onClick={() => onBtnClick(item?.id)}
											/>
										</div>
									</>
								) : (
									<p className="text-[#767676] text-[.625rem] mb-5 h-8">
										{item.description?.substring(0, 60) + "..."}
									</p>
								)}
							</div>
						</div>
					</Card>
				</div>
			))}
		</Slider>
	);
};

ChatBotSlider.propTypes = {
	items: PropTypes.array,
	number: PropTypes.number,
	onBtnClick: PropTypes.func,
	isChatBot: PropTypes.bool,
	isLoading: PropTypes.bool,
};
export default ChatBotSlider;
