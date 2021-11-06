import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import IProduct from '../interfaces/product';
type props = {
  product: IProduct;
};
export const Product: FC<props> = ({ product }: props) => {
  const { id, name, price, description, image } = product;

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            {name} ({id})
          </h3>
        </Col>
        <Col>
          <p>{description}</p>
        </Col>
        <Col>
          <p>{price}</p>
        </Col>
        <img src={image} alt={name} />
      </Row>
    </Container>
  );
};
