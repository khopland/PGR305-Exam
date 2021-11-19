import Container from "react-bootstrap/esm/Container";
import IProduct from "../interfaces/product";
import Row from "react-bootstrap/esm/Row";
import { CategorySelector } from "../components/home/categorySelector";
import { ProductCard } from "../components/home/productCard";
import { ProductCausel } from "../components/home/ProductCarusel";
import { productContext } from "../context/productContext";
import { Search } from "../components/home/search";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const { value, refresh } = useContext(productContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(-1);

  const result = useMemo(
    () =>
      value?.filter(
        (x) =>
          (category !== -1 ? x.category === category : true) &&
          x.name.toLowerCase().startsWith(search.toLowerCase())
      ),
    [search, value, category]
  );
  const handleClick = (product: IProduct) => {
    navigate(`/${product.id}`);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Container>
      <ProductCausel />
      <br />
      <CategorySelector category={category} setCategory={setCategory} />

      <br />
      <Search search={search} setSearch={setSearch} />
      <hr />
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
