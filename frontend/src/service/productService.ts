import IProduct from '../interfaces/product';
import { axios } from '../lib/http';

export const getAllProducts = async () => {
  const res = await axios.get('/product');
  return res.data as IProduct[];
};
export const getProductById = async (id: String) => {
  const res = await axios.get(`/product/${id}`);
  return res.data as IProduct;
};

export const postProduct = async (
  product: IProduct,
  image: File
): Promise<boolean> => {
  const formData = new FormData();
  formData.append('file', image);
  try {
    const imgRes = await axios({
      url: '/ImageUpload/SaveImage',
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (imgRes.status !== 201) return false;
    product.image = `https://localhost:5001/images/${imgRes.data.fileName}`;
    const res = await axios.post('/product', product);
    return res.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
};
