import { FC } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import IProduct from "../../interfaces/product";
import { showMoney } from "../../lib/showMoney";

export interface ProductCardProps {
  product: IProduct;
  onClick?: (product: IProduct) => void;
}
export const ProductCard: FC<ProductCardProps> = ({
  product,
  onClick,
}: ProductCardProps) => {
  return (
    <Card
      style={{
        width: "22rem",
        height: "25rem",
        margin: "2rem",
      }}
    >
      {product.image && (
        <Card.Img
          variant="top"
          src={product.image}
          style={{
            objectFit: "cover",
            width: "20rem",
            height: "15rem",
            paddingLeft: "0.3rem",
          }}
        />
      )}
      <Card.Body className="d-flex flex-column justify-content-end align-items-center">
        <Card.Title style={{ fontSize: "2rem" }}>{product.name}</Card.Title>
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
