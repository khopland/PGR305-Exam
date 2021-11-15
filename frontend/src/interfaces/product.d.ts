import { Category } from '../enum/categoryEnum';
import IReview from './review';

export default interface IProduct {
  id?: String;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: Category;
  reviews?: Array<IReview>;
  sizes: Array<string>;
}
