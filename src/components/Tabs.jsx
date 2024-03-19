import { Tabs } from "antd";
import PropTypes from "prop-types";

const GenericTabs = ({
	tabData,
	onEdit,
	activeKey,
	isEdit,
	defaultActiveKey,
	onChange,
}) => {
	return (
		<Tabs
			defaultActiveKey={defaultActiveKey}
			type={isEdit ? "editable-card" : "card"}
			tabBarStyle={{ marginBottom: 0 }}
			onChange={onChange}
			// onTabClick={(tab, index) => console.log("onTabClick", tab, index)}
			onEdit={onEdit}
			activeKey={activeKey}
			items={tabData}
		/>
	);
};
GenericTabs.propTypes = {
	tabData: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			children: PropTypes.node.isRequired,
			key: PropTypes.string,
			closable: PropTypes.bool,
		})
	).isRequired,
	onEdit: PropTypes.func,
	onChange: PropTypes.func,
	activeKey: PropTypes.string,
	defaultActiveKey: PropTypes.string,
	isEdit: PropTypes.bool,
};

export default GenericTabs;
