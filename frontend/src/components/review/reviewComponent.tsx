import Rate from "rc-rate";
import { FC } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import IProduct from "../../interfaces/product";
import IReview from "../../interfaces/review";
import { Review } from "./review";

type prop = {
  product: IProduct;
};

export const Reviews: FC<prop> = ({ product, children }) => {
  return (
    <Container style={{ paddingTop: "10vh" }}>
      <h1>Review</h1>

      <Row xs={1} md={4} className="g-4">
        <Col xs={5} md={10} className="g-4">
          {children}
          <hr />
        </Col>
        {product.reviews?.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </Row>
    </Container>
  );
};
