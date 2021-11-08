import { createContext, FC } from "react";
import IProduct from "../interfaces/product";
import { useLocalStorage } from "../lib/useLocalSotrage";

type shopingCart = {
  product: IProduct;
  amount: number;
};

export type shopingCartContextType = {
  shopingCart: shopingCart[];
  addToShopingCart: (shopingCart: shopingCart) => boolean;
  removeFromShopingCart: (shopingCart: shopingCart) => boolean;
};

export const ShopingCartContext = createContext<shopingCartContextType | null>(
  null
) as React.Context<shopingCartContextType>;

export const ShopingCartProvider: FC = ({ children }) => {
  const [shopingCart, setShopingCart] = useLocalStorage(
    "shopingCart",
    [] as shopingCart[]
  );

  const addToShopingCart = (shopingCart: shopingCart) =>
    setShopingCart((state) =>
      state.find((item) => item.product.id === shopingCart.product.id)
        ? state.map((item) =>
            item.product.id === shopingCart.product.id
              ? { ...item, amount: item.amount + shopingCart.amount }
              : item
          )
        : [...state, shopingCart]
    );

  const removeFromShopingCart = (shopingCart: shopingCart) =>
    setShopingCart((state) =>
      state
        .map((item) =>
          item.product.id === shopingCart.product.id
            ? { ...item, amount: item.amount - shopingCart.amount }
            : item
        )
        .filter((item) => item.amount > 0)
    );

  return (
    <ShopingCartContext.Provider
      value={{ shopingCart, addToShopingCart, removeFromShopingCart }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};
