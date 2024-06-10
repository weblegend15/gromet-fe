import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import EditModal from "./EditModal";
import axios from "axios";
import { baseApi } from "../../../../constants";

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

type Props = {
  users: User[];
  DeleteById: (id: string) => void;
  verifyPhone: (id: string) => void;
  getAllUsers: () => void;
};

const UserTables: React.FC<Props> = ({
  users,
  DeleteById,
  verifyPhone,
  getAllUsers,
}) => {
  const [data, setData] = useState<User[]>([]);

  const handleUpdate = async (updatedUser: User) => {
    console.log(updatedUser);
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/updateUser`, { data: updatedUser }, header)
        .then((res) => {
          alert("Updated Successfully");
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  const columns: TableProps<User>["columns"] = [
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
      render: (v, record) =>
        v ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Button
            size="small"
            type="primary"
            onClick={() => verifyPhone(record.key)}
          >
            Verify
          </Button>
        ),
    },
    {
      title: "Rebate",
      dataIndex: "rebate",
      key: "rebate",
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
      render: (v: string, val: User) => (
        <ButtonGroup>
          <EditModal user={val} onUpdate={handleUpdate} />
          <Button size="middle" onClick={() => DeleteById(val.key)}>
            Delete
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    setData(
      users.map((v, i) => ({
        ...v,
        key: i.toString(),
        delete: v.key,
      }))
    );
  }, [users]);

  return <Table columns={columns} dataSource={data} />;
};

export default UserTables;
