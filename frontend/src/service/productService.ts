import { Product } from "./../pages/product";
import IProduct from "../interfaces/product";
import { axios } from "../lib/http";

export const getAllProducts = async () => {
  const res = await axios.get("/product");
  return res.data as IProduct[];
};
export const getProductById = async (id: String) => {
  const res = await axios.get(`/product/${id}`);
  if (res.status === 200) return res.data as IProduct;
};

export const postProduct = async (
  product: IProduct,
  image?: File
): Promise<boolean> => {
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const imgRes = await axios({
        url: "/ImageUpload/SaveImage",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (imgRes.status !== 201) return false;
      product.image = `https://localhost:5001/images/${imgRes.data.fileName}`;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  try {
    const res = await axios.post("/product", product);
    return res.status === 201;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateProduct = async (product: IProduct, image?: File) => {
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const imgRes = await axios({
        url: "/ImageUpload/SaveImage",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (imgRes.status !== 201) return false;
      product.image = `https://localhost:5001/images/${imgRes.data.fileName}`;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  try {
    console.log(product);
    const res = await axios.put(`/product/${product.id}`, product);
    return res.status === 204;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteProduct = async (Product: IProduct) => {
  try {
    const res = await axios.delete(`/product/${Product.id}`);
    return res.status === 204;
  } catch (e) {
    console.error(e);
    return false;
  }
};
