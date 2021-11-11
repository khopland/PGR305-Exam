import React, { useRef, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { InputField } from '../components/common/inputField';
import IProduct from '../interfaces/product';
import { postProduct } from '../service/productService';

export const AddNewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length && setImg(e.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && price && img) {
      if (
        await postProduct(
          { name, price: Math.round(price * 100) } as IProduct,
          img
        )
      )
        clearData();
      else alert('Error');
    }
  };

  const clearData = () => {
    setName('');
    setPrice(0);
    if (ref.current) ref.current.value = '';
    setImg(undefined);
  };
  return (
    <Container>
      <Row>
        <form onSubmit={handleSubmit}>
          <Col>
            <InputField
              type="text"
              value={name}
              onValueChange={setName}
              label="name"
              required
            />

            <InputField
              type="number"
              value={price}
              onValueChange={setPrice}
              label="price"
              required
            />
          </Col>
          <Col>
            <Row>
              <Col>
                <br />
                <input
                  ref={ref}
                  id="img"
                  type="file"
                  onChange={handleCange}
                  required
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <br />
            <button type="submit">Submit</button>
          </Col>
        </form>
      </Row>
    </Container>
  );
};
