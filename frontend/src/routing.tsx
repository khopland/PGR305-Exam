import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { Cart } from './pages/cart';
import { AddNewProduct } from './pages/addNewProduct';
import { Product } from './pages/product';
import { MainNav } from './components/common/mainNav';
import { Orders } from './pages/orders';

export const Routing = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<AddNewProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path=":productid" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};
