import IProduct from '../interfaces/product';
import { axios } from '../lib/http';

export const getAllProducts = async () => {
  const res = await axios.get('/product');
  return res.data as IProduct[];
};

export const postProduct = async (product: IProduct, image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  const imgRes = await axios({
    url: '/ImageUpload/SaveImage',
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (imgRes.status !== 201) return false;
  console.log({ imgRes });
  product.image = `https://localhost:5001/images/${imgRes.data.fileName}`;
  const res = await axios.post('/product', product);
  return res.status === 200;
};
