import React from "react";
import { Layout, Menu, Tabs, List } from "antd";
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

const favorites = [
  "Artikl 1",
  "Artikl 2",
  "Artikl 3",
  "Artikl 4",
  "Artikl 5",
  "Artikl 6",
  "Artikl 7",
];

const RecommendedPurchase: React.FC = () => {
  const [selectedKey, setSelectedKey] = React.useState("5");

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
        return <div>Istorija content here</div>;
      case "3":
        return <div>Finansijska kartica content here</div>;
      case "4":
        return <div>Preporučena kupovina content here</div>;
      case "5":
        return (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Moji favoriti" key="1">
              <List
                size="large"
                bordered
                dataSource={favorites}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </TabPane>
            <TabPane tab="Mapa kupovine" key="2">
              <div>
                <h2>Mapa kupovine</h2>
                <p>Content for Mapa kupovine goes here.</p>
              </div>
            </TabPane>
          </Tabs>
        );
      case "6":
        return <div>Pomoć content here</div>;
      case "7":
        return <div>Moj imenik content here</div>;
      default:
        return null;
    }
  };

  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {renderContent()}
    </Content>
  );
};

export default RecommendedPurchase;
