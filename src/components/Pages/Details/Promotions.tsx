import React from "react";
import { Layout, Menu, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

const Promotions: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["3"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/">Lični podaci</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/orders">Porudžbine</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/promotions">Promocije/popusti</Link>
          </Menu.Item>
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
          <Title level={3}>Promocije/popusti</Title>
          <Row>
            <Col span={24}>
              <img
                src="https://via.placeholder.com/300x400"
                alt="Promotion 1"
                style={{ width: "100%", marginBottom: "16px" }}
              />
            </Col>
            <Col span={24}>
              <img
                src="https://via.placeholder.com/300x400"
                alt="Promotion 2"
                style={{ width: "100%", marginBottom: "16px" }}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<span className="anticon anticon-file-pdf" />}
          >
            Preuzmi PDF
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Promotions;
