import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

type DormitoryItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<DormitoryItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '栋号',
    dataIndex: 'building',
    formItemProps: {
      rules: [
        {
          pattern: /^[0-9]{1,2}$/,
          message: '不合法的栋号格式!',
        },
      ],
    },
  },
  {
    title: '房号',
    dataIndex: 'roomNumber',
    formItemProps: {
      rules: [
        {
          pattern: /^[0-9]{2,3,4}$/,
          message: '不合法的房号格式!',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '可选',
        status: 'success',
      },
      closed: {
        text: '已满',
        status: 'Error',
        disabled: true,
      },
      processing: {
        text: '未开放',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '开放时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<DormitoryItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        return request<{
          data: DormitoryItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};