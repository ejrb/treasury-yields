import { useEffect, useState } from "react";
import { fetchYieldData } from "../services/yieldService";

export type YieldCurve = Awaited<ReturnType<typeof fetchYieldData>>[number];

export const useFetchYields = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<YieldCurve[]>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        setData(await fetchYieldData());
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
