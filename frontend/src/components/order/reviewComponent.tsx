import Rate from 'rc-rate';
import { FC } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import IProduct from '../../interfaces/product';

type prop = {
  product: IProduct;
};

export const Review: FC<prop> = ({ product, children }) => {
  return (
    <Container style={{ paddingTop: '10vh' }}>
      <h1>Review</h1>

      <Row xs={1} md={4} className="g-4">
        <Col xs={5} md={10} className="g-4">
          {children}
          <hr />
        </Col>
        {product.reviews?.map((rewiew, index) => {
          return (
            <Col key={index}>
              <h3>{rewiew.name}</h3>
              <p>{rewiew.review}</p>
              <Rate disabled defaultValue={rewiew.rating} />
              <hr />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
