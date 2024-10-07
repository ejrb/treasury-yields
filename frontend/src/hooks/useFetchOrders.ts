import { useEffect, useState } from "react";
import { listOrders } from "../services/orderService";

type Data = Awaited<ReturnType<typeof listOrders>>;

export const useFetchOrders = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        setData(await listOrders());
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { loading, data };
};
