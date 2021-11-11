import { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import { InputField } from '../common/inputField';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Alert from 'react-bootstrap/esm/Alert';
import { CreateReview } from '../../service/reviewService';
import IProduct from '../../interfaces/product';
type props = {
  product: IProduct;
};
export const NewReview = ({ product }: props) => {
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
      setName('');
      setReview('');
      setRating(0);
    }
  };
  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  return (
    <Container>
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
            />
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
          <Col>
            <Row>
              <Col>
                <br />
                <label> Rating:</label>
                <div>
                  <Rate onChange={setRating} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <br />
            <button type="submit">Submit</button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};
