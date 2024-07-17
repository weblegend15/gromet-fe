import React from "react";
import { Tabs, Table } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

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

const dataHistory = [
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
    title: "Datum",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Šifra",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Ime",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Količina",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Ukupna vrednost",
    dataIndex: "totalValue",
    key: "totalValue",
  },
];

const dataFinancial = [
  {
    key: "1",
    date: "28.07.2023",
    code: "FM165",
    name: "Fasadna mrežica 165g, 4x4mm",
    quantity: "2500m²",
    totalValue: "875,000.00 RSD",
  },
];

const History: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={
          <span>
            <UserOutlined /> Lični podaci
          </span>
        }
        key="1"
      >
        <div>
          <h2>Lični podaci</h2>
          <p>Ovo je sadržaj za lične podatke korisnika.</p>
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <HistoryOutlined /> Istorija
          </span>
        }
        key="2"
      >
        {/* Content for History tab */}
        <Table
          columns={columnsHistory}
          dataSource={dataHistory}
          pagination={false}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <CreditCardOutlined /> Finansijska kartica
          </span>
        }
        key="3"
      >
        {/* Content for Financial Card tab */}
        <Table
          columns={columnsFinancial}
          dataSource={dataFinancial}
          pagination={false}
        />
      </TabPane>
    </Tabs>
  );
};

export default History;
