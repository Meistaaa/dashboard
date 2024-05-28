"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Customer } from "@/types/customer";
import { CustomerTable } from "./customer-table";
import CreateCustomer from "@/components/customer/create";

const Categories = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const fetchCustomers = async () => {
    const fetchCustomers = await axios
      .get("/api/customer")
      .then((res) => res.data.data);
    setCustomers(fetchCustomers);
  };

  useEffect(() => {
    fetchCustomers();
    setIsLoading(false);
  }, []);

  const deleteCustomer = async (id: number) => {
    try {
      const response = await axios.delete("/api/customer", {
        data: { id },
      });
      await fetchCustomers();
      toast.success("Customer deleted successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <CreateCustomer
              onSuccess={fetchCustomers}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
          </div>
        </div>
        <CustomerTable
          customers={customers}
          deleteCustomer={deleteCustomer}
          selectCustomer={selectCustomer}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Categories;
