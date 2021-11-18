import { useContext, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CartItem } from "../components/shopingCart/cartItem";
import { ShopingCartContext } from "../context/shopingCartContext";
import { showMoney } from "../lib/showMoney";
import { CreateOrder } from "../service/orderService";

export const Cart = () => {
  const [show, setShow] = useState(false);
  const { shopingCart, emtyShopingCart } = useContext(ShopingCartContext);

  const sendOrder = async () => {
    const res = await CreateOrder({ orders: shopingCart });
    if (res) {
      emtyShopingCart();
      setShow(true);
    }
  };
  const total = useMemo(
    () =>
      shopingCart
        .map((x) => x.amount * x.product.price)
        .reduce((a, b) => a + b, 0),
    [shopingCart]
  );
  return (
    <Container fluid>
      {show && (
        <Alert variant="success" onClick={() => setShow(false)}>
          order complete
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={6} className="align-self-center text-center">
          <h1 className="title">Shoping Cart</h1>
          <h6 className="subtitle op-8">show all products in your cart</h6>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col lg={9}>
          <Row>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th className="b-0">Image</th>
                  <th className="b-0">Size</th>
                  <th className="b-0">Name</th>
                  <th className="b-0">Price</th>
                  <th className="b-0">Quantity</th>
                  <th className="b-0 text-right">Subtotal Price</th>
                </tr>
              </thead>
              <tbody>
                {shopingCart.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td align="left">
                    <Button variant="danger" onClick={emtyShopingCart}>
                      Empty cart
                    </Button>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td align="left">
                    <h5 className="font-medium m-b-30">
                      Total price : {showMoney(total)}
                    </h5>
                  </td>
                  <td align="left">
                    <Button variant="success" onClick={() => sendOrder()}>
                      Send order
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
