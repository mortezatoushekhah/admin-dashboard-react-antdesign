import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getInventory, getOrders, getRevenue, getUsers } from "../../API/Api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

const RecentOrders = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          { title: "title", dataIndex: "title" },
          { title: "Quantity", dataIndex: "quantity" },
          { title: "Price", dataIndex: "discountedPrice" },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
};

const DashboardChart = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User ${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.total;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <Card style={{ width: 500, height: 350 }}>
      <Bar options={options} data={revenueData} />;
    </Card>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getUsers().then((res) => {
      setCustomers(res.total);
    });
    getOrders().then((res) => {
      setOrders(res.total);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getRevenue().then((res) => {
      setRevenue(res.total);
    });
  }, []);

  return (
    <div className="dashboard">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <Link to="/orders">
          <DashboardCard
            title={"Orders"}
            value={orders}
            icon={
              <ShoppingCartOutlined
                style={{
                  fontSize: 24,
                  color: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.25)",
                  padding: 8,
                  borderRadius: 20,
                }}
              />
            }
          />
        </Link>

        <Link to="/inventory">
          <DashboardCard
            title={"Inventory"}
            value={inventory}
            icon={
              <ShoppingOutlined
                style={{
                  fontSize: 24,
                  color: "purple",
                  backgroundColor: "rgba(0, 255, 255, 0.25)",
                  padding: 8,
                  borderRadius: 20,
                }}
              />
            }
          />
        </Link>
        <Link to="/customers">
          <DashboardCard
            title={"Customers"}
            value={customers}
            icon={
              <UserOutlined
                style={{
                  fontSize: 24,
                  color: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.25)",
                  padding: 8,
                  borderRadius: 20,
                }}
              />
            }
          />
        </Link>

        <DashboardCard
          title={"Revenue"}
          value={revenue}
          icon={
            <DollarOutlined
              style={{
                fontSize: 24,
                color: "red",
                backgroundColor: "rgba(255, 0, 0, 0.25)",
                padding: 8,
                borderRadius: 20,
              }}
            />
          }
        />
      </Space>

      <Space style={{ marginTop: 20 }}>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </div>
  );
};

export default Dashboard;
