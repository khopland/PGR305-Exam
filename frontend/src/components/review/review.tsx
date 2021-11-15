import Rate from 'rc-rate';
import { FC } from 'react';
import Col from 'react-bootstrap/esm/Col';
import IReview from '../../interfaces/review';

type prop = { review: IReview };

export const Review: FC<prop> = ({ review }) => {
  return (
    <Col>
      <h3>{review.name}</h3>
      <p>{review.review}</p>
      <Rate disabled defaultValue={review.rating} />
      <hr />
    </Col>
  );
};
