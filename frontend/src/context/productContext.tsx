import IProduct from "../interfaces/product";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAllProducts, getProductById } from "../service/productService";

type IProductContext = {
  value: IProduct[] | null;
  getById: (id: string) => Promise<IProduct | undefined>;
  refresh: () => Promise<void>;
};

export const productContext = createContext<IProductContext>({
  value: null,
  getById: async () => {
    throw new Error("Context not initialized");
  },
  refresh: async () => {},
});
export const ProductProvider: FC = ({ children }) => {
  const [value, setContext] = useState<IProduct[]>([]);
  useEffect(() => {
    getContext();
  }, []);
  const getContext = async () => setContext(await getAllProducts());

  const getById = async (id: string) =>
    value.find((product) => product.id === id) || (await getProductById(id));

  return (
    <productContext.Provider value={{ value, getById, refresh: getContext }}>
      {children}
    </productContext.Provider>
  );
};
