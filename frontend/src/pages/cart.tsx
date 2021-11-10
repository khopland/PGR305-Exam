import { useContext, useMemo, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/esm/Image';
import Alert from 'react-bootstrap/esm/Alert';
import { ShopingCartContext } from '../context/shopContext';
import IProduct from '../interfaces/product';
import { showMoney } from '../lib/showMoney';
import { CreateOrder } from '../service/orderService';
import IOrder from '../interfaces/order';

export const Cart = () => {
  const [show, setShow] = useState(false);
  const {
    shopingCart,
    addToShopingCart,
    removeFromShopingCart,
    emtyShopingCart,
  } = useContext(ShopingCartContext);

  const increaseQty = (product: IProduct) => {
    addToShopingCart({ product, amount: 1 });
  };

  const decreaseQty = (product: IProduct) => {
    removeFromShopingCart({ product, amount: 1 });
  };
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
            <table className="table shop-table">
              <thead>
                <tr>
                  <th className="b-0">Image</th>
                  <th className="b-0">Name</th>
                  <th className="b-0">Price</th>
                  <th className="b-0">Quantity</th>
                  <th className="b-0 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {shopingCart.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <Image
                        src={item.product.image}
                        style={{
                          objectFit: 'cover',
                          width: '10rem',
                          height: '7rem',
                          paddingLeft: '0.3rem',
                          borderRadius: '1rem',
                        }}
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>{showMoney(item.product.price)}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() => increaseQty(item.product)}
                        className="btn-primary btn-sm"
                      >
                        +
                      </Button>
                      {item.amount}
                      <Button
                        variant="light"
                        className="btn-primary btn-sm"
                        onClick={() => decreaseQty(item.product)}
                      >
                        -
                      </Button>
                    </td>
                    <td className="text-right">
                      <h5 className="font-medium m-b-30">
                        {showMoney(item.amount * item.product.price)}
                      </h5>
                    </td>
                  </tr>
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
                  <td align="left">
                    <h5 className="font-medium m-b-30">
                      Subtotal : {showMoney(total)}
                    </h5>
                  </td>
                  <td align="left">
                    <Button variant="success" onClick={() => sendOrder()}>
                      Send order
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
