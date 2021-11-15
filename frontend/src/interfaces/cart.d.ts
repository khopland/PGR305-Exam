import IProduct from "./product";

export default interface ICart {
  product: IProduct;
  amount: number;
  size: string;
}
