import { useState } from "react";
import { Button, Dropdown, Space, Menu, Tag } from "antd";
import GenericButton from "./GenericButton";
import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { AddItemsPopup } from "./AddItemsPopup";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowDropDown } from "react-icons/md";
import IMAGES from "../assets/images";

const TitleSearchButton = ({
  title,
  btnLable,
  icon,
  onButtonChange,
  isPopUp,
  filter,
  filterMenu,
  selectedFilters,
  isPrint,
  onPrint,
  isDropdown,
  importDropdown,
  printBtn,
  secondaryTitle,
  onScan,
  scanBtn,
  btnType,
  subTitle,
  id,
}) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleItemClick = () => {
    // Handle item click logic here
  };
  const menu = <Menu onClick={handleItemClick} items={filterMenu || []} />;
  const items = [
    // {
    // 	label: "Document",
    // 	key: "0",
    // },
    {
      label: "CSV",
      key: "1",
    },
  ];
  return (
    <div className={!subTitle ? "mb-4" : ""}>
      <Space
        className={`title-search-button mb-2 ${
          title ? `justify-between` : "justify-end"
        }`}
      >
        {title && (
          <div
            className={`table-lable ${
              secondaryTitle && "secondary flex items-center"
            }`}
          >
            {title}
            {id && <span className="ml-2 text-lg text-black">{id}</span>}
          </div>
        )}
        <Space>
          <div>
            <Space size={[0, 8]} wrap>
              {selectedFilters?.map((filter, index) => {
                return (
                  <Tag
                    key={index}
                    color="geekblue"
                    className="flex items-center gap-2 justify-center cursor-pointer mr-0"
                  >
                    {filter} <RxCross2 fill="black" size={15} />
                  </Tag>
                );
              })}
            </Space>
          </div>
          {filter && (
            <Dropdown
              overlay={menu}
              onVisibleChange={handleVisibleChange}
              visible={visible}
              trigger={["click"]}
            >
              <Button className="filter-btn">
                <FaFilter />
              </Button>
            </Dropdown>
          )}
          {/* <Input placeholder="Search" prefix={<SearchOutlined />} /> */}
          {/* {scanBtn && (
            <GenericButton
              type="outline"
              icon={<img src={IMAGES.SCAN_ICON} />}
              lable="Scan"
              onClick={onScan}
            />
          )} */}
          {/* {(isPrint || printBtn) && (
            <GenericButton
              type="outline"
              icon={<img src={IMAGES.PRINT_ICON} />}
              lable="Print"
              onClick={onPrint}
            />
          )} */}

          {(isDropdown || importDropdown) && (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="import-dropdown"
            >
              <Space>
                Import Items
                <MdOutlineArrowDropDown size={20} />
              </Space>
            </Dropdown>
          )}
          {isPopUp ? (
            <AddItemsPopup
              icon={icon}
              btnLable={btnLable}
              onButtonChange={onButtonChange}
            />
          ) : (
            btnLable && (
              <GenericButton
                lable={btnLable}
                type={btnType ? btnType : "primary"}
                icon={icon}
                htmlType="button"
                onClick={onButtonChange}
              />
            )
          )}
        </Space>
      </Space>
      {subTitle && <div className="font-medium">{subTitle}</div>}
    </div>
  );
};

export default TitleSearchButton;

TitleSearchButton.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  btnLable: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onButtonChange: PropTypes.func,
  isPopUp: PropTypes.bool,
  isPrint: PropTypes.bool,
  isDropdown: PropTypes.bool,
  onPrint: PropTypes.func,
  onScan: PropTypes.func,
  filter: PropTypes.bool,
  printBtn: PropTypes.bool,
  scanBtn: PropTypes.bool,
  importDropdown: PropTypes.bool,
  secondaryTitle: PropTypes.bool,
  filterMenu: PropTypes.array,
  selectedFilters: PropTypes.array,
  btnType: PropTypes.string,
  id: PropTypes.string,
};
TitleSearchButton.defaultProps = {
  secondaryTitle: false,
};
