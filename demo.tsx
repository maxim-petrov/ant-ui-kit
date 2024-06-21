import React, { useState } from 'react';
import './index.css';
import {
  IconApps,
  IconSearch,
  IconPlus,
  IconTool,
  IconProgressCheck,
  IconFiles,
  IconLicense,
  IconMenu2,
  IconUser,
  IconLogout,
} from '@tabler/icons-react';
import {
  Button,
  Layout,
  Menu,
  Tabs,
  Table,
  Space,
  Select,
  theme,
  ConfigProvider,
  Typography,
} from 'antd';
import type { TabsProps, TableColumnsType, TableProps } from 'antd';

import light from './tokens/light.json';

import logoFull from './img/logo-full.svg';
import logoIcon from './img/logo-icon.svg';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Список',
      children: (
        <>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              disabled
              options={[{ value: 'lucy', label: 'Lucy' }]}
            />
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              loading
              options={[{ value: 'lucy', label: 'Lucy' }]}
            />
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              allowClear
              options={[{ value: 'lucy', label: 'Lucy' }]}
            />
          </Space>
          <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Параллельный просмотр',
      children: 'Content of Tab Pane 2',
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const iconSize = 16;

  return (
    <ConfigProvider theme={light}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
          <div className="logo-container">
            <img
              src={collapsed ? logoIcon : logoFull}
              alt="Logo"
              className="logo"
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['7']}
            items={[
              {
                key: '1',
                icon: <IconApps size={iconSize} />,
                label: 'Все продукты',
              },
              {
                key: '2',
                icon: <IconSearch size={iconSize} />,
                label: 'Поиск',
              },
              {
                type: 'divider',
              },
              {
                key: '3',
                icon: <IconPlus size={iconSize} />,
                label: 'Новая заявка',
              },
              {
                key: '4',
                icon: <IconTool size={iconSize} />,
                label: 'Конструктор отчётов',
              },
              {
                key: 'sub1',
                icon: <IconProgressCheck size={iconSize} />,
                label: 'Репроцессинг',
                children: [
                  { key: '5', label: 'Обработка ошибок' },
                  { key: '6', label: 'Планирование задач' },
                ],
              },
              {
                key: '7',
                icon: <IconFiles size={iconSize} />,
                label: 'Справочники',
              },
              {
                key: '8',
                icon: <IconLicense size={iconSize} />,
                label: 'Продуктовый каталог',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              paddingRight: '24px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <IconMenu2 /> : <IconMenu2 />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Typography.Title
              style={{
                fontSize: '21px',
                lineHeight: '28px',
                paddingBottom: '6px',
              }}
            >
              Справочники
            </Typography.Title>
            <Button
              type="text"
              icon={<IconUser />}
              style={{
                marginLeft: 'auto',
                marginRight: '12px',
              }}
            />
            <Button type="text" icon={<IconLogout />} />
          </Header>
          <Content
            style={{
              padding: 24,
              paddingTop: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Tabs defaultActiveKey="1" items={items} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
