import ICart from "./cart";

export default interface IOrder {
  id?: String;
  orders: ICart[];
}
