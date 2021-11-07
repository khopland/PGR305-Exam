import { Category } from './categoryEnum';

export default interface IProduct {
  id?: String;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: Category;
}
