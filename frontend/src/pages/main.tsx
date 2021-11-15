import { useContext, useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/home/productCard';
import { ProductCausel } from '../components/home/ProductCarusel';
import { productContext } from '../context/productContext';
import { Category } from '../enum/categoryEnum';
import IProduct from '../interfaces/product';

export const Main = () => {
  const navigate = useNavigate();
  const { value, refresh } = useContext(productContext);
  const [search, setSearch] = useState('');
  const result = useMemo(
    () =>
      value?.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.price.toString().includes(search.toLowerCase()) ||
          Category[x.category].toLowerCase().includes(search.toLowerCase()) ||
          x.description?.toLowerCase().includes(search.toLowerCase())
      ),
    [search, value]
  );

  const handleClick = (product: IProduct) => {
    navigate(`${product.id}`);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Container>
      <ProductCausel />

      <br />
      <input
        style={{
          width: '100%',
        }}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      <Row xs={1} md={3} lg={6} className="g-4">
        {result
          ? result?.map((product, i) => (
              <ProductCard key={i} product={product} onClick={handleClick} />
            ))
          : value?.map((product, i) => (
              <ProductCard key={i} product={product} onClick={handleClick} />
            ))}
      </Row>
    </Container>
  );
};
