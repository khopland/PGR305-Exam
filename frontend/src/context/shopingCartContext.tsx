import ICart from "../interfaces/cart";
import { createContext, FC } from "react";
import { useLocalStorage } from "../lib/useLocalSotrage";

export type shopingCartContextType = {
  shopingCart: ICart[];
  addToShopingCart: (shopingCart: ICart) => boolean;
  removeFromShopingCart: (shopingCart: ICart) => boolean;
  emtyShopingCart: () => boolean;
};

export const ShopingCartContext = createContext<shopingCartContextType>({
  shopingCart: [],
  addToShopingCart: () => {
    throw new Error("Context not initialized");
  },
  removeFromShopingCart: () => {
    throw new Error("Context not initialized");
  },
  emtyShopingCart: () => {
    throw new Error("Context not initialized");
  },
});

export const ShopingCartProvider: FC = ({ children }) => {
  const [shopingCart, setShopingCart] = useLocalStorage(
    "shopingCart",
    [] as ICart[]
  );
  const validateShopingCart = (shopingCart: ICart): boolean =>
    shopingCart.amount >= 0 &&
    shopingCart.product.sizes?.find((x) => x === shopingCart.size) !==
      undefined;

  const findItem = (item: ICart, shopingCart: ICart): boolean =>
    item.product.id === shopingCart.product.id &&
    item.size === shopingCart.size;

  const addToShopingCart = (shopingCart: ICart) =>
    validateShopingCart(shopingCart)
      ? setShopingCart((state) =>
          state.find((item) => findItem(item, shopingCart))
            ? state.map((item) =>
                findItem(item, shopingCart)
                  ? { ...item, amount: item.amount + shopingCart.amount }
                  : item
              )
            : [...state, shopingCart]
        )
      : false;

  const removeFromShopingCart = (shopingCart: ICart) =>
    validateShopingCart(shopingCart)
      ? setShopingCart((state) =>
          state
            .map((item) =>
              findItem(item, shopingCart)
                ? { ...item, amount: item.amount - shopingCart.amount }
                : item
            )
            .filter((item) => item.amount > 0)
        )
      : false;

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
