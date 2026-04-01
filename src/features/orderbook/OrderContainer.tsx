import { useEffect } from "react";
import { useOrderBook } from "./hooks/useOrderBook";
import { useOrderStore } from "./store/order.store";
import OrderTable from "./OrderTable";

function OrderContainer() {
  const { isLoading, error } = useOrderStore();
  const { fetchOrders } = useOrderBook();

  useEffect(() => {
    const defaultPayload = { filterOn: [], sortOn: [] };
    fetchOrders(defaultPayload);
  }, [fetchOrders]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <OrderTable />
    </div>
  );
}

export default OrderContainer;
