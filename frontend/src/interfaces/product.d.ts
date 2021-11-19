import IReview from "./review";
import { Category } from "../enum/categoryEnum";

export default interface IProduct {
  id?: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: Category;
  reviews?: Array<IReview>;
  sizes: Array<string>;
}
