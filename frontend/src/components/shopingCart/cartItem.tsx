import Button from "react-bootstrap/esm/Button";
import ICart from "../../interfaces/cart";
import Image from "react-bootstrap/esm/Image";
import React, { FC, useContext } from "react";
import { ShopingCartContext } from "../../context/shopingCartContext";
import { showMoney } from "../../lib/showMoney";
import { useNavigate } from "react-router-dom";
type props = {
  item: ICart;
};
export const CartItem: FC<props> = ({ item }) => {
  const navigate = useNavigate();
  const { addToShopingCart, removeFromShopingCart } =
    useContext(ShopingCartContext);

  const increaseQty = (cart: ICart) => {
    addToShopingCart({ ...cart, amount: 1 });
  };

  const decreaseQty = (cart: ICart) => {
    removeFromShopingCart({ ...cart, amount: 1 });
  };
  return (
    <tr>
      <td>
        <Image
          onClick={() => {
            navigate(`/${item.product.id}`);
          }}
          src={item.product.image}
          style={{
            objectFit: "cover",
            width: "10rem",
            height: "7rem",
            paddingLeft: "0.3rem",
            borderRadius: "1rem",
          }}
        />
      </td>
      <td>{item.size}</td>
      <td>{item.product.name}</td>
      <td>{showMoney(item.product.price)}</td>
      <td>
        <Button
          variant="light"
          onClick={() => increaseQty(item)}
          className="btn-primary btn-sm"
        >
          +
        </Button>
        {item.amount}
        <Button
          variant="light"
          className="btn-primary btn-sm"
          onClick={() => decreaseQty(item)}
        >
          -
        </Button>
      </td>
      <td className="text-right">
        <h5 className="font-medium m-b-30">
          {showMoney(item.amount * item.product.price)}
        </h5>
      </td>
    </tr>
  );
};
