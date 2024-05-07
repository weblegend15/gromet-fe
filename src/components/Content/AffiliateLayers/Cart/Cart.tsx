import React, { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import "./Cart.css";
import { useBreadCrumbsUpdateContext } from "../Context/BreadCrumbsContext";
import axios from "axios";
import { baseApi } from "../../../../constants";

const Cart: React.FC = () => {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  const [carts, setCarts] = useState([]);
  const [myOrders, setMyOrders] = useState<any>([]);
  const [userType, setUserType] = useState<any>(
    localStorage.getItem("currentUser")
  );

  const getAllCartsWithID = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllCartsWithID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data);
      });
  };

  const getAllCarts = () => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllCarts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data.data.filter((v: any) => v.status !== 0));
      });
  };

  const getCartsByRole = () => {
    userType === "ADMIN" ? getAllCarts() : getAllCartsWithID();
  };

  useEffect(() => {
    routeHistoryUpdate(["Početna", "Dućan"]);
    getCartsByRole();
  }, []);

  const DeleteAllByUser = async () => {
    let token = localStorage.getItem("accessToken");
    await axios
      .get(`${baseApi}/cart/DeleteAllCartsByUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("deleted successfully!");
        getCartsByRole();
      });
  };

  const DeleteAll = async () => {
    let token = localStorage.getItem("accessToken");
    await axios
      .get(`${baseApi}/cart/DeleteAllCarts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("deleted successfully!");
        getCartsByRole();
      });
  };

  const orderProduct = async (id: any, index: number) => {
    const temp: any = carts[index];
    if (temp.count > temp.itemNum.count) {
      alert(`Total number of products are only ", ${temp.itemNum.count}`);
      return;
    }
    console.log(temp);
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/SetOrderByID`, { product_id: id }, header)
        .then((res) => {
          alert("Ordered Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };

  const proveProduct = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/ProveOrderByID`, { product_id: id }, header)
        .then((res) => {
          alert("Proved Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };

  const deleteProduct = async (id: any) => {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return await axios
        .post(`${baseApi}/cart/DeleteCartrByID`, { product_id: id }, header)
        .then((res) => {
          alert("Canceled Successfully");
          getCartsByRole();
        })
        .catch((err) => {});
    }
  };
  const DelAll = () => (userType === "USER" ? DeleteAllByUser() : DeleteAll());

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return (
    <div className="block">
      <div className="container">
        <div className="my-cart space-between">
          <h6>All Carts : {carts.length || 0}</h6>
          <Button type="primary" className="btn-add" onClick={DelAll}>
            Cancel All Carts
          </Button>
        </div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {carts.map((v: any, index: number) => {
            return (
              <Card
                title={v.itemNum.naziv_artikla}
                size="small"
                className="my-cart"
                key={index}
              >
                <p>Product: {v.itemNum.naziv_artikla}</p>
                <p>Count: {v.count}</p>
                <p>
                  Status:
                  {v.status === 0 && (
                    <span
                      style={{
                        backgroundColor: "yellow",
                        padding: "5px",
                        margin: "5px",
                      }}
                    >
                      Not ordered yet
                    </span>
                  )}
                  {v.status === 1 && (
                    <span
                      style={{
                        backgroundColor: "green",
                        padding: "5px",
                        margin: "5px",
                      }}
                    >
                      Pending
                    </span>
                  )}
                  {v.status === 2 && (
                    <span
                      style={{
                        backgroundColor: "pink",
                        padding: "5px",
                        margin: "5px",
                      }}
                    >
                      Done
                    </span>
                  )}
                </p>
                <div>
                  {userType !== "ADMIN" &&
                    (v.status === 0 ? (
                      <Button
                        onClick={() => orderProduct(v._id, index)}
                        type="primary"
                      >
                        Order
                      </Button>
                    ) : (
                      <Button disabled>Orderd</Button>
                    ))}
                  <Button onClick={() => deleteProduct(v._id)}>Cancel</Button>
                  {userType === "ADMIN" && (
                    <Button onClick={() => proveProduct(v._id)} type="primary">
                      Prove Order
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </Space>
      </div>
    </div>
  );
};

export default Cart;
