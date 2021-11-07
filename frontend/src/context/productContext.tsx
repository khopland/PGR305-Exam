import IProduct from '../interfaces/product';
import abstractContext from './abstractContext';

const [context, provider] = abstractContext<IProduct[]>();

export const productContext = context;
export const ProductProvider = provider;
