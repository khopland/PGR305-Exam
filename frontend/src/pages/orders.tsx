import Container from "react-bootstrap/esm/Container";
import IOrder from "../interfaces/order";
import { getAllOrders } from "../service/orderService";
import { OrderList } from "../components/order/orderList";
import { useEffect, useState } from "react";

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

      {orders.length > 0 ? (
        orders?.map((order, i) => <OrderList key={i} order={order} />)
      ) : (
        <Container style={{ textAlign: "center" }}>
          <h1>No orders</h1>
        </Container>
      )}
    </Container>
  );
};
