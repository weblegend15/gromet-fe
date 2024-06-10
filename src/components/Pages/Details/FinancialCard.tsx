import React, { useState } from "react";
import { Layout, Menu, Tabs, Table } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  CreditCardOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

interface HistoryData {
  key: string;
  date: string;
  type: string;
  number: string;
  warehouse: string;
  value: string;
}

interface FinancialData {
  key: string;
  index: string;
  documentName: string;
  relatedDocument: string;
  approved?: string;
  forApproval?: string;
  note?: string;
}

const columnsHistory = [
  {
    title: "Datum",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tip",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Broj",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Magacin",
    dataIndex: "warehouse",
    key: "warehouse",
  },
  {
    title: "Vrednost",
    dataIndex: "value",
    key: "value",
  },
];

const dataHistory: HistoryData[] = [
  {
    key: "1",
    date: "22.10.2023",
    type: "Račun",
    number: "2843/23/NI",
    warehouse: "Magacin Niš",
    value: "112,754.00",
  },
  {
    key: "2",
    date: "12.09.2023",
    type: "Račun",
    number: "2714/23/NI",
    warehouse: "Magacin Niš",
    value: "65,989.21",
  },
  {
    key: "3",
    date: "05.07.2023",
    type: "Račun",
    number: "2699/23/BG",
    warehouse: "Magacin Beograd",
    value: "5,335.07",
  },
];

const columnsFinancial = [
  {
    title: "Redni broj",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Naziv dokumenta",
    dataIndex: "documentName",
    key: "documentName",
  },
  {
    title: "Povezani dokument",
    dataIndex: "relatedDocument",
    key: "relatedDocument",
  },
  {
    title: "Odobreno",
    dataIndex: "approved",
    key: "approved",
  },
  {
    title: "Za odobrenje",
    dataIndex: "forApproval",
    key: "forApproval",
  },
  {
    title: "Napomena",
    dataIndex: "note",
    key: "note",
  },
];

const dataFinancial: FinancialData[] = [];

const FinancialCard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div>
            <h2>Lični podaci</h2>
            <p>Ovo je sadržaj za lične podatke korisnika.</p>
          </div>
        );
      case "2":
        return (
          <Table
            columns={columnsHistory}
            dataSource={dataHistory}
            pagination={false}
          />
        );
      case "3":
        return (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Kompenzacije" key="1">
              <Table
                columns={columnsFinancial}
                dataSource={dataFinancial}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Knjižna odobrenja" key="2">
              <Table
                columns={columnsFinancial}
                dataSource={dataFinancial}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Knjižna zaduženja" key="3">
              <Table
                columns={columnsFinancial}
                dataSource={dataFinancial}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={(e) => setSelectedKey(e.key)}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Lični podaci
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined />}>
              Istorija
            </Menu.Item>
            <Menu.Item key="3" icon={<CreditCardOutlined />}>
              Finansijska kartica
            </Menu.Item>
            <Menu.Item key="4" icon={<ShopOutlined />}>
              Preporučena kupovina
            </Menu.Item>
            <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
              Pomoć
            </Menu.Item>
            <Menu.Item key="6" icon={<ContactsOutlined />}>
              Moj imenik
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FinancialCard;
