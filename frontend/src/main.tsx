import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainNav } from './components/common/mainNav';
import { Main } from './pages/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart } from './pages/cart';
import { Admin } from './pages/admin';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
