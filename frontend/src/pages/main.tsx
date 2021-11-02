import { useEffect, useState } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import { ProductCard } from '../components/home/productCard';
import { axios } from '../lib/http';
import { Product } from '../types/product';

export const Main = () => {
  const [Products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/product');
      setProducts(await res.data);
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <Container>
      <Row>
        <p>hello world</p>
        {Products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </Row>
    </Container>
  );
};
