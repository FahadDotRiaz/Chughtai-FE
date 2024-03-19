/* eslint-disable react/prop-types */
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import GenericMuiTable from "../../../../components/GenericMuiTable";
import PropTypes from "prop-types";
import { useLazyGetSirQuery } from "../../../../redux/slices/sir";
import DropdownField from "../../../../components/form/DropdownField";

export default function AddItem({
  show,
  closeModal,
  selectedRow,
  setSelectedRow,
  form,
  sirList,
}) {
  const [selectedSin, setSelectedSin] = useState(null);
  const [selectedItemList, setSelectedItemsList] = useState([]);
  const [items, setItems] = useState([]);
  const [getSirQuery, { data: sin = {}, isLoading: sinItemLoading }] =
    useLazyGetSirQuery();

  useEffect(() => {
    if (sin) {
      const formatted = sin?.sinItems?.map((item) => {
        return {
          id: item.item.id,
          itemCode: item.item.itemCode,
          name: item.item.name,
          description: item.item.description,
          quantity: item.quantity,
          consumptionQty: item.consumptionQty,
        };
      });
      setItems(formatted);
    }
  }, [sin]);

  const handleAdd = () => {
    const selectedIds = Object.keys(selectedRow);
    const selectedData = items?.filter((item) =>
      selectedIds?.includes(item.id)
    );

    // check already associated with the selected Sin
    const filteredSelectedData = selectedData.filter(
      (item) =>
        !form
          .getFieldValue("items")
          ?.some(
            (existingItem) =>
              existingItem.id === item.id && existingItem.sinId === selectedSin
          )
    );

    const updatedSinData = filteredSelectedData.map((item) => ({
      sinId: selectedSin,
      ...item,
    }));

    const currentItems = form.getFieldValue("items") || [];
    const combinedItems = [...currentItems, ...updatedSinData];
    form?.setFieldsValue({ items: combinedItems });

    closeModal();
    setSelectedRow({});
    setSelectedSin(null);
    setItems([]);
  };

  useEffect(() => {
    const id = selectedSin;
    if (id) {
      getSirQuery(id);
    }
  }, [getSirQuery, selectedSin]);

  const columns = [
    {
      header: "Item code",
      accessorKey: "itemCode",
      size: 120,
    },
    {
      header: "Name",
      accessorKey: "name",
      size: 120,
    },
    {
      header: "Description",
      accessorKey: "description",
      size: 250,
      Cell: ({ cell }) => (
        <div className="wrap-description">{cell?.getValue()}</div>
      ),
    },
    {
      header: "Batch",
      accessorKey: "batch",
      size: 120,
      Cell: () => <span>07819</span>,
    },
    {
      header: "Issued",
      accessorKey: "quantity",
      size: 120,
    },
  ];

  return (
    <Modal
      title="Select Items"
      centered
      open={show}
      onCancel={closeModal}
      width={950}
      className="add-item-modal"
      onOk={handleAdd}
      okText="Add"
    >
      <div className="mb-5">
        <DropdownField
          label="SIR"
          placeholder="Search SIR"
          options={sirList?.list?.map((item) => {
            return {
              value: item?.id,
              label: item?.sinNumber,
            };
          })}
          showSearch={true}
          onChange={(value) => setSelectedSin(value)}
          allowClear
          value={selectedSin}
        />
      </div>
      {sinItemLoading ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : (
        <GenericMuiTable
          columns={columns}
          data={items || []}
          simpleTable
          slimTable
          enableColumnFilters={false}
          isLoading={sinItemLoading}
          rowSelection
          selectedRow={selectedRow || selectedItemList}
          setSelectedRow={setSelectedRow || setSelectedItemsList}
          rowSelectionKey={"id"}
          isModaltable
        />
      )}
    </Modal>
  );
}

AddItem.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
