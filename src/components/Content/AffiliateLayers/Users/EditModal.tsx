import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Select } from "antd";
import { FormInstance } from "antd/lib/form";

interface User {
  id: string;
  key: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string;
  createdAt: string;
  delete: string;
  rebate: Number;
}

interface EditModalProps {
  user: User;
  onUpdate: (user: User) => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<User>();

  const handleFinish = (values: Partial<User>) => {
    onUpdate({ ...user, ...values });
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit User
      </Button>
      <Modal
        title="Edit User"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            email: user.email,
            username: user.username,
            roles: user.roles,
            rebate: user.rebate,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="rebate" label="Rebate">
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="MODERATOR">MODERATOR</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="isEmailVerified" valuePropName="checked">
            <Checkbox>Email Verified</Checkbox>
          </Form.Item>
          <Form.Item name="isPhoneVerified" valuePropName="checked">
            <Checkbox>Phone Verified</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
