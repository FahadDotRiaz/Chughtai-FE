import { Space } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

const CustomTabs = ({ tabsData }) => {
	const [activeTab, setActiveTab] = useState(0);
	const handleTabClick = (index) => {
		setActiveTab(index);
	};
	return (
		<>
			<Space className="custom-tabs">
				<Space.Compact>
					{tabsData?.map((tab, index) => {
						return (
							<Space
								className={`tab ${index === activeTab ? "active" : ""}`}
								key={index}
								onClick={() => handleTabClick(index)}
							>
								{tab.label}
							</Space>
						);
					})}
				</Space.Compact>
			</Space>
			{tabsData[activeTab]?.content}
		</>
	);
};

export default CustomTabs;

CustomTabs.propTypes = {
	tabsData: PropTypes.array.isRequired,
};
