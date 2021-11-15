import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { OrderList } from "../components/order/orderList";
import IOrder from "../interfaces/order";
import { getAllOrders } from "../service/orderService";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <Container>
      <br />

      {orders ? (
        orders?.map((order, i) => <OrderList key={i} order={order} />)
      ) : (
        <div>No orders</div>
      )}
    </Container>
  );
};
