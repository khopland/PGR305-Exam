import { FC } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import IOrder from '../../interfaces/order';
import { showMoney } from '../../lib/showMoney';

interface props {
  order: IOrder;
}
export const OrderList: FC<props> = ({ order }: props) => {
  return (
    <Row>
      <h3>order number : {order.id}</h3>
      <br />
      <Row>
        <Col>
          <h4>name</h4>
        </Col>
        <Col>
          <h4>price</h4>
        </Col>
        <Col>
          <h4>amount</h4>
        </Col>
        <Col>
          <h4>subtotal price</h4>
        </Col>
      </Row>
      <hr />
      {order.orders?.map((order, i) => (
        <Row key={i}>
          <Col>
            <h4>{order.product.name}</h4>
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