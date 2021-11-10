import ICart from './cart';
import IProduct from './product';

export default interface IOrder {
  id?: String;
  orders: ICart[];
}
