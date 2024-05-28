"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Order } from "@/types/orderType";
import { OrderTable } from "./order-table";

const Categories = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    const fetchedCategories = await axios
      .get("/api/order")
      .then((res) => res.data.data);
    setOrders(fetchedCategories);
  };

  useEffect(() => {
    fetchOrders();
    setIsLoading(false);
  }, []);

  const selectOrder = (order: Order) => {
    setSelectedOrder(order);
  };
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        </div>
        <OrderTable
          orders={orders}
          isLoading={isLoading}
          fetchOrders={fetchOrders}
        />
      </div>
    </>
  );
};

export default Categories;
