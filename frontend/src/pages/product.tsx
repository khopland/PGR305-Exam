import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Image from "react-bootstrap/esm/Image";
import IProduct from "../interfaces/product";
import Row from "react-bootstrap/esm/Row";
import { FC, useContext, useEffect, useState } from "react";
import { NewReview } from "../components/review/newReview";
import { productContext } from "../context/productContext";
import { Reviews } from "../components/review/reviewComponent";
import { ShopingCartContext } from "../context/shopingCartContext";
import { showMoney } from "../lib/showMoney";
import { useParams } from "react-router-dom";

export const Product: FC = () => {
  const { productid } = useParams();
  const { getById, refresh, value } = useContext(productContext);
  const { addToShopingCart } = useContext(ShopingCartContext);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    getProduct();
  }, [productid, value]);

  useEffect(() => {
    if (product && size === "") setSize(product.sizes[0]);

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
      addToShopingCart({ product, amount, size });
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
              <Col md={{ span: 3, offset: 2 }}>
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={size}
                    onChange={(e) => setSize(e.currentTarget.value)}
                  >
                    {product.sizes ? (
                      product.sizes.map((p, i) => {
                        return (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        );
                      })
                    ) : (
                      <option value={""}>test</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
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
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={onClick}
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    width: "80%",
                  }}
                >
                  {showMoney(product.price)}
                </Button>
              </Col>
            </Row>
          </Row>

          <Reviews product={product}>
            <NewReview
              product={product}
              onSubmit={async () => {
                await refresh();
              }}
            />
          </Reviews>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};
