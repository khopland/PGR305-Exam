import IProduct from '../interfaces/product';
import IReview from '../interfaces/review';
import { axios } from '../lib/http';

export const CreateReview = async (
  product: IProduct,
  review: IReview
): Promise<boolean> => {
  try {
    const res = await axios.post(`/review/${product.id}`, review);
    return res.status === 201;
  } catch (error) {
    console.error(error);
    return false;
  }
};
