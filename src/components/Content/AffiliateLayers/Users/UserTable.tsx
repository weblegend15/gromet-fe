import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { baseApi } from "../../../../constants";

interface DataType {
  key: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string;
  createdAt: string;
  delete: string;
}

const PhoneVerifByID = (id: any) => {
  console.log("yes", id);
};

type Props = {
  users: any;
  DeleteById: Function;
  verifyPhone: Function;
};

const UserTables = ({ users, DeleteById, verifyPhone }: Props) => {
  const [data, setData] = useState([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Email Status",
      dataIndex: "isEmailVerified",
      key: "isEmailVerified",
      render: (v) => (
        <Tag color={v ? "green" : "red"}>{v ? "Verified" : "Not Verified"}</Tag>
      ),
    },
    {
      title: "Phone Status",
      dataIndex: "isPhoneVerified",
      key: "isPhoneVerified",
      render: (v) =>
        v == "done" ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Button size="small" type="primary" onClick={() => verifyPhone(v)}>
            Verify
          </Button>
        ),
    },
    {
      title: "Joined From",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "delete",
      dataIndex: "delete",
      render: (v) => (
        <Button size="middle" onClick={() => DeleteById(v)}>
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    setData(
      users.map((v: any, i: number) => {
        const temp = { ...v };
        temp["key"] = i;
        temp["delete"] = v._id;
        if (temp.isPhoneVerified == false) temp.isPhoneVerified = temp._id;
        else temp.isPhoneVerified = "done";
        return temp;
      })
    );
    console.log("Here", data);
  }, [users]);

  return <Table columns={columns} dataSource={data} />;
};

export default UserTables;
