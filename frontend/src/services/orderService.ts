import axios from "axios";
import { API_URL } from "./constants";

export async function listOrders() {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export type CreateOrder = {
  amount: number;
  term: number;
};

type Order = CreateOrder & {
  id: number;
  created_at: string;
};

export async function createOrder(data: CreateOrder) {
  try {
    const response = await axios.post<Order>(`${API_URL}/orders`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
