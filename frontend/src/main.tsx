import React from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./context/productContext";
import { Routing } from "./routing";
import { ShopingCartProvider } from "./context/shopingCartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-rate/assets/index.css";

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ShopingCartProvider>
        <Routing />
      </ShopingCartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
