import axios from "axios";
import { API_URL } from "./constants";
import type { Dollars, DateStr } from "./types";

type YieldTerm = {
  name: string;
  term: number;
};

type YieldRate = {
  date: DateStr;
  rate: Dollars;
};

export type YieldCurve = {
  term: YieldTerm;
  rates: YieldRate[];
};

export type YieldCurveResponse = YieldCurve[];

export const fetchYieldData = async () => {
  try {
    const response = await axios.get<YieldCurveResponse>(
      `${API_URL}/treasuries/yield_curve`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
