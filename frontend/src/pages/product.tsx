import { FC, useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import { productContext } from "../context/productContext";
import { ShopingCartContext } from "../context/shopContext";
import IProduct from "../interfaces/product";
import { showMoney } from "../lib/showMoney";
import Button from "react-bootstrap/esm/Button";
import { NewReview } from "../components/order/newReview";
import { Review } from "../components/order/reviewComponent";

export const Product: FC = () => {
  const { productid } = useParams();
  const { value, getById, refresh } = useContext(productContext);
  const { addToShopingCart } = useContext(ShopingCartContext);
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProduct();
  }, [value, productid]);

  useEffect(() => {
    setError(false);
    if (product === null) setError(true);
  }, [product]);

  const getProduct = async () => {
    setError(false);
    productid !== undefined
      ? setProduct((await getById(productid)) || null)
      : setError(true);
  };

  const onClick = () => {
    if (product) {
      addToShopingCart({ product, amount });
      setAmount(1);
    }
  };
  return (
    <Container>
      {error ? (
        <h1>Product not found</h1>
      ) : product ? (
        <>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              style={{
                paddingTop: "3rem",
                objectFit: "cover",
                width: "60vw",
                height: "80vh",
              }}
            />
            <Row
              as="h3"
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              {product.name} ({product.id})
            </Row>
            <Row
              as="p"
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              {product.description}
            </Row>
            <Row>
              <Col md={{ span: 3, offset: 4 }}>
                <label>Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      parseInt(e.target.value) >= 1
                        ? parseInt(e.target.value)
                        : 1
                    )
                  }
                  required
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={onClick}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    width: "60%",
                  }}
                >
                  {showMoney(product.price)}
                </Button>
              </Col>
            </Row>
          </Row>

          <Review product={product}>
            <NewReview
              product={product}
              onSubmit={async () => {
                refresh();
              }}
            />
          </Review>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};
