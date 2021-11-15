import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { useState } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import IProduct from '../../interfaces/product';
import { CreateReview } from '../../service/reviewService';
import { InputField } from '../common/inputField';
type props = {
  product: IProduct;
  onSubmit: () => void;
};
export const NewReview = ({ product, onSubmit }: props) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (name.length < 3) {
      setError(true);
      seterrorMessage('Name must be at least 3 characters long');
      return;
    }
    if (review.length < 3) {
      setError(true);
      seterrorMessage('Review must be at least 3 characters long');
      return;
    }
    if (rating < 0) {
      setError(true);
      seterrorMessage('Rating must be set');
      return;
    }
    if (
      await CreateReview(product, { name, review, rating, date: new Date() })
    ) {
      onSubmit();
      setName('');
      setReview('');
      setRating(0);
    }
  };
  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" onClick={() => setError(false)}>
          {errorMessage}
        </Alert>
      )}
      <Row>
        <Form onSubmit={handleSubmit}>
          <Col>
            <InputField
              type="text"
              value={name}
              onValueChange={setName}
              label="name"
              required
              as={Row}
            />

            <Row style={{ paddingTop: 5 }}>
              <label> Rating:</label>
              <Rate onChange={setRating} value={rating} />
            </Row>
            <br />
          </Col>
          <Col>
            <Row>
              <Form.Control
                as="textarea"
                rows={5}
                cols={80}
                onChange={textAreaChange}
                value={review}
                placeholder="Review"
              />
            </Row>
          </Col>
          <Col></Col>
          <Col>
            <br />
            <Button type="submit">Submit</Button>
          </Col>
        </Form>
      </Row>
    </>
  );
};
