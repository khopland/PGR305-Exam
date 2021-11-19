import Col from "react-bootstrap/esm/Col";
import IOrder from "../../interfaces/order";
import Row from "react-bootstrap/esm/Row";
import { FC } from "react";
import { showMoney } from "../../lib/showMoney";

interface props {
  order: IOrder;
}
export const OrderList: FC<props> = ({ order }: props) => {
  function ISOtoLongDate(isoString: string, locale = "no-NO") {
    const date = new Date(isoString);
    const longDate = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
    return longDate;
  }

  return (
    <Row style={{ paddingBottom: "2rem" }}>
      <h4>order nr: {order.id}</h4>
      <h6> {order.date && ` ${ISOtoLongDate(order.date)}`}</h6>
      <br />
      <Row>
        <Col>
          <h4>Name</h4>
        </Col>
        <Col>
          <h4>Size</h4>
        </Col>
        <Col>
          <h4>Price</h4>
        </Col>
        <Col>
          <h4>Amount</h4>
        </Col>
        <Col>
          <h4>Subtotal</h4>
        </Col>
      </Row>
      <hr />
      {order.orders?.map((order, i) => (
        <Row key={i}>
          <Col>
            <h4>{order.product.name}</h4>
          </Col>
          <Col>
            <h4>{order.size}</h4>
          </Col>
          <Col>
            <h4>{showMoney(order.product.price)}</h4>
          </Col>
          <Col>
            <h4>{order.amount}</h4>
          </Col>
          <Col>
            <h4>{showMoney(order.product.price * order.amount)}</h4>
          </Col>
        </Row>
      ))}
    </Row>
  );
};
