import React, { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import { useBreadCrumbsUpdateContext } from "../Context/BreadCrumbsContext";
import axios from "axios";
import { baseApi } from "../../../../constants";
import UserTables from "./UserTable";

const Users: React.FC = () => {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  const [carts, setCarts] = useState([]);
  const [myOrders, setMyOrders] = useState<any>([]);
  const [userType, setUserType] = useState<any>(
    localStorage.getItem("currentUser")
  );

  const getAllUsersWithID = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllUsersWithID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data);
      });
  };

  const getAllUsers = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/users/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data.filter((v: any) => v.status !== 0));
      });
  };

  const getCartsByRole = () => {
    userType === "ADMIN" ? getAllUsers() : getAllUsersWithID();
  };

  useEffect(() => {
    routeHistoryUpdate(["Početna", "Users"]);
    getAllUsers();
  }, []);

  const DeleteAll = async () => {
    let token = localStorage.getItem("accessToken");
    await axios
      .get(`${baseApi}/users/DeleteAllusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("deleted successfully!");
        getAllUsers();
      });
  };

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  const DeleteById = async (id: any) => {
    console.log("delete", id);
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/DeleteUserByID`, { selected: id }, header)
        .then((res) => {
          alert("Deleted Successfully");
          console.log(res);
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  const verifyPhone = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/users/VerifyPhoneById`, { selected: id }, header)
        .then((res) => {
          alert("Verified Successfully");
          getAllUsers();
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="block">
      <div className="container">
        <div className="my-cart space-between">
          <h6>All Users : {carts.length || 0}</h6>
          <Button type="primary" className="btn-add" onClick={DeleteAll}>
            Delete All Users
          </Button>
        </div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <UserTables
            users={carts}
            DeleteById={DeleteById}
            verifyPhone={verifyPhone}
          />
        </Space>
      </div>
    </div>
  );
};

export default Users;
