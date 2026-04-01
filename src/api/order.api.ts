import type {
  FilterCriterion,
  SortCriterion,
} from "../features/orderbook/types/order.types";
import { useAuthStore } from "../store/useAuthStore";
import api from "./axios";

interface OrderListPayload {
  filterOn: FilterCriterion[];
  sortOn: SortCriterion[];
}

export const orderList = async (
  payload: OrderListPayload,
  skip = 0,
  top = 0,
) => {
  const token = useAuthStore.getState().accessToken;
  const response = await api.post("v3/api/orders/list", payload, {
    params: { skip, top },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
