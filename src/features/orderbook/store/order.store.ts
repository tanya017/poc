import { create } from "zustand";
import type { Order } from "../types/order.types";

interface OrderStore {
  orders: Order[];
  totalOrderCount: number;
  isLoading: boolean;
  error: string | null;

  setOrdersData: (data: { orders: Order[]; totalOrderCount: number }) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  resetStore: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  totalOrderCount: 0,
  isLoading: false,
  error: null,

  setOrdersData: (data) =>
    set({
      orders: data.orders,
      totalOrderCount: data.totalOrderCount,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  resetStore: () =>
    set({ orders: [], totalOrderCount: 0, error: null, isLoading: false }),
}));
