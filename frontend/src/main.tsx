import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routing } from './routing';
import { ShopProvider } from './context/shopContext';
import { ProductProvider } from './context/productContext';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ShopProvider>
        <Routing />
      </ShopProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
