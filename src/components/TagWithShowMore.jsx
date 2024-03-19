/* eslint-disable react/prop-types */
import { Avatar, Tag } from "antd";

const TagWithShowMore = ({ maxCount, list }) => {
	return (
		<Avatar.Group
			maxCount={maxCount}
			shape="square"
			// maxPopoverTrigger="click"
			className="show-more"
		>
			{list.map((tag, index) => (
				<Tag key={index} bordered={false} className="!m-0">
					{tag}
				</Tag>
			))}
		</Avatar.Group>
	);
};

export default TagWithShowMore;
