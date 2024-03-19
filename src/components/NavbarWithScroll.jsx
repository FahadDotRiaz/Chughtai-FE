import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Space, Layout } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export function NavbarWithScroll({ optionsList }) {
  /** Custom List Scroll */
  const { pathname } = useLocation();
  const { Header } = Layout;

  const containerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const smoothScroll = (container, startPosition, targetPosition) => {
    const distance = targetPosition - startPosition;
    const duration = 300;
    let startTime;
    const animationStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      container.scrollLeft = startPosition + distance * progress;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      } else {
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    requestAnimationFrame(animationStep);
  };
  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = 200;
      const startPosition = container.scrollLeft;
      const targetPosition = startPosition - scrollAmount;
      smoothScroll(container, startPosition, targetPosition);
    }
  };
  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = 200;
      const startPosition = container.scrollLeft;
      const targetPosition = startPosition + scrollAmount;
      smoothScroll(container, startPosition, targetPosition);
    }
  };
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
    const handleScroll = () => {
      if (container) {
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [optionsList?.active]);

  return (
    optionsList?.list.length > 0 && (
      <Header className="nav-scroll">
        <div className="position-relative max-w-[80%]">
          <div className="custom-navbar" ref={containerRef}>
            {optionsList?.list?.map(
              ({ id, path, type, subMenu, hasDropdown }) => {
                return (
                  <span
                    className={`nav-items ${pathname === path && "active"}`}
                    key={id}
                  >
                    <Link to={path}>
                      {hasDropdown ? (
                        <Dropdown menu={{ items: subMenu }} trigger={["click"]}>
                          <Space>
                            {type}
                            <DownOutlined />
                          </Space>
                        </Dropdown>
                      ) : (
                        <h3 className="item-name">{type}</h3>
                      )}
                    </Link>
                  </span>
                );
              }
            )}
          </div>
          {showLeftButton && (
            <div className="button-arrow-start">
              <LeftOutlined
                className="custom-left-carousel-button"
                onClick={scrollLeft}
              />
            </div>
          )}
          {showRightButton && (
            <div className="button-arrow-end">
              <RightOutlined
                className="custom-right-carousel-button"
                onClick={scrollRight}
              />
            </div>
          )}
        </div>
      </Header>
    )
  );
}

NavbarWithScroll.propTypes = {
  optionsList: PropTypes.array.isRequired,
};
