import { FC } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import IProduct from '../../interfaces/product';

export interface ProductCardProps {
  product: IProduct;
  onClick?: (product: IProduct) => void;
}
export const ProductCard: FC<ProductCardProps> = ({
  product,
  onClick,
}: ProductCardProps) => {
  const showMoney = (price: number): String => {
    return (price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '.kr';
  };

  return (
    <Card style={{ width: '22rem', height: '25rem', margin: '2rem' }}>
      {product.image && <Card.Img variant="top" src={product.image} />}
      <Card.Body className="d-flex flex-column justify-content-end align-items-center">
        <Card.Title style={{ fontSize: '2rem' }}>{product.name}</Card.Title>
        <Card.Text>{showMoney(product.price)}</Card.Text>
        <Button
          variant="primary"
          onClick={(e) => {
            onClick != undefined ? onClick(product) : null;
          }}
        >
          get details
        </Button>
      </Card.Body>
    </Card>
  );
};
