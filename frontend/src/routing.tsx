import { Admin } from "./pages/admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart } from "./pages/shopingCart";
import { Main } from "./pages/main";
import { MainNav } from "./components/common/mainNav";
import { Orders } from "./pages/orders";
import { Product } from "./pages/product";

export const Routing = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<Admin />} />
        <Route path="orders" element={<Orders />} />
        <Route path=":productid" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};
