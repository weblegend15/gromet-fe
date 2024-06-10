import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Table,
  Button,
  Modal,
  Descriptions,
  Timeline,
} from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Order {
  key: string;
  date: string;
  invoiceNumber: string;
  status: string;
  orderNumber: string;
  value: string;
  orderName: string;
  details: {
    deliveryDate: string;
    supplier: string;
    address: string;
    statusHistory: { status: string; date: string }[];
  };
}

const Orders: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const showModal = (order: Order) => {
    setCurrentOrder(order);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Datum kreiranja porudžbine",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Broj računa",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "ISPORUČENO" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Broj porudžbine",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Vrednost",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Naziv porudžbine",
      dataIndex: "orderName",
      key: "orderName",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: Order) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Ponovi porudžbinu
        </Button>
      ),
    },
  ];

  const data: Order[] = [
    {
      key: "1",
      date: "21.09.2023.",
      invoiceNumber: "RF1820/23",
      status: "U OBRADI",
      orderNumber: "/",
      value: "4,350.00 RSD",
      orderName: "Porudžbina 1",
      details: {
        deliveryDate: "27.08.2023.",
        supplier: "Srma Group",
        address: "---",
        statusHistory: [
          { status: "U obradi", date: "03.08.2023." },
          { status: "Poslato", date: "25.08.2023." },
          { status: "Isporučeno", date: "27.08.2023." },
        ],
      },
    },
    {
      key: "2",
      date: "03.08.2023.",
      invoiceNumber: "RF2050/23",
      status: "ISPORUČENO",
      orderNumber: "17745",
      value: "67,200.00 RSD",
      orderName: "Mrežice 145g",
      details: {
        deliveryDate: "27.08.2023.",
        supplier: "Srma Group",
        address: "---",
        statusHistory: [
          { status: "U obradi", date: "03.08.2023." },
          { status: "Poslato", date: "25.08.2023." },
          { status: "Isporučeno", date: "27.08.2023." },
        ],
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["2"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/">Lični podaci</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/orders">Porudžbine</Link>
          </Menu.Item>
          <Menu.Item key="3">Promocije/popusti</Menu.Item>
          <Menu.Item key="4">Istorija</Menu.Item>
          <Menu.Item key="5">Finansijska kartica</Menu.Item>
          <Menu.Item key="6">Preporučena kupovina</Menu.Item>
          <Menu.Item key="7">Pomoć</Menu.Item>
          <Menu.Item key="8">Moj imenik</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <Title level={3}>Porudžbine</Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record) => ({
              onClick: () => showModal(record),
            })}
          />
          <Modal
            title="Detalji porudžbine"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Close
              </Button>,
            ]}
          >
            {currentOrder && (
              <>
                <Descriptions bordered>
                  <Descriptions.Item label="Datum isporuke">
                    {currentOrder.details.deliveryDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Poručioc">
                    {currentOrder.details.supplier}
                  </Descriptions.Item>
                  <Descriptions.Item label="Adresa isporuke">
                    {currentOrder.details.address}
                  </Descriptions.Item>
                </Descriptions>
                <Title level={4} style={{ marginTop: "16px" }}>
                  Istorija statusa
                </Title>
                <Timeline>
                  {currentOrder.details.statusHistory.map((history, index) => (
                    <Timeline.Item
                      key={index}
                      color={
                        history.status === "Isporučeno"
                          ? "green"
                          : history.status === "Poslato"
                          ? "blue"
                          : "red"
                      }
                    >
                      {history.status}: {history.date}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </>
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Orders;
