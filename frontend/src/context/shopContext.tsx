import { createContext, FC, useReducer } from 'react';
import IProduct from '../interfaces/product';
import { useLocalStorage } from '../lib/useLocalSotrage';

type shopingCart = {
  id: IProduct;
  amount: number;
};

type shopingCartContextType = {
  shopingCart: shopingCart[];
  addToShopingCart: (shopingCart: shopingCart) => boolean;
  removeFromShopingCart: (shopingCart: shopingCart) => boolean;
};

export const shopContext = createContext<shopingCartContextType | null>(null);

export const ShopProvider: FC = ({ children }) => {
  const [shopingCart, setShopingCart] = useLocalStorage(
    'shopingCart',
    [] as shopingCart[]
  );

  const addToShopingCart = (shopingCart: shopingCart) =>
    setShopingCart((state) =>
      state.find((item) => item.id === shopingCart.id)
        ? state.map((item) =>
            item.id === shopingCart.id
              ? { ...item, amount: item.amount + shopingCart.amount }
              : item
          )
        : [...state, shopingCart]
    );

  const removeFromShopingCart = (shopingCart: shopingCart) =>
    setShopingCart((state) =>
      state
        .map((item) =>
          item.id === shopingCart.id
            ? { ...item, amount: item.amount - shopingCart.amount }
            : item
        )
        .filter((item) => item.amount > 0)
    );

  return (
    <shopContext.Provider
      value={{ shopingCart, addToShopingCart, removeFromShopingCart }}
    >
      {children}
    </shopContext.Provider>
  );
};
