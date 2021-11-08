import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { productContext } from "../context/productContext";
import { ShopingCartContext } from "../context/shopContext";

export const Cart = () => {
  const { shopingCart } = useContext(ShopingCartContext);
  const { value } = useContext(productContext);
  return (
    <Container>
      <Row>hello world</Row>
      {shopingCart.map((item, i) => (
        <Row key={i}>
          <Col>{value?.find((x) => item.product.id === x.id)?.name}</Col>
          <Col>{item.amount}</Col>
        </Row>
      ))}
    </Container>
  );
};
