import { FC, useContext, useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { productContext } from '../context/productContext';
import IProduct from '../interfaces/product';
import { getAllProducts } from '../service/productService';

export const Product: FC = () => {
  const params = useParams();
  const { value, setContext } = useContext(productContext);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (value?.length === 0 || value === null) {
      getProducts();
    }
    const product = value?.find((x) => x.id === params.productid);
    setProduct(product || null);
    if (product === null) {
      setError(true);
    }
  }, [value]);
  const getProducts = async () => {
    setContext((await getAllProducts()) as IProduct[]);
  };
  return (
    <Container>
      {error ? (
        <h1>Product not found</h1>
      ) : product ? (
        <Row>
          <Image
            src={product.image}
            alt={product.name}
            style={{ paddingTop: '5rem' }}
          />
          <h3>
            {product.name} ({product.id})
          </h3>

          <p>{product.description}</p>

          <p>{product.price}</p>
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};
