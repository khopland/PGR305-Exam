import IOrder from '../interfaces/order';
import { axios } from '../lib/http';

export const getAllOrders = async () => {
  const res = await axios.get('/order');
  return res.data as IOrder[];
};

export const getOrderById = async (id: string) => {
  const res = await axios.get(`/order/${id}`);
  return res.data as IOrder;
};
export const CreateOrder = async (order: IOrder): Promise<boolean> => {
  try {
    const res = await axios.post('/order', order);
    return res.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
