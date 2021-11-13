import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/home/productCard";
import { ProductCausel } from "../components/home/ProductCarusel";
import { productContext } from "../context/productContext";
import IProduct from "../interfaces/product";
import { getAllProducts } from "../service/productService";

export const Main = () => {
  const navigate = useNavigate();
  const { value, setContext } = useContext(productContext);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setContext((await getAllProducts()) as IProduct[]);
  };

  const handleClick = (product: IProduct) => {
    navigate(`${product.id}`, { replace: true });
  };

  return (
    <Container fluid>
      <ProductCausel />
      <br />
      <Row xs={1} md={3} lg={6} className="g-4">
        {value &&
          value?.map((product, i) => (
            <ProductCard key={i} product={product} onClick={handleClick} />
          ))}
      </Row>
    </Container>
  );
};
