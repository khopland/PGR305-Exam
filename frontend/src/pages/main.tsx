import { useEffect, useState } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import { ProductCard } from '../components/home/productCard';
import { ProductCausel } from '../components/home/ProductCarusel';
import IProduct from '../interfaces/product';
import { getAllProducts } from '../service/productService';

export const Main = () => {
  const [Products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setProducts(await getAllProducts());
  };

  return (
    <Container fluid>
      <ProductCausel />
      <br />
      <Row>
        {Products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </Row>
    </Container>
  );
};
