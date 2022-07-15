import React, { useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Table } from 'antd';

import type { ColumnsType } from 'antd/lib/table';
import { useForm } from 'antd/lib/form/Form';

interface IData {
  key: number;
  userName: string;
  userAge: number;
  userSex: 0 | 1;
}

interface EditableTableProps {}

const EditableTable: React.FC<EditableTableProps> = (props) => {
  const countRef = useRef(0);
  const [from] = useForm();

  const getItem = (): IData => {
    const item: IData = {
      key: countRef.current,
      userName: `king-${countRef.current}`,
      userAge: 18 + countRef.current,
      userSex: Math.random() > 0.5 ? 1 : 0,
    };

    countRef.current++;

    return item;
  };

  const data: IData[] = new Array(10).fill(null).map(getItem);

  const [dataSource, setDataSource] = useState(data);

  const handleDelete = (index: number) => {
    setDataSource((preDataSource) => preDataSource.filter((item) => item.key !== index));
  };

  const handleAddFirst = () => {
    setDataSource([getItem(), ...dataSource]);
  };

  const handleAddLast = () => {
    setDataSource([...dataSource, getItem()]);
  };

  const handleGetData = () => {};

  const columns: ColumnsType<IData> = [
    {
      width: '30%',
      title: '名称',
      dataIndex: 'userName',
      render: (item: IData['userName'], record, index) => (
        <Form.Item name="userName" style={{ margin: 0 }}>
          <Input bordered={false} style={{ width: '100%' }} />
        </Form.Item>
      ),
    },
    {
      width: '30%',
      title: '年龄',
      dataIndex: 'userAge',
      render: (item: IData['userAge'], record, index) => (
        <Form.Item name="userAge" style={{ margin: 0 }}>
          <InputNumber bordered={false} style={{ width: '100%' }} />
        </Form.Item>
      ),
    },
    {
      width: '30%',
      title: '性别',
      dataIndex: 'userSex',
      render: (item: IData['userSex'], record, index) => (
        <Form.Item name="userSex" style={{ margin: 0 }}>
          <Select
            bordered={false}
            style={{ width: '100%' }}
            options={[
              { label: '男', value: 1 },
              { label: '女', value: 0 },
            ]}
          />
        </Form.Item>
      ),
    },
    {
      width: '10%',
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.key)}>
          delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ margin: '1rem' }}>
      <div style={{ margin: '1rem' }}>
        <Button type="primary" onClick={handleAddFirst}>
          add first
        </Button>
        <Button type="primary" onClick={handleAddLast}>
          add last
        </Button>
        <Button type="primary" style={{ float: 'right' }} onClick={handleGetData}>
          get data
        </Button>
      </div>
      <Form form={from} component={false} size="small">
        <Table rowKey="key" size="small" bordered dataSource={dataSource} columns={columns} pagination={false} />
      </Form>
    </div>
  );
};

export default EditableTable;
