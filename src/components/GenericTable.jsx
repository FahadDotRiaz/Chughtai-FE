/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Input, Table } from "antd";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";

const GenericTable = ({
  data,
  columns,
  rowSelection,
  className,
  pagination,
  isSimpleTable,
  style,
  scroll,
  showSelectAll,
}) => {
  const [dataSource, setDataSource] = useState(columns);
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            type="number"
            onBlur={save}
            style={{ width: "5rem" }}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsData = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <Table
      components={components}
      rowSelection={isSimpleTable ? false : rowSelection}
      columns={columnsData}
      dataSource={data}
      className={!showSelectAll && "hide-select-all " + className}
      pagination={isSimpleTable ? false : pagination}
      style={style}
      scroll={scroll}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-dark" : "table-row-light"
      }
    />
  );
};
export default GenericTable;

GenericTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowSelection: PropTypes.bool,
  className: PropTypes.string,
  pagination: PropTypes.string,
  isSimpleTable: PropTypes.bool,
};

GenericTable.defaultProps = {
  rowSelection: false,
  isSimpleTable: false,
  showSelectAll: false,
};
