import { useCallback, useState } from "react";
import { createOrder, type CreateOrder } from "../services/orderService";

export const useFetchOrders = () => {
  const [loading, setLoading] = useState(false);

  const create = useCallback(async (order: CreateOrder) => {
    setLoading(true);
    try {
      return await createOrder(order);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, create };
};
