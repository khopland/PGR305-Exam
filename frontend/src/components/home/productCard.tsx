import { FC } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Product } from '../../types/product';

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}
export const ProductCard: FC<ProductCardProps> = ({
  product,
  onClick,
}: ProductCardProps) => {
  return (
    <Card style={{ width: '18rem' }}>
      {product.image?.length != 0 && (
        <Card.Img variant="top" src="holder.js/100px180" />
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.category}|{product.price}
          {product.description}
        </Card.Text>
        <Button
          variant="primary"
          onClick={(e) => {
            onClick != undefined ? onClick(product) : null;
          }}
        >
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
};
