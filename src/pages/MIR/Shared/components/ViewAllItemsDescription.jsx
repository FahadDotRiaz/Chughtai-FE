/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import { Col, Modal, Row, Typography, Form } from "antd";
import { useEffect } from "react";
import UploadWithText from "../../../../components/UploadWithText";
import DropdownField from "../../../../components/form/DropdownField";
import { useLazyGetItemsQuery } from "../../../../redux/slices/items";
import { CUSTOM_ITEM_STATUS } from "../../../../utils/constant";

export default function ViewAllItemsDescription({
  show,
  onClose,
  // isSingle,
  showSuggested = false,
  data,
  title,
  form,
  showAccepted = true,
}) {
  const [getItems, { data: itemsList = [], isLoading: isItemsLoading }] =
    useLazyGetItemsQuery();
  useEffect(() => {
    if (show) {
      getItems("");
    }
  }, [show]);

  const validate = () => {
    form?.validateFields().then(() => {
      onClose();
    });
  };
  const { Title } = Typography;
  console.log(
    data,
    "DATA",
    data?.every((item) => item.suggestedStatus === "PENDING")
  );
  let timeoutId;
  const onSearch = (value) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      getItems(value);
    }, 1000);
  };
  const handleBlur = () => {
    const customItems = form.getFieldValue("customItems");
    customItems.forEach((item, index) => {
      const searchValue = item?.suggestedItems || "";
      if (searchValue !== "") {
        getItems("");
      }
    });
  };
  return (
    <Modal
      centered
      open={show}
      onOk={validate}
      onCancel={onClose}
      width={1100}
      okButtonProps={{
        rootClassName: showSuggested ? "" : "!hidden",
      }}
      cancelText={"Close"}
      okText={"Suggested Items"}
    >
      <Row>
        <Col span={showSuggested || showAccepted ? 18 : 24} className="lable">
          <Title level={5}>{title ? title : "Item Description by user"}</Title>
        </Col>
        {showSuggested && (
          <Col span={6} className="lable">
            <Title level={5}>Suggest Items</Title>
          </Col>
        )}
        {showAccepted &&
          data?.every(
            (item) => item.suggestedStatus && item.suggestedStatus !== "PENDING"
          ) && (
            <Col span={6} className="lable">
              <Title level={5}>Suggested Items</Title>
            </Col>
          )}
      </Row>
      <Row gutter={[16, 16]}>
        {data?.map((item, index) => {
          return (
            <>
              <Col
                span={
                  showSuggested || (showAccepted && item?.suggestedItems)
                    ? 18
                    : 24
                }
                key={item?.id}
              >
                <UploadWithText
                  imagePreviewList={item?.images?.map((i) => {
                    return {
                      file: i,
                    };
                  })}
                  name={["customItems", index, "description"]}
                  readOnly={true}
                />
              </Col>
              {showSuggested && (
                <Col
                  span={6}
                  className=" border-[1px] border-#E2E5ED rounded-lg px-5 py-2"
                >
                  <Form.Item
                    name={["customItems", index, "suggestedItems"]}
                    rules={[{ required: true, message: "Required" }]}
                    labelAlign="top"
                    className="Input-Field"
                    colon={false}
                  >
                    <DropdownField
                      className="!mb-0"
                      options={itemsList?.list?.map((i) => {
                        return {
                          value: i?.id,
                          label: `${i?.itemCode} (${i?.name})`,
                        };
                      })}
                      mode={"multiple"}
                      onChange={() => {
                        form?.setFieldValue(
                          ["customItems", index, "itemId"],
                          item?.itemId
                        );
                      }}
                      showSearch={true}
                      allowClear={true}
                      onSearch={onSearch}
                      filterOption={false}
                      onBlur={handleBlur}
                      // defaultValue={"10011"}
                    />
                  </Form.Item>
                </Col>
              )}
              {showAccepted && item?.suggestedItems && (
                <Col
                  span={6}
                  className="border-[1px] border-#E2E5ED rounded-lg !p-4"
                >
                  {item?.suggestedItems?.map((i) => {
                    return (
                      <div
                        key={i?.id}
                        className="flex gap-2 items-center font-medium"
                      >
                        {i?.name}
                        {item?.suggestedStatus ===
                          CUSTOM_ITEM_STATUS.APPROVED &&
                          item?.acceptedItem?.id === i?.id && (
                            <div className="text-[#2FD353] ">Accepted</div>
                          )}
                        {item?.suggestedStatus ===
                          CUSTOM_ITEM_STATUS.REJECT && (
                          <div className="text-[#ED2626] ">Rejected</div>
                        )}
                      </div>
                    );
                  })}
                </Col>
              )}
            </>
          );
        })}

        {/* {Array.from({ length: isSingle ? 1 : 3 }, (_, index) => {
          return (
            <>
              <Col span={showSuggested ? 18 : 24} key={index}>
                <UploadWithText isView={true} />
              </Col>
              {showSuggested && (
                <Col
                  span={6}
                  className=" border-[1px] border-#E2E5ED rounded px-5 py-2"
                >
                  <DropdownField
                    options={option}
                    mode={"multiple"}
                    defaultValue={"10011"}
                  />
                </Col>
              )}
            </>
          );
        })} */}
      </Row>
    </Modal>
  );
}
