import { useCallback } from "react";
// import { orderList } from "../../../api/order.api";
import type { OrderListPayload } from "../types/order.types";
import { useOrderStore } from "../store/order.store";
import { generateMockOrders } from "../utils/mockOrderData";

export const useOrderBook = () => {
  const { setLoading, setOrdersData, setError } = useOrderStore();

  const fetchOrders = useCallback(
    async (payload: OrderListPayload, skip = 0, top = 10) => {
      setLoading(true);
      setError(null);

      try {
        // const response = await orderList(payload, skip, top);
        // setOrdersData(response);
        const mockOrders = generateMockOrders(1000);
        setOrdersData({ orders: mockOrders, totalOrderCount: 20 });
      } catch (err: any) {
        const message =
          err.message || "An error occurred while fetching orders";
        setError(message);
      }
    },
    [setLoading, setOrdersData, setError],
  );

  return { fetchOrders };
};
