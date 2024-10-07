import React, { useState, useEffect } from "react";
import axios from "axios";

type Order = {
  id: number;
  term: string;
  amount: number;
  created_at: string;
};

const OrderForm = () => {
  const [term, setTerm] = useState<string>("1 Mo");
  const [amount, setAmount] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/orders", { term, amount });
      setOrders([...orders, response.data]); // Add new order to the existing list
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Create a New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="term">Term</label>
          <select
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="1 Mo">1 Month</option>
            <option value="3 Mo">3 Month</option>
            <option value="6 Mo">6 Month</option>
            <option value="1 Yr">1 Year</option>
            <option value="5 Yr">5 Year</option>
            <option value="10 Yr">10 Year</option>
            <option value="30 Yr">30 Year</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button type="submit">Submit Order</button>
      </form>

      <h3>Order History</h3>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.term}</td>
                <td>{order.amount}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderForm;
