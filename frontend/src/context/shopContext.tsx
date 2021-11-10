import { createContext, FC } from 'react';
import ICart from '../interfaces/cart';
import { useLocalStorage } from '../lib/useLocalSotrage';

export type shopingCartContextType = {
  shopingCart: ICart[];
  addToShopingCart: (shopingCart: ICart) => boolean;
  removeFromShopingCart: (shopingCart: ICart) => boolean;
  emtyShopingCart: () => boolean;
};

export const ShopingCartContext = createContext<shopingCartContextType | null>(
  null
) as React.Context<shopingCartContextType>;

export const ShopingCartProvider: FC = ({ children }) => {
  const [shopingCart, setShopingCart] = useLocalStorage(
    'shopingCart',
    [] as ICart[]
  );
  const validateShopingCart = (shopingCart: ICart): boolean =>
    shopingCart.amount <= 0;

  const addToShopingCart = (shopingCart: ICart) =>
    validateShopingCart(shopingCart)
      ? false
      : setShopingCart((state) =>
          state.find((item) => item.product.id === shopingCart.product.id)
            ? state.map((item) =>
                item.product.id === shopingCart.product.id
                  ? { ...item, amount: item.amount + shopingCart.amount }
                  : item
              )
            : [...state, shopingCart]
        );

  const removeFromShopingCart = (shopingCart: ICart) =>
    validateShopingCart(shopingCart)
      ? false
      : setShopingCart((state) =>
          state
            .map((item) =>
              item.product.id === shopingCart.product.id
                ? { ...item, amount: item.amount - shopingCart.amount }
                : item
            )
            .filter((item) => item.amount > 0)
        );
  const emtyShopingCart = () => setShopingCart([]);

  return (
    <ShopingCartContext.Provider
      value={{
        shopingCart,
        addToShopingCart,
        removeFromShopingCart,
        emtyShopingCart,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};
